"use client";
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function SellForm() {
  const [formData, setFormData] = useState({
    title: '',
    bodyType: '',
    brand: '',
    model: '',
    year: '',
    passengerCapacity: '',
    exteriorColor: '',
    condition: 'Yes',
    fuelType: '',
    voltage: '',
    transmission: '',
    kilometer: '',
    engineCapacity: '',
    power: '',
    features: [],
    address: '',
    sellPrice: '',
    vehicleHistory: 'No'
  });

  const features = [
    'Power Steering', 'Heated Seats', 'Rear Parking Sensor', 'Left hart',
    'ABS', 'Cruise Control', 'Power Windows', 'Reverse Camera',
    'AC/Heater', 'Engine Immobilizer', 'Sunroof', 'Navigation',
    'Bluetooth', 'Third Parking Sensor', '', 'Cargo'
  ];

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...formData,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 shadow-2xl ">
      {/* Car Details Section */}
      <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6 mb-6 ">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Car Details</h2>
        
        <div className="space-y-4 bg-[#F6F6F6]">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter title"
            />
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Select option</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Select option</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Select option</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Select option</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passenger Capacity</label>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                4
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exterior Color</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option>Select option</option>
              </select>
            </div>
          </div>

          {/* Condition & Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Write description about your car"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="condition" defaultChecked className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="condition" className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Test</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engine Details Section */}
      <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Engine Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Select Option</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voltage</label>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              12V
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kilometer driven</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Select Option</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Engine Capacity</label>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              4
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Power</label>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              12V
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
        <p className="text-sm text-gray-500 mb-4">Select Luxe</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {features.map((feature, index) => (
            feature && (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{feature}</span>
              </label>
            )
          ))}
        </div>
        <p className="text-sm text-blue-600 cursor-pointer hover:underline">Write another feature here</p>
      </div>

      {/* Location Section */}
      <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter address"
          />
        </div>
      </div>

      {/* Price Section */}
      <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Price</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sell Price</label>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            $
          </button>
        </div>
      </div>

      {/* Images & Video Section */}
      <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Images & Video</h2>
        <p className="text-sm text-gray-500 mb-4">Upload your image/video, max 20</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 cursor-pointer transition-colors"
            >
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle History Section */}
      <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle History</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Report File
          </button>
          <span className="text-sm text-gray-600">Yes File Choosen</span>
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors">
        Sell My Car
      </button>
    </div>
  );
}