import React from 'react';

const FeaturesSection = ({ formData, updateArrayField }) => {
  const featuresList = [
    'Power Steering', 'Heated Seats', 'Rear Parking Sensor', 'ABS',
    'Cruise Control', 'Power Windows', 'Reverse Camera', 'AC/Heater',
    'Engine Immobilizer', 'Sunroof', 'Navigation', 'Bluetooth',
    'Third Parking Sensor', 'Keyless Entry', 'Leather Seats', 'Alloy Wheels'
  ];

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
      <p className="text-sm text-gray-500 mb-4">Select Features</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {featuresList.map(feature => (
          <label key={feature} className="flex items-center">
            <input
              type="checkbox"
              checked={formData.features.includes(feature)}
              onChange={(e) => updateArrayField('features', feature, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
            />
            <span className="text-sm text-gray-700">{feature}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;