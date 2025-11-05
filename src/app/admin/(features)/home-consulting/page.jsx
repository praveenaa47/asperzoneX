"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConsultingForm from './components/ConsultingForm';
import ConsultingList from './components/ConsultingList';
import { addHomeConsulting, deleteHomeConsulting, getHomeConsulting, updateHomeConsulting } from '@/redux/slices/homeConsultingSlice';
import DeleteConfirmationModal from '../../components/DeleteModal';
import { useToast } from '../../components/Toast';

const ConsultingManagement = () => {
  const dispatch = useDispatch();
  const { data: consultingPages, loading, error } = useSelector((state) => state.homeConsulting);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all'
  });
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
    const { addToast } = useToast();



  useEffect(() => {
    dispatch(getHomeConsulting());
  }, [dispatch]);

  // Filter pages
  const filteredPages = consultingPages.filter(page => {
    const matchesSearch = page.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      page.subtitle?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus = filters.statusFilter === 'all' ||
      (filters.statusFilter === 'active' ? page.isActive : !page.isActive);

    return matchesSearch && matchesStatus;
  });

  const handleAddPage = () => {
    setEditingPage(null);
    setIsModalOpen(true);
  };

  const handleEditPage = (page) => {
    setEditingPage(page);
    setIsModalOpen(true);
  };

  const handleSavePage = async (pageData) => {
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('title', pageData.title);
      formData.append('subtitle', pageData.subtitle);
      formData.append('isActive', true);

      // Append introduction
      formData.append('introduction[description]', pageData.introduction.description);

      // Append banner image (if it's a file)
      if (pageData.bannerImage instanceof File) {
        formData.append('bannerImage', pageData.bannerImage);
      } else if (typeof pageData.bannerImage === 'string') {
        formData.append('bannerImage', pageData.bannerImage);
      }

      // Append introduction image (if it's a file)
      if (pageData.introduction.image instanceof File) {
        formData.append('introductionImage', pageData.introduction.image);
      } else if (typeof pageData.introduction.image === 'string') {
        formData.append('introductionImage', pageData.introduction.image);
      }

      // Append sections
      pageData.sections.forEach((section, index) => {
        formData.append(`sections[${index}][title]`, section.title);
        formData.append(`sections[${index}][description]`, section.description);
        if (section.image instanceof File) {
          formData.append(`sectionImages[${index}]`, section.image);
        } else if (typeof section.image === 'string') {
          formData.append(`sections[${index}][image]`, section.image);
        }
      });

      // Append gallery images
      pageData.gallery.forEach((item, index) => {
        if (item.image instanceof File) {
          formData.append(`galleryImages`, item.image);
        } else if (typeof item.image === 'string') {
          formData.append(`gallery[${index}][image]`, item.image);
        }
      });

      if (editingPage) {
        // Update existing page
        await dispatch(updateHomeConsulting({
          id: editingPage._id,
          formData
        })).unwrap();
        addToast("success", "Consulting page updated successfully ✅");
      } else {
        // Add new page
        await dispatch(addHomeConsulting(formData)).unwrap();
        addToast("success", "Consulting page added successfully ✅");
      }

      setIsModalOpen(false);
      setEditingPage(null);

      dispatch(getHomeConsulting());

    } catch (error) {
      console.error('Failed to save page:', error);
      addToast("error", "Failed to save consulting page ❌");
    }
  };

  const handleDeletePage = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteHomeConsulting(deleteId)).unwrap();
      setIsDeleteOpen(false);
      setDeleteId(null);
      setDeleteLoading(false);
      addToast("success", "Consulting page deleted successfully ✅");
    } catch (error) {
      console.error("Failed to delete page:", error);
      addToast("error", "Failed to delete consulting page ❌");
      setDeleteLoading(false);
    }
  };


  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isActive', newStatus === 'active');

      await dispatch(updateHomeConsulting({
        id,
        formData
      })).unwrap();
      addToast("success", "Consulting page status updated successfully ✅");
    } catch (error) {
      console.error('Failed to update status:', error);
      addToast("error", "Failed to update consulting page status ❌");
    }
  };

  const handleFeaturedToggle = async (id) => {
    try {
      const page = consultingPages.find(p => p._id === id);
      const formData = new FormData();
      formData.append('featured', !page.featured);

      await dispatch(updateHomeConsulting({
        id,
        formData
      })).unwrap();
      addToast("success", "Consulting page featured status updated successfully ✅");
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      addToast("error", "Failed to update consulting page featured status ❌");
    }
  };

  if (loading && consultingPages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading consulting pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Consulting Pages Management</h1>
          <p className="text-gray-600">Manage your consulting service pages and content</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Controls - Same as before */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search consulting pages..."
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
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Add Page Button */}
            <button
              onClick={handleAddPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Page
                </>
              )}
            </button>
          </div>
        </div>

        {/* Consulting Pages List */}
        <ConsultingList
          pages={filteredPages}
          onEdit={handleEditPage}
          onDelete={handleDeletePage}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
          loading={loading}
        />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingPage ? 'Edit Consulting Page' : 'Add New Consulting Page'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingPage(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ConsultingForm
                  data={editingPage}
                  onSave={handleSavePage}
                  onCancel={() => {
                    setIsModalOpen(false);
                    setEditingPage(null);
                  }}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          loading={deleteLoading}
          title="Delete Consulting Page"
          message="Are you sure you want to delete this consulting page? This action cannot be undone."
        />

      </div>
    </div>
  );
};

export default ConsultingManagement;