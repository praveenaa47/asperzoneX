"use client";
import { useState, useEffect } from "react";

export default function Hero( { title, subtitle, bannerImage, duration, mode, level, eligibility, intakes , about , shortName } ) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: title || "Shape your future with global education",
      shortName:
        shortName ||
        "Explore top universities, scholarships, and study destinations across the world.",
      image: bannerImage || "/educationbanner.jpg",
    },  
  ];

    const programDetails = [
    { label: "Duration", value: duration || "N/A" },
    { label: "Mode", value: mode || "N/A" },
    { label: "Level", value: level || "N/A" },
    { label: "Eligibility", value: eligibility || "N/A" },
    { label: "Intakes", value: intakes || "N/A" },
  ];



  return (
    <>
      <div className="relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] overflow-hidden bg-white mt-5">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image */}
              <div
                className="relative mx-auto w-[94%] h-full bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center px-4 sm:px-8">
                  <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-white mb-4 sm:mb-6 drop-shadow-md">
                      {slide.shortName}
                    </p>
                    <div className="flex justify-center items-center gap-4 sm:gap-6">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium sm:font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 text-sm sm:text-base">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Enquiry Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Program Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {programDetails.map((detail, index) => (
          <div key={index} className="text-center">
            <div className="text-gray-600 text-xs sm:text-sm font-medium mb-2">
              {detail.label}
            </div>
            <div className="text-gray-900 text-sm sm:text-base font-semibold">
              {detail.value}
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          About The Programme
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-4xl mx-auto">
          {about}
        </p>
      </div>
    </div>
    </>
  );
}
