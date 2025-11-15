
"use client"

import { getTeamMembers } from "@/redux/slices/TeamSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MeetOurTeam() {
  
const dispatch = useDispatch();
const{data, loading, error}=useSelector((state)=>state.teams)


useEffect(()=>{
  dispatch(getTeamMembers())
},[dispatch])

  return (
    <div className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-10 lg:mb-14">
          Meet The Our Expert Team
        </h2>

        {/* Mobile Scrollable Container */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {data.map((member) => (
              <div
                key={member._id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex-shrink-0 w-64"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-800/90 via-blue-100/40 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-100">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 md:gap-8">
          {data.map((member) => (
            <div
              key={member._id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-800/90 via-blue-100/40 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-100">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
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