"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export default function BeachfrontHero() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [propertyType, setPropertyType] = useState("Residential");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    "Buy",
    "Rent",
    "New Launch",
    "Commercials",
    "Plot/Land",
    "Projects",
  ];

  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8 font-semibold ">
              <a
                href="#"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                For Buyers
              </a>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                For Tenants
              </a>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                For Owners
              </a>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                For Buyers
              </a>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                For Dealers/Builders
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('/estatebanner.jpg')",
        }}
      >
        {/* Overlay */}

        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2  bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all z-10">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2  bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all z-10">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4">
            Beachfront Villas
          </h1>
          <p className="text-white text-center text-lg md:text-xl max-w-3xl mb-16">
            Wake Up To The Sound Of Waves And Golden Sunsets. Our Beachfront
            Villas Combine Breathtaking Views With Refined Modern Living.
          </p>
        </div>

        {/* Action Buttons - Positioned at bottom of hero image */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-4 pb-8 px-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium flex items-center gap-2 transition-colors shadow-lg">
            <span className="text-xl">📋</span>
            Enquiry Now
          </button>
          <button className="bg-gray-600 bg-opacity-80 hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium flex items-center gap-2 transition-colors shadow-lg">
            <span className="text-xl">🏷️</span>
            Sell Now
          </button>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="py-6 flex justify-center">
            <div className="flex items-center gap-4">
              {/* Property Type Dropdown */}
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[140px]"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Plot/Land</option>
              </select>

              {/* Search Input */}
              <div className="relative w-[400px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here"
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Location Button */}
              <button className="p-2.5 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                <MapPin className="w-5 h-5 text-gray-600" />
              </button>

              {/* Search Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded text-sm font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
