import React from 'react';

const AdditionalDetailsSection = ({ formData, errors, updateFormData }) => {
  const ownerTypes = [
    { value: 'first', label: 'First Owner' },
    { value: 'second', label: 'Second Owner' },
    { value: 'third', label: 'Third Owner' },
    { value: 'fourth', label: 'Fourth & Above' }
  ];

  const currentYear = new Date().getFullYear();
  const registrationYears = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const seatingOptions = Array.from({ length: 8 }, (_, i) => i + 2);

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seating Capacity *
          </label>
          <select
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={(e) => updateFormData('seatingCapacity', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.seatingCapacity ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('ownerType', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.ownerType ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('registrationYear', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
            onChange={(e) => updateFormData('registrationNumber', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g., TN09AB1234"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsSection;