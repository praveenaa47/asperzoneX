"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DealsHero({ title, subtitle, image, about }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: title || "Beautiful Destination",
      subtitle: subtitle || "Explore amazing places around the world",
      image: image || "/default-bg.jpg",
      about: about || "Discover the wonders of this destination...",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-auto overflow-hidden bg-white py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-cover bg-center rounded-lg md:rounded-2xl overflow-hidden shadow-lg"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-10">
                    <div className="text-center max-w-5xl mx-auto">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <p className="text-sm sm:text-base md:text-lg text-white mb-4 sm:mb-6 drop-shadow-md px-2">
                        {slide.subtitle}
                      </p>
                      <div className="flex justify-center items-center mt-4 sm:mt-6">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 text-sm sm:text-base">
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
      </div>

      {/* About Section */}
      <div className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
            About the Destination
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
            {about}
          </p>
        </div>
      </div>
    </>
  );
}