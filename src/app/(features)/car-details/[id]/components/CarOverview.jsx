// components/CarOverview.jsx
import React from 'react';
import { Calendar, Fuel, Gauge, Settings, User, Key, FileText, Shield, FileCheck } from 'lucide-react';

export default function CarOverview({ car }) {
  const carDetails = [
    { 
      icon: Calendar, 
      label: 'Reg year', 
      value: car.year || 'N/A' 
    },
    { 
      icon: Fuel, 
      label: 'Fuel', 
      value: car.fuelType || 'N/A' 
    },
    { 
      icon: Gauge, 
      label: 'KM', 
      value: car.kmsDriven ? `${car.kmsDriven.toLocaleString()} km` : 'N/A' 
    },
    { 
      icon: Settings, 
      label: 'Transmission', 
      value: car.transmission || 'N/A' 
    },
    { 
      icon: Gauge, 
      label: 'Seating Capacity', 
      value: car.seatingCapacity ? `${car.seatingCapacity} seats` : 'N/A' 
    },
    { 
      icon: User, 
      label: 'Owner', 
      value: car.ownerType ? `${car.ownerType} owner` : 'N/A' 
    },
    { 
      icon: Calendar, 
      label: 'Make year', 
      value: car.year || 'N/A' 
    },
    { 
      icon: Key, 
      label: 'Brand', 
      value: car.brand || 'N/A' 
    },
    { 
      icon: FileText, 
      label: 'Model', 
      value: car.model || 'N/A' 
    },
    { 
      icon: Shield, 
      label: 'Color', 
      value: car.color || 'N/A' 
    },
    { 
      icon: FileCheck, 
      label: 'Category', 
      value: car.category?.name || 'N/A' 
    }
  ];

  return (
    <div className="w-full p-12">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Car Overview</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {carDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">{detail.label}</p>
                  <p className="text-sm font-semibold text-gray-800 break-words">
                    {detail.value}
                  </p>
                  {detail.subLabel && (
                    <p className="text-xs text-gray-600">{detail.subLabel}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}