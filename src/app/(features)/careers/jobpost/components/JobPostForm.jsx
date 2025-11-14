"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  addUserJob } from "@/redux/slices/jobSlice";
import { useToast } from '@/components/UserToast';

const AddJobForm = () => {
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    jobType: 'Full-Time',
    overview: '',
    keyResponsibilities: [''],
    qualifications: [''],
    whyJoinUs: [''],
    salary: {
      amount: '',
      currency: 'INR',
      period: 'Month'
    },
    location: {
      city: '',
      state: '',
      country: '',
      fullAddress: ''
    },
    jobOverview: {
      education: 'Graduation',
      jobLevel: 'Entry Level',
      experience: '0-1 year'
    },
    companyLogo: null,
    isActive: true,
    isFeatured: false,
    isApproved: false 
  });

  const [logoPreview, setLogoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const jobTypes = [
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Remote', label: 'Remote' }
  ];

  const educationLevels = [
    { value: 'High School', label: 'High School' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Graduation', label: 'Graduation' },
    { value: 'Post Graduation', label: 'Post Graduation' },
    { value: 'PhD', label: 'PhD' }
  ];

  const jobLevels = [
    { value: 'Entry Level', label: 'Entry Level' },
    { value: 'Mid Level', label: 'Mid Level' },
    { value: 'Senior Level', label: 'Senior Level' },
    { value: 'Executive', label: 'Executive' }
  ];

  const experienceLevels = [
    { value: '0-1 year', label: '0-1 year' },
    { value: '1-3 years', label: '1-3 years' },
    { value: '3-5 years', label: '3-5 years' },
    { value: '5-8 years', label: '5-8 years' },
    { value: '8+ years', label: '8+ years' }
  ];

  const currencies = [
    { value: 'INR', label: 'Indian Rupee (₹)' },
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' }
  ];

  const salaryPeriods = [
    { value: 'Hour', label: 'Per Hour' },
    { value: 'Day', label: 'Per Day' },
    { value: 'Month', label: 'Per Month' },
    { value: 'Year', label: 'Per Year' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field, defaultValue = '') => {
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
    if (field === 'companyLogo') {
      setFormData(prev => ({ ...prev, companyLogo: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setLogoPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setLogoPreview('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append basic fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('jobType', formData.jobType);
      formDataToSend.append('overview', formData.overview);

      formDataToSend.append('salary', JSON.stringify({
        ...formData.salary,
        amount: parseFloat(formData.salary.amount) || 0
      }));

      formDataToSend.append('location', JSON.stringify(formData.location));

      formDataToSend.append('jobOverview', JSON.stringify(formData.jobOverview));

      formDataToSend.append('keyResponsibilities', JSON.stringify(formData.keyResponsibilities.filter(item => item.trim() !== '')));
      formDataToSend.append('qualifications', JSON.stringify(formData.qualifications.filter(item => item.trim() !== '')));
      formDataToSend.append('whyJoinUs', JSON.stringify(formData.whyJoinUs.filter(item => item.trim() !== '')));

      // Append company logo
      if (formData.companyLogo instanceof File) {
        formDataToSend.append('companyLogo', formData.companyLogo);
      }

      // Append status fields
      formDataToSend.append('isActive', formData.isActive.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('isApproved', formData.isApproved.toString());

      await dispatch(addUserJob(formDataToSend)).unwrap();
      addToast("success", "Job added successfully! It will be visible after approval. ✅");

      // Reset form
      setFormData({
        title: '',
        companyName: '',
        jobType: 'Full-Time',
        overview: '',
        keyResponsibilities: [''],
        qualifications: [''],
        whyJoinUs: [''],
        salary: {
          amount: '',
          currency: 'INR',
          period: 'Month'
        },
        location: {
          city: '',
          state: '',
          country: '',
          fullAddress: ''
        },
        jobOverview: {
          education: 'Graduation',
          jobLevel: 'Entry Level',
          experience: '0-1 year'
        },
        companyLogo: null,
        isActive: true,
        isFeatured: false,
        isApproved: false
      });
      setLogoPreview('');

    } catch (error) {
      console.error('Failed to add job:', error);
      addToast("error", "Failed to add job. Please try again. ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-5 border border-gray-400 mb-6">
      <div className="mb-6 ">
        <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
        <p className="text-gray-600">Fill in the details below to post a new job listing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., UI/UX Designer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Figma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type *
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('companyLogo', e.target.files[0])}
              className="w-full text-black"
            />
            {logoPreview && (
              <div className="mt-2">
                <img src={logoPreview} alt="Logo preview" className="h-16 w-16 object-cover rounded-lg" />
              </div>
            )}
          </div>
        </div>

        {/* Job Overview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Overview *
          </label>
          <textarea
            name="overview"
            value={formData.overview}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the job..."
          />
        </div>

        {/* Salary Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Amount *
            </label>
            <input
              type="number"
              value={formData.salary.amount}
              onChange={(e) => handleNestedChange('salary', 'amount', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency *
            </label>
            <select
              value={formData.salary.currency}
              onChange={(e) => handleNestedChange('salary', 'currency', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map(currency => (
                <option key={currency.value} value={currency.value}>{currency.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period *
            </label>
            <select
              value={formData.salary.period}
              onChange={(e) => handleNestedChange('salary', 'period', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {salaryPeriods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              value={formData.location.city}
              onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., New York"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              value={formData.location.state}
              onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., New York"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              value={formData.location.country}
              onChange={(e) => handleNestedChange('location', 'country', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., USA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Address
            </label>
            <input
              type="text"
              value={formData.location.fullAddress}
              onChange={(e) => handleNestedChange('location', 'fullAddress', e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., New York, USA"
            />
          </div>
        </div>

        {/* Job Overview Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education Required *
            </label>
            <select
              value={formData.jobOverview.education}
              onChange={(e) => handleNestedChange('jobOverview', 'education', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {educationLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Level *
            </label>
            <select
              value={formData.jobOverview.jobLevel}
              onChange={(e) => handleNestedChange('jobOverview', 'jobLevel', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Required *
            </label>
            <select
              value={formData.jobOverview.experience}
              onChange={(e) => handleNestedChange('jobOverview', 'experience', e.target.value)}
              required
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {experienceLevels.map(exp => (
                <option key={exp.value} value={exp.value}>{exp.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Array Fields */}
        {[
          { field: 'keyResponsibilities', label: 'Key Responsibilities', placeholder: 'e.g., Design modern user interfaces' },
          { field: 'qualifications', label: 'Qualifications', placeholder: 'e.g., Bachelor\'s degree in Design' },
          { field: 'whyJoinUs', label: 'Why Join Us', placeholder: 'e.g., Work on cutting-edge design products' }
        ].map(({ field, label, placeholder }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <div className="space-y-2">
              {formData[field].map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayFieldChange(field, index, e.target.value)}
                    className="flex-1 text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                  />
                  {formData[field].length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField(field, index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField(field)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Add {label}
              </button>
            </div>
          </div>
        ))}

        {/* Status Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Active Job
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
              Featured Job
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding Job...
              </>
            ) : (
              'Add Job'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;