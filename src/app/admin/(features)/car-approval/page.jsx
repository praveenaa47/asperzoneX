"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, getCarById, updateCar } from "@/redux/slices/carSlice";
import { useToast } from "../../components/Toast";
import SingleCarModal from "../car/components/SingleCarModal";

const CarApprovalManagement = () => {
    const dispatch = useDispatch();
    const { carList, loading, error, selectedCar } = useSelector((state) => state.cars);
    const { addToast } = useToast();

    const [filters, setFilters] = useState({
        searchTerm: '',
        approvalFilter: 'pending', // 'pending', 'approved', 'all'
    });

    const [isSingleViewModalOpen, setIsSingleViewModalOpen] = useState(false); // Add this state
    const [singleViewLoading, setSingleViewLoading] = useState(false);

    const handleViewCar = async (carId) => {
        try {
            setSingleViewLoading(true);
            await dispatch(getCarById(carId)).unwrap();
            setIsSingleViewModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch car details:', error);
            addToast("error", "Failed to load car details ❌");
        } finally {
            setSingleViewLoading(false);
        }
    };

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    // Filter cars based on approval status and search
    const filteredCars = carList.filter(car => {
        const matchesSearch = car.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            car.brand.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            car.model.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesApproval = filters.approvalFilter === 'all' ||
            car.approvalStatus === filters.approvalFilter;

        return matchesSearch && matchesApproval;
    });

    // Separate pending and approved cars for tabs
    const pendingCars = carList.filter(car => car.approvalStatus === 'pending');
    const approvedCars = carList.filter(car => car.approvalStatus === 'approved');

    const handleApproveCar = async (carId) => {
        try {
            const formData = new FormData();
            formData.append('approvalStatus', 'approved');
            formData.append('isActive', 'true'); // Auto-activate when approved

            await dispatch(updateCar({ id: carId, formData })).unwrap();
            addToast("success", "Car approved successfully ✅");
        } catch (error) {
            console.error('Failed to approve car:', error);
            addToast("error", "Failed to approve car ❌");
        }
    };

    const handleRejectCar = async (carId) => {
        try {
            const formData = new FormData();
            formData.append('approvalStatus', 'rejected');

            await dispatch(updateCar({ id: carId, formData })).unwrap();
            addToast("success", "Car rejected successfully ✅");
        } catch (error) {
            console.error('Failed to reject car:', error);
            addToast("error", "Failed to reject car ❌");
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
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                {isActive ? 'Active' : 'Inactive'}
            </span>
        );
    };

    // Show loading state
    if (loading && carList.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading cars...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error && carList.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p>Error loading cars: {error}</p>
                    <button
                        onClick={() => dispatch(getAllCars())}
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
                    <h1 className="text-2xl font-bold text-gray-900">Car Approval Management</h1>
                    <p className="text-gray-600">Review and approve car listings</p>
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
                                        placeholder="Search cars..."
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

                {/* Cars Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Car Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Posted By
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
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
                                {filteredCars.map((car) => (
                                    <tr key={car._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {car.media && car.media.length > 0 ? (
                                                        <img
                                                            className="h-10 w-10 rounded-lg object-cover"
                                                            src={car.media[0].url}
                                                            alt={car.title}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{car.title}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {car.brand} • {car.model} • {car.year}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 capitalize">{car.postedBy?.type}</div>
                                            <div className="text-sm text-gray-500">
                                                {car.location?.city}, {car.location?.state}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                ₹{car.price?.totalPrice?.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {car.price?.isNegotiable ? 'Negotiable' : 'Fixed'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                {getStatusBadge(car.approvalStatus)}
                                                {getActiveBadge(car.isActive)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(car.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                {car.approvalStatus === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApproveCar(car._id)}
                                                            className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded text-xs font-medium transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectCar(car._id)}
                                                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded text-xs font-medium transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handleViewCar(car._id)}
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

                    {filteredCars.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-4 text-gray-500">No cars found matching your criteria</p>
                        </div>
                    )}
                </div>

                {/* Pagination (if needed) */}
                {filteredCars.length > 0 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
                        <div className="flex-1 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{filteredCars.length}</span> of{' '}
                                    <span className="font-medium">{carList.length}</span> results
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <SingleCarModal
                    car={selectedCar}
                    isOpen={isSingleViewModalOpen}
                    onClose={() => setIsSingleViewModalOpen(false)}
                    loading={singleViewLoading}
                />
            </div>
        </div>
    );
};

export default CarApprovalManagement;