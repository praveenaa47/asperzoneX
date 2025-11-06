"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTestimonials } from "@/redux/slices/TestimonialSlice";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  // Access data from Redux state
  const { testimonialList, loading, error } = useSelector(
    (state) => state.testimonials
  );

  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!testimonialList || testimonialList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonialList]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading testimonials...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load testimonials.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      <h2 className="text-4xl font-bold text-center text-black">
        What Our Clients Say
      </h2>

      <div className="rounded-2xl p-8 md:p-12 bg-white relative overflow-hidden">
        {testimonialList && testimonialList.length > 0 ? (
          <>
            {/* Slider */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialList.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="w-full flex-shrink-0 flex flex-col items-center text-center px-4"
                >
                  <img
                    src={testimonial.profileImage}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-gray-200"
                  />

                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {testimonial.name}
                  </h3>

                  <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
                    "{testimonial.message}"
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonialList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-blue-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No testimonials available.</p>
        )}
      </div>
    </div>
  );
}
