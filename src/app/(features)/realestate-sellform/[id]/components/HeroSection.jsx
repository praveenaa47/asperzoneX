"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export default function FrontHero() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [propertyType, setPropertyType] = useState("Residential");
  const [searchQuery, setSearchQuery] = useState("");

  

  return (
    <div className="w-full">
    

      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('/estatebanner.jpg')",
        }}
      >

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
      </div>

    </div>
  );
}
