// components/Filters.jsx
"use client";
import React from 'react';

const Filters = ({ 
  expandedFilters, 
  toggleFilter, 
  selectedBrands, 
  onBrandChange 
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-900 text-white p-6 rounded-t-lg">
        <h2 className="text-xl font-bold">Find your car</h2>
      </div>
      
      <div className="bg-white rounded-b-lg shadow-sm">
        {/* Brand & Model */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleFilter('brand')}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
          >
            <span className="font-semibold text-blue-600">Select Brand & Model</span>
          </button>
          {expandedFilters.brand && (
            <div className="px-6 pb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Brand</p>
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedBrands.includes('Toyota')}
                  onChange={() => onBrandChange('Toyota')}
                  className="w-4 h-4 text-blue-600 rounded" 
                />
                <span className="text-gray-700">Toyota</span>
              </label>
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedBrands.includes('BMW')}
                  onChange={() => onBrandChange('BMW')}
                  className="w-4 h-4 text-blue-600 rounded" 
                />
                <span className="text-gray-700">BMW</span>
              </label>
              <label className="flex items-center gap-2 mb-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedBrands.includes('TATA')}
                  onChange={() => onBrandChange('TATA')}
                  className="w-4 h-4 text-blue-600 rounded" 
                />
                <span className="text-gray-700">TATA</span>
              </label>
              
              <p className="text-sm font-semibold text-gray-700 mb-3">Model</p>
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-gray-700">Innova Crysta</span>
              </label>
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-gray-700">Fortuner</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-gray-700">Camry</span>
              </label>
            </div>
          )}
        </div>

        {/* Other Filters */}
        {['Location', 'Filter price', 'Seating capacity', 'Year', 'Number of owners', 'Inspection status', 'KM Driven', 'Fuel', 'Transmission', 'Colour'].map((filter, idx) => (
          <div key={idx} className="border-b border-gray-200">
            <button
              onClick={() => toggleFilter(filter.toLowerCase().replace(/ /g, ''))}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-900">{filter}</span>
              <span className="text-gray-400">+</span>
            </button>
          </div>
        ))}

        <div className="p-6">
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Search cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;