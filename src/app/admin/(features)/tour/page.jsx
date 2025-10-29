"use client";
import { useState } from "react";
import TourList from "./components/TourList";
import TourModal from "./components/TourModal";

const TourManagement = () => {
  const [tours, setTours] = useState([
    {
      _id: '1',
      title: "Bali Adventure Tour",
      type: "group",
      destination: "Bali, Indonesia",
      duration: { nights: 6, days: 7 },
      numberOfPersons: 10,
      about: "Amazing tour package exploring the beautiful island of Bali. Experience stunning beaches, ancient temples, and vibrant culture in this 7-day adventure.",
      keyHighlights: [
        { icon: "🏝", title: "Beautiful Beaches" },
        { icon: "🕌", title: "Cultural Temples" },
        { icon: "🌋", title: "Volcano Trekking" },
        { icon: "🛍", title: "Local Markets" }
      ],
      itinerary: [
        {
          day: "Day 1",
          title: "Arrival in Bali",
          activities: "Airport pickup, Hotel check-in, Welcome dinner"
        },
        {
          day: "Day 2",
          title: "Beach Exploration",
          activities: "Kuta Beach, Surfing lessons, Sunset viewing"
        },
        {
          day: "Day 3",
          title: "Cultural Tour",
          activities: "Besakih Temple, Traditional dance performance"
        }
      ],
      includedHighlights: [
        "Accommodation",
        "Meals",
        "Transport",
        "Tour Guide",
        "Entrance Fees"
      ],
      importantInfoAndPolicies: [
        {
          question: "Cancellation Policy",
          answer: "Free cancellation 7 days before tour start date"
        },
        {
          question: "Visa Requirements",
          answer: "Visa on arrival available for most nationalities"
        }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400',
        'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400'
      ],
      status: 'active',
      createdAt: '2024-01-15',
      featured: true,
      price: { amount: 1200, unit: 'per-person' }
    },
    {
      _id: '2',
      title: "Thailand Cultural Journey",
      type: "private",
      destination: "Bangkok, Thailand",
      duration: { nights: 5, days: 6 },
      numberOfPersons: 4,
      about: "Discover the rich cultural heritage of Thailand with this exclusive private tour.",
      keyHighlights: [
        { icon: "🏯", title: "Grand Palace" },
        { icon: "🚢", title: "Floating Markets" },
        { icon: "🍜", title: "Street Food Tour" }
      ],
      itinerary: [
        {
          day: "Day 1",
          title: "Bangkok Arrival",
          activities: "Airport transfer, Hotel check-in, Orientation tour"
        }
      ],
      includedHighlights: [
        "Accommodation",
        "Breakfast",
        "Private Transport",
        "English Guide"
      ],
      importantInfoAndPolicies: [
        {
          question: "Payment Policy",
          answer: "50% advance payment required"
        }
      ],
      gallery: [
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400'
      ],
      status: 'active',
      createdAt: '2024-01-14',
      featured: false,
      price: { amount: 1800, unit: 'per-person' }
    },
    {
      _id: '3',
      title: "European Highlights",
      type: "group",
      destination: "Paris, Rome, Barcelona",
      duration: { nights: 10, days: 11 },
      numberOfPersons: 20,
      about: "Explore the best of Europe with this comprehensive multi-city tour package.",
      keyHighlights: [
        { icon: "🗼", title: "Eiffel Tower" },
        { icon: "🏛", title: "Colosseum" },
        { icon: "🏰", title: "Sagrada Familia" }
      ],
      itinerary: [
        {
          day: "Day 1",
          title: "Paris Arrival",
          activities: "Airport pickup, City orientation, Seine River cruise"
        }
      ],
      includedHighlights: [
        "Hotels",
        "Daily Breakfast",
        "Inter-city Transport",
        "Sightseeing"
      ],
      importantInfoAndPolicies: [
        {
          question: "Health Requirements",
          answer: "COVID-19 vaccination certificate required"
        }
      ],
      gallery: [],
      status: 'inactive',
      createdAt: '2024-01-10',
      featured: true,
      price: { amount: 3500, unit: 'per-person' }
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    typeFilter: 'all',
    destinationFilter: 'all'
  });

  // Available icons for key highlights
  const availableIcons = [
    "🏝", "🕌", "🌋", "🛍", "🏯", "🚢", "🍜", "🗼", "🏛", "🏰",
    "🌄", "🏞", "🚶", "🍽", "🛌", "🚗", "✈️", "🛳", "🚂", "🏊",
    "🤿", "🚴", "🎭", "🛒", "💃", "🎵", "🎨", "📸", "❤️", "⭐"
  ];

  // Filter tours based on search and filters
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         tour.destination.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || tour.status === filters.statusFilter;
    const matchesType = filters.typeFilter === 'all' || tour.type === filters.typeFilter;
    const matchesDestination = filters.destinationFilter === 'all' || 
                              tour.destination.includes(filters.destinationFilter);
    
    return matchesSearch && matchesStatus && matchesType && matchesDestination;
  });

  // Get unique destinations for filter
  const uniqueDestinations = [...new Set(tours.map(tour => tour.destination))];

  const handleAddTour = () => {
    setEditingTour(null);
    setIsModalOpen(true);
  };

  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  const handleSaveTour = (tourData) => {
    if (editingTour) {
      // Update existing tour
      setTours(prev =>
        prev.map(tour =>
          tour._id === editingTour._id
            ? { ...tour, ...tourData }
            : tour
        )
      );
    } else {
      // Add new tour
      const newTour = {
        ...tourData,
        _id: Math.random().toString(36).substr(2, 9),
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        featured: false
      };
      setTours(prev => [...prev, newTour]);
    }
    setIsModalOpen(false);
    setEditingTour(null);
  };

  const handleDeleteTour = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      setTours(prev => prev.filter(tour => tour._id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setTours(prev =>
      prev.map(tour =>
        tour._id === id ? { ...tour, status: newStatus } : tour
      )
    );
  };

  const handleFeaturedToggle = (id) => {
    setTours(prev =>
      prev.map(tour =>
        tour._id === id ? { ...tour, featured: !tour.featured } : tour
      )
    );
  };

  const tourTypes = [
    { value: 'group', label: 'Group Tour' },
    { value: 'private', label: 'Private Tour' },
    { value: 'custom', label: 'Custom Tour' }
  ];

  const priceUnits = [
    { value: 'per-person', label: 'Per Person' },
    { value: 'total', label: 'Total Package' }
  ];

  const includedOptions = [
    "Accommodation", "Meals", "Transport", "Tour Guide", "Entrance Fees",
    "Airport Transfer", "Insurance", "Activities", "Equipment", "Local Taxes"
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tour Package Management</h1>
          <p className="text-gray-600">Manage your tour packages and itineraries</p>
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
                    placeholder="Search tours..."
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
                value={filters.typeFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, typeFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {tourTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filters.destinationFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, destinationFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Tour
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
        />

        {/* Modal */}
        {isModalOpen && (
          <TourModal
            tour={editingTour}
            tourTypes={tourTypes}
            priceUnits={priceUnits}
            includedOptions={includedOptions}
            availableIcons={availableIcons}
            onSave={handleSaveTour}
            onClose={() => {
              setIsModalOpen(false);
              setEditingTour(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TourManagement;