"use client";
import React, { useState } from 'react';
import { Heart, Bed, Maximize, X } from 'lucide-react';

export default function SavedProperties() {
  const [sortBy, setSortBy] = useState('Newest');
  const [filterBy, setFilterBy] = useState('Budget');
  
  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      title: '10 Marla Double Storey House',
      location: 'Gulberg Abad, Rawalpindi',
      type: 'Residential',
      ownerType: 'Owner',
      beds: 4,
      baths: 4,
      area: '2205 Sqft',
      price: 'Rs 3.2 Core',
      postedTime: '2 Weeks Ago'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
      title: '10 Marla Double Storey House',
      location: 'Gulberg Abad, Rawalpindi',
      type: 'Residential',
      ownerType: 'Owner',
      beds: 4,
      baths: 4,
      area: '2205 Sqft',
      price: 'Rs 3.2 Core',
      postedTime: '2 Weeks Ago'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      title: '10 Marla Double Storey House',
      location: 'Gulberg Abad, Rawalpindi',
      type: 'Residential',
      ownerType: 'Owner',
      beds: 4,
      baths: 4,
      area: '2205 Sqft',
      price: 'Rs 3.2 Core',
      postedTime: '2 Weeks Ago'
    }
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-black mb-8">My Saved</h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border text-black border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
              <span className="absolute left-0 -top-2 bg-white px-1 text-xs text-gray-600">Sort:</span>
            </div>
            
            <div className="relative">
              <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none text-black bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Budget</option>
                <option>Location</option>
                <option>Property Type</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
            </div>
          </div>
          
          <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        </div>
        
        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image Section */}
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  For Sale
                </span>
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5 text-blue-600 fill-blue-600" />
                </button>
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-black">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                  <span className="text-red-500">📍</span>
                  {property.location}
                </p>
                
                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                    {property.type}
                  </span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                    {property.ownerType}
                  </span>
                </div>
                
                {/* Property Details */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    {property.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    🚿 {property.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    {property.area}
                  </span>
                </div>
                
                {/* Price and Time */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">{property.price}</span>
                  <span className="text-xs text-gray-500">{property.postedTime}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                  <button className="flex-1 bg-white text-red-600 py-2 rounded border border-red-600 hover:bg-red-50 transition-colors text-sm font-medium">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}