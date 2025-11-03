"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyList from './components/PropertyList';
import PropertyModal from './components/PropertyModel';
import { getMaincategory } from "@/redux/slices/MainCategorySlice";
import { addEstateproperty, deleteEstateproperty, getEstateproperty, updateEstateproperty } from '@/redux/slices/realestateProprtySlice';

const PropertyManagement = () => {
  const dispatch = useDispatch();
  const { data: properties, loading, error } = useSelector((state) => state.property);
  const { data: categoryData } = useSelector((state) => state.category);
  
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    propertyTypeFilter: 'all',
    categoryFilter: 'all'
  });

  // Load properties and categories on component mount
  useEffect(() => {
    dispatch(getEstateproperty());
    dispatch(getMaincategory());
  }, [dispatch]);

  useEffect(() => {
    if (categoryData?.length > 0) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         property.location?.city?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         property.location?.address?.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || property.isActive === (filters.statusFilter === 'active');
    const matchesPropertyType = filters.propertyTypeFilter === 'all' || property.propertyType === filters.propertyTypeFilter;
    const matchesCategory = filters.categoryFilter === 'all' || property.category?._id === filters.categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPropertyType && matchesCategory;
  });

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleSaveProperty = async (propertyData) => {
    try {
      const formData = new FormData();
      
      // Append basic fields
      formData.append('title', propertyData.title);
      formData.append('description', propertyData.description);
      formData.append('category', propertyData.category);
      formData.append('propertyType', propertyData.propertyType);
      formData.append('bedrooms', propertyData.bedrooms.toString());
      formData.append('bathrooms', propertyData.bathrooms.toString());
      formData.append('furnished', propertyData.furnished);
      formData.append('productType', 'Property'); // Required field

      // Append area object
      formData.append('area[value]', propertyData.area.value.toString());
      formData.append('area[unit]', propertyData.area.unit);

      // Append price object
      formData.append('price[amount]', propertyData.price.amount.toString());
      formData.append('price[unit]', propertyData.price.unit);
      formData.append('price[isNegotiable]', 'false');

      // Append location object
      formData.append('location[city]', propertyData.location.city);
      formData.append('location[country]', propertyData.location.country);
      formData.append('location[address]', propertyData.location.address);

      // Append optional fields if they exist
      if (propertyData.floor) formData.append('floor', propertyData.floor.toString());
      if (propertyData.totalFloors) formData.append('totalFloors', propertyData.totalFloors.toString());
      if (propertyData.propertyAge) formData.append('propertyAge', propertyData.propertyAge.toString());
      if (propertyData.parking) formData.append('parking', propertyData.parking.toString());

      // Append amenities as array
      propertyData.amenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });

      // Append features as array
      propertyData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      // Handle images - append new files
      propertyData.images.forEach((image, index) => {
        if (typeof image !== 'string') { // Only append new files, not URLs
          formData.append('images', image);
        }
      });

      if (editingProperty) {
        // Update existing property
        await dispatch(updateEstateproperty({ 
          id: editingProperty._id, 
          formData 
        })).unwrap();
      } else {
        // Add new property
        await dispatch(addEstateproperty(formData)).unwrap();
      }
      
      setIsModalOpen(false);
      setEditingProperty(null);
    } catch (error) {
      console.error('Failed to save property:', error);
      alert('Failed to save property. Please try again.');
    }
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await dispatch(deleteEstateproperty(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete property:', error);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isActive', newStatus === 'active');
      
      await dispatch(updateEstateproperty({ id, formData })).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleFeaturedToggle = async (id) => {
    try {
      const property = properties.find(p => p._id === id);
      const formData = new FormData();
      formData.append('isFeatured', !property.isFeatured);
      
      await dispatch(updateEstateproperty({ id, formData })).unwrap();
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'studio', label: 'Studio' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'triplex', label: 'Triplex' }
  ];

  const furnishedTypes = [
    { value: 'unfurnished', label: 'Unfurnished' },
    { value: 'semi-furnished', label: 'Semi-Furnished' },
    { value: 'fully-furnished', label: 'Fully Furnished' }
  ];

  const priceUnits = [
    { value: 'total', label: 'Total Price' },
    { value: 'monthly', label: 'Monthly Rent' },
    { value: 'yearly', label: 'Yearly Rent' }
  ];

  const areaUnits = [
    { value: 'sqft', label: 'Square Feet' },
    { value: 'sqm', label: 'Square Meters' },
    { value: 'yards', label: 'Square Yards' }
  ];

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Concierge', 
    'Garden', 'Playground', 'Clubhouse', 'Elevator', 'Pet Friendly'
  ];

  const featuresList = [
    'AC', 'Heating', 'WiFi', 'Balcony', 'Laundry', 'Smart Home',
    'Sea View', 'City View', 'Fitted Kitchen', 'Walk-in Closet',
    'Hardwood Floors', 'Marble Floors', 'Central AC'
  ];

  // Show loading state
  if (loading && properties.length === 0) {
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
  if (error && properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading properties: {error}</p>
          <button
            onClick={() => dispatch(getEstateproperty())}
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
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600">Manage your property listings and inventory</p>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={filters.propertyTypeFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyTypeFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filters.categoryFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, categoryFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Add Property Button */}
            <button
              onClick={handleAddProperty}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Property
            </button>
          </div>
        </div>

        {/* Property List */}
        <PropertyList
          properties={filteredProperties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
        />

        {/* Modal */}
        {isModalOpen && (
          <PropertyModal
            property={editingProperty}
            categories={categories}
            propertyTypes={propertyTypes}
            furnishedTypes={furnishedTypes}
            priceUnits={priceUnits}
            areaUnits={areaUnits}
            amenitiesList={amenitiesList}
            featuresList={featuresList}
            onSave={handleSaveProperty}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProperty(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyManagement;