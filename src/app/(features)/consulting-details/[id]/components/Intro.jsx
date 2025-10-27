import React from 'react';

export default function VillaIntroduction() {
  const projectStats = [
    {
      label: "Location",
      value: "Kochi, Kerala"
    },
    {
      label: "Total Cost",
      value: "₹1.2 Crore"
    },
    {
      label: "Duration",
      value: "8 Months"
    },
    {
      label: "5,000 Sq. Ft",
      value: "4 Bedrooms"
    }
  ];

  return (
    <div className="bg-gray-50 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {projectStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <p className="text-lg md:text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Text Content */}
            <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 text-center lg:text-left">
                Introduction
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
                Every Dream Home Begins With An Idea — A Vision That Grows Into Something Extraordinary. 
                This Project Tells The Story Of How Our Team Transformed A Blank Plot Into A Luxury Villa 
                That Reflects Elegance, Sustainability, And Warmth. From The First Sketch To The Final Brick, 
                Every Step Was Guided By Passion And Precision. This Villa Stands As A Testament To Thoughtful 
                Design, Blending Modern Architecture With The Timeless Comfort Of Home.
              </p>
            </div>

            {/* Image Content */}
            <div className="relative h-80 md:h-96 lg:h-auto lg:min-h-[500px] order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Villa Aerial View"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Optional: Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-l"></div>
              
              {/* Corner Frame Decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-3 border-l-3 border-white opacity-70"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-3 border-r-3 border-white opacity-70"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-3 border-l-3 border-white opacity-70"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-3 border-r-3 border-white opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}