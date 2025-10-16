
"use client"
import { useState } from 'react';
import { Plane, MapPin, Building2, Calendar, Users, Upload } from 'lucide-react';

export default function TravelBookingTabs() {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('roundTrip');

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'tours', label: 'Tours', icon: MapPin },
    { id: 'hotels', label: 'Hotels', icon: Building2 }
  ];

  return (
    <div className="">
      <div className="max-w-6xl mx-auto bg-white border border-blue-400 rounded-lg shadow-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'flights' && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneWay"
                    checked={tripType === 'oneWay'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">One Way</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundTrip"
                    checked={tripType === 'roundTrip'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Round Trip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="multiCity"
                    checked={tripType === 'multiCity'}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Multi City</span>
                </label>
              </div>

              <div className="text-sm text-gray-600 text-right">
                Book International and Domestic Flights
              </div>

              {/* Flight Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* From */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">From</label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">Mumbai</div>
                    <div className="text-xs text-gray-500">BOM, Chhatrapati Shivaji International Airport India</div>
                  </div>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">To</label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">Delhi</div>
                    <div className="text-xs text-gray-500">DEL, Indira Gandhi International Airp</div>
                  </div>
                </div>

                {/* Departure */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 flex items-center gap-1">
                    Departure <span className="text-gray-400">▼</span>
                  </label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">1 Dec' 25</div>
                    <div className="text-xs text-gray-500">Monday</div>
                  </div>
                </div>

                {/* Return */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 flex items-center gap-1">
                    Return <span className="text-gray-400">▼</span>
                  </label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">12 Dec' 25</div>
                    <div className="text-xs text-gray-500">Monday</div>
                  </div>
                </div>
              </div>

              {/* Travelers & Class */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 flex items-center gap-1">
                    Travelers & Class <span className="text-gray-400">▼</span>
                  </label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">1 Traveler</div>
                    <div className="text-xs text-gray-500">Economy/Premium Economy</div>
                  </div>
                </div>
              </div>

              {/* Add Attachment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Add Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">Drag & drop image here or click to upload</p>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Comments</label>
                <textarea
                  placeholder="Any special request or additional information..."
                  className="w-full border text-gray-500 border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Submit Enquiry
                </button>
              </div>
            </div>
          )}

          {/* Tours Tab */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Country */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">country</label>
                  <select className="w-full border border-gray-300 text-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a country</option>
                  </select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">State</label>
                  <select className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a State</option>
                  </select>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">city</label>
                  <select className="w-full text-gray-500 border  border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a city</option>
                  </select>
                </div>

                {/* Tour Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Tour Type</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Adventure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Start Date */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Start Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select a start date"
                      className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">End Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select a end date"
                      className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Duration</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select duration</option>
                  </select>
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Travelers</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Travelers</option>
                  </select>
                </div>
              </div>

              {/* Add Attachment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Add Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">Drag & drop image here or click to upload</p>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Comments</label>
                <textarea
                  placeholder="Any special request or additional information..."
                  className="w-full text-gray-500 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Submit Enquiry
                </button>
              </div>
            </div>
          )}

          {/* Hotels Tab */}
          {activeTab === 'hotels' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Destination */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Destination</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a country</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Location</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a Location</option>
                  </select>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Property Type</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Property Type</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Star Rating */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Star Rating</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Star Rating</option>
                  </select>
                </div>

                {/* Hotel/Property Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Hotel/Property Name</label>
                  <input
                    type="text"
                    placeholder="Enter Hotel/Property Name"
                    className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Budget</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Budget range</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Check In */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Check In</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select a Check In date"
                      className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Check Out */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Check Out</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select a Check Out date"
                      className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Rooms */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Rooms</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 room</option>
                    <option>2 rooms</option>
                    <option>3 rooms</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Guests</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 Adults</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                  </select>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Comments</label>
                <textarea
                  placeholder="Any special request or additional information..."
                  className="w-full text-gray-500 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Submit Enquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}