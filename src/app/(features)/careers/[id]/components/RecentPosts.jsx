import React from 'react';

const RecentPosts = ({ posts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
      <div className="space-y-3">
        {posts.map((post, idx) => (
          <div key={idx} className="flex justify-between items-start text-sm">
            <a href="#" className="text-blue-600 hover:underline flex-1">
              {post.title}
            </a>
            <span className="text-gray-500 ml-2">{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;