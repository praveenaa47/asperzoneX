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
import { getWishlist, removeWishlist } from "@/redux/slices/wishlistSlice";
import { useRouter } from "next/navigation";

export default function SavedProperties() {
  const dispatch = useDispatch();
  const router = useRouter();
  const wishlistState = useSelector((state) => state.wishlist || {});
  const { items = [], loading = false, error = null } = wishlistState;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [sortBy, setSortBy] = useState("Newest");
  // const [filterBy, setFilterBy] = useState("Budget");

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

  const handleRemove = (itemId) => {
    dispatch(removeWishlist(itemId))
      .unwrap()
      .then(() => {
        dispatch(getWishlist()); // refresh list
      })
      .catch((err) => {
        console.error("Failed to remove:", err);
      });
  };

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
            Sign in to access your saved properties, wishlist, and more
            personalized features.
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
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
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
        </div> */}

        {/* Property Grid */}
               <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {items.map((item, index) => {
            const data = item.itemId;
            const type = item.itemType;

            const image =
              data.images?.[0] || data.media?.[0]?.url || "/placeholder.jpg";

            const title = data.propertyName || data.title || "No Title";

            const location =
              data.location?.formatted ||
              `${data.location?.city || ""}, ${data.location?.state || ""}, ${
                data.location?.country || ""
              }`;

            const price = data.price?.amount
              ? `₹${data.price.amount} / ${data.price.period}`
              : data.price?.totalPrice
              ? `₹${data.price.totalPrice}`
              : "N/A";

            const beds = data.bedrooms || "-";
            const baths = data.bathrooms || "-";

            const area = data.lotSize || data.engineCapacity || "-";

            const postedTime = data.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : "";

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {type}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-sm sm:text-lg mb-2 text-black line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {title}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm mb-3 flex items-center gap-1">
                    <span className="text-red-500 flex-shrink-0">
                      <Map size={14} className="sm:w-4 sm:h-4" />
                    </span>
                    <span className="line-clamp-1">{location}</span>
                  </p>

                  {/* Property Only */}
                  {type === "Property" && (
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 min-h-[2rem]">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 sm:w-4 sm:h-4" /> {beds}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShowerHead className="w-3 h-3 sm:w-4 sm:h-4" /> {baths}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3 h-3 sm:w-4 sm:h-4" /> {area} sqft
                      </span>
                    </div>
                  )}

                  {/* Car Only */}
                  {type === "Car" && (
                    <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-600 mb-3 min-h-[2rem]">
                      <span>Model: {data.model}</span>
                      <span>Year: {data.year}</span>
                      <span>Mileage: {data.mileage} kmpl</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 mb-3 mt-auto">
                    <span className="text-base sm:text-lg font-bold text-black">
                      {price}
                    </span>
                    <span className="text-xs text-gray-500">{postedTime}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 sm:py-2.5 rounded text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
                      View
                    </button>
                    <button
                      onClick={() =>
                        handleRemove(
                          typeof item.itemId === "string"
                            ? item.itemId
                            : item.itemId?._id
                        )
                      }
                      className="flex-1 bg-white text-red-600 py-2 sm:py-2.5 rounded border border-red-600 text-xs sm:text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
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
