import React from 'react';
import { Mail } from 'lucide-react';

export default function HeroAbout() {
  return (
       <div className="relative h-[500px] sm:h-[600px] md:h-[500px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/estatebanner.jpg')`,
        }}
      >
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            About Aspire Zone
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 md:mb-12 max-w-2xl leading-relaxed">
            Helping You Find Your Dream Home And Create Memorable Journeys With Ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Mail className="w-5 h-5" />
              <span>Contact us</span>
            </button>

            <button className="bg-gray-300 bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 border border-white border-opacity-30 hover:border-opacity-50">
              Explore Services
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}