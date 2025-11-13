import React from "react";

export default function KeyHighlights({ highlights = [] }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
        Key Highlights
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {Array.isArray(highlights) && highlights.length > 0 ? (
          highlights.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center text-center group bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                {item.title}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No highlights available.
          </p>
        )}
      </div>
    </div>
  );
}
