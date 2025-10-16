import { ArrowRight, Calendar } from 'lucide-react';

export default function Programs() {
  const blogs = [
    {
      id: 1,
      title: 'MBA',
      description:"Master of Business Administration program for future leaders",
      date: '27 Apr',
      image: '/card2.jpg',
      link: '#'
    },
    {
      id: 2,
      title: 'Engineering',
            description:"Master of Business Administration program for future leaders",

      date: '27 Apr',
      image: '/card3.jpg',
      link: '#'
    },
    {
      id: 3,
      title: 'Design',
            description:"Master of Business Administration program for future leaders",

      date: '27 Apr',
      image: '/card2.jpg',
      link: '#'
    },
    {
      id: 4,
      title: 'Medicine',
            description:"Master of Business Administration program for future leaders",

      date: '27 Apr',
      image: '/card3.jpg',
      link: '#'
    }
  ];

  return (
    <div className=" px-4 py-10 bg-white">
      <h2 className="text-4xl font-bold text-center text-black mb-12">Explore Our Programs</h2>
      
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
                <p className="text-sm font-normal text-gray-500 mb-3 line-clamp-2">
                  {blog.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}