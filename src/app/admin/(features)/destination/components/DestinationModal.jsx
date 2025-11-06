import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image, Video, MapPin } from 'lucide-react';

const DestinationModal = ({ 
  destination, 
  onSave, 
  onClose,
  loading
}) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    about: '',
    coverImage: '',
    keyHighlights: [],
    popularPlaces: [],
    gallery: [],
    policies: [],
    isActive: true,
    isFeatured: false
  });

  const [coverPreview, setCoverPreview] = useState('');
  const [keyHighlightPreviews, setKeyHighlightPreviews] = useState({});
  const [popularPlacePreviews, setPopularPlacePreviews] = useState({});
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (destination) {
      setFormData({
        name: destination.name || '',
        title: destination.title || '',
        subtitle: destination.subtitle || '',
        about: destination.about || '',
        coverImage: destination.coverImage || '',
        keyHighlights: destination.keyHighlights || [],
        popularPlaces: destination.popularPlaces || [],
        gallery: destination.gallery || [],
        policies: destination.policies || [],
        isActive: destination.isActive !== undefined ? destination.isActive : true,
        isFeatured: destination.isFeatured || false
      });
      setCoverPreview(destination.coverImage || '');
      
      // Set key highlight previews
      const highlightPreviews = {};
      destination.keyHighlights?.forEach((highlight, index) => {
        highlightPreviews[index] = highlight.icon;
      });
      setKeyHighlightPreviews(highlightPreviews);

      // Set popular place previews
      const placePreviews = {};
      destination.popularPlaces?.forEach((place, index) => {
        placePreviews[index] = place.image;
      });
      setPopularPlacePreviews(placePreviews);

      // Set gallery previews
      setGalleryPreviews(destination.gallery || []);
    }
  }, [destination]);

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

  // Key Highlights Management
  const addKeyHighlight = () => {
    setFormData(prev => ({
      ...prev,
      keyHighlights: [...prev.keyHighlights, { icon: '', title: '' }]
    }));
  };

  const updateKeyHighlight = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      keyHighlights: prev.keyHighlights.map((highlight, i) =>
        i === index ? { ...highlight, [field]: value } : highlight
      )
    }));
  };

  const handleKeyHighlightIconChange = (index, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setKeyHighlightPreviews(prev => ({
        ...prev,
        [index]: imageUrl
      }));
      updateKeyHighlight(index, 'icon', file);
    }
  };

  const removeKeyHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      keyHighlights: prev.keyHighlights.filter((_, i) => i !== index)
    }));
    setKeyHighlightPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });
  };

  // Popular Places Management
  const addPopularPlace = () => {
    setFormData(prev => ({
      ...prev,
      popularPlaces: [...prev.popularPlaces, { name: '', image: '', description: '' }]
    }));
  };

  const updatePopularPlace = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      popularPlaces: prev.popularPlaces.map((place, i) =>
        i === index ? { ...place, [field]: value } : place
      )
    }));
  };

  const handlePopularPlaceImageChange = (index, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPopularPlacePreviews(prev => ({
        ...prev,
        [index]: imageUrl
      }));
      updatePopularPlace(index, 'image', file);
    }
  };

  const removePopularPlace = (index) => {
    setFormData(prev => ({
      ...prev,
      popularPlaces: prev.popularPlaces.filter((_, i) => i !== index)
    }));
    setPopularPlacePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });
  };

  // Gallery Management
  const addGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { image: '', caption: '', type: 'image' }]
    }));
  };

  const updateGalleryItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleGalleryFileChange = (index, file) => {
    if (file) {
      // Determine if it's a video or image
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      const previewUrl = URL.createObjectURL(file);
      
      setGalleryPreviews(prev => {
        const newPreviews = [...prev];
        newPreviews[index] = { url: previewUrl, type };
        return newPreviews;
      });

      setFormData(prev => ({
        ...prev,
        gallery: prev.gallery.map((item, i) =>
          i === index ? { ...item, image: file, type } : item
        )
      }));
    }
  };

  const removeGalleryItem = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Policies Management
  const addPolicy = () => {
    setFormData(prev => ({
      ...prev,
      policies: [...prev.policies, { question: '', answer: '' }]
    }));
  };

  const updatePolicy = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      policies: prev.policies.map((policy, i) =>
        i === index ? { ...policy, [field]: value } : policy
      )
    }));
  };

  const removePolicy = (index) => {
    setFormData(prev => ({
      ...prev,
      policies: prev.policies.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Destination name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    if (!formData.about.trim()) newErrors.about = 'About description is required';
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
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {destination ? 'Edit Destination' : 'Add New Destination'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Bali"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

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
                    placeholder="e.g., Explore the Tropical Paradise of Bali"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

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
                    placeholder="e.g., A perfect getaway for nature, culture, and adventure lovers"
                  />
                  {errors.subtitle && (
                    <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Image *</h4>
                  
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
                        <Image size={24} className="mb-3 text-gray-400" />
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
                      />
                    </label>
                  </div>
                  {errors.coverImage && (
                    <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
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
          </div>

          {/* About Section */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">About Destination</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={6}
                className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.about ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the destination in detail..."
              />
              {errors.about && (
                <p className="mt-1 text-sm text-red-600">{errors.about}</p>
              )}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Key Highlights</h3>
              <button
                type="button"
                onClick={addKeyHighlight}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Highlight
              </button>
            </div>
            
            {formData.keyHighlights.map((highlight, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">Highlight {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeKeyHighlight(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={highlight.title}
                      onChange={(e) => updateKeyHighlight(index, 'title', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Beautiful Beaches"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Icon Image</h4>
                    
                    {keyHighlightPreviews[index] && (
                      <div className="mb-3">
                        <div className="relative inline-block">
                          <img
                            src={keyHighlightPreviews[index]}
                            alt="Icon Preview"
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => handleKeyHighlightIconChange(index, '')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-3 pb-4">
                          <Image size={16} className="mb-1 text-gray-400" />
                          <p className="text-xs text-gray-500">Upload icon</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleKeyHighlightIconChange(index, e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Places */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Popular Places</h3>
              <button
                type="button"
                onClick={addPopularPlace}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Place
              </button>
            </div>
            
            {formData.popularPlaces.map((place, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">Place {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removePopularPlace(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Place Name
                    </label>
                    <input
                      type="text"
                      value={place.name}
                      onChange={(e) => updatePopularPlace(index, 'name', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Ubud Monkey Forest"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={place.description}
                      onChange={(e) => updatePopularPlace(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe this popular place..."
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Place Image</h4>
                    
                    {popularPlacePreviews[index] && (
                      <div className="mb-3">
                        <div className="relative inline-block">
                          <img
                            src={popularPlacePreviews[index]}
                            alt="Place Preview"
                            className="w-20 h-16 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => handlePopularPlaceImageChange(index, '')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-3 pb-4">
                          <Image size={16} className="mb-1 text-gray-400" />
                          <p className="text-xs text-gray-500">Upload image</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handlePopularPlaceImageChange(index, e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Gallery</h3>
              <button
                type="button"
                onClick={addGalleryItem}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Media
              </button>
            </div>
            
            {formData.gallery.map((item, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">Gallery Item {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Caption
                    </label>
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(e) => updateGalleryItem(index, 'caption', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Aerial view of coastline"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media Type
                    </label>
                    <select
                      value={item.type}
                      onChange={(e) => updateGalleryItem(index, 'type', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Media File</h4>
                    
                    {galleryPreviews[index] && (
                      <div className="mb-3">
                        <div className="relative inline-block">
                          {galleryPreviews[index].type === 'video' ? (
                            <video
                              src={galleryPreviews[index].url}
                              className="w-20 h-16 object-cover rounded-lg border"
                              controls
                            />
                          ) : (
                            <img
                              src={galleryPreviews[index].url}
                              alt="Gallery Preview"
                              className="w-20 h-16 object-cover rounded-lg border"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeGalleryItem(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-3 pb-4">
                          {item.type === 'video' ? (
                            <Video size={16} className="mb-1 text-gray-400" />
                          ) : (
                            <Image size={16} className="mb-1 text-gray-400" />
                          )}
                          <p className="text-xs text-gray-500">
                            Upload {item.type === 'video' ? 'video' : 'image'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept={item.type === 'video' ? 'video/*' : 'image/*'}
                          onChange={(e) => handleGalleryFileChange(index, e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Policies */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Policies & Information</h3>
              <button
                type="button"
                onClick={addPolicy}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Policy
              </button>
            </div>
            
            {formData.policies.map((policy, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">Policy {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removePolicy(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={policy.question}
                      onChange={(e) => updatePolicy(index, 'question', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., What is the best time to visit?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer
                    </label>
                    <textarea
                      value={policy.answer}
                      onChange={(e) => updatePolicy(index, 'answer', e.target.value)}
                      rows={2}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Provide the answer..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6">
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                destination ? 'Update Destination' : 'Create Destination'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DestinationModal;