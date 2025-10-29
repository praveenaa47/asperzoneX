"use client";
import React, { useState } from 'react';
import { Heart, Bed, Bath, Maximize } from 'lucide-react';
import { FaArrowRightLong } from "react-icons/fa6";


const PropertyCard = ({ district, image, price, beds, baths, sqft }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg  overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden group">
        <img 
          src={image} 
          alt={district}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
          {district}
        </h3>
      </div>
      
      <div className="p-4">
        <div className="mb-1">
          <p className="text-sm text-gray-600 mb-1">Starting From</p>
          <p className="text-2xl font-bold text-gray-900">{price}</p>
        </div>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{sqft} Sqft</span>
          </div>
        </div>
        
        <button className="w-full py-2 px-2 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
          View Properties
          <span><FaArrowRightLong />
</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const properties = [
    {
      district: 'Ernakulam',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      price: '₹35 Lakhs',
      beds: 4,
      baths: 3,
      sqft: 2200
    },
    {
      district: 'Thrissur',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
      price: '₹35 Lakhs',
      beds: 4,
      baths: 3,
      sqft: 2200
    },
    {
      district: 'Kasaragod',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      price: '₹35 Lakhs',
      beds: 4,
      baths: 3,
      sqft: 2200
    },
    {
      district: 'Alappuzha',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      price: '₹35 Lakhs',
      beds: 4,
      baths: 3,
      sqft: 2200
    }
  ];

  return (
    <div className=" py-8 px-4 sm:px-6 lg:px-8">
      <div className="">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-5">
          Most Popular In Kerala's Districts
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 p-9 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}