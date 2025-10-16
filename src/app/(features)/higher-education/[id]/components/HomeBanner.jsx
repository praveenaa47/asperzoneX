"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Shape your future with global education",
      subtitle:
        "Relax On Pristine Beaches And Enjoy Luxury Resorts With Stunning Ocean Views.",
      image: "/educationbanner.jpg",
    },
    {
      title: "Shape your future with global education",
      subtitle:
        "Experience Overwater Bungalows And Crystal Clear Turquoise Lagoons.",
      image: "/educationbanner.jpg",
    },
    {
      title: "Shape your future with global education",
      subtitle:
        "Discover White-Washed Villages And Breathtaking Sunset Views Over The Sea.",
      image: "/educationbanner.jpg",
    },
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
      <div className="relative w-full  h-[60vh] overflow-hidden bg-white mt-5">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Background Image */}
              <div
                className="relative mx-auto w-[90%] h-[400px] sm:h-[450px] lg:h-[370px] bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center px-6 sm:px-10">
                  <div className="text-center max-w-5xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg text-white mb-6 drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    <div className="flex justify-center items-center gap-6 mt-6">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
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
          className="absolute left-2 sm:left-4 md:left-20 top-1/3 -translate-y-1/2  hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-30 top-1/3 -translate-y-1/2  bg-opacity-30 hover:bg-opacity-50 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6 sm:w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="text-center px-4 -mt-3">
        <h2 className="text-2xl md:text-3xl lg:text-2xl italic text-blue-600 font-normal leading-relaxed">
          From Undergraduate Programs To <span className="font-semibold">master’s abroad, and from scholarships to career guidance — our Higher Education services support you at every stage with personalized c </span>{" "}
          optimize your operations, our Finance & Business services guide you every step{" "}
          <span className="font-semibold">master’s abroad, and from scholarships to career guidance — our Higher Education services support you at every stage with personalized c</span> To{" "}
          <span className="font-semibold">and transparent guidance tailored to your goals</span>, Built to Your you
          Goals.
        </h2>
      </div>
    </>
  );
}
