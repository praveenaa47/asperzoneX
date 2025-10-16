import { Home, Shield, Droplets, Sun, Warehouse, DoorOpen, Leaf, UtensilsCrossed } from 'lucide-react';

export default function PropertyFeatures() {
  const features = [
    { icon: Home, text: 'Traditional Architecture' },
    { icon: Shield, text: '24/7 Security' },
    { icon: UtensilsCrossed, text: 'Wooden Ceilings' },
    { icon: Sun, text: 'Solar Water Heater' },
    { icon: Warehouse, text: 'Central Courtyard' },
    { icon: Droplets, text: 'Rainwater Harvesting' },
    { icon: UtensilsCrossed, text: 'Modern Kitchen' },
    { icon: DoorOpen, text: 'Walk-in Closets' },
    { icon: Droplets, text: 'Private Well' },
    { icon: UtensilsCrossed, text: 'Modular Kitchen' },
    { icon: Leaf, text: 'Landscaped Garden' },
    { icon: Home, text: 'Heritage Preservation' }
  ];

  return (
    <div className="sm:p-6 ">
      <div className=" w-full md:w-1/4 lg:w-2/3 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-3xl sm:text-4xl lg:text-2xl font-bold text-slate-800 mb-8 sm:mb-12">
            Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg  transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 w-10 h-10  rounded-full flex items-center justify-center  transition-colors duration-200">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm sm:text-base">
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