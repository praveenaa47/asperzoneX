import React from 'react';
import { Car, RefreshCw, Key } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <Car className="w-12 h-12 text-teal-500" />,
      title: "Choose Your Car",
      description: "Browse a wide range of vehicles from all makes and models. Find the perfect match for your needs and style."
    },
    {
      id: 2,
      icon: <RefreshCw className="w-12 h-12 text-gray-700" />,
      title: "Trade, Upgrade",
      description: "Trade in your old car, upgrade to a new one, or rent for short-term flexibility—all with transparent pricing."
    },
    {
      id: 3,
      icon: <Key className="w-12 h-12 text-blue-600" />,
      title: "Get the Keys & Go!",
      description: "Receive your keys with a smile. Enjoy your new ride, knowing you made a smart, confident choice."
    }
  ];



  return (
    <>
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-12">
          How it work
        </h2>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="mb-6 relative">
                <div className="w-24 h-24 flex items-center justify-center ">
                  {step.icon}
                </div>
              </div>

              {/* Step Number and Title */}
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                {step.id}. {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional: Connecting Lines for Desktop */}
        <div className="hidden md:block relative -mt-64 mb-64">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform -translate-y-1/2"></div>
        </div>
      </div>
    </div>
   
    </>
  );
}