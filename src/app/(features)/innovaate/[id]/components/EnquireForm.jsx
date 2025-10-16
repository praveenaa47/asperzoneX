"use client"
import { useState } from 'react';
import { User, Phone, Mail, MapPin, Upload, Lightbulb, ChevronDown } from 'lucide-react';

export default function UnleashIdeasForm() {
  const [formData, setFormData] = useState({
    image: null,
    ideaTitle: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    currentStatus: '',
    location: '',
    ideaDescription: '',
    videoLink: '',
    referenceLink: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you for sharing your innovative idea!');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg border border-blue-300 shadow-lg p-6 sm:p-8 md:p-10">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-3">
            Unleash Your Ideas. Inspire The Future
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Share Your Innovative Idea With The Innovatex Community And Inspire Others.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Image (optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 rounded-lg" />
                    <p className="text-sm text-blue-600">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Drag & Drop here</p>
                      <p className="text-xs text-gray-500">or click to upload</p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Idea Title */}
          <div>
            <label htmlFor="ideaTitle" className="block text-sm font-medium text-gray-700 mb-2">
              Idea title
            </label>
            <input
              type="text"
              id="ideaTitle"
              name="ideaTitle"
              value={formData.ideaTitle}
              onChange={handleChange}
              placeholder="type here"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Name Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative border border-blue-300 rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="john"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative border border-blue-300 rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Phone and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative border border-blue-300 rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="126555"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative border border-blue-300 rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@mail.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Current Status and Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Current Status */}
            <div>
              <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Current status
              </label>
              <div className="relative border border-blue-300 rounded-lg">
                <select
                  id="currentStatus"
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                >
                  <option value="">Student</option>
                  <option value="Student">Student</option>
                  <option value="Professional">Professional</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative border border-blue-300 rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Idea Description */}
          <div>
            <label htmlFor="ideaDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Idea Description
            </label>
            <textarea
              id="ideaDescription"
              name="ideaDescription"
              value={formData.ideaDescription}
              onChange={handleChange}
              placeholder="describe your ideas in detail..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Video Link and Reference Link Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Video Link */}
            <div>
              <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 mb-2">
                Video link (optional)
              </label>
              <input
                type="url"
                id="videoLink"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleChange}
                placeholder="add here"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Reference Link */}
            <div>
              <label htmlFor="referenceLink" className="block text-sm font-medium text-gray-700 mb-2 ">
                Reference link (optional)
              </label>
              <input
                type="url"
                id="referenceLink"
                name="referenceLink"
                value={formData.referenceLink}
                onChange={handleChange}
                placeholder="add here"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              className="px-10 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 shadow-md"
            >
              Submit Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}