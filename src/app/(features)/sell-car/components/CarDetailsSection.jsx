import React from 'react';

const CarDetailsSection = ({ formData, errors, updateFormData }) => {
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi'];
  const colors = ['Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown'];
  const fuelTypes = [
    { value: 'petrol', label: 'Petrol' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' }
  ];
  const transmissionTypes = [
    { value: 'manual', label: 'Manual' },
    { value: 'automatic', label: 'Automatic' },
    { value: 'cvt', label: 'CVT' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Car Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand *
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={(e) => updateFormData('brand', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.brand ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('model', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.model ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Car model"
          />
          {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year *
          </label>
          <select
            name="year"
            value={formData.year}
            onChange={(e) => updateFormData('year', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.year ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('color', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.color ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Color</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Type *
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={(e) => updateFormData('fuelType', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.fuelType ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('transmission', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.transmission ? 'border-red-300' : 'border-gray-300'
            }`}
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
  );
};

export default CarDetailsSection;