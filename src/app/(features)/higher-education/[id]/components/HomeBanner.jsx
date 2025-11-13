"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselByCategoryId } from "@/redux/slices/carouselSlice";
import { useParams } from "next/navigation";

export default function HomeBanner() {
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
      {/* HERO SECTION */}
      <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] overflow-hidden mt-5">
        {/* SLIDES */}
        <div className="relative w-full h-full">
          {carouselByCategory.map((slide, index) => (
            <div
              key={slide._id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="relative w-[94%] sm:w-[92%] md:w-[90%] mx-auto h-full bg-cover bg-center rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="relative flex items-center justify-center h-full px-4 sm:px-8 md:px-10">
                  <div className="text-center text-white max-w-3xl md:max-w-4xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-md leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 drop-shadow-sm px-2 sm:px-0">
                      {slide.subtitle}
                    </p>
                    <div className="flex justify-center">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
          {carouselByCategory.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-6 sm:w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM TEXT */}
      <div className="text-center px-4 py-8 sm:py-10">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-blue-600 font-medium leading-relaxed">
          Whether{" "}
          <span className="font-semibold">
            you're starting a business, need help with financial planning, or
            want to{" "}
          </span>
          optimize your operations, our Finance & Business services guide you
          every step.{" "}
          <span className="font-semibold">Transparent, Custom </span>
          To <span className="font-semibold">Advisory</span>, Built to Your
          Goals.
        </h2>
      </div>
    </>
  );
}
