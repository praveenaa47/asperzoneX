"use client";
import { getCategoryTestimonials } from "@/redux/slices/TestimonialSlice";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ClientsReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { testimonialList, loading, error } = useSelector(
    (state) => state.testimonials
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getCategoryTestimonials(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!testimonialList || testimonialList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonialList.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonialList]);

  const stats = [
    { number: "1000+", label: "Vehicle listed" },
    { number: "1M+", label: "Users" },
    { number: "300+", label: "Happy clients" },
    { number: "600+", label: "User vehicles sold" },
  ];

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading testimonials...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">Failed to load testimonials.</div>;

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      <h2 className="text-4xl font-bold text-center text-black">
        What Our Clients Say
      </h2>

      <div className="rounded-2xl p-8 md:p-12 bg-white relative overflow-hidden">
        {testimonialList && testimonialList.length > 0 ? (
          <>
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

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonialList.map((_, index) => (
                <button
                  key={`dot-${index}`}
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

        {/* Stats Section */}
        <div className="w-full bg-white py-10 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </h3>
                <p className="text-base sm:text-lg text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
