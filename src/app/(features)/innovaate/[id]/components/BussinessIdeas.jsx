"use client";
import { useState } from 'react';
import { Heart, Share2, MessageSquare } from 'lucide-react';

export default function BusinessIdeasSection() {
  const [favorites, setFavorites] = useState({});

  const ideas = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      author: 'Alex Doen',
      date: 'March 15 2025',
      category: 'Tech',
      title: 'Smart Modular Homes',
      description: 'Eco-Friendly Prefab Homes That Can Be Expanded Or Customized As Your Family Grows.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
      author: 'Alex Doen',
      date: 'March 15 2025',
      category: 'Tech',
      title: 'Solar-Powered Charging Stations',
      description: 'Community-Based Solar Hubs That Provide Clean Energy For EVs And Portable Devices.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop',
      author: 'Alex Doen',
      date: 'March 15 2025',
      category: 'Tech',
      title: 'Solar-Powered Charging Stations',
      description: 'Community-Based Solar Hubs That Provide Clean Energy For EVs And Portable Devices.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop',
      author: 'Alex Doen',
      date: 'March 15 2025',
      category: 'Tech',
      title: 'Smart Modular Homes',
      description: 'Eco-Friendly Prefab Homes That Can Be Expanded Or Customized As Your Family Grows.'
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEnquiry = (title) => {
    alert(`Enquiry sent for: ${title}`);
  };

  const handleShare = (title) => {
    alert(`Sharing: ${title}`);
  };

  return (
    <div className="py-8 md:py-16 lg:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-10 md:mb-14">
          Business Ideas
        </h2>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <span>By {idea.author}</span>
                    <span className="mx-2">•</span>
                    <span>{idea.date}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                    {idea.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {idea.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base mb-5">
                  {idea.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-3">
                  {/* Enquiry Button */}
                  <button
                    onClick={() => handleEnquiry(idea.title)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Enquiry Now
                  </button>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(idea.id)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      favorites[idea.id]
                        ? 'border-red-500 text-red-500 bg-red-50'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites[idea.id] ? 'fill-current' : ''}`}
                    />
                    Favorite
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(idea.title)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}