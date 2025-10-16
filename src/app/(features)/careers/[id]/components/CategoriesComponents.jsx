import React from 'react';

const Categories = ({ categories, onShowMore }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className="px-3 py-1 text-sm border border-blue-200 text-blue-600 rounded hover:bg-blue-50 transition"
          >
            {cat.name}
          </button>
        ))}
      </div>
      <button 
        onClick={onShowMore}
        className="text-blue-600 text-sm font-medium border border-blue-200 px-4 py-2 rounded hover:bg-blue-50 transition"
      >
        Show More
      </button>
    </div>
  );
};

export default Categories;