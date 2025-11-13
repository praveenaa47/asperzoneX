import React from 'react';
import { MapPin, Plane, Waves, Palmtree, Users, Coffee } from 'lucide-react';

const ItineraryDay = ({ day, title, activities, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-blue-600 gap-4">
            {day} - {title}
          </h3>
        </div>
      </div>
      <ul className="space-y-2 sm:space-y-3">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
            <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              {activity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function KeyHighlights({ itinerary, duration, keyHighlights, includedHighlights, exclusions }) {
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="py-6 px-4 sm:py-8 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                {duration || 'Tour Package Itinerary'}
              </h1>
            </div>
            <p className="text-center text-gray-500">No itinerary available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="py-6 px-4 sm:py-8 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {duration || 'Tour Package Itinerary'}
            </h1>
          </div>

          {/* Itinerary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {itinerary.map((day, index) => (
              <ItineraryDay
                key={day._id || index}
                // day={day.day}
                title={day.title}
                activities={day.activities}
                color={day.color}
              />
            ))}
          </div>

          {/* Key Highlights Section */}
          {keyHighlights && keyHighlights.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
                Key Highlights
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {keyHighlights.map((highlight, index) => (
                  <div
                    key={highlight._id || index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 text-center"
                  >
                    <img
                      src={highlight.icon}
                      alt={highlight.title}
                      className="w-12 h-12 mx-auto mb-3"
                    />
                    <p className="text-sm font-medium text-gray-700">{highlight.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            {includedHighlights && includedHighlights.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-green-700 mb-4">Inclusions</h3>
                <ul className="space-y-2">
                  {includedHighlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {exclusions && exclusions.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-red-700 mb-4">Exclusions</h3>
                <ul className="space-y-2">
                  {exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">✗</span>
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
