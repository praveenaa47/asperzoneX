"use client"
import { ArrowRight } from 'lucide-react';

export default function SimilarProjects() {
  const blogs = [
    {
      id: 1,
      title: 'Top 5 Tips For Buying Your First Home',
      date: '27 Apr',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 2,
      title: 'Top 5 Tips For Buying Your First Home',
      date: '27 Apr',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 3,
      title: 'Top 5 Tips For Buying Your First Home',
      date: '27 Apr',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop',
      link: '#'
    },
    {
      id: 4,
      title: 'Top 5 Tips For Buying Your First Home',
      date: '27 Apr',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
      link: '#'
    }
  ];

  return (
    <div className="bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Mobile Scrollable View */}
        <div className="block sm:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="flex-shrink-0 w-[280px] snap-center bg-white rounded-lg shadow-md overflow-hidden active:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded flex flex-col items-center leading-tight z-10">
                    <span>{blog.date}</span>
                  </span>
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <a 
                    href={blog.link}
                    className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold active:gap-3 transition-all duration-300"
                  >
                    Enquire
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>

        {/* Tablet/Desktop Grid View */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded flex flex-col items-center leading-tight z-10">
                  <span>{blog.date}</span>
                </span>
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              <div className="p-4 md:p-5 relative overflow-hidden">
                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <a 
                    href={blog.link}
                    className="inline-flex items-center gap-2 text-blue-600 text-sm md:text-base font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Enquire
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}