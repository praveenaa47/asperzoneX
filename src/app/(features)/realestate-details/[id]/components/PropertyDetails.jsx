import { Home, Shield, Droplets, Sun, Warehouse, DoorOpen, Leaf, UtensilsCrossed } from 'lucide-react';

export default function PropertyFeatures({property}) {

  return (
    <div className="sm:p-6 ">
      <div className=" w-full md:w-1/4 lg:w-2/3 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-3xl sm:text-4xl lg:text-2xl font-bold text-slate-800 mb-8 sm:mb-12">
            Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {property?.features?.length > 0 ? (
              property.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg transition-colors duration-200 group"
                >
                  {/* Dot indicator */}
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>

                  {/* Feature text */}
                  <span className="text-slate-700 font-medium text-sm sm:text-base capitalize">
                    {feature}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-base">No features available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}