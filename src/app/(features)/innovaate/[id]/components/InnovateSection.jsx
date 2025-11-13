"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, File, Notebook } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselByCategoryId } from "@/redux/slices/carouselSlice";
import { useParams } from "next/navigation";

export default function Innovaate() {
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
        carouselByCategory.length ? (prev + 1) % carouselByCategory.length : 0
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselByCategory]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % (carouselByCategory?.length || 1));
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
                className="relative w-[94%] sm:w-[92%] md:w-[90%] mx-auto h-[90%] bg-cover bg-center rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content */}
                <div className="relative flex items-center justify-center h-full px-4 sm:px-8 md:px-10">
                  <div className="text-center text-white max-w-3xl md:max-w-4xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 drop-shadow-md leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 drop-shadow-sm px-2 sm:px-0">
                      {slide.subtitle}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2">
                      <Notebook className="w-5 h-5" />
                        Share Your Idea
                      </button>

                      <button className="bg-gray-800 hover:bg-green-700 text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2">
                        Discover New Address
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
    </>
  );
}
