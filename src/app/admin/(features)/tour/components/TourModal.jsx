import React, { useState, useEffect } from 'react';

const TourModal = ({
  tour,
  includedOptions,
  exclusionOptions,
  onSave,
  onClose,
  loading
}) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    duration: '',
    about: '',
    destination: '',
    numberOfPersons: '',
    isActive: true,
    bannerImage: '',
    keyHighlights: [],
    itinerary: [],
    includedHighlights: [],
    exclusions: [],
    importantInfoAndPolicies: [],
    gallery: []
  });

  const [bannerPreview, setBannerPreview] = useState('');
  const [keyHighlightPreviews, setKeyHighlightPreviews] = useState({});
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title || '',
        subtitle: tour.subtitle || '',
        duration: tour.duration || '',
        about: tour.about || '',
        destination: tour.destination || '',
        numberOfPersons: tour.numberOfPersons || '',
        isActive: tour.isActive !== undefined ? tour.isActive : true,
        bannerImage: tour.bannerImage || '',
        keyHighlights: tour.keyHighlights || [],
        itinerary: tour.itinerary || [],
        includedHighlights: tour.includedHighlights || [],
        exclusions: tour.exclusions || [],
        importantInfoAndPolicies: tour.importantInfoAndPolicies || [],
        gallery: tour.gallery || []
      });
      setBannerPreview(tour.bannerImage || '');
      setGalleryPreviews(tour.gallery || []);

      // Set key highlight previews
      const highlightPreviews = {};
      tour.keyHighlights?.forEach((highlight, index) => {
        highlightPreviews[index] = highlight.icon;
      });
      setKeyHighlightPreviews(highlightPreviews);
    }
  }, [tour]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Banner Image Handling
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerPreview(imageUrl);
      setFormData(prev => ({
        ...prev,
        bannerImage: file
      }));
    }
  };

  const handleRemoveBannerImage = () => {
    setBannerPreview('');
    setFormData(prev => ({
      ...prev,
      bannerImage: ''
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

  // Itinerary Management
  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: '', title: '', activities: '' }]
    }));
  };

  const updateItineraryDay = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) =>
        i === index ? { ...day, [field]: value } : day
      )
    }));
  };

  const removeItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  // Policies Management
  const addPolicy = () => {
    setFormData(prev => ({
      ...prev,
      importantInfoAndPolicies: [...prev.importantInfoAndPolicies, { question: '', answer: '' }]
    }));
  };

  const updatePolicy = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      importantInfoAndPolicies: prev.importantInfoAndPolicies.map((policy, i) =>
        i === index ? { ...policy, [field]: value } : policy
      )
    }));
  };

  const removePolicy = (index) => {
    setFormData(prev => ({
      ...prev,
      importantInfoAndPolicies: prev.importantInfoAndPolicies.filter((_, i) => i !== index)
    }));
  };

  // Included Highlights Management
  const handleIncludedChange = (value, checked) => {
    setFormData(prev => ({
      ...prev,
      includedHighlights: checked
        ? [...prev.includedHighlights, value]
        : prev.includedHighlights.filter(item => item !== value)
    }));
  };

  // Exclusions Management
  const handleExclusionChange = (value, checked) => {
    setFormData(prev => ({
      ...prev,
      exclusions: checked
        ? [...prev.exclusions, value]
        : prev.exclusions.filter(item => item !== value)
    }));
  };

  // Gallery Management
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + galleryPreviews.length > 10) {
      setErrors(prev => ({
        ...prev,
        gallery: 'Maximum 10 images allowed'
      }));
      return;
    }

    const newImagePreviews = [];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    files.forEach(file => {
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          gallery: 'Please select valid image files (JPEG, PNG, GIF)'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          gallery: 'Image size should be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setGalleryPreviews(prev => [...prev, ...newImagePreviews]);
          setFormData(prev => ({
            ...prev,
            gallery: [...prev.gallery, ...files]
          }));
          setErrors(prev => ({
            ...prev,
            gallery: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveGalleryImage = (index) => {
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    const newGallery = formData.gallery.filter((_, i) => i !== index);

    setGalleryPreviews(newPreviews);
    setFormData(prev => ({
      ...prev,
      gallery: newGallery
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.about.trim()) newErrors.about = 'About description is required';
    if (!formData.bannerImage) newErrors.bannerImage = 'Banner image is required';

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
            {tour ? 'Edit Tour Package' : 'Add New Tour Package'}
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
                  Tour Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="e.g., Romantic Maldives Honeymoon Package"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Relax on pristine beaches and enjoy luxury resorts"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.duration ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="e.g., 5 Nights / 6 Days Maldives Package"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Details</h3>



              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Maldives"
                />
              </div>

              {/* Number of Persons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Persons
                </label>
                <input
                  type="number"
                  name="numberOfPersons"
                  value={formData.numberOfPersons}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Maximum number of persons"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="isActive"
                  value={formData.isActive}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Banner Image *</h3>

            {bannerPreview && (
              <div className="mb-3">
                <div className="relative inline-block">
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="w-32 h-20 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveBannerImage}
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
                    <span className="font-semibold">Click to upload banner image</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  required={!bannerPreview}
                />
              </label>
            </div>
            {errors.bannerImage && (
              <p className="mt-1 text-sm text-red-600">{errors.bannerImage}</p>
            )}
          </div>

          {/* About Description */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">About the Tour *</h3>
            <div>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={4}
                className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.about ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Describe the tour package in detail..."
              />
              {errors.about && (
                <p className="mt-1 text-sm text-red-600">{errors.about}</p>
              )}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Key Highlights</h3>
              <button
                type="button"
                onClick={addKeyHighlight}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Highlight
              </button>
            </div>

            {formData.keyHighlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-4 mb-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <label className="block  text-sm font-medium text-gray-700 mb-2">
                    Icon Image
                  </label>
                  <div className="flex items-center gap-2">
                    {keyHighlightPreviews[index] && (
                      <img
                        src={keyHighlightPreviews[index]}
                        alt="Icon Preview"
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleKeyHighlightIconChange(index, e.target.files[0])}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={highlight.title}
                    onChange={(e) => updateKeyHighlight(index, 'title', e.target.value)}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Highlight title"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeKeyHighlight(index)}
                  className="mt-6 text-red-600 hover:text-red-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Itinerary */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tour Itinerary</h3>
              <button
                type="button"
                onClick={addItineraryDay}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Day
              </button>
            </div>

            {formData.itinerary.map((day, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Day
                    </label>
                    <input
                      type="text"
                      value={day.day}
                      onChange={(e) => updateItineraryDay(index, 'day', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Day 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Arrival & Relaxation"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Activities
                  </label>
                  <textarea
                    value={day.activities}
                    onChange={(e) => updateItineraryDay(index, 'activities', e.target.value)}
                    rows={3}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the activities for this day..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Included Highlights */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">What's Included</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {includedOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.includedHighlights.includes(option)}
                    onChange={(e) => handleIncludedChange(option, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Exclusions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {exclusionOptions.map(option => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.exclusions.includes(option)}
                    onChange={(e) => handleExclusionChange(option, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Important Info & Policies */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Important Information & Policies</h3>
              <button
                type="button"
                onClick={addPolicy}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Policy
              </button>
            </div>

            {formData.importantInfoAndPolicies.map((policy, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={policy.question}
                      onChange={(e) => updatePolicy(index, 'question', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Cancellation Policy"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removePolicy(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
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
                    placeholder="Provide the answer or policy details..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Image Upload */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tour Gallery</h3>

            {/* Image Previews */}
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File Input */}
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB each)</p>
                  <p className="text-xs text-gray-500 mt-1">Max 10 images</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                />
              </label>
            </div>
            {errors.gallery && (
              <p className="mt-1 text-sm text-red-600">{errors.gallery}</p>
            )}
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
              {loading ? 'Saving...' : (tour ? 'Update Tour' : 'Create Tour')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourModal;