import { Hospital, School, Store, Train } from 'lucide-react';

export default function NearBy({property}) {


  return (
    <div className="sm:p-6">
      <div className="w-full md:w-2/3 lg:w-2/3 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-8">
          <h2 className="text-3xl sm:text-4xl lg:text-2xl font-bold text-slate-800 mb-8 sm:mb-10">
            Nearby Amenities
          </h2>

          {/* Changed from grid to vertical stack */}
          <div className="space-y-4">
            {property?.amenities?.length > 0 ? (
              property?.amenities?.map((feature, index) => (
            
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg  hover:bg-gray-100 transition"
                >
                                 <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>

                  <span className="text-slate-700 font-medium text-base">
                    {feature}
                  </span>
                </div>
              ))
            ):(
                            <p className="text-gray-500 text-base">No features available.</p>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}
