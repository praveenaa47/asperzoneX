"use client"
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { FaTag } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa";


export default function PropertyListingForm() {
  const [formData, setFormData] = useState({
    propertyName: '',
    location: '',
    propertyType: '',
    bedType: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    lotSize: '',
    furnished: 'furnished',
    parking: false,
    waterSupply: false,
    swimmingPool: false,
    pets: false,
    wifi: false,
    security: false,
    eventsAllowed: false,
    pricePer: 'month',
    price: '',
    email: '',
    phone: '',
    userType: 'owner'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Property listing submitted successfully!');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-start gap-3  px-4 sm:px-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors shadow-md">
<FaWpforms className="text-md" />
          Enquiry Now
        </button>
        <button className="bg-gray-700 bg-opacity-90 hover:bg-opacity-100 text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors shadow-md">
<FaTag  className="text-md"/>   
       Sell Now
        </button>
      </div>
              <div className=" border-b border-gray-300 w-full"></div>


        <div className="bg-white mt-0 px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">List Your Property</h1>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Fill in the details below to list your property and connect with potential buyers.
          </p>

          <div className="space-y-8">
            {/* Property Image */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-1">Property Image</h2>
              <p className="text-xs text-gray-500 mb-4">
High - quality photo increase listing engagement. upload at least 3 photos. 
              </p>
              <div className="border-2 border-dashed border-[#2563EB99] rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50">
                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500">Click to upload</p>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-base font-bold text-black mb-1">Property Details</h2>
              <p className="text-xs text-gray-500 mb-4">
                Let us know about your property
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    placeholder="E.g., Dreamland Villas, Sweet Home etc"
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Location
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">Select</option>
                      <option value="new-york">New York</option>
                      <option value="los-angeles">Los Angeles</option>
                      <option value="chicago">Chicago</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">Select</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="condo">Condo</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Bed Type
                  </label>
                  <select
                    name="bedType"
                    value={formData.bedType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="">Choose the beds in your listing place</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="queen">Queen</option>
                    <option value="king">King</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Property Specifications */}
            <div>
              <h2 className="text-base font-bold text-black mb-4">Property Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Bed room
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Bathroom
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Year built
                  </label>
                  <select
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Lot size
                  </label>
                  <select
                    name="lotSize"
                    value={formData.lotSize}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="500-1000">500-1000 sq ft</option>
                    <option value="1000-2000">1000-2000 sq ft</option>
                    <option value="2000-3000">2000-3000 sq ft</option>
                    <option value="3000+">3000+ sq ft</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-xs font-medium text-gray-700 mb-2">Furnishing Status</span>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="furnished"
                      value="furnished"
                      checked={formData.furnished === 'furnished'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-[#2563EB99] focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Furnished</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="furnished"
                      value="unfurnished"
                      checked={formData.furnished === 'unfurnished'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-[#2563EB99] focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Un-furnished</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-base font-bold text-black mb-1">Amenities</h2>
              <p className="text-xs text-gray-500 mb-4">Check all available amenities</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="parking"
                    checked={formData.parking}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-[#2563EB99] rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Parking</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="waterSupply"
                    checked={formData.waterSupply}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-[#2563EB99] rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Water Supply</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="swimmingPool"
                    checked={formData.swimmingPool}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-[#2563EB99] rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Swimming Pool</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="pets"
                    checked={formData.pets}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-[#2563EB99] rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Pet's</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={formData.wifi}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-[#2563EB99] rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Wifi</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="security"
                    checked={formData.security}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-[#2563EB99] rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Security</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="eventsAllowed"
                    checked={formData.eventsAllowed}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-[#2563EB99] rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Event Allowed</span>
                </label>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-base font-bold text-black mb-4">Pricing</h2>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Price Per <span className="text-gray-400 font-normal">(Choose applicable)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pricePer: 'year' }))}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      formData.pricePer === 'year'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    YEAR / YEARLY
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pricePer: 'month' }))}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      formData.pricePer === 'month'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    PER / MTH
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pricePer: 'day' }))}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      formData.pricePer === 'day'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    PER / DAY
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, pricePer: 'negotiate' }))}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      formData.pricePer === 'negotiate'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    NEGOTIABLE
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Enter Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="$ 0000"
                  className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Contact & Listing Details */}
            <div>
              <h2 className="text-base font-bold text-black mb-4">Contact & Listing details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full px-3 py-2 text-sm border border-[#2563EB99] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <span className="block text-xs font-medium text-gray-700 mb-2">Who are you?</span>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="owner"
                      checked={formData.userType === 'owner'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-[#2563EB99] focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Owner</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="userType"
                      value="dealer"
                      checked={formData.userType === 'dealer'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-[#2563EB99] focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Dealer</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 justify-center">
              <button
                type="button"
                className="flex px-6 py-2.5 border border-[#2563EB99] rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                RESET
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex px-6 py-2.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Submit Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}