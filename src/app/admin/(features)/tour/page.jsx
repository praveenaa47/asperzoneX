"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourList from "./components/TourList";
import TourModal from "./components/TourModal";
import { addTourPackage, deleteTourPackage, getAllTourPackages, updateTourPackage } from "@/redux/slices/tourPackageSlice";

const TourManagement = () => {
  const dispatch = useDispatch();
  const { tourPackageList, loading, error } = useSelector((state) => state.tourPackages);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    typeFilter: 'all',
    destinationFilter: 'all'
  });

  useEffect(() => {
    dispatch(getAllTourPackages());
  }, [dispatch]);

  // Filter tours based on search and filters
  const filteredTours = tourPackageList.filter(tour => {
    const matchesSearch = tour.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      tour.destination?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesStatus = filters.statusFilter === 'all' || (tour.isActive ? 'active' : 'inactive') === filters.statusFilter;
    const matchesType = filters.typeFilter === 'all' || tour.type === filters.typeFilter;
    const matchesDestination = filters.destinationFilter === 'all' ||
      tour.destination?.includes(filters.destinationFilter);

    return matchesSearch && matchesStatus && matchesType && matchesDestination;
  });

  // Get unique destinations for filter
  const uniqueDestinations = [...new Set(tourPackageList.map(tour => tour.destination).filter(Boolean))];

  const handleAddTour = () => {
    setEditingTour(null);
    setIsModalOpen(true);
  };

  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  const handleSaveTour = async (tourData) => {
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('title', tourData.title);
      formData.append('subtitle', tourData.subtitle || '');
      formData.append('duration', tourData.duration);
      formData.append('about', tourData.about);
      formData.append('destination', tourData.destination || '');
      formData.append('numberOfPersons', tourData.numberOfPersons?.toString() || '');
      formData.append('isActive', tourData.isActive?.toString() || 'true');

      // Append banner image
      if (tourData.bannerImage instanceof File) {
        formData.append('bannerImage', tourData.bannerImage);
      } else if (typeof tourData.bannerImage === 'string' && tourData.bannerImage) {
        formData.append('bannerImage', tourData.bannerImage);
      }

      // ✅ FIXED: Use field names that match backend expectations
      // Append key highlights titles as JSON and icons as separate files
      if (tourData.keyHighlights?.length > 0) {
        formData.append('keyHighlights', JSON.stringify(tourData.keyHighlights));

        // Append key highlight icons with the field name backend expects
        tourData.keyHighlights.forEach((highlight, index) => {
          if (highlight.icon instanceof File) {
            formData.append('keyHighlightsIcons', highlight.icon);
          }
        });
      }

      // Append itinerary
      tourData.itinerary?.forEach((day, index) => {
        formData.append(`itinerary[${index}][day]`, day.day);
        formData.append(`itinerary[${index}][title]`, day.title);
        formData.append(`itinerary[${index}][activities]`, Array.isArray(day.activities) ? day.activities.join(',') : day.activities);
      });

      // Append included highlights
      tourData.includedHighlights?.forEach((item, index) => {
        formData.append(`includedHighlights[${index}]`, item);
      });

      // Append exclusions
      tourData.exclusions?.forEach((item, index) => {
        formData.append(`exclusions[${index}]`, item);
      });

      // Append policies
      tourData.importantInfoAndPolicies?.forEach((policy, index) => {
        formData.append(`importantInfoAndPolicies[${index}][question]`, policy.question);
        formData.append(`importantInfoAndPolicies[${index}][answer]`, policy.answer);
      });

      // ✅ FIXED: Use field name that matches backend
      tourData.gallery?.forEach((image) => {
        if (image instanceof File) {
          formData.append('gallery', image); // Changed from 'galleryImages' to 'gallery'
        }
      });

      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }

      if (editingTour) {
        await dispatch(updateTourPackage({
          id: editingTour._id,
          formData
        })).unwrap();
      } else {
        await dispatch(addTourPackage(formData)).unwrap();
      }

      setIsModalOpen(false);
      setEditingTour(null);
    } catch (error) {
      console.error('Failed to save tour:', error);
      alert('Failed to save tour. Please try again.');
    }
  };

  const handleDeleteTour = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await dispatch(deleteTourPackage(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete tour:', error);
        alert('Failed to delete tour. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isActive', newStatus.toString());

      await dispatch(updateTourPackage({
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
      const tour = tourPackageList.find(t => t._id === id);
      if (tour) {
        const formData = new FormData();
        formData.append('featured', (!tour.featured).toString());

        await dispatch(updateTourPackage({
          id,
          formData
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };


  const includedOptions = [
    "Accommodation", "Meals", "Transport", "Tour Guide", "Entrance Fees",
    "Airport Transfer", "Insurance", "Activities", "Equipment", "Local Taxes"
  ];

  const exclusionOptions = [
    "Airfare and visa fees", "Lunch unless specified", "Personal expenses (shopping, tips, etc.)",
    "Travel insurance", "Alcoholic beverages", "Optional activities", "Gratuities"
  ];

  if (loading && tourPackageList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tour Package Management</h1>
          <p className="text-gray-600">Manage your tour packages and itineraries</p>
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
                    placeholder="Search tours..."
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
                value={filters.destinationFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, destinationFilter: e.target.value }))}
                className="px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Destinations</option>
                {uniqueDestinations.map(destination => (
                  <option key={destination} value={destination}>{destination}</option>
                ))}
              </select>
            </div>

            {/* Add Tour Button */}
            <button
              onClick={handleAddTour}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {loading ? 'Loading...' : 'Add New Tour'}
            </button>
          </div>
        </div>

        {/* Tour List */}
        <TourList
          tours={filteredTours}
          onEdit={handleEditTour}
          onDelete={handleDeleteTour}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
          loading={loading}
        />

        {/* Modal */}
        {isModalOpen && (
          <TourModal
            tour={editingTour}
            includedOptions={includedOptions}
            exclusionOptions={exclusionOptions}
            onSave={handleSaveTour}
            onClose={() => {
              setIsModalOpen(false);
              setEditingTour(null);
            }}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default TourManagement;