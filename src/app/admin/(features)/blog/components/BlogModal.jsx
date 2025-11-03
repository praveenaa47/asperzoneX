// components/BlogModal.jsx
import React, { useState, useEffect } from 'react';

const BlogModal = ({ 
  blog, 
  categories,
  onSave, 
  onClose,
  loading
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    author: { name: '' },
    introduction: '',
    tags: '',
    readTime: '',
    isPublished: true,
    isFeatured: false,
    coverImage: '',
    sections: []
  });

  const [coverPreview, setCoverPreview] = useState('');
  const [sectionPreviews, setSectionPreviews] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        subtitle: blog.subtitle || '',
        category: blog.category?._id || '',
        author: { name: blog.author?.name || '' },
        introduction: blog.introduction || '',
        tags: blog.tags || '',
        readTime: blog.readTime || '',
        isPublished: blog.isPublished !== undefined ? blog.isPublished : true,
        isFeatured: blog.isFeatured || false,
        coverImage: blog.coverImage || '',
        sections: blog.sections || []
      });
      setCoverPreview(blog.coverImage || '');
      
      // Set section previews
      const previews = {};
      blog.sections?.forEach((section, index) => {
        previews[index] = section.icon;
      });
      setSectionPreviews(previews);
    }
  }, [blog]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAuthorChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      author: { name: value }
    }));
  };

  // Cover Image Handling
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverPreview(imageUrl);
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
    }
  };

  const handleRemoveCoverImage = () => {
    setCoverPreview('');
    setFormData(prev => ({
      ...prev,
      coverImage: ''
    }));
  };

  // Sections Management
  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', content: '', icon: '' }]
    }));
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleSectionIconChange = (index, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSectionPreviews(prev => ({
        ...prev,
        [index]: imageUrl
      }));
      updateSection(index, 'icon', file);
    }
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
    setSectionPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.author.name.trim()) newErrors.author = 'Author name is required';
    if (!formData.introduction.trim()) newErrors.introduction = 'Introduction is required';
    if (!formData.tags.trim()) newErrors.tags = 'Tags are required';
    if (!formData.readTime.trim()) newErrors.readTime = 'Read time is required';
    if (!formData.coverImage) newErrors.coverImage = 'Cover image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter blog title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle *
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.subtitle ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter blog subtitle"
                />
                {errors.subtitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>
              
              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  value={formData.author.name}
                  onChange={handleAuthorChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.author ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags *
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.tags ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Business, Technology, Finance"
                />
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                )}
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time *
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.readTime ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 5 min"
                />
                {errors.readTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.readTime}</p>
                )}
              </div>

              {/* Status & Featured */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cover Image *</h3>
            
            {coverPreview && (
              <div className="mb-3">
                <div className="relative inline-block">
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="w-32 h-20 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveCoverImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload cover image</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  required={!coverPreview}
                />
              </label>
            </div>
            {errors.coverImage && (
              <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>
            )}
          </div>

          {/* Introduction */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Introduction *</h3>
            <div>
              <textarea
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                rows={4}
                className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.introduction ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Write a compelling introduction for your blog post..."
              />
              {errors.introduction && (
                <p className="mt-1 text-sm text-red-600">{errors.introduction}</p>
              )}
            </div>
          </div>

          {/* Sections */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Blog Sections</h3>
              <button
                type="button"
                onClick={addSection}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Section
              </button>
            </div>
            
            {formData.sections.map((section, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Icon
                    </label>
                    <div className="flex items-center gap-2">
                      {sectionPreviews[index] && (
                        <img
                          src={sectionPreviews[index]}
                          alt="Icon Preview"
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSectionIconChange(index, e.target.files[0])}
                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:text-red-800 mt-6"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(index, 'title', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter section title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Content
                    </label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, 'content', e.target.value)}
                      rows={3}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write the content for this section..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (blog ? 'Update Blog' : 'Create Blog')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;