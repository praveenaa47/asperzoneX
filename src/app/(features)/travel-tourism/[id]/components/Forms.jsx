"use client";
import { useState } from "react";
import { Plane, MapPin, Building2 } from "lucide-react";
import FlightForm from "./TravelBooking/FlightForm";
import TourForm from "./TravelBooking/TourForm";
import HotelForm from "./TravelBooking/HotelForm";
import { useParams } from "next/navigation";

export default function TravelBooking({ showTabs = true, defaultTab = "flights" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "tours", label: "Tours", icon: MapPin },
    { id: "hotels", label: "Hotels", icon: Building2 },
  ];
  const { id: categoryId } = useParams();

  const renderForm = () => {
    switch (activeTab) {
      case "flights":
        return <FlightForm categoryId={categoryId} />;
      case "tours":
        return <TourForm categoryId={categoryId} />;
      case "hotels":
        return <HotelForm categoryId={categoryId} />;
      default:
        return <FlightForm categoryId={categoryId} />;
    }
  };

  if (!showTabs) {
    return (
      <div className="max-w-6xl mx-auto bg-white border border-blue-400 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">{renderForm()}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white border border-blue-400 rounded-lg shadow-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-8">{renderForm()}</div>
    </div>
  );
}