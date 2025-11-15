"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../components/Toast';
import { deleteEnquiry, getAllEnquiries, updateEnquiryStatus } from '@/redux/slices/enquirySlice';
import EnquiryList from './components/EnquiryList';
import EnquiryViewModal from './components/EnquiryViewModal';
import DeleteConfirmationModal from '../../components/DeleteModal';

const EnquiryManagement = () => {
  const dispatch = useDispatch();
  const { enquiryList, loading, error } = useSelector((state) => state.enquiries);
  
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all'
  });
  const [viewEnquiryId, setViewEnquiryId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { addToast } = useToast();

  // Load enquiries on component mount
  useEffect(() => {
    dispatch(getAllEnquiries());
  }, [dispatch]);

  // Filter enquiries based on search and filters
  const filteredEnquiries = enquiryList.filter(enquiry => {
    const matchesSearch = enquiry.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      enquiry.property?.propertyName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      enquiry.message?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus = filters.statusFilter === 'all' || enquiry.status === filters.statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewEnquiry = (id) => {
    setViewEnquiryId(id);
    setIsViewModalOpen(true);
  };

  const handleDeleteEnquiry = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteEnquiry(deleteId)).unwrap();
      setIsDeleteOpen(false);
      setDeleteId(null);
      setDeleteLoading(false);
      addToast("success", "Enquiry deleted successfully ✅");
    } catch (error) {
      console.error("Failed to delete enquiry:", error);
      addToast("error", "Failed to delete enquiry ❌");
      setDeleteLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await dispatch(updateEnquiryStatus({ id, status: newStatus })).unwrap();
      addToast("success", "Enquiry status updated successfully ✅");
    } catch (error) {
      console.error('Failed to update status:', error);
      addToast("error", "Failed to update enquiry status ❌");
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'responded', label: 'Responded' },
    { value: 'closed', label: 'Closed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  // Show loading state
  if (loading && enquiryList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && enquiryList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading enquiries: {error}</p>
          <button
            onClick={() => dispatch(getAllEnquiries())}
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
          <h1 className="text-2xl font-bold text-gray-900">Enquiry Management</h1>
          <p className="text-gray-600">Manage and respond to customer enquiries</p>
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
                    placeholder="Search enquiries..."
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
                value={filters.statusFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enquiry List */}
        <EnquiryList
          enquiries={filteredEnquiries}
          onView={handleViewEnquiry}
          onDelete={handleDeleteEnquiry}
          onStatusUpdate={handleStatusUpdate}
        />

        {/* View Modal */}
        {isViewModalOpen && (
          <EnquiryViewModal
            enquiryId={viewEnquiryId}
            isOpen={isViewModalOpen}
            onClose={() => {
              setIsViewModalOpen(false);
              setViewEnquiryId(null);
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          loading={deleteLoading}
          title="Delete Enquiry"
          message="Are you sure you want to delete this enquiry? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default EnquiryManagement;