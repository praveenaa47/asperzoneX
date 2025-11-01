import React, { useState, useEffect } from 'react';

const TestimonialForm = ({ data, onSave, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    profileImage: '',
    category: '',
    rating: 5,
    status: 'active'
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (data) {
      setFormData(data);
      setImagePreview(data.profileImage || '');
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For demo purposes, we'll create a blob URL
      // In real application, you would upload to cloud storage
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData(prev => ({
        ...prev,
        profileImage: imageUrl
      }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData(prev => ({
      ...prev,
      profileImage: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.message.trim() || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    onSave(formData);
  };

  const handleRatingChange = (newRating) => {
    setFormData(prev => ({
      ...prev,
      rating: newRating
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-lg p-6">

  {/* Full Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
    <input
      type="text"
      value={formData.name}
      onChange={(e) => handleInputChange('name', e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter full name"
      required
    />
  </div>

  {/* Category */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
    <select
      value={formData.category}
      onChange={(e) => handleInputChange('category', e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="">Select</option>
      {categories.map(category => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  </div>

  {/* Profile Image Upload */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>

    {imagePreview && (
      <div className="relative mb-3">
        <img
          src={imagePreview}
          alt="Preview"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
        <button
          type="button"
          onClick={handleRemoveImage}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
        >
          ✕
        </button>
      </div>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
    />
  </div>

  {/* Message */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
    <textarea
      value={formData.message}
      onChange={(e) => handleInputChange('message', e.target.value)}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter testimonial message..."
      required
    ></textarea>
  </div>

  {/* Status */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
    <select
      value={formData.status}
      onChange={(e) => handleInputChange('status', e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>

  {/* Buttons */}
  <div className="flex justify-end space-x-4">
    <button
      type="button"
      onClick={onCancel}
      className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      {data ? "Update" : "Add"} Testimonial
    </button>
  </div>

</form>

  );
};

export default TestimonialForm;