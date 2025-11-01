"use client";
import React, { useState } from 'react';
import ConsultingForm from './components/ConsultingForm';
import ConsultingList from './components/ConsultingPreview';

const ConsultingManagement = () => {
  const [consultingPages, setConsultingPages] = useState([
    {
      _id: '1',
      title: "Professional Consulting Services",
      subtitle: "Transform your business with our expert consulting",
      bannerImage: "https://res.cloudinary.com/demo/image/upload/v1735678123/consulting-banner.webp",
      status: 'active',
      featured: true,
      updatedAt: '2024-01-15'
    },
    {
      _id: '2',
      title: "Technology Consulting Solutions",
      subtitle: "Leverage cutting-edge technology for business transformation",
      bannerImage: "https://res.cloudinary.com/demo/image/upload/v1735678123/tech-banner.webp",
      status: 'active',
      featured: false,
      updatedAt: '2024-01-14'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all'
  });

  // Filter pages
  const filteredPages = consultingPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         page.subtitle.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || page.status === filters.statusFilter;
    
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

  const handleSavePage = (pageData) => {
    if (editingPage) {
      // Update existing page
      setConsultingPages(prev =>
        prev.map(page =>
          page._id === editingPage._id
            ? { 
                ...pageData,
                _id: editingPage._id,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : page
        )
      );
    } else {
      // Add new page
      const newPage = {
        ...pageData,
        _id: Math.random().toString(36).substr(2, 9),
        status: 'active',
        featured: false,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setConsultingPages(prev => [...prev, newPage]);
    }
    setIsModalOpen(false);
    setEditingPage(null);
  };

  const handleDeletePage = (id) => {
    if (window.confirm('Are you sure you want to delete this consulting page?')) {
      setConsultingPages(prev => prev.filter(page => page._id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setConsultingPages(prev =>
      prev.map(page =>
        page._id === id ? { 
          ...page, 
          status: newStatus,
          updatedAt: new Date().toISOString().split('T')[0]
        } : page
      )
    );
  };

  const handleFeaturedToggle = (id) => {
    setConsultingPages(prev =>
      prev.map(page =>
        page._id === id ? { 
          ...page, 
          featured: !page.featured,
          updatedAt: new Date().toISOString().split('T')[0]
        } : page
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Consulting Pages Management</h1>
          <p className="text-gray-600">Manage your consulting service pages and content</p>
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
                    placeholder="Search consulting pages..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Page
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
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultingManagement;