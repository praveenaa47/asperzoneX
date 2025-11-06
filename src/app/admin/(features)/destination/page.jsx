"use client";
import { addDestination, deleteDestination, getDestinations, updateDestination } from "@/redux/slices/destinationSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DestinationList from "./components/DestinationList";
import DestinationModal from "./components/DestinationModal";
import DeleteConfirmationModal from "../../components/DeleteModal";
import { useToast } from "../../components/Toast";

const DestinationManagement = () => {
    const dispatch = useDispatch();
    const { data: destinations, loading, error } = useSelector((state) => state.destinations);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
  const { addToast } = useToast();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        statusFilter: 'all',
        featuredFilter: 'all'
    });

    useEffect(() => {
        dispatch(getDestinations());
    }, [dispatch]);

    // Filter destinations based on search and filters
    const filteredDestinations = destinations.filter(destination => {
        const matchesSearch = destination.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            destination.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            destination.subtitle?.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesStatus = filters.statusFilter === 'all' ||
            (destination.isActive ? 'active' : 'inactive') === filters.statusFilter;
        const matchesFeatured = filters.featuredFilter === 'all' ||
            (destination.isFeatured ? 'featured' : 'standard') === filters.featuredFilter;

        return matchesSearch && matchesStatus && matchesFeatured;
    });

    const handleAddDestination = () => {
        setEditingDestination(null);
        setIsModalOpen(true);
    };

    const handleEditDestination = (destination) => {
        setEditingDestination(destination);
        setIsModalOpen(true);
    };

    const handleSaveDestination = async (destinationData) => {
        try {
            const formData = new FormData();

            // Append basic fields
            formData.append('name', destinationData.name);
            formData.append('title', destinationData.title);
            formData.append('subtitle', destinationData.subtitle);
            formData.append('about', destinationData.about);
            formData.append('isActive', destinationData.isActive.toString());
            formData.append('isFeatured', destinationData.isFeatured.toString());

            // Append cover image - FIXED: Use proper field name
            if (destinationData.coverImage instanceof File) {
                formData.append('coverImage', destinationData.coverImage);
            } else if (typeof destinationData.coverImage === 'string' && destinationData.coverImage) {
                // For existing images, you might need to handle differently
                formData.append('coverImageUrl', destinationData.coverImage);
            }

            // Append key highlights - FIXED: Use proper field structure
            formData.append("keyHighlights", JSON.stringify(
                destinationData.keyHighlights.map(h => ({ title: h.title }))
            ));

            destinationData.keyHighlights.forEach(h => {
                if (h.icon instanceof File)
                    formData.append("keyHighlightIcons", h.icon);
            });


            // Append popular places - FIXED: Use proper field structure
            formData.append("popularPlaces", JSON.stringify(
                destinationData.popularPlaces.map(p => ({
                    name: p.name,
                    description: p.description
                }))
            ));

            destinationData.popularPlaces.forEach(p => {
                if (p.image instanceof File)
                    formData.append("popularPlaceImages", p.image);
            });


            // Append gallery items - FIXED: Use proper field structure
            destinationData.gallery.forEach(item => {
                if (item.image instanceof File)
                    formData.append("gallery", item.image);
            });

            formData.append("galleryData", JSON.stringify(
                destinationData.gallery.map(item => ({
                    caption: item.caption,
                    type: item.type
                }))
            ));


            // Append policies
            destinationData.policies?.forEach((policy, index) => {
                formData.append(`policies[${index}][question]`, policy.question);
                formData.append(`policies[${index}][answer]`, policy.answer);
            });

            // Debug: Log FormData contents
            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(key, value instanceof File ? `File: ${value.name}` : value);
            }

            if (editingDestination) {
                await dispatch(updateDestination({
                    id: editingDestination._id,
                    formData
                })).unwrap();
                addToast("success", "Destination updated successfully ✅");
            } else {
                await dispatch(addDestination(formData)).unwrap();
                addToast("success", "Destination added successfully ✅");
            }

            setIsModalOpen(false);
            setEditingDestination(null);
        } catch (error) {
            console.error('Failed to save destination:', error);
            addToast("error", "Failed to save destination ❌");
        }
    };

    // Rest of the component remains the same...
    const handleDeleteDestination = (id) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            setDeleteLoading(true);
            await dispatch(deleteDestination(deleteId)).unwrap();
            setIsDeleteOpen(false);
            setDeleteId(null);
            setDeleteLoading(false);
            addToast("success", "Destination deleted successfully ✅");
        } catch (error) {
            console.error("Failed to delete:", error);
            addToast("error", "Failed to delete destination ❌");
            setDeleteLoading(false);
        }
    };


    const handleStatusChange = async (id, newStatus) => {
        try {
            const formData = new FormData();
            formData.append('isActive', newStatus.toString());

            await dispatch(updateDestination({
                id,
                formData
            })).unwrap();
            addToast("success", "Destination status updated successfully ✅");
        } catch (error) {
            console.error('Failed to update status:', error);
            addToast("error", "Failed to update destination status ❌");
        }
    };

    const handleFeaturedToggle = async (id) => {
        try {
            const destination = destinations.find(d => d._id === id);
            if (destination) {
                const formData = new FormData();
                formData.append('isFeatured', (!destination.isFeatured).toString());

                await dispatch(updateDestination({
                    id,
                    formData
                })).unwrap();
                addToast("success", "Destination featured status updated successfully ✅");
            }
        } catch (error) {
            console.error('Failed to toggle featured:', error);
            addToast("error", "Failed to update featured status ❌");
        }
    };

    if (loading && destinations.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading destinations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Destination Management</h1>
                    <p className="text-gray-600">Manage your travel destinations and popular places</p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Controls */}
                <div className="bg-white rounded-lg shadow mb-6 p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search destinations..."
                                        value={filters.searchTerm}
                                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Filters */}
                            <select
                                value={filters.statusFilter}
                                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <select
                                value={filters.featuredFilter}
                                onChange={(e) => setFilters(prev => ({ ...prev, featuredFilter: e.target.value }))}
                                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Featured</option>
                                <option value="featured">Featured</option>
                                <option value="standard">Standard</option>
                            </select>
                        </div>

                        {/* Add Destination Button */}
                        <button
                            onClick={handleAddDestination}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap disabled:opacity-50"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {loading ? 'Loading...' : 'Add New Destination'}
                        </button>
                    </div>
                </div>

                {/* Destination List */}
                <DestinationList
                    destinations={filteredDestinations}
                    onEdit={handleEditDestination}
                    onDelete={handleDeleteDestination}
                    onStatusChange={handleStatusChange}
                    onFeaturedToggle={handleFeaturedToggle}
                    loading={loading}
                />
                <DeleteConfirmationModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={confirmDelete}
                    loading={deleteLoading}
                    title="Delete Destination"
                    message="This will permanently delete the destination. Do you want to continue?"
                />


                {/* Modal */}
                {isModalOpen && (
                    <DestinationModal
                        destination={editingDestination}
                        onSave={handleSaveDestination}
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingDestination(null);
                        }}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
};

export default DestinationManagement;