"use client";
import React from "react";

export default function VillaPhases({sections}) {


  return (
    <div className="bg-white py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Phases */}
        <div className="space-y-6 sm:space-y-8 md:space-y-8 lg:space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-3 sm:space-y-4 md:space-y-5">
              {/* Phase Heading */}
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center px-2">
                Phase {section.title}
              </h2>

              {/* Image */}
              <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 sm:space-y-3 md:space-y-3">
                <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-base leading-relaxed text-justify px-2 sm:px-0">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 