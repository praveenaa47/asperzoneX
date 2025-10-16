export default function Providers() {
  const features = [
    {
      id: 1,
      title: 'Personalized Admission    Guidance',
      image: '/edu1.gif',
      alt: 'Trusted Expertise'
    },
    {
      id: 2,
      title: 'Partnerships with Global Universities',
      image: '/edu2.gif',
      alt: 'Hassle-Free Process'
    },
    {
      id: 3,
      title: 'Scholarship & Funding Assistance',
      image: '/edu3.gif',
      alt: 'Premium Support'
    },
    {
      id: 4,
      title: 'Visa & Career Counseling  ',
      image: '/edu4.gif',
      alt: 'Transparent Deals'
    },
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