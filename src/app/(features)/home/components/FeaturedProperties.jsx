"use client";
import { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight } from 'lucide-react';

const FeaturedProperties = () => {
  const [favorites, setFavorites] = useState([]);

  const properties = [
    {
      id: 1,
      title: '10 Marla Double Storey House',
      location: 'Gulshan Abad, Rawalpindi',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      price: 'Rs 3.2 Core',
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: 'Residential',
      ownerType: 'Owner',
      postedTime: '2 Weeks Ago',
      forSale: true
    },
    {
      id: 2,
      title: 'Double Storey G House',
      location: 'Gulshan Abad, Rawalpindi',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      price: 'Rs 2.2 Core',
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: 'Residential',
      ownerType: 'Owner',
      postedTime: '2 Weeks Ago',
      forSale: true
    },
    {
      id: 3,
      title: 'Marla 32 Double Storey House',
      location: 'Gulshan Abad, Rawalpindi',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop',
      price: 'Rs 13.2 Core',
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: 'Residential',
      ownerType: 'Owner',
      postedTime: '2 Weeks Ago',
      forSale: true
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-3 bg-white">
      <div className=" px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-center text-gray-900 mb-10 sm:mb-12 lg:mb-16">
          Featured Properties
        </h2>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* For Sale Badge */}
                {property.forSale && (
                  <div className="absolute top-4 left-4 bg-gray-600/90 text-white px-3 py-1 rounded-md text-xs font-medium">
                    For Sale
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    favorites.includes(property.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(property.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property.location}</span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {property.type}
                  </span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {property.ownerType}
                  </span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Bed className="w-4 h-4 mr-1" />
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Maximize className="w-4 h-4 mr-1" />
                    <span>{property.sqft} Sqft</span>
                  </div>
                </div>

                {/* Price and Time */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-blue-600">
                    {property.price}
                  </span>
                  <span className="text-xs text-gray-500">
                    {property.postedTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors group">
            View all
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;