import React from 'react';

const TechnicalSpecsSection = ({ formData, errors, updateFormData }) => {
  const engineCapacities = [
    '799 cc', '998 cc', '1197 cc', '1493 cc', '1598 cc',
    '1798 cc', '1998 cc', '2198 cc', '2494 cc', '2993 cc', 'Other'
  ];

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mileage (kmpl) *
          </label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={(e) => updateFormData('mileage', e.target.value)}
            step="0.1"
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.mileage ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('engineCapacity', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.engineCapacity ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('power', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.power ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('kmsDriven', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.kmsDriven ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Kilometers driven"
          />
          {errors.kmsDriven && <p className="mt-1 text-sm text-red-600">{errors.kmsDriven}</p>}
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecsSection;