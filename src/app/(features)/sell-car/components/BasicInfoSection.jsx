import React from 'react';

const BasicInfoSection = ({ formData, errors, updateFormData }) => {
  const categories = [
    { _id: '1', name: 'Sedan' },
    { _id: '2', name: 'SUV' },
    { _id: '3', name: 'Hatchback' },
    { _id: '4', name: 'Coupe' }
  ];

  const conditions = [
    { value: 'new', label: 'New' },
    { value: 'used', label: 'Used' },
    { value: 'certified', label: 'Certified Pre-owned' }
  ];

  const bodyTypes = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'coupe', label: 'Coupe' }
  ];

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Car Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={3}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter car description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={(e) => updateFormData('condition', e.target.value)}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors.condition ? 'border-red-300' : 'border-gray-300'
              }`}
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
              onChange={(e) => updateFormData('bodyType', e.target.value)}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors.bodyType ? 'border-red-300' : 'border-gray-300'
              }`}
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
    </div>
  );
};

export default BasicInfoSection;