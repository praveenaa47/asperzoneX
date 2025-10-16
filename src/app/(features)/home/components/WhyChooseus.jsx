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
    <div className=" px-4 py-16 bg-white">
      <h2 className="text-4xl font-bold text-center text-black mb-16">Why Choose Us</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">
              <img 
                src={feature.image} 
                alt={feature.alt}
                className="w-18 h-18 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}