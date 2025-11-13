"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { FaTag } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa";
import { getCarouselByCategoryId } from "@/redux/slices/carouselSlice";

export default function BeachfrontHero() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [propertyType, setPropertyType] = useState("Residential");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { carouselByCategory, loading } = useSelector(
    (state) => state.carousels
  );

  const tabs = [
    "Buy",
    "Rent",
    "New Launch",
    "Commercials",
    "Plot/Land",
    "Projects",
  ];

  // Fetch carousel data by category id
  useEffect(() => {
    if (id) {
      dispatch(getCarouselByCategoryId(id));
    }
  }, [id, dispatch]);

  // Handle Carousel Navigation
  const handleNext = () => {
    if (carouselByCategory?.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % carouselByCategory.length);
    }
  };

  const handlePrev = () => {
    if (carouselByCategory?.length > 0) {
      setCurrentIndex(
        (prev) =>
          (prev - 1 + carouselByCategory.length) % carouselByCategory.length
      );
    }
  };

  // Get current carousel item
  const currentItem = carouselByCategory?.[currentIndex];

  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8 font-semibold">
              {["For Buyers", "For Tenants", "For Owners", "For Dealers/Builders"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-blue-600 font-semibold hover:text-blue-700"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: currentItem
            ? `url(${currentItem.image})`
            : "url('/estatebanner.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        {/* Arrows */}
        {carouselByCategory?.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          {loading ? (
            <p className="text-white text-lg animate-pulse">Loading...</p>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                {currentItem?.title || "Beachfront Villas"}
              </h1>
              <p className="text-white text-lg md:text-xl max-w-3xl">
                {currentItem?.subtitle ||
                  "Wake Up To The Sound Of Waves And Golden Sunsets. Our Beachfront Villas Combine Breathtaking Views With Refined Modern Living."}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Floating White Box (Buttons + Search) */}
      <div className="relative z-30 -mt-25">
        <div className="flex px-6 sm:px-10 gap-4 justify-center mb-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 shadow-md transition">
            <FaWpforms className="text-md" />
            Enquiry Now
          </button>
          <button
            onClick={() => router.push(`/realestate-sellform/${id}`)}
            className="bg-gray-700 bg-opacity-90 hover:bg-opacity-100 text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 shadow-md transition"
          >
            <FaTag className="text-md" />
            Sell Now
          </button>
        </div>

        <div className="bg-white shadow-xl p-7 rounded-lg max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          {/* Tabs */}
          <div className="flex border-b overflow-x-auto mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Row */}
          <div className="flex justify-center">
            <div className="flex flex-wrap items-center justify-between w-full max-w-5xl rounded-lg px-4 py-3 gap-3">
              {/* Property Type Dropdown */}
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="px-4 py-2.5 text-black bg-[#0050FF0D] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-40"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Plot/Land</option>
              </select>

              {/* Search Input */}
              <div className="relative flex-1 min-w-[250px] bg-[#0050FF0D]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here"
                  className="w-full px-4 py-2.5 text-black pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
              <button className="p-2.5 border border-gray-300 bg-[#0050FF0D] rounded hover:bg-gray-50 transition-colors">
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
