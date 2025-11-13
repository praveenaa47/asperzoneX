import React from 'react';

const PriceSection = ({ formData, errors, updateFormData }) => {
  const priceUnits = [
    { value: 'total', label: 'Total Price' },
    { value: 'monthly', label: 'Monthly' }
  ];

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Price Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Price *
          </label>
          <input
            type="number"
            name="price.amount"
            value={formData.price.amount}
            onChange={(e) => updateFormData('price.amount', e.target.value)}
            className={`w-full bg-white px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors['price.amount'] ? 'border-red-300' : 'border-gray-300'
            }`}
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
            onChange={(e) => updateFormData('price.unit', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {priceUnits.map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RC Transfer Price
          </label>
          <input
            type="number"
            name="price.rcTransferPrice"
            value={formData.price.rcTransferPrice}
            onChange={(e) => updateFormData('price.rcTransferPrice', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
            onChange={(e) => updateFormData('price.carServicingCharges', e.target.value)}
            className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Servicing charges"
          />
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          name="price.isNegotiable"
          checked={formData.price.isNegotiable}
          onChange={(e) => updateFormData('price.isNegotiable', e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
        />
        <label className="text-sm text-gray-700">Price is Negotiable</label>
      </div>
    </div>
  );
};

export default PriceSection;