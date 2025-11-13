import React from 'react';

const LocationSection = ({ formData, errors, updateFormData }) => {
  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={(e) => updateFormData('location.address', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Full address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={(e) => updateFormData('location.city', e.target.value)}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors['location.city'] ? 'border-red-300' : 'border-gray-300'
              }`}
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
              onChange={(e) => updateFormData('location.state', e.target.value)}
              className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="State"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={(e) => updateFormData('location.country', e.target.value)}
              className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors['location.country'] ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Country"
            />
            {errors['location.country'] && <p className="mt-1 text-sm text-red-600">{errors['location.country']}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;