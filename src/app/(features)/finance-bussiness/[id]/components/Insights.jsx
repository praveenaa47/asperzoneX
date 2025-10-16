import { ArrowRight, Calendar } from 'lucide-react';

export default function Insights() {
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
    <div className=" px-4 py-10 bg-white">
      <h2 className="text-4xl font-bold text-center text-black mb-12">Business Insights & Updates</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            
            <div className="p-5 relative overflow-hidden">
              <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                
                <a 
                  href={blog.link}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300"
                >
                  Know More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}