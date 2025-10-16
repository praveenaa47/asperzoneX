"use client";
import { useState, useEffect } from 'react';

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Mehta',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      text: 'The Team Made Buying My First Home Such A Smooth Experience. Their Guidance Was Professional, Transparent, And Trustworthy.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
      text: 'Exceptional Service! They Helped Me Find My Dream Car At The Best Price. Highly Recommend Their Expertise And Support.'
    },
    {
      id: 3,
      name: 'Arjun Singh',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop',
      text: 'Professional Consulting Services That Delivered Real Results. Their Team Is Knowledgeable, Responsive, And Trustworthy.'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop',
      text: 'Outstanding Experience From Start To Finish. They Made The Entire Process Easy And Stress-Free.'
    }
  ];

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      <h2 className="text-4xl font-bold text-center text-black">What Our Clients Say</h2>
      
      <div className="rounded-2xl p-8 md:p-12 bg-white relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="w-full flex-shrink-0 flex flex-col items-center text-center px-4"
            >
              <img 
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-gray-200"
              />
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {testimonial.name}
              </h3>
              
              <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-blue-600' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}