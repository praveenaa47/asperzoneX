"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarList from "./components/CarList";
import CarModal from "./components/CarModel";
import { addCar, deleteCar, getAllCars, updateCar } from "@/redux/slices/carSlice";
import { getMaincategory } from "@/redux/slices/MainCategorySlice";
const CarManagement = () => {
  const dispatch = useDispatch();
  const { carList, loading, error } = useSelector((state) => state.cars);
  
  const { data: categoryData } = useSelector((state) => state.category); // ✅ From API

  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    dispatch(getAllCars());
    dispatch(getMaincategory()); 
  }, [dispatch]);

  useEffect(() => {
  if (categoryData?.length > 0) {
    setCategories(categoryData);
  }
}, [categoryData]);

  const [brands, setBrands] = useState([
    'Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford',
    'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Volkswagen', 'Mazda'
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    brandFilter: 'all',
    categoryFilter: 'all',
    fuelTypeFilter: 'all',
    transmissionFilter: 'all'
  });

 

  // Filter cars based on search and filters
  const filteredCars = carList.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || car.isActive === (filters.statusFilter === 'active');
    const matchesBrand = filters.brandFilter === 'all' || car.brand === filters.brandFilter;
    const matchesCategory = filters.categoryFilter === 'all' || car.category._id === filters.categoryFilter;
    const matchesFuelType = filters.fuelTypeFilter === 'all' || car.fuelType === filters.fuelTypeFilter;
    const matchesTransmission = filters.transmissionFilter === 'all' || car.transmission === filters.transmissionFilter;
    
    return matchesSearch && matchesStatus && matchesBrand && matchesCategory && matchesFuelType && matchesTransmission;
  });

  const handleAddCar = () => {
    setEditingCar(null);
    setIsModalOpen(true);
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setIsModalOpen(true);
  };

  const handleSaveCar = async (carData) => {
  try {
    const formData = new FormData();
    
    // Append basic fields
    formData.append('title', carData.title);
    formData.append('description', carData.description);
    formData.append('category', carData.category);
    formData.append('brand', carData.brand);
    formData.append('model', carData.model);
    formData.append('year', carData.year.toString());
    formData.append('fuelType', carData.fuelType);
    formData.append('transmission', carData.transmission);
    formData.append('kmsDriven', carData.kmsDriven.toString());
    formData.append('color', carData.color);
    formData.append('seatingCapacity', carData.seatingCapacity.toString());
    formData.append('ownerType', carData.ownerType);
    
    // Append price object properly
    formData.append('price[amount]', carData.price.amount.toString());
    formData.append('price[unit]', carData.price.unit);
    formData.append('price[isNegotiable]', 'false'); // Add this if required
    
    // Append location object properly
    formData.append('location[city]', carData.location.city);
    formData.append('location[country]', carData.location.country);
    
    // Append features as array
    carData.features.forEach((feature, index) => {
      formData.append(`features[${index}]`, feature);
    });
    
    // Handle images - for new files, append the actual files
    carData.images.forEach((image, index) => {
      if (typeof image === 'string') {
        // If it's a URL (existing image), you might need to handle differently
        // For updates, you might want to keep existing images
        if (!editingCar || !editingCar.images.includes(image)) {
          formData.append('images', image);
        }
      } else {
        // If it's a File object (new upload)
        formData.append('images', image);
      }
    });

    // Add product type for cars
    formData.append('productType', 'Car');

    if (editingCar) {
      // Update existing car
      await dispatch(updateCar({ id: editingCar._id, formData })).unwrap();
    } else {
      // Add new car
      await dispatch(addCar(formData)).unwrap();
    }
    
    setIsModalOpen(false);
    setEditingCar(null);
  } catch (error) {
    console.error('Failed to save car:', error);
    alert('Failed to save car. Please try again.');
  }
};

  const handleDeleteCar = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await dispatch(deleteCar(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete car:', error);
        alert('Failed to delete car. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const car = carList.find(c => c._id === id);
      const formData = new FormData();
      formData.append('isActive', newStatus === 'active');
      
      await dispatch(updateCar({ id, formData })).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleFeaturedToggle = async (id) => {
    try {
      const car = carList.find(c => c._id === id);
      const formData = new FormData();
      formData.append('isFeatured', !car.isFeatured);
      
      await dispatch(updateCar({ id, formData })).unwrap();
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };

  const fuelTypes = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'cng', label: 'CNG' }
  ];

  const transmissionTypes = [
    { value: 'manual', label: 'Manual' },
    { value: 'automatic', label: 'Automatic' },
    { value: 'semi-automatic', label: 'Semi-Automatic' }
  ];

  const ownerTypes = [
    { value: 'first', label: 'First Owner' },
    { value: 'second', label: 'Second Owner' },
    { value: 'third', label: 'Third Owner' },
    { value: 'fourth', label: 'Fourth & Above' }
  ];

  const colors = [
    'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue',
    'Green', 'Yellow', 'Orange', 'Brown', 'Gold', 'Other'
  ];

  const featuresList = [
    'AC', 'Power Steering', 'Bluetooth', 'Navigation', 'Sunroof',
    'Leather Seats', 'Rear Camera', 'Parking Sensors', 'Alloy Wheels',
    'Fog Lights', 'Push Start', 'Keyless Entry', 'Cruise Control',
    'Premium Sound', 'Heated Seats', 'Ventilated Seats', 'Apple CarPlay',
    'Android Auto', 'LED Headlights', 'Panoramic Sunroof'
  ];

  const priceUnits = [
    { value: 'total', label: 'Total Price' },
    { value: 'monthly', label: 'Monthly Installment' }
  ];

  // Show loading state
  if (loading && carList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && carList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading cars: {error}</p>
          <button
            onClick={() => dispatch(getAllCars())}
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
          <h1 className="text-2xl font-bold text-gray-900">Car Management</h1>
          <p className="text-gray-600">Manage your car inventory and listings</p>
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
                    placeholder="Search cars..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

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

            {/* Additional Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filters.fuelTypeFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, fuelTypeFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Fuel Types</option>
                {fuelTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filters.transmissionFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, transmissionFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Transmissions</option>
                {transmissionTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              {/* Add Car Button */}
              <button
                onClick={handleAddCar}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Car
              </button>
            </div>
          </div>
        </div>

        {/* Car List */}
        <CarList
          cars={filteredCars}
          onEdit={handleEditCar}
          onDelete={handleDeleteCar}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
        />

        {/* Modal */}
        {isModalOpen && (
          <CarModal
            car={editingCar}
            categories={categories}
            brands={brands}
            fuelTypes={fuelTypes}
            transmissionTypes={transmissionTypes}
            ownerTypes={ownerTypes}
            colors={colors}
            featuresList={featuresList}
            priceUnits={priceUnits}
            onSave={handleSaveCar}
            onClose={() => {
              setIsModalOpen(false);
              setEditingCar(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CarManagement;