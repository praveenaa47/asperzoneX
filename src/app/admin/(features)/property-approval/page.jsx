"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../components/Toast";
import { getEstatepropertyById, getUserEstateproperty, updateEstateproperty } from "@/redux/slices/realestateProprtySlice";
import PropertyViewModal from "../property/components/PropertyViewModal";

const PropertyApprovalManagement = () => {
    const dispatch = useDispatch();
const { data: propertyList, loading, error, selectedProperty } = useSelector(
  (state) => state.property
);
    const { addToast } = useToast();

    const [filters, setFilters] = useState({
        searchTerm: '',
        approvalFilter: 'pending', // 'pending', 'approved', 'rejected', 'all'
    });

    const [isSingleViewModalOpen, setIsSingleViewModalOpen] = useState(false);
    const [singleViewLoading, setSingleViewLoading] = useState(false);

    const handleViewProperty = async (propertyId) => {
        try {
            setSingleViewLoading(true);
            await dispatch(getEstatepropertyById(propertyId)).unwrap();
            setIsSingleViewModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch property details:', error);
            addToast("error", "Failed to load property details ❌");
        } finally {
            setSingleViewLoading(false);
        }
    };

    useEffect(() => {
        dispatch(getUserEstateproperty());
    }, [dispatch]);

    // Filter properties based on approval status and search
    const filteredProperties = propertyList.filter(property => {
        const matchesSearch = property.propertyName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            property.propertyType.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            property.location.city.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesApproval = filters.approvalFilter === 'all' ||
            property.approvalStatus === filters.approvalFilter;

        return matchesSearch && matchesApproval;
    });

    // Separate pending and approved properties for tabs
    const pendingProperties = propertyList.filter(property => property.approvalStatus === 'pending');
    const approvedProperties = propertyList.filter(property => property.approvalStatus === 'approved');
    const rejectedProperties = propertyList.filter(property => property.approvalStatus === 'rejected');

    const handleApproveProperty = async (propertyId) => {
        try {
            const formData = new FormData();
            formData.append('approvalStatus', 'approved');
            formData.append('isActive', 'true'); // Auto-activate when approved

            await dispatch(updateEstateproperty({ id: propertyId, formData })).unwrap();
            addToast("success", "Property approved successfully ✅");
        } catch (error) {
            console.error('Failed to approve property:', error);
            addToast("error", "Failed to approve property ❌");
        }
    };

    const handleRejectProperty = async (propertyId) => {
        try {
            const formData = new FormData();
            formData.append('approvalStatus', 'rejected');

            await dispatch(updateEstateproperty({ id: propertyId, formData })).unwrap();
            addToast("success", "Property rejected successfully ✅");
        } catch (error) {
            console.error('Failed to reject property:', error);
            addToast("error", "Failed to reject property ❌");
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
            rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const getActiveBadge = (isActive) => {
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {isActive ? 'Active' : 'Inactive'}
            </span>
        );
    };

    const getFeaturedBadge = (isFeatured) => {
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isFeatured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                {isFeatured ? 'Featured' : 'Standard'}
            </span>
        );
    };

    // Show loading state
    if (loading && propertyList.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading properties...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error && propertyList.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p>Error loading properties: {error}</p>
                    <button
                        onClick={() => dispatch(getAllUserProperties())}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Property Approval Management</h1>
                    <p className="text-gray-600">Review and approve property listings</p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-lg shadow mb-6 p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search properties..."
                                        value={filters.searchTerm}
                                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                                        className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Status Filter */}
                            <select
                                value={filters.approvalFilter}
                                onChange={(e) => setFilters(prev => ({ ...prev, approvalFilter: e.target.value }))}
                                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Properties Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Property Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Specifications
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProperties.map((property) => (
                                    <tr key={property._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    {property.images && property.images.length > 0 ? (
                                                        <img
                                                            className="h-12 w-12 rounded-lg object-cover"
                                                            src={property.images[0]}
                                                            alt={property.propertyName}
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{property.propertyName}</div>
                                                    <div className="text-sm text-gray-500 capitalize">
                                                        {property.propertyType} • {property.ownershipType}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        Posted by: {property.postedBy?.id?.name || 'Unknown'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{property.location.city}</div>
                                            <div className="text-sm text-gray-500">
                                                {property.location.state}, {property.location.country}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ₹{property.price.amount?.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500 capitalize">
                                                {property.price.period}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {property.price.negotiable ? 'Negotiable' : 'Fixed'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {property.bedrooms} Beds • {property.bathrooms} Baths
                                            </div>
                                            <div className="text-sm text-gray-500 capitalize">
                                                {property.bedType} • {property.furnished}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                Built: {property.yearBuilt}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                {getStatusBadge(property.approvalStatus)}
                                                {getActiveBadge(property.isActive)}
                                                {getFeaturedBadge(property.isFeatured)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(property.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {property.approvalStatus === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApproveProperty(property._id)}
                                                            className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded text-xs font-medium transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectProperty(property._id)}
                                                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-xs font-medium transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handleViewProperty(property._id)}
                                                    className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded text-xs font-medium transition-colors"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProperties.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-4 text-gray-500">No properties found matching your criteria</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredProperties.length > 0 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
                        <div className="flex-1 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{filteredProperties.length}</span> of{' '}
                                    <span className="font-medium">{propertyList.length}</span> results
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <PropertyViewModal
                    property={selectedProperty}
                    isOpen={isSingleViewModalOpen}
                    onClose={() => setIsSingleViewModalOpen(false)}
                    loading={singleViewLoading}
                />
            </div>
        </div>
    );
};

export default PropertyApprovalManagement;