"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function MyAds() {
  const [activeTab, setActiveTab] = useState('All Ads');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['All Ads', 'Live', 'Draft', 'Rejected', 'Expired'];

  const ads = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&h=200&fit=crop',
      title: '2018 Tata TIGOR XTA PETROL',
      price: 'Rs 250000',
      lastUpdated: 'Oct 23 2023',
      expiresIn: '24 days',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&h=200&fit=crop',
      title: '2018 Tata TIGOR XTA PETROL',
      price: 'Rs 250000',
      lastUpdated: 'Oct 23 2023',
      expiresIn: '24 days',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center  text-black mb-6">My Ads</h1>

        {/* Search and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ad title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-gray-600 pl-10 pr-4 py-2 bg-blue-50 border border-blue-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Ads List */}
        <div className="space-y-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`bg-white rounded-lg p-4 ${
                ad.featured ? 'border border-blue-300' : 'border border-gray-200'
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full md:w-24 h-24 object-cover rounded"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 text-black">{ad.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                    <span className="font-medium text-black">{ad.price}</span>
                    <span>Last Updated on: {ad.lastUpdated}</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Ad expire in <span className="font-semibold">{ad.expiresIn}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
                  <button className="flex-1 md:flex-none px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap">
                    Edit Ad
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap">
                    Delete Ad
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}