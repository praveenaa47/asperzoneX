import React from 'react';
import { User, ChevronDown } from 'lucide-react';

const ConversationAndCV = ({ formData, onInputChange, onSubmit, onCVUpload }) => {
  return (
    <>
      {/* Join The Conversation Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Join The Conversation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="John"
                value={formData.name}
                onChange={onInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Join Name</label>
            <input
              type="text"
              name="joinName"
              placeholder="Type here"
              value={formData.joinName}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Higher education</label>
            <input
              type="text"
              name="email"
              placeholder="Add here"
              value={formData.email}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred University</label>
            <div className="relative">
              <select
                name="address"
                value={formData.address}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Type here</option>
                <option value="university1">University 1</option>
                <option value="university2">University 2</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📞</span>
              <input
                type="tel"
                name="phone"
                placeholder="194500"
                value={formData.phone}
                onChange={onInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
              <input
                type="email"
                name="commentEmail"
                placeholder="john@mail.com"
                value={formData.commentEmail}
                onChange={onInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
            <textarea
              name="comment"
              placeholder="Your thoughts..."
              value={formData.comment}
              onChange={onInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Drop Your CV */}
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Drop Your CV</h3>
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 hover:border-blue-400 transition cursor-pointer"
          onClick={onCVUpload}
        >
          <div className="text-4xl text-gray-400 mb-2">📄</div>
          <p className="text-sm text-gray-600 font-medium">DRAG & DROP FILES HERE</p>
          <p className="text-xs text-gray-400 mt-1">OR</p>
        </div>
        <button className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition">
          Upload CV
        </button>
      </div>
    </>
  );
};

export default ConversationAndCV;