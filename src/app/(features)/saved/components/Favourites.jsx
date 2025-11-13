"use client";
import React, { useEffect, useState } from "react";
import {
  Heart,
  Bed,
  Maximize,
  X,
  Map,
  ChevronDown,
  ShowerHead,
  LogIn,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "@/redux/slices/wishlistSlice";
import { useRouter } from "next/navigation";

export default function SavedProperties() {
  const dispatch = useDispatch();
  const router = useRouter();
const wishlistState = useSelector((state) => state.wishlist || {});
const { items = [], loading = false, error = null } = wishlistState;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sortBy, setSortBy] = useState("Newest");
  const [filterBy, setFilterBy] = useState("Budget");

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      setIsAuthenticated(true);
      dispatch(getWishlist());
    } else {
      setIsAuthenticated(false);
    }
  }, [dispatch]);

if (!isAuthenticated) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 text-center max-w-md w-full border border-gray-100">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-4 rounded-full">
            <Heart className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Log in to continue
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Sign in to access your saved properties, wishlist, and more personalized features.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/login")}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <LogIn className="w-5 h-5" />
          Login to Continue
        </button>
      </div>
    </div>
  );
}


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading your saved properties...
      </div>
    );
  }

// if (error) {
//   const errorMessage =
//     typeof error === "string"
//       ? error
//       : error?.message || "Something went wrong. Please try again.";

//   return (
//     <div className="flex justify-center items-center h-screen text-red-500 text-center px-4">
//       {errorMessage}
//     </div>
//   );
// }


  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-600">
        <Heart className="w-10 h-10 mb-3 text-gray-400" />
        <p className="text-sm mb-4">No saved properties yet.</p>
        <button
          onClick={() => router.push("/real-estate")}
          className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Browse Properties
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-black mb-8">
          My Saved
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border text-black border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <ChevronDown/>
              </span>
              <span className="absolute left-0 -top-2 bg-white px-1 text-xs text-gray-600">
                Sort:
              </span>
            </div>

            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none text-black bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Budget</option>
                <option>Location</option>
                <option>Property Type</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <ChevronDown/>
              </span>
            </div>
          </div>

          <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-gray-800 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  For Sale
                </span>
                <button className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 fill-blue-600" />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-2 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-black line-clamp-2">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-1">
                  <span className="text-red-500">
                    <Map size={16} className="sm:w-5 sm:h-5" />
                  </span>
                  <span className="line-clamp-1">{property.location}</span>
                </p>

                {/* Tags */}
                <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <span className="text-xs bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-blue-200">
                    {property.type}
                  </span>
                  <span className="text-xs bg-green-50 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-green-200">
                    {property.ownerType}
                  </span>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
                    {property.beds}
                  </span>
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <ShowerHead className="w-3 h-3 sm:w-4 sm:h-4" />
                    {property.baths}
                  </span>
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{property.area}</span>
                    <span className="sm:hidden">2205</span>
                  </span>
                </div>

                {/* Price and Time */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4 gap-1">
                  <span className="text-sm sm:text-lg font-bold text-gray-900">
                    {property.price}
                  </span>
                  <span className="text-xs text-gray-500">
                    {property.postedTime}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-1.5 sm:py-2 rounded hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium">
                    View Details
                  </button>
                  <button className="flex-1 bg-white text-red-600 py-1.5 sm:py-2 rounded border border-red-600 hover:bg-red-50 transition-colors text-xs sm:text-sm font-medium">
                    Remove
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
