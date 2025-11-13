"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getHomeConsulting } from "@/redux/slices/homeConsultingSlice";

export default function Destinations() {
  const dispatch = useDispatch();
  const router = useRouter();

  
  const { data = [], loading, error } = useSelector(
    (state) => state.homeConsulting
  );

  
  useEffect(() => {
    dispatch(getHomeConsulting());
  }, [dispatch]);

  const handleNavigate = (id) => {
    router.push(`/consulting-details/${id}`);
  };

  return (
    <div className="px-4 md:px-10 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-6">
        Featured Projects
      </h2>

      {}
      {loading && (
        <p className="text-center text-gray-500">Loading projects...</p>
      )}

      {}
      {error && (
        <p className="text-center text-red-500">
          Failed to load data: {error.message || error}
        </p>
      )}

      {}
      {!loading && data?.length > 0 && (
        <div className="md:grid md:grid-cols-3 md:gap-6 md:p-10 mb-8">
          <div className="flex md:contents overflow-x-auto gap-4 md:gap-0 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 -mx-4 md:mx-0">
            {data.map((consulting) => (
              <div
                key={consulting._id}
                onClick={() => handleNavigate(consulting._id)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-[calc(100vw-2rem)] md:w-auto snap-center cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={consulting.bannerImage}
                    alt={consulting.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-black line-clamp-1">
                    {consulting.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {consulting.subtitle}
                  </p>

                  <button className="w-full flex items-start px-4 gap-2 text-blue-600 font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white">
                    Enquiry Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
