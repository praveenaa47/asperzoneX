export default function WhatOffer() {
  const features = [
    {
      id: 1,
      title: 'Business Advisory & Strategy',
      image: '/img1.gif',
      alt: 'Trusted Expertise'
    },
    {
      id: 2,
      title: 'Financial Planning &  Budgeting',
      image: '/img2.gif',
      alt: 'Hassle-Free Process'
    },
    {
      id: 3,
      title: 'Loans & Financing Support',
      image: '/img3.gif',
      alt: 'Premium Support'
    },
    {
      id: 4,
      title: 'Investment/Capital Growth',
      image: '/img4.gif',
      alt: 'Transparent Deals'
    },

  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-8 sm:mb-12 md:mb-16">
          Why Book Us
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center p-4 sm:p-6 md:p-8 shadow-lg rounded-2xl sm:rounded-3xl hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="mb-3 sm:mb-4 md:mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.alt}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <h3 className="text-xs sm:text-base md:text-lg font-semibold text-gray-800 leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}