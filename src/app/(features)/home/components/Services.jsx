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
    <section className="py-12 sm:py-10 lg:py-10 bg-white">
      <div className="px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-2xl font-bold text-center text-gray-900 sm:mb-12">
          Our Services For You
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 p-4 sm:p-6 lg:p-10">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 sm:mb-5">
                    {service.description}
                  </p>

                  {/* Discover Button */}
                  <button
                    onClick={() => router.push(`/real-estate/${service._id}`)} 
                    className="inline-flex items-center text-blue-600 font-semibold text-sm sm:text-base hover:text-blue-700 transition-colors group/link"
                  >
                    Discover
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No categories found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
