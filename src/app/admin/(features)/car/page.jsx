"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarList from "./components/CarList";
import CarModal from "./components/CarModel";
import { addCar, deleteCar, getAllCars, getCarById, updateCar } from "@/redux/slices/carSlice";
import { getMaincategory } from "@/redux/slices/MainCategorySlice";
import DeleteConfirmationModal from "../../components/DeleteModal";
import { useToast } from "../../components/Toast";
import { useRouter } from "next/navigation";
import SingleCarModal from "./components/SingleCarModal";

const CarManagement = () => {
  const dispatch = useDispatch();
  const { carList, loading, error, selectedCar } = useSelector((state) => state.cars);

  const { data: categoryData } = useSelector((state) => state.category);

  const [categories, setCategories] = useState([]);
  const { addToast } = useToast();
  const router = useRouter();
  const [isSingleViewModalOpen, setIsSingleViewModalOpen] = useState(false); // Add this state
  const [singleViewLoading, setSingleViewLoading] = useState(false);

  const handleNavigate = () => {
    router.push("/admin/car-approval");
  };

  const handleViewCar = async (carId) => {
    try {
      setSingleViewLoading(true);
      await dispatch(getCarById(carId)).unwrap();
      setIsSingleViewModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch car details:', error);
      addToast("error", "Failed to load car details ❌");
    } finally {
      setSingleViewLoading(false);
    }
  };

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
    'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Volkswagen', 'Mazda' , 'Maruti Suzuki', 'Tata', 'Mahindra'
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    brandFilter: 'all',
    categoryFilter: 'all',
    fuelTypeFilter: 'all',
    transmissionFilter: 'all',
    conditionFilter: 'all',
    bodyTypeFilter: 'all'
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


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
    const matchesCondition = filters.conditionFilter === 'all' || car.condition === filters.conditionFilter;
    const matchesBodyType = filters.bodyTypeFilter === 'all' || car.bodyType === filters.bodyTypeFilter;

    return matchesSearch && matchesStatus && matchesBrand && matchesCategory &&
      matchesFuelType && matchesTransmission && matchesCondition && matchesBodyType;
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

      // New fields
      formData.append('condition', carData.condition);
      formData.append('bodyType', carData.bodyType);
      formData.append('mileage', carData.mileage.toString());
      formData.append('engineCapacity', carData.engineCapacity);
      formData.append('power', carData.power);
      formData.append('registrationYear', carData.registrationYear);
      formData.append('registrationNumber', carData.registrationNumber);
      formData.append('insuranceValidUntil', carData.insuranceValidUntil);
      formData.append('insuranceType', carData.insuranceType);
      formData.append('spareKeyAvailable', carData.spareKeyAvailable.toString());

      // ✅ FIX: Append price object properly according to backend schema
      formData.append('price[basePrice]', carData.price.amount.toString());
      formData.append('price[totalPrice]', carData.price.amount.toString()); // Use same as basePrice for now
      formData.append('price[rcTransferPrice]', carData.price.rcTransferPrice?.toString() || '0');
      formData.append('price[carServicingCharges]', carData.price.carServicingCharges?.toString() || '0');
      formData.append('price[currency]', 'INR');
      formData.append('price[isNegotiable]', carData.price.isNegotiable.toString());

      // Append location object properly
      formData.append('location[city]', carData.location.city);
      formData.append('location[country]', carData.location.country);
      formData.append('location[state]', carData.location.state);
      formData.append('location[address]', carData.location.address);

      // Append features as array
      carData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      // Append additional features as array
      carData.additionalFeatures?.forEach((feature, index) => {
        formData.append(`additionalFeatures[${index}]`, feature);
      });

      // Append tags as array
      carData.tags?.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });

      carData.images.forEach((image) => {
        if (image instanceof File) {
          formData.append('media', image);
        }
      });


      formData.append('passengerCapacity', carData.seatingCapacity.toString());

      if (editingCar) {
        await dispatch(updateCar({ id: editingCar._id, formData })).unwrap();
        addToast("success", "Car updated successfully ✅");
      } else {
        await dispatch(addCar(formData)).unwrap();
        addToast("success", "Car added successfully ✅");
      }

      setIsModalOpen(false);
      setEditingCar(null);
    } catch (error) {
      console.error('Failed to save car:', error);
      addToast("error", "Failed to save car ❌");
    }
  };

  const handleDeleteCar = (id) => {
    setCarToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;

    try {
      setDeleteLoading(true);
      await dispatch(deleteCar(carToDelete)).unwrap();
      setIsDeleteModalOpen(false);
      setCarToDelete(null);
      addToast("success", "Car deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed:", error);
      addToast("error", "Failed to delete car ❌");
    } finally {
      setDeleteLoading(false);
    }
  };


  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isActive', newStatus === 'active');

      await dispatch(updateCar({ id, formData })).unwrap();
      addToast("success", "Car status updated successfully ✅");
    } catch (error) {
      console.error('Failed to update status:', error);
      addToast("error", "Failed to update car status ❌");
    }
  };

  const handleFeaturedToggle = async (id) => {
    try {
      const car = carList.find(c => c._id === id);
      const formData = new FormData();
      formData.append('isFeatured', !car.isFeatured);

      await dispatch(updateCar({ id, formData })).unwrap();
      addToast("success", "Car featured status updated successfully ✅");
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      addToast("error", "Failed to update car featured status ❌");
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

  const conditions = [
    { value: 'new', label: 'New' },
    { value: 'used', label: 'Used' },
    { value: 'certified-pre-owned', label: 'Certified Pre-Owned' }
  ];

  const bodyTypes = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'convertible', label: 'Convertible' },
    { value: 'wagon', label: 'Wagon' },
    { value: 'minivan', label: 'Minivan' },
    { value: 'pickup', label: 'Pickup Truck' }
  ];

  const insuranceTypes = [
    { value: 'comprehensive', label: 'Comprehensive' },
    { value: 'third-party', label: 'Third Party' },
    { value: 'zero-dep', label: 'Zero Depreciation' }
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
    'Android Auto', 'LED Headlights', 'Panoramic Sunroof', 'ABS', 'Airbags',
    'Touchscreen Infotainment', 'Wireless Charging', 'Ambient Lighting'
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Car Management</h1>
            <p className="text-gray-600">Manage your car inventory and listings</p>
          </div>

          {/* View Approvals Button */}
          <button
            onClick={handleNavigate}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap"
          >
            View Approvals
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
                    placeholder="Search cars..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

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

            {/* Additional Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filters.conditionFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, conditionFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Conditions</option>
                {conditions.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filters.bodyTypeFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, bodyTypeFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Body Types</option>
                {bodyTypes.map(type => (
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
          onView={handleViewCar}
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
            conditions={conditions}
            bodyTypes={bodyTypes}
            insuranceTypes={insuranceTypes}
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

        <SingleCarModal
          car={selectedCar}
          isOpen={isSingleViewModalOpen}
          onClose={() => setIsSingleViewModalOpen(false)}
          loading={singleViewLoading}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setCarToDelete(null);
          }}
          onConfirm={confirmDelete}
          loading={deleteLoading}
          title="Delete Car"
          message="Are you sure you want to delete this car? This action cannot be undone."
        />

      </div>
    </div>
  );
};

export default CarManagement;