"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { getCarouselByCategoryId } from "@/redux/slices/carouselSlice";

export default function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const { carouselByCategory, loading } = useSelector(
    (state) => state.carousels
  );

  
  useEffect(() => {
    if (id) dispatch(getCarouselByCategoryId(id));
  }, [dispatch, id]);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        carouselByCategory.length
          ? (prev + 1) % carouselByCategory.length
          : 0
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselByCategory]);

  const nextSlide = () =>
    setCurrentSlide(
      (prev) => (prev + 1) % (carouselByCategory?.length || 1)
    );
  const prevSlide = () =>
    setCurrentSlide(
      (prev) =>
        (prev - 1 + (carouselByCategory?.length || 1)) %
        (carouselByCategory?.length || 1)
    );
  const goToSlide = (index) => setCurrentSlide(index);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-gray-500 text-lg">Loading carousel...</p>
      </div>
    );
  }

  if (!carouselByCategory?.length) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-gray-500 text-lg">
          No carousel found for this category.
        </p>
      </div>
    );
  }

  return (
    <>
      {}
      <div className="relative w-full h-auto min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[550px] overflow-hidden bg-white mt-4 pb-6">
        <div className="relative w-full h-full">
          {carouselByCategory.map((slide, index) => (
            <div
              key={slide._id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {}
              <div
                className="relative w-[94%] sm:w-[90%] h-[320px] sm:h-[400px] md:h-[480px] lg:h-[500px] mx-auto bg-cover bg-center rounded-xl md:rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>

                {}
                <div className="relative flex flex-col items-center justify-center h-full px-3 sm:px-6 md:px-10 text-center">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-white mb-5 max-w-3xl mx-auto px-2 sm:px-0 drop-shadow-md">
                    {slide.subtitle}
                  </p>

                  {}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
                    <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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

                    <button className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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
          ))}
        </div>

        {}
        <div className="absolute bottom-3 sm:bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {carouselByCategory.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-5 sm:w-7"
                  : "bg-white/50 hover:bg-white/75 w-2 sm:w-3"
              }`}
            />
          ))}
        </div>
      </div>

      {}
      <div className="text-center px-4 sm:px-6 md:px-10 py-2">
        <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl italic text-blue-600 font-medium leading-relaxed max-w-6xl mx-auto">
          Our{" "}
          <span className="font-semibold">Dream Home Consultancy</span> Service
          Helps You Find, Design, And Customize Your Ideal Home. From{" "}
          <span className="font-semibold">Property Selection</span> To{" "}
          <span className="font-semibold">Interiors</span>, We're With You Every
          Step.
        </h2>
      </div>
    </>
  );
}
