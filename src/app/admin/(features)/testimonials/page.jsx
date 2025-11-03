"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TestimonialList from './components/TestimonialList';
import TestimonialForm from './components/TestimonialForm';
import { addTestimonial, deleteTestimonial, getAllTestimonials, updateTestimonial } from '@/redux/slices/TestimonialSlice';
import { getMaincategory } from '@/redux/slices/MainCategorySlice';

const TestimonialManagement = () => {
  const dispatch = useDispatch();
  const { testimonialList, loading, error } = useSelector((state) => state.testimonials);
  const { data: categories } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    categoryFilter: 'all',
    statusFilter: 'all'
  });

  useEffect(() => {
    dispatch(getAllTestimonials());
    dispatch(getMaincategory());
  }, [dispatch]);

  // Filter testimonials
  const filteredTestimonials = testimonialList.filter(testimonial => {
    const categoryId = typeof testimonial.category === 'object' 
      ? testimonial.category?._id 
      : testimonial.category;
    
    const matchesSearch = testimonial.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         testimonial.message?.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesCategory = filters.categoryFilter === 'all' || categoryId === filters.categoryFilter;
    const matchesStatus = filters.statusFilter === 'all' || (testimonial.isActive ? 'active' : 'inactive') === filters.statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleSaveTestimonial = async (testimonialData) => {
    try {
      const formData = new FormData();
      
      // Append all fields to FormData
      formData.append('name', testimonialData.name);
      formData.append('message', testimonialData.message);
      formData.append('category', testimonialData.category);
      formData.append('isActive', testimonialData.isActive.toString());

      // Append image file if it's a new file upload
      if (testimonialData.profileImage instanceof File) {
        formData.append('profileImage', testimonialData.profileImage);
      } else if (typeof testimonialData.profileImage === 'string' && testimonialData.profileImage) {
        formData.append('image', testimonialData.profileImage);
      }

      if (editingTestimonial) {
        await dispatch(updateTestimonial({
          id: editingTestimonial._id,
          formData
        })).unwrap();
      } else {
        await dispatch(addTestimonial(formData)).unwrap();
      }
      
      setIsModalOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Failed to save testimonial:', error);
      alert('Failed to save testimonial. Please try again.');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await dispatch(deleteTestimonial(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete testimonial:', error);
        alert('Failed to delete testimonial. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isActive', newStatus.toString());
      
      await dispatch(updateTestimonial({
        id,
        formData
      })).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  // Format categories for dropdown
  const formattedCategories = categories?.map(cat => ({
    value: cat._id,
    label: cat.name
  })) || [];

  if (loading && testimonialList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
          <p className="text-gray-600">Manage customer testimonials and reviews</p>
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
                    placeholder="Search testimonials..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <select
                value={filters.categoryFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, categoryFilter: e.target.value }))}
                className="px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {formattedCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

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

            {/* Add Testimonial Button */}
            <button
              onClick={handleAddTestimonial}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {loading ? 'Loading...' : 'Add New Testimonial'}
            </button>
          </div>
        </div>

        {/* Testimonials List */}
        <TestimonialList
          testimonials={filteredTestimonials}
          onEdit={handleEditTestimonial}
          onDelete={handleDeleteTestimonial}
          onStatusChange={handleStatusChange}
          categories={formattedCategories}
          loading={loading}
        />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingTestimonial(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <TestimonialForm
                  data={editingTestimonial}
                  onSave={handleSaveTestimonial}
                  onCancel={() => {
                    setIsModalOpen(false);
                    setEditingTestimonial(null);
                  }}
                  categories={formattedCategories}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialManagement;