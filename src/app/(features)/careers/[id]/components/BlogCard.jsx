import React from 'react';
import { User, Calendar } from 'lucide-react';

const BlogPostCard = ({ 
  image, 
  author = "Alex Dean", 
  date = "March 15 2025", 
  title, 
  description, 
  keyTopics 
}) => {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <User size={16} />
            By {author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {date}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-700 mb-4">
          {description}
        </p>
        <div className="mb-4">
          <span className="font-semibold text-gray-900">Key Topics:</span>
          <span className="text-gray-700"> {keyTopics}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          📧 Enquiry Now
        </button>
      </div>
    </article>
  );
};

export default BlogPostCard;