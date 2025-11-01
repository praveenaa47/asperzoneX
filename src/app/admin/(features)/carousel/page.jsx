"use client";
import React, { useState } from 'react';
import CarouselList from './components/CarouselList';
import CarouselForm from './components/CarouselForm';

const CarouselManagement = () => {
  const [carousels, setCarousels] = useState([
    {
      _id: '1',
      title: "Bali Adventure Tour",
      subtitle: "Experience the beauty of Bali",
      image: "https://res.cloudinary.com/demo/image/upload/v1735678123/bali1.jpg",
      category: "adventure",
      status: 'active',
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      _id: '2',
      title: "Paris Romantic Getaway",
      subtitle: "Romantic escape to the city of love",
      image: "https://res.cloudinary.com/demo/image/upload/v1735678123/paris1.jpg",
      category: "romantic",
      status: 'active',
      featured: false,
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14'
    },
    {
      _id: '3',
      title: "Mountain Trekking",
      subtitle: "Adventure in the Himalayas",
      image: "https://res.cloudinary.com/demo/image/upload/v1735678123/mountain1.jpg",
      category: "adventure",
      status: 'inactive',
      featured: false,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    categoryFilter: 'all',
    statusFilter: 'all'
  });

  // Filter carousels
  const filteredCarousels = carousels.filter(carousel => {
    const matchesSearch = carousel.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         carousel.subtitle.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesCategory = filters.categoryFilter === 'all' || carousel.category === filters.categoryFilter;
    const matchesStatus = filters.statusFilter === 'all' || carousel.status === filters.statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddCarousel = () => {
    setEditingCarousel(null);
    setIsModalOpen(true);
  };

  const handleEditCarousel = (carousel) => {
    setEditingCarousel(carousel);
    setIsModalOpen(true);
  };

  const handleSaveCarousel = (carouselData) => {
    if (editingCarousel) {
      // Update existing carousel
      setCarousels(prev =>
        prev.map(carousel =>
          carousel._id === editingCarousel._id
            ? { 
                ...carouselData,
                _id: editingCarousel._id,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : carousel
        )
      );
    } else {
      // Add new carousel
      const newCarousel = {
        ...carouselData,
        _id: Math.random().toString(36).substr(2, 9),
        status: 'active',
        featured: false,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setCarousels(prev => [...prev, newCarousel]);
    }
    setIsModalOpen(false);
    setEditingCarousel(null);
  };

  const handleDeleteCarousel = (id) => {
    if (window.confirm('Are you sure you want to delete this carousel item?')) {
      setCarousels(prev => prev.filter(carousel => carousel._id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setCarousels(prev =>
      prev.map(carousel =>
        carousel._id === id ? { 
          ...carousel, 
          status: newStatus,
          updatedAt: new Date().toISOString().split('T')[0]
        } : carousel
      )
    );
  };

  const handleFeaturedToggle = (id) => {
    setCarousels(prev =>
      prev.map(carousel =>
        carousel._id === id ? { 
          ...carousel, 
          featured: !carousel.featured,
          updatedAt: new Date().toISOString().split('T')[0]
        } : carousel
      )
    );
  };

  const categories = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'family', label: 'Family' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'beach', label: 'Beach' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Carousel Management</h1>
          <p className="text-gray-600">Manage carousel items and content</p>
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
                    placeholder="Search carousel items..."
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

            {/* Add Carousel Button */}
            <button
              onClick={handleAddCarousel}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Item
            </button>
          </div>
        </div>

        {/* Carousel List */}
        <CarouselList
          carousels={filteredCarousels}
          onEdit={handleEditCarousel}
          onDelete={handleDeleteCarousel}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
          categories={categories}
        />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingCarousel ? 'Edit Carousel Item' : 'Add New Carousel Item'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingCarousel(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <CarouselForm
                  data={editingCarousel}
                  onSave={handleSaveCarousel}
                  onCancel={() => {
                    setIsModalOpen(false);
                    setEditingCarousel(null);
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

export default CarouselManagement;