import React, { useState, useEffect } from 'react';

const CourseModal = ({ course, levels, modes, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    duration: '',
    mode: 'On-Campus',
    level: '',
    eligibility: '',
    intakes: '',
    about: '',
    bannerImage: null,
    keyHighlights: [{ title: '', icon: '', iconFile: null }],
    careerOpportunities: [{ title: '', icon: '', iconFile: null }],
    admissionRequirements: [''],
    feeStructure: [''],
    isActive: true,
    isFeatured: false
  });

  const [bannerPreview, setBannerPreview] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        shortName: course.shortName || '',
        duration: course.duration || '',
        mode: course.mode || 'On-Campus',
        level: course.level || '',
        eligibility: course.eligibility || '',
        intakes: course.intakes || '',
        about: course.about || '',
        bannerImage: null,
        keyHighlights: course.keyHighlights?.length > 0 
          ? course.keyHighlights.map(h => ({ ...h, iconFile: null }))
          : [{ title: '', icon: '', iconFile: null }],
        careerOpportunities: course.careerOpportunities?.length > 0
          ? course.careerOpportunities.map(c => ({ ...c, iconFile: null }))
          : [{ title: '', icon: '', iconFile: null }],
        admissionRequirements: course.admissionRequirements || [''],
        feeStructure: course.feeStructure || [''],
        isActive: course.isActive !== undefined ? course.isActive : true,
        isFeatured: course.isFeatured !== undefined ? course.isFeatured : false
      });

      if (course.bannerImage) {
        setBannerPreview(course.bannerImage);
      }
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleObjectArrayFieldChange = (field, index, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [subField]: value } : item
      )
    }));
  };

  const addArrayField = (field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const addObjectArrayField = (field, defaultValue = { title: '', icon: '', iconFile: null }) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (field, file) => {
    if (field === 'bannerImage') {
      setFormData(prev => ({ ...prev, bannerImage: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setBannerPreview(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleIconFileChange = (field, index, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, iconFile: file } : item
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {course ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g., Bachelor of Computer Applications"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Name
              </label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleInputChange}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., BCA, MBA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 3 Years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mode *
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                required
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {modes.map(mode => (
                  <option key={mode.value} value={mode.value}>{mode.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Level</option>
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Intakes
              </label>
              <input
                type="text"
                name="intakes"
                value={formData.intakes}
                onChange={handleInputChange}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., January, July"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility *
              </label>
              <input
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleInputChange}
                required
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 10+2 with Mathematics"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About Course *
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the course..."
            />
          </div>

          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('bannerImage', e.target.files[0])}
              className="w-full text-black"
            />
            {bannerPreview && (
              <div className="mt-2">
                <img src={bannerPreview} alt="Banner preview" className="h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Highlights
            </label>
            <div className="space-y-4">
              {formData.keyHighlights.map((highlight, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={highlight.title}
                      onChange={(e) => handleObjectArrayFieldChange('keyHighlights', index, 'title', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Industry-Aligned Curriculum"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIconFileChange('keyHighlights', index, e.target.files[0])}
                      className="w-full text-black"
                    />
                    {highlight.icon && !highlight.iconFile && (
                      <div className="mt-2">
                        <img src={highlight.icon} alt="Icon preview" className="h-8 w-8 object-cover rounded" />
                      </div>
                    )}
                  </div>
                  {formData.keyHighlights.length > 1 && (
                    <div className="md:col-span-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeArrayField('keyHighlights', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addObjectArrayField('keyHighlights')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add Key Highlight
              </button>
            </div>
          </div>

          {/* Career Opportunities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Opportunities
            </label>
            <div className="space-y-4">
              {formData.careerOpportunities.map((opportunity, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={opportunity.title}
                      onChange={(e) => handleObjectArrayFieldChange('careerOpportunities', index, 'title', e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Software Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Icon
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleIconFileChange('careerOpportunities', index, e.target.files[0])}
                      className="w-full text-black"
                    />
                    {opportunity.icon && !opportunity.iconFile && (
                      <div className="mt-2">
                        <img src={opportunity.icon} alt="Icon preview" className="h-8 w-8 object-cover rounded" />
                      </div>
                    )}
                  </div>
                  {formData.careerOpportunities.length > 1 && (
                    <div className="md:col-span-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeArrayField('careerOpportunities', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addObjectArrayField('careerOpportunities')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add Career Opportunity
              </button>
            </div>
          </div>

          {/* Admission Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admission Requirements
            </label>
            <div className="space-y-2">
              {formData.admissionRequirements.map((requirement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleArrayFieldChange('admissionRequirements', index, e.target.value)}
                    className="flex-1 text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Completed 10+2 from recognized board"
                  />
                  {formData.admissionRequirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('admissionRequirements', index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('admissionRequirements')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add Requirement
              </button>
            </div>
          </div>

          {/* Fee Structure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fee Structure
            </label>
            <div className="space-y-2">
              {formData.feeStructure.map((fee, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={fee}
                    onChange={(e) => handleArrayFieldChange('feeStructure', index, e.target.value)}
                    className="flex-1 text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Tuition Fee: ₹75,000 per year"
                  />
                  {formData.feeStructure.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('feeStructure', index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('feeStructure')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add Fee Item
              </button>
            </div>
          </div>

          {/* Status Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4  w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Active Course
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Featured Course
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {course ? 'Update Course' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;