import React from 'react';

export default function VillaIntroduction({ description, image }) {
  return (
    <div className=" py-6 sm:py-8 md:py-10 lg:py-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-7xl">
        {/* Introduction Section */}
        <div className="bg-white rounded-lg  overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Text Content */}
            <div className="p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-center lg:text-left leading-tight">
                Introduction
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed text-justify hyphens-auto">
{description}              </p>
            </div>

            {/* Image Content */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-[300px] xl:min-h-[300px] order-1 lg:order-2">
              <img 
                src={image}
                alt="Villa Aerial View"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-l"></div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}