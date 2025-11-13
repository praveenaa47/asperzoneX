"use client";
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PopularPlaces({ places = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!places || places.length === 0) {
    return (
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Popular Places To Explore
          </h2>
          <p className="text-center text-gray-500">No popular places available</p>
        </div>
      </div>
    );
  }

  // Add position properties for carousel
  const placesWithPosition = places.map((place, index) => ({
    ...place,
    position: index - currentIndex
  }));

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? places.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === places.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Popular Places To Explore
        </h2>

        {/* Desktop Carousel View */}
        <div className="hidden lg:block relative">
          <div className="flex items-center justify-center h-[400px] relative">
            {placesWithPosition.map((place, index) => {
              const { position } = place;
              let transform = '';
              let zIndex = 0;
              let scale = 1;
              let opacity = 1;

              if (position === 0) {
                transform = 'translateX(0%) translateY(-20px)';
                zIndex = 30;
                scale = 1.15;
              } else if (position === -1) {
                transform = 'translateX(-85%) translateY(0px)';
                zIndex = 20;
                scale = 0.9;
              } else if (position === 1) {
                transform = 'translateX(85%) translateY(0px)';
                zIndex = 20;
                scale = 0.9;
              } else if (position === -2) {
                transform = 'translateX(-170%) translateY(0px)';
                zIndex = 10;
                scale = 0.8;
                opacity = 0.6;
              } else if (position === 2) {
                transform = 'translateX(170%) translateY(0px)';
                zIndex = 10;
                scale = 0.8;
                opacity = 0.6;
              }

              return (
                <div
                  key={place._id || index}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    transform: `${transform} scale(${scale})`,
                    zIndex,
                    opacity,
                    width: '280px'
                  }}
                >
                  <div className="relative h-[320px] rounded-xl overflow-hidden shadow-2xl cursor-pointer group">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
                      <p className="text-sm opacity-90">{place.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Scrollable View */}
        <div className="lg:hidden">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4">
              {places.map((place) => (
                <div
                  key={place._id}
                  className="flex-shrink-0 w-[280px] sm:w-[320px]"
                >
                  <div className="relative h-[300px] sm:h-[340px] rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">{place.name}</h3>
                      <p className="text-sm opacity-90">{place.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}