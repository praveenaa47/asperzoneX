import { Hospital, School, Store, Train } from 'lucide-react';

export default function NearBy() {
  const features = [
    { icon: Hospital, text: '2 min walk to Hospital – Quick access to healthcare anytime.' },
    { icon: School, text: '500 m to School – Quality education right around the corner.' },
    { icon: Store, text: '1 km to Supermarket – Daily essentials within reach.' },
    { icon: Train, text: '5 km to Railway Station – Easy connectivity for travel.' },
  ];

  return (
    <div className="sm:p-6">
      <div className="w-full md:w-2/3 lg:w-2/3 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-8">
          <h2 className="text-3xl sm:text-4xl lg:text-2xl font-bold text-slate-800 mb-8 sm:mb-10">
            Nearby Amenities
          </h2>

          {/* Changed from grid to vertical stack */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg  hover:bg-gray-100 transition"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium text-base">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
