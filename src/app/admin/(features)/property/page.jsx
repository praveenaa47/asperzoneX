"use client";
import { useState } from 'react';
import PropertyList from './components/PropertyList';
import PropertyModal from './components/PropertyModel';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([
    {
      _id: '1',
      title: "Luxury 3BHK Apartment in Downtown",
      description: "Beautiful apartment with amazing views of the city skyline. Modern amenities and premium finishes throughout.",
      category: '68fb238f7d0b9330fa2a81e7',
      categoryName: 'Apartments',
      propertyType: 'apartment',
      area: { value: 1200, unit: 'sqft' },
      bedrooms: 3,
      bathrooms: 2,
      furnished: 'semi-furnished',
      price: { amount: 500000, unit: 'total' },
      location: {
        city: 'Dubai',
        country: 'UAE',
        address: 'Downtown Dubai'
      },
      floor: 15,
      totalFloors: 25,
      propertyAge: 2,
      parking: 2,
      amenities: ['Swimming Pool', 'Gym', 'Parking', 'Security'],
      features: ['AC', 'Heating', 'WiFi', 'Balcony', 'Laundry'],
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400'
      ],
      status: 'active',
      createdAt: '2024-01-15',
      featured: true
    },
    {
      _id: '2',
      title: "Modern Studio in Business Bay",
      description: "Fully furnished studio apartment in the heart of Business Bay with access to all modern facilities.",
      category: '68fb238f7d0b9330fa2a81e8',
      categoryName: 'Studios',
      propertyType: 'studio',
      area: { value: 600, unit: 'sqft' },
      bedrooms: 1,
      bathrooms: 1,
      furnished: 'fully-furnished',
      price: { amount: 250000, unit: 'total' },
      location: {
        city: 'Dubai',
        country: 'UAE',
        address: 'Business Bay'
      },
      floor: 12,
      totalFloors: 30,
      propertyAge: 1,
      parking: 1,
      amenities: ['Gym', 'Security', 'Concierge'],
      features: ['AC', 'WiFi', 'Smart Home', 'Balcony'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
      ],
      status: 'active',
      createdAt: '2024-01-14',
      featured: false
    },
    {
      _id: '3',
      title: "Villa in Palm Jumeirah",
      description: "Luxurious 4-bedroom villa with private beach access and stunning sea views.",
      category: '68fb238f7d0b9330fa2a81e9',
      categoryName: 'Villas',
      propertyType: 'villa',
      area: { value: 3500, unit: 'sqft' },
      bedrooms: 4,
      bathrooms: 4,
      furnished: 'unfurnished',
      price: { amount: 1200000, unit: 'total' },
      location: {
        city: 'Dubai',
        country: 'UAE',
        address: 'Palm Jumeirah'
      },
      floor: 1,
      totalFloors: 2,
      propertyAge: 3,
      parking: 3,
      amenities: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden'],
      features: ['AC', 'Heating', 'WiFi', 'Balcony', 'Laundry', 'Sea View'],
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400'
      ],
      status: 'inactive',
      createdAt: '2024-01-10',
      featured: true
    }
  ]);

  const [categories, setCategories] = useState([
    { _id: '68fb238f7d0b9330fa2a81e7', name: 'Apartments' },
    { _id: '68fb238f7d0b9330fa2a81e8', name: 'Studios' },
    { _id: '68fb238f7d0b9330fa2a81e9', name: 'Villas' },
    { _id: '68fb238f7d0b9330fa2a81ea', name: 'Townhouses' },
    { _id: '68fb238f7d0b9330fa2a81eb', name: 'Penthouses' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    propertyTypeFilter: 'all',
    categoryFilter: 'all'
  });

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         property.location.city.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         property.location.address.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || property.status === filters.statusFilter;
    const matchesPropertyType = filters.propertyTypeFilter === 'all' || property.propertyType === filters.propertyTypeFilter;
    const matchesCategory = filters.categoryFilter === 'all' || property.category === filters.categoryFilter;
    
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

  const handleSaveProperty = (propertyData) => {
    if (editingProperty) {
      // Update existing property
      setProperties(prev =>
        prev.map(prop =>
          prop._id === editingProperty._id
            ? { 
                ...prop, 
                ...propertyData,
                categoryName: categories.find(cat => cat._id === propertyData.category)?.name || 'Unknown'
              }
            : prop
        )
      );
    } else {
      // Add new property
      const newProperty = {
        ...propertyData,
        _id: Math.random().toString(36).substr(2, 9),
        categoryName: categories.find(cat => cat._id === propertyData.category)?.name || 'Unknown',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        featured: false
      };
      setProperties(prev => [...prev, newProperty]);
    }
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(property => property._id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setProperties(prev =>
      prev.map(property =>
        property._id === id ? { ...property, status: newStatus } : property
      )
    );
  };

  const handleFeaturedToggle = (id) => {
    setProperties(prev =>
      prev.map(property =>
        property._id === id ? { ...property, featured: !property.featured } : property
      )
    );
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