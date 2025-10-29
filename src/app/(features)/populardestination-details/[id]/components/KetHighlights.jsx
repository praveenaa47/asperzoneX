import React from 'react';
import { MapPin, Plane, Waves, Palmtree, Users, Coffee } from 'lucide-react';

const ItineraryDay = ({ day, title, activities,  color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
     
        <div>
          <h3 className="text-lg font-bold text-blue-600 gap-4">{day} - {title}</h3>
          <p className="text-sm text-blue-600"></p>
        </div>
      </div>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span className="text-gray-700 text-sm leading-relaxed">{activity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function KeyHighlights() {
  const itinerary = [
    {
      day: "Day 1",
      title: "Arrival & Relaxation",
      color: "bg-blue-500",
      activities: [
        "Arrive At Velana International Airport, Maldives",
        "Private Speedboat Or Seaplane Transfer To Your Resort",
        "Check-In At Overwater Villa Or Beachfront Villa",
        "Welcome Drink And Orientation",
        "Evening: Leisure Time, Enjoy Resort Facilities Or Sunset Walk On The Beach"
      ]
    },
    {
      day: "Day 2",
      title: "Island Exploration & Water Activities",
      color: "bg-cyan-500",
      activities: [
        "Breakfast At The Resort",
        "Guided Island Hopping Tour (Visit 2-3 Nearby Islands)",
        "Snorkeling At Coral Reefs, Spotting Tropical Fish And Turtles",
        "Optional Kayaking Or Paddleboarding",
        "Evening: Dinner At A Beachside Restaurant"
      ]
    },
    {
      day: "Day 3",
      title: "Adventure & Excursions",
      color: "bg-green-500",
      activities: [
        "Morning: Scuba Diving Or Snorkeling Excursion (For Beginners, Guided Sessions Provided)",
        "Afternoon: Jet Ski Or Parasailing Adventure",
        "Sunset Dolphin Cruise (Optional Photography Opportunity)",
        "Evening: Relaxing Spa Session Or Resort Entertainment"
      ]
    },
    {
      day: "Day 4",
      title: "Cultural Experience & Leisure",
                color: "bg-orange-500",
      activities: [
        "Breakfast At Resort",
        "Visit Local Island Village For Cultural Experience (Handicrafts, Traditional Maldivian Snacks)",
        "Free Time For Beach Relaxation Or Swimming",
        "Optional Cooking Class Or Resort-Organized Games",
        "Evening: Romantic Beach Dinner Or Group BBQ"
      ]
    },
    {
      day: "Day 5",
      title: "Water Sports & Sunset Views",
      color: "bg-teal-500",
      activities: [
        "Morning: Snorkeling At Banana Reef Or Manta Point",
        "Afternoon: Leisure Time At The Villa Or Poolside",
        "Optional Diving Experience For Advanced Divers",
        "Evening: Sunset Cruise With Champagne And Snacks"
      ]
    },
    {
      day: "Day 6",
      title: "Departure",
      color: "bg-purple-500",
      activities: [
        "Breakfast And Check-Out",
        "Private Transfer To Velana International Airport",
        "Depart Maldives With Unforgettable Memories"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
         
          <h1 className="text-3xl md:text-4xl lg:text-2xl font-bold text-gray-800 mb-3">
            5 Nights / 6 Days Maldives Package-Detailed Itinerary
          </h1>
        </div>

        {/* Itinerary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {itinerary.map((day, index) => (
            <ItineraryDay
              key={index}
              day={day.day}
              title={day.title}
              activities={day.activities}
              color={day.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}