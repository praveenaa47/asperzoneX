"use client";
import { getMaincategory } from "@/redux/slices/MainCategorySlice";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ServicesSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: services, loading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getMaincategory());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="text-center text-gray-600">Loading categories...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="text-center text-red-500">
          Failed to load categories: {JSON.stringify(error)}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-8 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-10 lg:mb-12">
          Our Services For You
        </h2>

        {/* Services Grid - 2x2 on mobile, 2 columns on tablet, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="relative h-32 sm:h-44 lg:h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 lg:p-5">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-gray-900 line-clamp-2">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 sm:mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Discover Button */}
                  <button
                    onClick={() => router.push(`${service.link}/${service._id}`)} 
                    className="inline-flex items-center text-blue-600 font-semibold text-xs sm:text-sm lg:text-base hover:text-blue-700 transition-colors group/link"
                  >
                    Discover
                    <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full py-8">
              No categories found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;