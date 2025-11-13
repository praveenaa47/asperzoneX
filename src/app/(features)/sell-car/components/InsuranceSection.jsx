import React from 'react';

const InsuranceSection = ({ formData, updateFormData }) => {
  const insuranceTypes = [
    { value: 'comprehensive', label: 'Comprehensive' },
    { value: 'third-party', label: 'Third Party' },
    { value: 'zero-dep', label: 'Zero Depreciation' }
  ];

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Insurance Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Valid Until
          </label>
          <input
            type="month"
            name="insuranceValidUntil"
            value={formData.insuranceValidUntil}
            onChange={(e) => updateFormData('insuranceValidUntil', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Type
          </label>
          <select
            name="insuranceType"
            value={formData.insuranceType}
            onChange={(e) => updateFormData('insuranceType', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
            onChange={(e) => updateFormData('spareKeyAvailable', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
          />
          <label className="text-sm text-gray-700">Spare Key Available</label>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSection;