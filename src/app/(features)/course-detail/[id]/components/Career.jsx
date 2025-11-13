import React from 'react';
import { BookOpen, Award, Users, Network, Briefcase } from 'lucide-react';

export default function Careers({careers = []}) {


  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
       Career Oppurtunities
      </h2>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {careers.map((career) => {
          return (
            <div
              key={career._id}
              className="flex flex-col items-center text-center group bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon Container */}
             <img
              src={career.icon}
              alt={career.title}
              className="w-16 h-16 object-contain mb-3 sm:mb-4"
            />

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                {career.title}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}