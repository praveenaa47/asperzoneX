import React, { useState, useEffect } from 'react';

const CarModal = ({
  car,
  categories,
  brands,
  fuelTypes,
  transmissionTypes,
  ownerTypes,
  conditions,
  bodyTypes,
  insuranceTypes,
  colors,
  featuresList,
  priceUnits,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    fuelType: '',
    transmission: '',
    condition: 'used',
    bodyType: '',
    mileage: '',
    engineCapacity: '',
    power: '',
    registrationYear: '',
    registrationNumber: '',
    insuranceValidUntil: '',
    insuranceType: 'comprehensive',
    spareKeyAvailable: false,
    price: {
      amount: '',
      unit: 'total',
      isNegotiable: false,
      rcTransferPrice: '',
      carServicingCharges: ''
    },
    location: {
      address: '',
      city: '',
      state: '',
      country: ''
    },
    kmsDriven: '',
    color: '',
    seatingCapacity: '',
    ownerType: '',
    features: [],
    additionalFeatures: [],
    tags: [],
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (car) {
      setFormData({
        title: car.title || '',
        description: car.description || '',
        category: car.category?._id || '',
        brand: car.brand || '',
        model: car.model || '',
        year: car.year || new Date().getFullYear(),
        fuelType: car.fuelType || '',
        transmission: car.transmission || '',
        condition: car.condition || 'used',
        bodyType: car.bodyType || '',
        mileage: car.mileage || '',
        engineCapacity: car.engineCapacity || '',
        power: car.power || '',
        registrationYear: car.registrationYear || '',
        registrationNumber: car.registrationNumber || '',
        insuranceValidUntil: car.insuranceValidUntil || '',
        insuranceType: car.insuranceType || 'comprehensive',
        spareKeyAvailable: car.spareKeyAvailable || false,
        price: car.price || {
          amount: '',
          unit: 'total',
          isNegotiable: false,
          rcTransferPrice: '',
          carServicingCharges: ''
        },
        location: car.location || {
          address: '',
          city: '',
          state: '',
          country: ''
        },
        kmsDriven: car.kmsDriven || '',
        color: car.color || '',
        seatingCapacity: car.seatingCapacity || '',
        ownerType: car.ownerType || '',
        features: car.features || [],
        additionalFeatures: car.additionalFeatures || [],
        tags: car.tags || [],
        images: car.images || []
      });
      setImagePreviews(car.images || []);
    }
  }, [car]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleArrayChange = (arrayName, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: checked
        ? [...prev[arrayName], value]
        : prev[arrayName].filter(item => item !== value)
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + imagePreviews.length > 10) {
      setErrors(prev => ({
        ...prev,
        images: 'Maximum 10 images allowed'
      }));
      return;
    }

    const newImagePreviews = [];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    files.forEach(file => {
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          images: 'Please select valid image files (JPEG, PNG, GIF)'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          images: 'Image size should be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newImagePreviews]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files] // Store File objects for upload
          }));
          setErrors(prev => ({
            ...prev,
            images: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);

    setImagePreviews(newPreviews);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
    if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.bodyType) newErrors.bodyType = 'Body type is required';
    if (!formData.price.amount) newErrors['price.amount'] = 'Price is required';
    if (!formData.location.city) newErrors['location.city'] = 'City is required';
    if (!formData.location.country) newErrors['location.country'] = 'Country is required';
    if (!formData.kmsDriven) newErrors.kmsDriven = 'Kilometers driven is required';
    if (!formData.color) newErrors.color = 'Color is required';
    if (!formData.seatingCapacity) newErrors.seatingCapacity = 'Seating capacity is required';
    if (!formData.ownerType) newErrors.ownerType = 'Owner type is required';
    if (!formData.mileage) newErrors.mileage = 'Mileage is required';
    if (!formData.engineCapacity) newErrors.engineCapacity = 'Engine capacity is required';
    if (!formData.power) newErrors.power = 'Power is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert string numbers to actual numbers
      const processedData = {
        ...formData,
        year: parseInt(formData.year),
        mileage: parseFloat(formData.mileage),
        kmsDriven: parseInt(formData.kmsDriven),
        seatingCapacity: parseInt(formData.seatingCapacity),
        registrationYear: formData.registrationYear.toString(),
        price: {
          ...formData.price,
          amount: parseFloat(formData.price.amount),
          rcTransferPrice: parseFloat(formData.price.rcTransferPrice || '0'),
          carServicingCharges: parseFloat(formData.price.carServicingCharges || '0')
        }
      };

      onSave(processedData);
    }
  };

  // Generate year options (last 30 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Generate registration year options
  const registrationYears = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Generate seating capacity options
  const seatingOptions = Array.from({ length: 8 }, (_, i) => i + 2);

  // Engine capacity options
  const engineCapacities = [
    '799 cc', '998 cc', '1197 cc', '1493 cc', '1598 cc',
    '1798 cc', '1998 cc', '2198 cc', '2494 cc', '2993 cc', 'Other'
  ];

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {car ? 'Edit Car' : 'Add New Car'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information & Car Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., Toyota Camry 2023"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter car description"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.condition ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Select Condition</option>
                    {conditions.map(condition => (
                      <option key={condition.value} value={condition.value}>{condition.label}</option>
                    ))}
                  </select>
                  {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body Type *
                  </label>
                  <select
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.bodyType ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Select Body Type</option>
                    {bodyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.bodyType && <p className="mt-1 text-sm text-red-600">{errors.bodyType}</p>}
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Car Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.brand ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.model ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Car model"
                  />
                  {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.year ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color *
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.color ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Select Color</option>
                    {colors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                  {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type *
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fuelType ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.fuelType && <p className="mt-1 text-sm text-red-600">{errors.fuelType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission *
                  </label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.transmission ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Select Transmission</option>
                    {transmissionTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.transmission && <p className="mt-1 text-sm text-red-600">{errors.transmission}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage (kmpl) *
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  step="0.1"
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mileage ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., 18.5"
                />
                {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Engine Capacity *
                </label>
                <select
                  name="engineCapacity"
                  value={formData.engineCapacity}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.engineCapacity ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select Capacity</option>
                  {engineCapacities.map(capacity => (
                    <option key={capacity} value={capacity}>{capacity}</option>
                  ))}
                </select>
                {errors.engineCapacity && <p className="mt-1 text-sm text-red-600">{errors.engineCapacity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power (bhp) *
                </label>
                <input
                  type="text"
                  name="power"
                  value={formData.power}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.power ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="e.g., 113 bhp"
                />
                {errors.power && <p className="mt-1 text-sm text-red-600">{errors.power}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KMs Driven *
                </label>
                <input
                  type="number"
                  name="kmsDriven"
                  value={formData.kmsDriven}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.kmsDriven ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Kilometers driven"
                />
                {errors.kmsDriven && <p className="mt-1 text-sm text-red-600">{errors.kmsDriven}</p>}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seating Capacity *
                </label>
                <select
                  name="seatingCapacity"
                  value={formData.seatingCapacity}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.seatingCapacity ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select Capacity</option>
                  {seatingOptions.map(seats => (
                    <option key={seats} value={seats}>{seats} Seats</option>
                  ))}
                </select>
                {errors.seatingCapacity && <p className="mt-1 text-sm text-red-600">{errors.seatingCapacity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Type *
                </label>
                <select
                  name="ownerType"
                  value={formData.ownerType}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ownerType ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select Owner Type</option>
                  {ownerTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.ownerType && <p className="mt-1 text-sm text-red-600">{errors.ownerType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Year
                </label>
                <select
                  name="registrationYear"
                  value={formData.registrationYear}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Year</option>
                  {registrationYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., TN09AB1234"
                />
              </div>
            </div>
          </div>

          {/* Insurance Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Valid Until
                </label>
                <input
                  type="month"
                  name="insuranceValidUntil"
                  value={formData.insuranceValidUntil}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Type
                </label>
                <select
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Insurance Type</option>
                  {insuranceTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="spareKeyAvailable"
                  checked={formData.spareKeyAvailable}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <label className="text-sm text-gray-700">Spare Key Available</label>
              </div>
            </div>
          </div>

          {/* Price & Location */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Price Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base Price *
                      </label>
                      <input
                        type="number"
                        name="price.amount"
                        value={formData.price.amount}
                        onChange={handleInputChange}
                        className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['price.amount'] ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="Price amount"
                      />
                      {errors['price.amount'] && <p className="mt-1 text-sm text-red-600">{errors['price.amount']}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Unit
                      </label>
                      <select
                        name="price.unit"
                        value={formData.price.unit}
                        onChange={handleInputChange}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {priceUnits.map(unit => (
                          <option key={unit.value} value={unit.value}>{unit.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RC Transfer Price
                      </label>
                      <input
                        type="number"
                        name="price.rcTransferPrice"
                        value={formData.price.rcTransferPrice}
                        onChange={handleInputChange}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="RC transfer charges"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Servicing Charges
                      </label>
                      <input
                        type="number"
                        name="price.carServicingCharges"
                        value={formData.price.carServicingCharges}
                        onChange={handleInputChange}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Servicing charges"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="price.isNegotiable"
                      checked={formData.price.isNegotiable}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                    />
                    <label className="text-sm text-gray-700">Price is Negotiable</label>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="location.address"
                      value={formData.location.address}
                      onChange={handleInputChange}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Full address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="location.city"
                        value={formData.location.city}
                        onChange={handleInputChange}
                        className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['location.city'] ? 'border-red-300' : 'border-gray-300'}`}
                        placeholder="City"
                      />
                      {errors['location.city'] && <p className="mt-1 text-sm text-red-600">{errors['location.city']}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="location.state"
                        value={formData.location.state}
                        onChange={handleInputChange}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="location.country"
                      value={formData.location.country}
                      onChange={handleInputChange}
                      className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors['location.country'] ? 'border-red-300' : 'border-gray-300'}`}
                      placeholder="Country"
                    />
                    {errors['location.country'] && <p className="mt-1 text-sm text-red-600">{errors['location.country']}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {featuresList.map(feature => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={(e) => handleArrayChange('features', feature, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Tags */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>

            <div className="space-y-3">
              {/* Selected Tags Display */}
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() =>
                        setFormData(prev => ({
                          ...prev,
                          tags: prev.tags.filter((_, i) => i !== index),
                        }))
                      }
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              {/* Input Box */}
              <input
                type="text"
                placeholder="Press Enter to add a tag"
                className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    setFormData(prev => ({
                      ...prev,
                      tags: [...prev.tags, e.target.value.trim().toLowerCase()],
                    }));
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
          {/* Additional Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Features</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                "Sunroof",
                "Apple CarPlay",
                "Android Auto",
                "360 Camera",
                "Premium Sound",
                "Cruise Control",
                "Keyless Entry",
                "Blind Spot Detection",
                "Wireless Charger",
                "Heated Seats",
                "Ventilated Seats",
                "Heads-Up Display",
              ].map(feature => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.additionalFeatures.includes(feature)}
                    onChange={(e) =>
                      handleArrayChange("additionalFeatures", feature, e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </div>


          {/* Image Upload */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Car Images</h3>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File Input */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB each)</p>
                  <p className="text-xs text-gray-500 mt-1">Max 10 images</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {car ? 'Update Car' : 'Create Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarModal;