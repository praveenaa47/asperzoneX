"use client";
import React, { useState } from 'react';
import TestimonialList from './components/TestimonialList';
import TestimonialForm from './components/TestimonialForm';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([
    {
      _id: '1',
      name: "John Doe",
      message: "Excellent service! The consulting helped us transform our business operations completely.",
      profileImage: "https://res.cloudinary.com/demo/image/upload/v1735678123/profile1.jpg",
      category: "business",
      status: 'active',
      rating: 5,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      _id: '2',
      name: "Sarah Wilson",
      message: "Outstanding support and guidance throughout our digital transformation journey.",
      profileImage: "https://res.cloudinary.com/demo/image/upload/v1735678123/profile2.jpg",
      category: "technology",
      status: 'active',
      rating: 4,
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      _id: '3',
      name: "Mike Johnson",
      message: "Professional team with deep industry knowledge. Highly recommended!",
      profileImage: "https://res.cloudinary.com/demo/image/upload/v1735678123/profile3.jpg",
      category: "finance",
      status: 'inactive',
      rating: 5,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    categoryFilter: 'all',
    statusFilter: 'all'
  });

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         testimonial.message.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesCategory = filters.categoryFilter === 'all' || testimonial.category === filters.categoryFilter;
    const matchesStatus = filters.statusFilter === 'all' || testimonial.status === filters.statusFilter;
    
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

  const handleSaveTestimonial = (testimonialData) => {
    if (editingTestimonial) {
      // Update existing testimonial
      setTestimonials(prev =>
        prev.map(testimonial =>
          testimonial._id === editingTestimonial._id
            ? { 
                ...testimonialData,
                _id: editingTestimonial._id,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : testimonial
        )
      );
    } else {
      // Add new testimonial
      const newTestimonial = {
        ...testimonialData,
        _id: Math.random().toString(36).substr(2, 9),
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setTestimonials(prev => [...prev, newTestimonial]);
    }
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(testimonial => testimonial._id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setTestimonials(prev =>
      prev.map(testimonial =>
        testimonial._id === id ? { 
          ...testimonial, 
          status: newStatus,
          updatedAt: new Date().toISOString().split('T')[0]
        } : testimonial
      )
    );
  };

  const categories = [
    { value: 'business', label: 'Business Consulting' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
          <p className="text-gray-600">Manage customer testimonials and reviews</p>
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
                    placeholder="Search testimonials..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filters.statusFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Add Testimonial Button */}
            <button
              onClick={handleAddTestimonial}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Testimonial
            </button>
          </div>
        </div>

        {/* Testimonials List */}
        <TestimonialList
          testimonials={filteredTestimonials}
          onEdit={handleEditTestimonial}
          onDelete={handleDeleteTestimonial}
          onStatusChange={handleStatusChange}
          categories={categories}
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
                  categories={categories}
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