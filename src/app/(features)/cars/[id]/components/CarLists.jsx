"use client";
import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';

export default function CarListingPage() {
  const [expandedFilters, setExpandedFilters] = useState({
    brand: true,
    model: true,
    location: false,
    price: false,
    seating: false,
    year: false,
    owners: false,
    inspection: false,
    km: false,
    fuel: false,
    transmission: false,
    colour: false
  });

  const [selectedBrands, setSelectedBrands] = useState(['Toyota']);
  const [favorites, setFavorites] = useState([]);

  const cars = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹2000000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1584345604476-8ec5f4a4b7f0?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹2130000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹5430000",
      year: "2017",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹9870000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹8760000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹1430000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹9870000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹8760000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&h=300&fit=crop",
      model: "BMW M5",
      price: "₹1430000",
      year: "2023",
      km: "12,500 km",
      location: "Kochi, Kerala",
      fuel: "Petrol",
      transmission: "auto",
      color: "White"
    }
  ];

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    );
  };

  return (
    <div className="min-h-screen ">
      <div className=" px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
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
                      <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">Toyota</span>
                    </label>
                    <label className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-700">BMW</span>
                    </label>
                    <label className="flex items-center gap-2 mb-4 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">20 cars found</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 text-sm">Sort by :</span>
                <select className="border border-gray-300 text-gray-900 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Year: Newest First</option>
                </select>
              </div>
            </div>

            {/* Car Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cars.map((car) => (
                <div key={car.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
                    <button
                      onClick={() => toggleFavorite(car.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-5 h-5 ${favorites.includes(car.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{car.model}</h3>
                      <span className="text-blue-600 font-bold">{car.price}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {car.year} • {car.km} • {car.location}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                        {car.fuel}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {car.transmission}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        {car.color}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}