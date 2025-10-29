"use client"
import React, { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const galleryItems = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      alt: 'Overwater pool at sunset'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      alt: 'Woman enjoying tropical waters'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      alt: 'Underwater coral reef'
    },
    {
      type: 'video',
      url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
      alt: 'Aerial view of Maldives resort'
    }
  ];

  const openModal = (index) => {
    setSelectedMedia(index);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const goToPrevious = () => {
    setSelectedMedia((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const goToNext = () => {
    setSelectedMedia((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className=" bg-white py-8 px-4 mb-5">
      <div className="">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          Gallery
        </h2>

        {/* Gallery Grid - Exact Layout from Image */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Left Large Image - Spans 2 rows and 1 column */}
          <div 
            className="col-span-1 row-span-2 relative group cursor-pointer overflow-hidden"
            onClick={() => openModal(0)}
          >
            <img
              src={galleryItems[0].url}
              alt={galleryItems[0].alt}
              className="w-full h-full object-cover aspect-[3/4] md:aspect-auto md:min-h-[400px] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Top Right Small Image */}
          <div 
            className="col-span-1 relative group cursor-pointer overflow-hidden"
            onClick={() => openModal(1)}
          >
            <img
              src={galleryItems[1].url}
              alt={galleryItems[1].alt}
              className="w-full h-full object-cover aspect-square md:h-[195px] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Large Video - Spans 2 columns and 2 rows */}
          <div 
            className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden"
            onClick={() => openModal(3)}
          >
            <img
              src={galleryItems[3].thumbnail}
              alt={galleryItems[3].alt}
              className="w-full h-full object-cover aspect-video md:min-h-[400px] group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-gray-800 ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Bottom Left Small Image */}
          <div 
            className="col-span-1 relative group cursor-pointer overflow-hidden"
            onClick={() => openModal(2)}
          >
            <img
              src={galleryItems[2].url}
              alt={galleryItems[2].alt}
              className="w-full h-full object-cover aspect-square md:h-[195px] group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 hidden md:block"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 hidden md:block"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Media Content */}
          <div className="max-w-5xl max-h-[90vh] w-full">
            {galleryItems[selectedMedia].type === 'video' ? (
              <div className="relative w-full aspect-video">
                <img
                  src={galleryItems[selectedMedia].thumbnail}
                  alt={galleryItems[selectedMedia].alt}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-gray-800 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={galleryItems[selectedMedia].url}
                alt={galleryItems[selectedMedia].alt}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedMedia + 1} / {galleryItems.length}
          </div>
        </div>
      )}
    </div>
  );
}