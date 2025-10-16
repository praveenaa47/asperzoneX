import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Travel & Holidays',
      description: 'Why Travelling Is The Best Investment You Will Ever Make',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
      link: `/travel-tourism/${1}`
    },
    {
      id: 2,
      title: 'Real Estate',
      description: 'Smart Solutions For Property Owners And Seekers',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      link: `/real-estate/${1}`
    },
    {
      id: 3,
      title: 'Dream Home Consulting',
      description: 'Turn Your Vision Into Your Dream House',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      link: `/homeConsulting/${1}`
    },
    {
      id: 4,
      title: 'Car',
      description: "Drive Home The Car You've Been Waiting For.",
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop',
      link: `/cars/${1}`
    },
    {
      id: 5,
      title: 'Finance And Business',
      description: 'Your Partner In Finance And Business Strategy',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
      link: `/finance-bussiness/${1}`
    },
    {
      id: 6,
      title: 'Higher Education',
      description: "Discover The Higher Education Path That's Right For You",
      image: 'https://static.vecteezy.com/system/resources/thumbnails/013/038/951/small_2x/close-up-the-boy-sits-staring-at-the-laptop-and-his-hand-is-holding-the-mouse-educational-concept-educational-information-search-copy-space-free-photo.jpg',
      link: `/higher-education/${1}`
    },
    {
      id: 7,
      title: 'Talent & Career',
      description: 'Your Next Career Move Starts Here',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      link: `/careers/${1}`
    },
    {
      id: 8,
      title: 'Innovate X',
      description: 'Explore Your Inner Strength And Let Your Ideas Shine',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      link: `/innovaate/${1}`
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-15 bg-white">
      <div className=" px-4 sm:px-6 ">
        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-center text-gray-900 sm:mb-12 ">
          Our Services For You
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600  sm:mb-5">
                  {service.description}
                </p>

                {/* Discover Link */}
                <a
                  href={service.link}
                  className="inline-flex items-center text-blue-600 font-semibold text-sm sm:text-base hover:text-blue-700 transition-colors group/link"
                >
                  Discover
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;