"use client"
import React, { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPhoto({ gallery = [] }) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="bg-white py-6 px-4 sm:py-8 sm:px-6 md:px-8 lg:px-16 xl:px-24 mb-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Gallery
          </h2>
          <p className="text-center text-gray-500">No gallery images available</p>
        </div>
      </div>
    );
  }

  const openModal = (index) => {
    setSelectedMedia(index);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const goToPrevious = () => {
    setSelectedMedia((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const goToNext = () => {
    setSelectedMedia((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bg-white py-6 px-4 sm:py-8 sm:px-6 md:px-8 lg:px-16 xl:px-24 mb-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
          Gallery
        </h2>

        {/* Desktop/Tablet Grid View */}
        <div className="hidden md:grid md:grid-cols-4 gap-3 md:gap-4">
          {gallery.slice(0, 4).map((item, index) => (
            <div 
              key={item._id || index}
              className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                index === 0 ? 'col-span-1 row-span-2' : 
                index === 3 ? 'col-span-2 row-span-2' : 
                'col-span-1'
              }`}
              onClick={() => openModal(index)}
            >
              <img
                src={item.image}
                alt={item.caption || `Gallery image ${index + 1}`}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                  index === 0 || index === 3 ? 'min-h-[400px]' : 'h-[195px]'
                }`}
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-8 h-8 text-gray-800 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Scrollable View */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-4">
            {gallery.map((item, index) => (
              <div
                key={item._id || index}
                className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[280px] sm:w-[320px]"
                onClick={() => openModal(index)}
              >
                <img
                  src={item.image}
                  alt={item.caption || `Gallery image ${index + 1}`}
                  className="w-full h-[200px] sm:h-[240px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800 ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full">
            <img
              src={gallery[selectedMedia].image}
              alt={gallery[selectedMedia].caption || `Gallery image ${selectedMedia + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base">
            {selectedMedia + 1} / {gallery.length}
          </div>
        </div>
      )}

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