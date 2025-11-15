import React from "react";

export default function CarHero() {
  return (
    <div className="w-full">
      {}
      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          {}
          <div className="block lg:hidden flex justify-center mb-6">
            <img
              src="/carbanner.png"
              alt="Orange SUV with roof rack"
              className="w-60 sm:w-72 md:w-80 h-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {}
            <div className="p-6 sm:p-8 lg:p-12 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003777] leading-tight mb-4">
                Smart Trades. Upgrade With Confidence.
              </h1>
              <p className="text-blue-600 text-lg sm:text-xl font-medium mb-8">
                All makes. Every model. Yours to choose.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
                  Explore Cars
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 transition-colors">
                  Sell Cars
                </button>
              </div>
            </div>

            {}
            <div className="hidden lg:flex relative bg-gradient-to-br from-blue-500 to-blue-600 p-4 lg:p-6 min-h-[120px] items-center justify-center">
              <div className="relative flex justify-start w-full">
                <img
                  src="/carbanner.png"
                  alt="Orange SUV with roof rack"
                  className="w-[400px] h-auto object-contain drop-shadow-2xl -ml-40"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
