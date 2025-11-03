"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Building Spaces That Reflect Your Dreams",
      subtitle: "Relax On Pristine Beaches And Enjoy Luxury Resorts With Stunning Ocean Views.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
    },
    {
      title: "Building Spaces That Reflect Your Dreams",
      subtitle: "Experience Overwater Bungalows And Crystal Clear Turquoise Lagoons.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
    },
    {
      title: "Building Spaces That Reflect Your Dreams",
      subtitle: "Discover White-Washed Villages And Breathtaking Sunset Views Over The Sea.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="relative w-full h-auto min-h-[400px] md:min-h-[500px] overflow-hidden bg-white mt-5 pb-4 md:pb-0">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={`/consulting-details/${id}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div
                className="relative mx-auto w-[95%] md:w-[90%] h-[380px] sm:h-[420px] md:h-[450px] lg:h-[370px] bg-cover bg-center rounded-xl md:rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-10">
                  <div className="text-center max-w-5xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-white mb-4 md:mb-6 drop-shadow-md px-2">
                      {slide.subtitle}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 mt-4 md:mt-6">
                      <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
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

                      <button className="w-full sm:w-auto bg-gray-400 hover:bg-blue-700 text-white font-semibold px-5 md:px-6 py-2.5 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
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
                        View Projects
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 lg:left-20 top-1/3 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 lg:right-20 top-1/3 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-6 md:w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75 w-2 md:w-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Description Section */}
      <div className="text-center px-4 sm:px-6 md:px-8 lg:px-4 py-6 ">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl italic text-blue-600 font-medium leading-relaxed max-w-6xl mx-auto">
          Our <span className="font-semibold">Dream Home Consultancy</span> Service Helps You Find, Design, And Customize Your Ideal Home. From <span className="font-semibold">Property Selection</span> To <span className="font-semibold">Interiors</span>, We're With You Every Step.
        </h2>
      </div>
    </>
  );
}