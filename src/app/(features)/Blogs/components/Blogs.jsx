import React from 'react';
import { Clock } from 'lucide-react';

export default function Blogsdetails() {
  const articles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
      title: 'Top 5 Tips for Buying Your First Home',
      description: 'Make your first property purchase smooth and stress-free with these practical tips.',
      readTime: '4 Min',
      date: 'August 19, 2022'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      title: 'Real Estate Trends to Watch in 2025',
      description: 'Stay ahead with insights on the latest market shifts and opportunities.',
      readTime: '4 Min',
      date: 'August 19, 2022'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
      title: 'How to Increase Your Property Value with Simple Upgrades',
      description: 'Stay ahead with insights on the latest market shifts and opportunities.',
      readTime: '4 Min',
      date: 'August 19, 2022'
    }
  ];

  return (
    <div className="w-full  px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        Aspire Insights
      </h1>

      {/* Articles List */}
      <div className="space-y-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full md:w-40 h-40 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex items-center md:items-start">
                <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}