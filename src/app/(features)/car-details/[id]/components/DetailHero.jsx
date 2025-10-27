"use client";
import React, { useState } from 'react';
import { Heart, MapPin, Phone, Search, ChevronRight } from 'lucide-react';
import PriceSummary from '../carModals/PriceBreakModal';

export default function CarDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const images = [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"
  ];

  const specifications = [
    { name: "Steering Mounted Controls", icon: "*" },
    { name: "ABS - Anti-lock Braking System", icon: "*" },
    { name: "Air Conditioner", icon: "*" },
    { name: "Rear Defogger", icon: "*" }
  ];

  const features = [
    { name: "EBD - Electronic Brakeforce Distribution", icon: "*" },
    { name: "Central Locking", icon: "*" },
    { name: "Bluetooth Compatibility", icon: "*" }
  ];

  return (
    <div className=" py-8 px-4">
      <div className="">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={images[selectedImage]} 
                alt="Car main view"
                className="w-full h-96 object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
              <button
                onClick={() => setSelectedImage(3)}
                className="relative rounded-lg overflow-hidden bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={images[3]} 
                  alt="More images"
                  className="w-full h-30 object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                  +2
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Car Title & Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                2018 Tata TIGOR XTA PETROL
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                  65,554 km
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                  1st owner
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                  Automatic
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
                  Petrol
                </span>
                <span className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full">
                  Petrol
                </span>
              </div>

              {/* Location & Contact */}
              <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">Kakkanad, Ernakulam</span>
                </div>
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 ml-auto">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-semibold">Call for us</span>
                </button>
              </div>

              {/* Features & Specifications */}
              <div className="">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Features & Specifications
                </h2>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for features & specifications"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Specifications Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Specification Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Specification</h3>
                    <div className="space-y-2">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-lg">{spec.icon}</span>
                          <span>{spec.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feature Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Feature</h3>
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-lg">{feature.icon}</span>
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">₹4.5 Lakh</span>
                  </div>
                  <button 
                   onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    Price breakup
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                onClick={()=>setIsModalOpen(true)}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg">
                  Enquiry now
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>

 <PriceSummary 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}