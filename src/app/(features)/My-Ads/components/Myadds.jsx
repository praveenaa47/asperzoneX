"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getAllads } from "@/redux/slices/adsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MyAds() {
  const [activeTab, setActiveTab] = useState("All Ads");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { data: ads, loading, error } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(getAllads());
  }, [dispatch]);

  const tabs = ["All Ads", "Live", "Draft", "Rejected", "Expired"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center  text-black mb-6">
          My Ads
        </h1>

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
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-center text-gray-600">Loading ads...</p>}
        {error && (
          <p className="text-center text-red-600">Failed to load ads.</p>
        )}

        {/* Ads List */}
        <div className="space-y-4">
       {ads?.map((ad) => {
  const adTitle = ad.title || ad.propertyName || "Untitled Ad";

  const adImage =
    ad.media?.[0]?.url ||
    ad.images?.[0] ||
    ad.companyLogo ||
    "/placeholder.png";

  const adPrice =
    ad.price?.totalPrice ||
    ad.price?.amount ||
    ad.salary?.amount ||
    null;

  return (
    <div
      key={ad._id}
      className={`bg-white rounded-lg p-4 ${
        ad.isFeatured ? "border border-blue-300" : "border border-gray-200"
      } hover:shadow-md transition-shadow`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={adImage}
            alt={adTitle}
            className="w-full md:w-24 h-24 object-cover rounded"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-2 text-black">{adTitle}</h3>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
            <span className="font-medium text-black">
              ₹{adPrice?.toLocaleString?.() || "N/A"}
            </span>

            <span>
              Posted on: {new Date(ad.createdAt).toLocaleDateString("en-IN")}
            </span>
          </div>

          {ad.expiresIn && (
            <p className="text-sm text-gray-700">
              Ad expires in <span className="font-semibold">{ad.expiresIn}</span>
            </p>
          )}
        </div>

      </div>
    </div>
  );
})}

        </div>
      </div>
    </div>
  );
}
