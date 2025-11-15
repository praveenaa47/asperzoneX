"use client";
import { getDestinations } from "@/redux/slices/destinationSlice";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CarListing() {
  const dispatch = useDispatch();
  const {
    data: destinations,
    loading,
    error,
  } = useSelector((state) => state.destinations);
  const router = useRouter();

  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch]);

  {
    loading && (
      <p className="text-center text-gray-500">Loading destinations...</p>
    );
  }
  {
    error && (
      <p className="text-center text-red-500">
        Failed to load destinations: {error}
      </p>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-8">
          Popular Destinations
        </h2>

        {}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full"
            >
              {}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {}
              <div className="flex flex-col flex-grow justify-between p-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-black">
                    {dest.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {dest.subtitle}
                  </p>
                </div>

                <button
                onClick={()=>router.push(`/destination-details/${dest._id}`)}
                 className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 font-semibold py-2 rounded-lg border border-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white">
                  <span>Enquiry Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {destinations.map((dest) => (
              <div  
                key={dest._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between flex-shrink-0 w-[280px] sm:w-[320px]"
              >
                <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                  <img
                    src={dest.coverImage}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-grow justify-between p-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-black">
                      {dest.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">
                      {dest.subtitle}
                    </p>
                  </div>

                  <button className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 font-semibold py-2 rounded-lg border border-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white text-sm sm:text-base">
                    <span>Enquiry Now</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
