"use client";
import { useState } from "react";
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";

export default function FeaturedProperties() {
  const [favorites, setFavorites] = useState([]);

  const properties = [
    {
      id: 1,
      title: "10 Marla Double Storey House",
      location: "Gulshan Abad, Rawalpindi",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      price: "Rs 3.2 Core",
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: "Residential",
      ownerType: "Owner",
      postedTime: "2 Weeks Ago",
      forSale: true,
    },
    {
      id: 2,
      title: "Double Storey G House",
      location: "Gulshan Abad, Rawalpindi",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      price: "Rs 2.2 Core",
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: "Residential",
      ownerType: "Owner",
      postedTime: "2 Weeks Ago",
      forSale: true,
    },
    {
      id: 3,
      title: "Marla 32 Double Storey House",
      location: "Gulshan Abad, Rawalpindi",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
      price: "Rs 13.2 Core",
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: "Residential",
      ownerType: "Owner",
      postedTime: "2 Weeks Ago",
      forSale: true,
    },
    {
      id: 4,
      title: "Marla 32 Double Storey House",
      location: "Gulshan Abad, Rawalpindi",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
      price: "Rs 13.2 Core",
      beds: 4,
      baths: 3,
      sqft: 2200,
      type: "Residential",
      ownerType: "Owner",
      postedTime: "2 Weeks Ago",
      forSale: true,
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-12 px-6 sm:px-8 lg:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Featured Properties
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-44 sm:h-48">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {property.forSale && (
                <span className="absolute top-3 left-3 bg-gray-800 text-white text-[11px] px-2 py-1 rounded">
                  For Sale
                </span>
              )}

              <button
                onClick={() => toggleFavorite(property.id)}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  favorites.includes(property.id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(property.id) ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {property.title}
              </h3>

              <div className="flex items-center text-gray-600 text-xs mb-3">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {property.location}
              </div>
             <div className="flex items-center gap-2 mb-3 text-xs">
  <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full">
    {property.type}
  </span>
  <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full">
    {property.ownerType}
  </span>
</div>


              <div className="flex items-center justify-between text-xs text-gray-600 mb-3 border-b pb-3">
                <div className="flex items-center">
                  <Bed className="w-3.5 h-3.5 mr-1" />
                  {property.beds} Beds
                </div>
                <div className="flex items-center">
                  <Bath className="w-3.5 h-3.5 mr-1" />
                  {property.baths} Baths
                </div>
                <div className="flex items-center">
                  <Maximize className="w-3.5 h-3.5 mr-1" />
                  {property.sqft} Sqft
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-blue-600">
                  {property.price}
                </span>
                <span className="text-[11px] text-gray-500">
                  {property.postedTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-8 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-md hover:bg-gray-800 hover:text-white transition-colors">
          View all
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
