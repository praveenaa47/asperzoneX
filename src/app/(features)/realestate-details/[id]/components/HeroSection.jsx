"use client"
import React, { useState } from 'react';
import { Heart, Share2, Bed, Bath, Car, MapPin, User, Phone, Calendar, Clock } from 'lucide-react';

export default function RealEstateHero() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: 'John',
    phone: '126555'
  });

  const images = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSchedule = () => {
    alert('Viewing scheduled successfully!');
  };

  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Images and Property Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-2 h-80 md:h-96">
              {/* Main Image */}
              <div className="col-span-4 md:col-span-3 relative rounded-2xl overflow-hidden group">
                <img 
                  src={images[0]} 
                  alt="Property main view" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  For Sale
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                  >
                    <Heart 
                      className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
                    />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Side Images */}
              <div className="hidden md:flex flex-col gap-2">
                <div className="flex-1 relative rounded-xl overflow-hidden">
                  <img 
                    src={images[1]} 
                    alt="Property view 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 relative rounded-xl overflow-hidden group cursor-pointer">
                  <img 
                    src={images[2]} 
                    alt="Property view 3" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">+5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                10 Marla Double Storey House
              </h1>
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                Rs 3.2 Core
              </p>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Gulshan Abad, Rawalpindi</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  Residential
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  Owner
                </span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg">
                    <Bed className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Beds</p>
                    <p className="font-semibold text-gray-900">4</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className=" p-3 rounded-lg">
                    <Bath className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Baths</p>
                    <p className="font-semibold text-gray-900">3</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className=" p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold text-gray-900">2200 Sqft</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className=" p-3 rounded-lg">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Garage</p>
                    <p className="font-semibold text-gray-900">2 Car</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Agent and Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6 space-y-6">
              {/* Agent Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                  alt="Emily Carter" 
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Emily Carter</h3>
                  <p className="text-sm text-gray-500">Certified Kerala Real Estate Agent</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact seller
                </button>
                <button className="w-full bg-blue-50 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-100 transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Send Message
                </button>
              </div>

              {/* Schedule Form */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg">Schedule A Viewing</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Select a date"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Select a time"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="126555"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSchedule}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}