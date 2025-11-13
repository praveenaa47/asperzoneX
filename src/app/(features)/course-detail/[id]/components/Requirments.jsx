import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function AdmissionRequirements({requirements = []}) {


  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Admission Requirements
      </h2>

      {/* Requirements List */}
      <div className="space-y-4 sm:space-y-5">
        {requirements.map((req, index) => (
          <div
            key={index}
            className="flex items-start gap-3 sm:gap-4 group"
          >
            {/* Check Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle 
                className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 transition-colors duration-300 group-hover:text-purple-600" 
                strokeWidth={2}
              />
            </div>

            {/* Requirement Text */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              {req}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}