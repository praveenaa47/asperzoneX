// components/DetailHero.jsx
"use client";
import React, { useState } from "react";
import { Heart, MapPin, Phone, ChevronRight } from "lucide-react";
import PriceSummary from "../carModals/PriceBreakModal";
import SupportForm from "../carModals/EnquiryModal";

export default function CarDetailPage({ car }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);


const images = car.media?.map(m => m.url) || ["/default-car.jpg"];

  // Create specifications array from car data
  const specifications = [
    { 
       
      name: `${car.brand} ${car.model}` 
    },
    { 
      name: `Year: ${car.year}` 
    },
    { 
      name: `Fuel: ${car.fuelType}` 
    },
    { 
      name: `Transmission: ${car.transmission}` 
    },
    { 
      name: `Color: ${car.color}` 
    },
    { 
      name: `Seats: ${car.passengerCapacity}` 
    },
    { 
      name: `KMs Driven: ${car.kmsDriven?.toLocaleString() || 'N/A'}` 
    },
    { 
      name: `Owner: ${car.ownerType || 'N/A'}` 
    }
  ];

  // Format price
  const formatPrice = (price) => {
    if (!price) return "Price not available";
    if (typeof price === 'number') {
      return `₹${price.toLocaleString()}`;
    }
    if (typeof price === 'object' && price.amount) {
      return `₹${price.amount.toLocaleString()}`;
    }
    return "Price not available";
  };

  return (
    <div className="py-8 px-4">
      <div className="">
        <div className="grid lg:grid-cols-2 gap-6 p-12">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={car.title}
                className="w-full h-96 object-cover"
              />
              {/* <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button> */}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow ${
                    selectedImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`${car.title} thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                  {index === 3 && images.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-sm">
                      +{images.length - 4}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Car Title & Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {car.title} 
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                  {car.kmsDriven?.toLocaleString() || 'N/A'} km
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                  {car.ownerType || 'N/A'} owner
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                  {car.transmission || 'N/A'}
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
                  {car.fuelType || 'N/A'}
                </span>
                <span className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full">
                  {car.color || 'N/A'}
                </span>
              </div>

              {/* Location & Contact */}
              <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">
                    {car.location?.city}, {car.location?.country}
                  </span>
                </div>
                {/* <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 ml-auto">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-semibold">Call for us</span>
                </button> */}
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {car.description || 'No description available.'}
                </p>
              </div>


             {/* Features (merged section) */}
            {car.features && car.features.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  Features & Specifications
                </h2>
                <div className="gap-2  grid grid-cols-2 list-disc">
                  {car.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-black text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

              {/* Price & CTA */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(car.price?.totalPrice)}
                    </span>
                    {car.price?.isNegotiable && (
                      <span className="text-green-600 text-sm ml-2">(Negotiable)</span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold"
                  >
                    Price breakup
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

               <button
  onClick={() => setIsEnquiryModalOpen(true)}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
>
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
        car={car}
      />
    <SupportForm
  isOpen={isEnquiryModalOpen}
  onClose={() => setIsEnquiryModalOpen(false)}
  car={car}
/>
    </div>
  );
}