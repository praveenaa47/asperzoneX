import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image } from 'lucide-react';

const ConsultingForm = ({ data, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    bannerImage: '',
    introduction: {
      description: '',
      image: ''
    },
    sections: [],
    gallery: []
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSectionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleGalleryChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.map((item, i) =>
        i === index ? { image: value } : item
      )
    }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        { title: 'New Service', description: 'Service description...', image: '' }
      ]
    }));
  };

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const addGalleryItem = () => {
    setFormData(prev => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        { image: '' }
      ]
    }));
  };

  const removeGalleryItem = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Banner Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Banner Section</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter main title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter subtitle"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image URL</label>
            <div className="flex space-x-4">
              <input
                type="url"
                value={formData.bannerImage}
                onChange={(e) => handleInputChange('bannerImage', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {formData.bannerImage && (
                <div className="w-20 h-12 border rounded-lg overflow-hidden">
                  <img src={formData.bannerImage} alt="Banner preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Introduction Section</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.introduction.description}
              onChange={(e) => handleInputChange('introduction.description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter detailed introduction description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Introduction Image URL</label>
            <div className="flex space-x-4">
              <input
                type="url"
                value={formData.introduction.image}
                onChange={(e) => handleInputChange('introduction.image', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/intro-image.jpg"
              />
              {formData.introduction.image && (
                <div className="w-20 h-12 border rounded-lg overflow-hidden">
                  <img src={formData.introduction.image} alt="Intro preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Services Sections */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-900">Services Sections</h2>
          <button
            type="button"
            onClick={addSection}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Section
          </button>
        </div>
        
        <div className="space-y-6">
          {formData.sections.map((section, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Service Section {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter service title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                  <textarea
                    value={section.description}
                    onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter service description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Image URL</label>
                  <div className="flex space-x-4">
                    <input
                      type="url"
                      value={section.image}
                      onChange={(e) => handleSectionChange(index, 'image', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/service-image.jpg"
                    />
                    {section.image && (
                      <div className="w-20 h-12 border rounded-lg overflow-hidden">
                        <img src={section.image} alt="Service preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-900">Gallery Images</h2>
          <button
            type="button"
            onClick={addGalleryItem}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Add Image
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.gallery.map((item, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <Image size={16} className="mr-2" />
                  Gallery Image {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeGalleryItem(index)}
                  className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <input
                type="url"
                value={item.image}
                onChange={(e) => handleGalleryChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                placeholder="https://example.com/gallery-image.jpg"
              />
              {item.image && (
                <div className="w-full h-32 border rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-6 bg-white rounded-lg shadow-lg p-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ConsultingForm;