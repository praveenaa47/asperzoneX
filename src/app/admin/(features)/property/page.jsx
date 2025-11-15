"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyList from './components/PropertyList';
import PropertyModal from './components/PropertyModel';
import { getMaincategory } from "@/redux/slices/MainCategorySlice";
import { addEstateproperty, deleteEstateproperty, getEstateproperty, getUserEstateproperty, updateEstateproperty } from '@/redux/slices/realestateProprtySlice';
import DeleteConfirmationModal from '../../components/DeleteModal';
import { useToast } from '../../components/Toast';
import PropertyViewModal from './components/PropertyViewModal';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';

const PropertyManagement = () => {
  const dispatch = useDispatch();
  const { data: properties, loading, error } = useSelector((state) => state.property);
  const { data: categoryData } = useSelector((state) => state.category);
  const { data: pendingApprovals } = useSelector((state) => state.property);
const pendingCount = pendingApprovals?.length || 0;

  const [viewPropertyId, setViewPropertyId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const router = useRouter();



  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    propertyTypeFilter: 'all',
    categoryFilter: 'all'
  });
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { addToast } = useToast();

  const handleNavigate = () => {
    router.push("/admin/property-approval");
  };

  // Load properties and categories on component mount
  useEffect(() => {
    dispatch(getEstateproperty());
    dispatch(getMaincategory());
     dispatch(getUserEstateproperty());
  }, [dispatch]);

  useEffect(() => {
    if (categoryData?.length > 0) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const handleViewProperty = (id) => {
    setViewPropertyId(id);
    setIsViewModalOpen(true);
  };

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.propertyName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(filters.searchTerm.toLowerCase());

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
      formData.append('propertyName', propertyData.propertyName);
      formData.append('description', propertyData.description);
      formData.append('propertyType', propertyData.propertyType);
      formData.append('bedType', propertyData.bedType);
      formData.append('bedrooms', propertyData.bedrooms.toString());
      formData.append('bathrooms', propertyData.bathrooms.toString());
      formData.append('yearBuilt', propertyData.yearBuilt.toString());
      formData.append('lotSize', propertyData.lotSize);
      formData.append('furnished', propertyData.furnished);
      formData.append('email', propertyData.email);
      formData.append('phone', propertyData.phone);
      formData.append('ownershipType', propertyData.ownershipType);

      // Append location object
      formData.append('location[country]', propertyData.location.country);
      formData.append('location[state]', propertyData.location.state);
      formData.append('location[district]', propertyData.location.district);
      formData.append('location[city]', propertyData.location.city);

      // Append price object
      formData.append('price[amount]', propertyData.price.amount.toString());
      formData.append('price[period]', propertyData.price.period);
      formData.append('price[negotiable]', propertyData.price.negotiable.toString());

      // Append amenities as array
      propertyData.amenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });

      // Handle images - append new files
      propertyData.images.forEach((image, index) => {
        if (typeof image !== 'string') {
          formData.append('images', image);
        }
      });

      if (editingProperty) {
        // Update existing property
        await dispatch(updateEstateproperty({
          id: editingProperty._id,
          formData
        })).unwrap();
        addToast("success", "Property updated successfully ✅");
      } else {
        // Add new property
        await dispatch(addEstateproperty(formData)).unwrap();
        addToast("success", "Property added successfully ✅");
      }

      setIsModalOpen(false);
      setEditingProperty(null);
    } catch (error) {
      console.error('Failed to save property:', error);
      addToast("error", "Failed to save property ❌");
    }
  };

  const handleDeleteProperty = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteEstateproperty(deleteId)).unwrap();
      setIsDeleteOpen(false);
      setDeleteId(null);
      setDeleteLoading(false);
      addToast("success", "Property deleted successfully ✅");
    } catch (error) {
      console.error("Failed to delete property:", error);
      addToast("error", "Failed to delete property ❌");
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isActive', newStatus === 'active');

      await dispatch(updateEstateproperty({ id, formData })).unwrap();
      addToast("success", "Property status updated successfully ✅");
    } catch (error) {
      console.error('Failed to update status:', error);
      addToast("error", "Failed to update property status ❌");
    }
  };

  const handleFeaturedToggle = async (id) => {
    try {
      const property = properties.find(p => p._id === id);
      const formData = new FormData();
      formData.append('isFeatured', !property.isFeatured);

      await dispatch(updateEstateproperty({ id, formData })).unwrap();
      addToast("success", "Property featured status updated successfully ✅");
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      addToast("error", "Failed to update property featured status ❌");
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
    { value: 'furnished', label: 'Fully Furnished' }
  ];

  const pricePeriods = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'total', label: 'Total Price' }
  ];

  const bedTypes = [
    { value: 'single', label: 'Single' },
    { value: 'double', label: 'Double' },
    { value: 'king', label: 'King' },
    { value: 'queen', label: 'Queen' }
  ];

  const ownershipTypes = [
    { value: 'Owner', label: 'Owner' },
    { value: 'Dealer', label: 'Dealer' },

  ];

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Concierge',
    'Garden', 'Playground', 'Clubhouse', 'Elevator', 'Pet Friendly'
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
            <p className="text-gray-600">Manage your property listings and inventory</p>
          </div>

          <button
            onClick={handleNavigate}
            className="relative px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 flex items-center gap-2 transition"
          >
            {/* Icon */}
            <Bell className="w-5 h-5" />

            View Approvals

            {/* Badge */}
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full px-1">
  {pendingCount}
</span>

          </button>

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
                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={filters.propertyTypeFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyTypeFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filters.categoryFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, categoryFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          onView={handleViewProperty}
        />

        {/* Modal */}
        {isModalOpen && (
          <PropertyModal
            property={editingProperty}
            categories={categories}
            propertyTypes={propertyTypes}
            furnishedTypes={furnishedTypes}
            pricePeriods={pricePeriods}
            bedTypes={bedTypes}
            ownershipTypes={ownershipTypes}
            amenitiesList={amenitiesList}
            onSave={handleSaveProperty}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProperty(null);
            }}
          />
        )}
        {isViewModalOpen && (
          <PropertyViewModal
            propertyId={viewPropertyId}
            isOpen={isViewModalOpen}
            onClose={() => {
              setIsViewModalOpen(false);
              setViewPropertyId(null);
            }}
            onEdit={(property) => {
              setIsViewModalOpen(false);
              handleEditProperty(property);
            }}
          />
        )}
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          loading={deleteLoading}
          title="Delete Property"
          message="Are you sure you want to delete this property? This action cannot be undone."
        />

      </div>
    </div>
  );
};

export default PropertyManagement;