"use client";
import { useState } from "react";
import CarList from "./components/CarList";
import CarModal from "./components/CarModel";


const CarManagement = () => {
  const [cars, setCars] = useState([
    {
      _id: '1',
      title: "Toyota Camry 2023",
      description: "Excellent condition, low mileage, full service history. Well-maintained with all original features.",
      category: '68f8bfb9eeb4aab8c06a94e6',
      categoryName: 'Sedan',
      brand: 'Toyota',
      model: 'Camry',
      year: 2023,
      fuelType: 'petrol',
      transmission: 'automatic',
      price: { amount: 25000, unit: 'total' },
      location: {
        city: 'Dubai',
        country: 'UAE'
      },
      kmsDriven: 15000,
      color: 'White',
      seatingCapacity: 5,
      ownerType: 'first',
      features: ['AC', 'Power Steering', 'Bluetooth', 'Navigation', 'Sunroof'],
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
        'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400'
      ],
      status: 'active',
      createdAt: '2024-01-15',
      featured: true
    },
    {
      _id: '2',
      title: "BMW X5 2022",
      description: "Luxury SUV with premium features. One owner, accident-free, complete service records available.",
      category: '68f8bfb9eeb4aab8c06a94e7',
      categoryName: 'SUV',
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      fuelType: 'diesel',
      transmission: 'automatic',
      price: { amount: 65000, unit: 'total' },
      location: {
        city: 'Abu Dhabi',
        country: 'UAE'
      },
      kmsDriven: 25000,
      color: 'Black',
      seatingCapacity: 7,
      ownerType: 'first',
      features: ['AC', 'Power Steering', 'Bluetooth', 'Leather Seats', 'Panoramic Sunroof'],
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'
      ],
      status: 'active',
      createdAt: '2024-01-14',
      featured: false
    },
    {
      _id: '3',
      title: "Honda Civic 2021",
      description: "Fuel efficient and reliable. Perfect condition with low maintenance costs.",
      category: '68f8bfb9eeb4aab8c06a94e6',
      categoryName: 'Sedan',
      brand: 'Honda',
      model: 'Civic',
      year: 2021,
      fuelType: 'petrol',
      transmission: 'manual',
      price: { amount: 18000, unit: 'total' },
      location: {
        city: 'Sharjah',
        country: 'UAE'
      },
      kmsDriven: 35000,
      color: 'Silver',
      seatingCapacity: 5,
      ownerType: 'second',
      features: ['AC', 'Power Steering', 'Bluetooth', 'Rear Camera'],
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      status: 'inactive',
      createdAt: '2024-01-10',
      featured: false
    },
    {
      _id: '4',
      title: "Mercedes-Benz C-Class 2023",
      description: "Premium luxury sedan with advanced technology and superior comfort features.",
      category: '68f8bfb9eeb4aab8c06a94e6',
      categoryName: 'Sedan',
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2023,
      fuelType: 'petrol',
      transmission: 'automatic',
      price: { amount: 55000, unit: 'total' },
      location: {
        city: 'Dubai',
        country: 'UAE'
      },
      kmsDriven: 8000,
      color: 'Gray',
      seatingCapacity: 5,
      ownerType: 'first',
      features: ['AC', 'Power Steering', 'Bluetooth', 'Leather Seats', 'Premium Sound'],
      images: [
        'https://images.unsplash.com/photo-1563720223485-2390c6c7e94c?w=400'
      ],
      status: 'active',
      createdAt: '2024-01-16',
      featured: true
    }
  ]);

  const [categories, setCategories] = useState([
    { _id: '68f8bfb9eeb4aab8c06a94e6', name: 'Sedan' },
    { _id: '68f8bfb9eeb4aab8c06a94e7', name: 'SUV' },
    { _id: '68f8bfb9eeb4aab8c06a94e8', name: 'Hatchback' },
    { _id: '68f8bfb9eeb4aab8c06a94e9', name: 'Coupe' },
    { _id: '68f8bfb9eeb4aab8c06a94ea', name: 'Convertible' },
    { _id: '68f8bfb9eeb4aab8c06a94eb', name: 'Pickup Truck' }
  ]);

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
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || car.status === filters.statusFilter;
    const matchesBrand = filters.brandFilter === 'all' || car.brand === filters.brandFilter;
    const matchesCategory = filters.categoryFilter === 'all' || car.category === filters.categoryFilter;
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

  const handleSaveCar = (carData) => {
    if (editingCar) {
      // Update existing car
      setCars(prev =>
        prev.map(car =>
          car._id === editingCar._id
            ? { 
                ...car, 
                ...carData,
                categoryName: categories.find(cat => cat._id === carData.category)?.name || 'Unknown'
              }
            : car
        )
      );
    } else {
      // Add new car
      const newCar = {
        ...carData,
        _id: Math.random().toString(36).substr(2, 9),
        categoryName: categories.find(cat => cat._id === carData.category)?.name || 'Unknown',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        featured: false
      };
      setCars(prev => [...prev, newCar]);
    }
    setIsModalOpen(false);
    setEditingCar(null);
  };

  const handleDeleteCar = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(prev => prev.filter(car => car._id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setCars(prev =>
      prev.map(car =>
        car._id === id ? { ...car, status: newStatus } : car
      )
    );
  };

  const handleFeaturedToggle = (id) => {
    setCars(prev =>
      prev.map(car =>
        car._id === id ? { ...car, featured: !car.featured } : car
      )
    );
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
                value={filters.brandFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, brandFilter: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
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