"use client";
import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoGallery({ gallery = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!gallery.length) return null;

  const openLightbox = (image) => setSelectedImage(image);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction) => {
    const currentIndex = gallery.findIndex(
      (img) => img.image === selectedImage.image
    );
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % gallery.length
        : (currentIndex - 1 + gallery.length) % gallery.length;
    setSelectedImage(gallery[newIndex]);
  };

  return (
    <div className="bg-white py-6 sm:py-8 md:py-8 lg:py-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Gallery Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Photo Gallery
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-base">
            Journey through our construction and design process
          </p>
        </div>

        {/* Mobile Scrollable Gallery */}
        <div className="block sm:hidden mb-6">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[280px] snap-center"
                onClick={() => openLightbox(img)}
              >
                <div className="group relative overflow-hidden rounded-lg shadow-md active:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.image}
                      alt={`Gallery ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
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

        {/* Desktop/Tablet Grid Gallery */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {gallery.map((image, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
              onClick={() => openLightbox(image)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.image}
                  alt={image.alt || `Gallery ${i}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
          
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-1 sm:left-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
          >
            <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          {/* Image Container */}
          <div
            className="max-w-5xl max-h-[85vh] sm:max-h-[90vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex-1 flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.alt || "Selected"}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            {selectedImage.caption && (
              <p className="text-white text-center mt-3 sm:mt-4 text-sm sm:text-base md:text-lg px-4">
                {selectedImage.caption}
              </p>
            )}
          </div>

          {/* Next Button */}
          <button
            className="absolute right-1 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
          >
            <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>
        </div>
      )}
    </div>
  );
}
