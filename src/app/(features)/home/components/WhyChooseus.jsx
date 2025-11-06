export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: 'Trusted Expertise',
      image: '/time.png',
      alt: 'Trusted Expertise'
    },
    {
      id: 2,
      title: 'Hassle-Free Process',
      image: '/face.png',
      alt: 'Hassle-Free Process'
    },
    {
      id: 3,
      title: 'Premium Support',
      image: 'handshake.png',
      alt: 'Premium Support'
    },
    {
      id: 4,
      title: 'Transparent Deals',
      image: 'self.png',
      alt: 'Transparent Deals'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-2 bg-white mb-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-black mb-8 sm:mb-10 lg:mb-10">
        Why Choose Us
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className="flex flex-col items-center text-center"
          >
            <div className="mb-3 sm:mb-4 lg:mb-6">
              <img 
                src={feature.image} 
                alt={feature.alt}
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 object-contain"
              />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 px-2">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}