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
    {
      id: 5,
      title: 'Retirement Planning',
      image: '/img5.gif',
      alt: 'Quick Response'
    },
    {
      id: 6,
      title: 'Risk Management',
      image: '/img6.gif',
      alt: 'Competitive Pricing'
    },
    {
      id: 7,
      title: 'Tax Optimization',
      image: '/img7.gif',
      alt: 'Secure Transactions'
    },
    {
      id: 8,
      title: 'Digital Transformation Consulting',
      image: '/img8.gif',
      alt: 'Expert Guidance'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
      <div className=" mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-center text-black mb-12 md:mb-16">
          Why Book Us
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center p-6 md:p-8 shadow-lg rounded-3xl hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="mb-4 md:mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.alt}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}