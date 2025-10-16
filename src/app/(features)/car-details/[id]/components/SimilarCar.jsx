import React from 'react';
import { Heart, Fuel, Settings, Palette } from 'lucide-react';

export default function SimilarCard() {
  const cars = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop',
      name: 'BMW M5',
      price: '₹9870000',
      year: '2023',
      km: '12,500 km',
      location: 'Kochi, Kerala',
      fuel: 'Petrol',
      transmission: 'Auto',
      color: 'White'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop',
      name: 'BMW M5',
      price: '₹8760000',
      year: '2023',
      km: '12,500 km',
      location: 'Kochi, Kerala',
      fuel: 'Petrol',
      transmission: 'Auto',
      color: 'White'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop',
      name: 'BMW M5',
      price: '₹1430000',
      year: '2023',
      km: '12,500 km',
      location: 'Kochi, Kerala',
      fuel: 'Petrol',
      transmission: 'Auto',
      color: 'White'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop',
      name: 'BMW M5',
      price: '₹9870000',
      year: '2023',
      km: '12,500 km',
      location: 'Kochi, Kerala',
      fuel: 'Petrol',
      transmission: 'Auto',
      color: 'White'
    }
  ];

  return (
    <div className="w-full  px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500 mb-2">Still can't decide?</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Explore cars similar to <span className="text-gray-900">Tata TIGOR</span>
        </h1>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="relative">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Title and Price */}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                <p className="text-lg font-bold text-blue-600">{car.price}</p>
              </div>

              {/* Year, KM, Location */}
              <p className="text-xs text-gray-500 mb-4">
                {car.year} • {car.km} • {car.location}
              </p>

              {/* Features */}
              <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span>{car.fuel}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Settings className="w-4 h-4" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  <span>{car.color}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}