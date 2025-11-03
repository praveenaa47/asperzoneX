"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarouselList from './components/CarouselList';
import CarouselForm from './components/CarouselForm';
import { addCarousel, deleteCarousel, getAllCarousels, updateCarousel } from '@/redux/slices/carouselSlice';
import { getMaincategory } from '@/redux/slices/MainCategorySlice';

const CarouselManagement = () => {
  const dispatch = useDispatch();
  const { carouselList, loading, error } = useSelector((state) => state.carousels);
  const { data: categories } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    categoryFilter: 'all',
    statusFilter: 'all'
  });

  useEffect(() => {
    dispatch(getAllCarousels());
    dispatch(getMaincategory());
  }, [dispatch]);

  // Filter carousels
  const filteredCarousels = carouselList.filter(carousel => {
    const categoryId = typeof carousel.category === 'object' 
      ? carousel.category?._id 
      : carousel.category;
    
    const matchesSearch = carousel.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         carousel.subtitle?.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesCategory = filters.categoryFilter === 'all' || categoryId === filters.categoryFilter;
    const matchesStatus = filters.statusFilter === 'all' || (carousel.isActive ? 'active' : 'inactive') === filters.statusFilter;
    
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

  const handleSaveCarousel = async (carouselData) => {
    try {
      const formData = new FormData();
      
      // Append all fields to FormData
      formData.append('title', carouselData.title);
      formData.append('subtitle', carouselData.subtitle);
      
      if (carouselData.category) {
        formData.append('category', carouselData.category);
      }
      
      if (carouselData.page) {
        formData.append('page', carouselData.page);
      }
      
      formData.append('isActive', carouselData.isActive.toString());

      // Append image file if it's a new file upload
      if (carouselData.image instanceof File) {
        formData.append('image', carouselData.image);
      } else if (typeof carouselData.image === 'string' && carouselData.image) {
        formData.append('image', carouselData.image);
      }

      if (editingCarousel) {
        await dispatch(updateCarousel({
          id: editingCarousel._id,
          formData
        })).unwrap();
      } else {
        await dispatch(addCarousel(formData)).unwrap();
      }
      
      setIsModalOpen(false);
      setEditingCarousel(null);
    } catch (error) {
      console.error('Failed to save carousel:', error);
      alert('Failed to save carousel. Please try again.');
    }
  };

  const handleDeleteCarousel = async (id) => {
    if (window.confirm('Are you sure you want to delete this carousel item?')) {
      try {
        await dispatch(deleteCarousel(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete carousel:', error);
        alert('Failed to delete carousel. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isActive', newStatus.toString());
      
      await dispatch(updateCarousel({
        id,
        formData
      })).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleFeaturedToggle = async (id) => {
    try {
      const carousel = carouselList.find(c => c._id === id);
      if (carousel) {
        const formData = new FormData();
        formData.append('featured', (!carousel.featured).toString());
        
        await dispatch(updateCarousel({
          id,
          formData
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };

  // Format categories for dropdown
  const formattedCategories = categories?.map(cat => ({
    value: cat._id,
    label: cat.name
  })) || [];

  // Page options
  const pageOptions = [
    { value: '', label: 'None' },
    { value: 'home', label: 'Home' },
    { value: 'about', label: 'About' },
    { value: 'contact', label: 'Contact' }
  ];

  if (loading && carouselList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading carousels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Carousel Management</h1>
          <p className="text-gray-600">Manage carousel items and content</p>
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
                    placeholder="Search carousel items..."
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
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {/* Add Carousel Button */}
            <button
              onClick={handleAddCarousel}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {loading ? 'Loading...' : 'Add New Item'}
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
          categories={formattedCategories}
          loading={loading}
        />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">

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
                  categories={formattedCategories}
                  pageOptions={pageOptions}
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

export default CarouselManagement;