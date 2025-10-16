import React from 'react';
import { Calendar, Fuel, Gauge, Settings, User, Key, FileText, Shield, FileCheck } from 'lucide-react';

export default function CarOverview() {
  const carDetails = [
    { icon: Calendar, label: 'Reg year', value: 'Aug 2018' },
    { icon: Fuel, label: 'Fuel', value: 'Petrol' },
    { icon: Gauge, label: 'KM', value: '34567' },
    { icon: Settings, label: 'Transmission', value: 'Manual' },
    { icon: Gauge, label: 'Engine capacity', value: '9000 cc' },
    { icon: User, label: 'Owner', value: '1st' },
    { icon: Calendar, label: 'Make year', value: '2017' },
    { icon: Key, label: 'Spare key', value: 'Yes' },
    { icon: FileText, label: 'Reg number', value: 'KL 51M6016', subLabel: '' },
    { icon: Shield, label: 'Insurance', value: '2028' },
    { icon: FileCheck, label: 'Insurance type', value: '3d party' }
  ];

  return (
    <div className="w-full  p-6">
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