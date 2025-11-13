"use client";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import SupportForm from "../modal/Form";
import { getAllTourPackages } from "@/redux/slices/tourPackageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";



export default function SpecialDeal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
const dispatch = useDispatch();
const router = useRouter();
const{tourPackageList, loading, error}=useSelector((state)=>state.tourPackages)

useEffect(()=>{
  dispatch(getAllTourPackages())
},[dispatch])

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
    <div className="py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        {}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-8">
          Special Deals
        </h2>

        {}
        <div className="grid grid-flow-col sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto sm:overflow-visible scrollbar-hide pb-4">
          {tourPackageList.map((pkg) => (
            <div
              key={pkg._id}
              onClick={()=>router.push(`/special-deals/${pkg._id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full min-w-[260px] sm:min-w-0"
            >
              {}
              <div className="relative">
                {/* <span className="absolute top-3 left-3 bg-[#6385CF] text-white text-xs font-semibold px-3 py-1 rounded">
                  For Sale
                </span> */}
                <img
                  src={pkg.bannerImage}
                  alt={pkg.name}
                  className="w-full h-44 sm:h-48 object-cover"
                />
              </div>

              {}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2 text-black">
                  {pkg.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 flex-grow">
                  {pkg.subtitle}
                </p>

                {}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-blue-700 text-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Submit Enquiry
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 text-white bg-green-600 font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-green-700 text-sm">
                    <Phone className="w-4 h-4" />
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full relative max-h-[90vh] flex flex-col">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-3xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
              >
                ×
              </button>

              <div className="overflow-y-auto p-6">
                <SupportForm />
              </div>
            </div>
          </div>
        )}
      </div>

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
