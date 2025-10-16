"use client";
import { useState } from 'react';
import { User, Mail, Phone, ChevronDown, Calendar } from 'lucide-react';

export default function FillForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentsLocation: '',
    nationality: '',
    higherQualification: '',
    courseInterested: '',
    startDate: '',
    hearAbout: '',
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = () => {
    if (!formData.termsAccepted) {
      alert('Please accept the Terms & Condition to proceed.');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-2">
            Enquiry Now Get Support
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            we are here to help you. fill out the form below & we'll get back to you shortly
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Name Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative border border-blue-300 rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full text-gray-500 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative border border-blue-300 rounded-xl">
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
                  className="w-full text-gray-500 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Email and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative border border-blue-300 rounded-xl">
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
                  className="w-full text-gray-500 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative border border-blue-300 rounded-xl">
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
                  className="w-full text-gray-500 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Students Location and Nationality Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Students Location */}
            <div>
              <label htmlFor="studentsLocation" className="block text-sm font-medium text-gray-700 mb-2">
                Students Location
              </label>
              <div className="relative border border-blue-300 rounded-xl">
                <select
                  id="studentsLocation"
                  name="studentsLocation"
                  value={formData.studentsLocation}
                  onChange={handleChange}
                  className="w-full text-gray-500 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                >
                  <option value="">Select a country</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="UAE">United Arab Emirates</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                Nationality
              </label>
              <div className="relative border border-blue-300 rounded-xl">
                <select
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full text-gray-500 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                >
                  <option value="">Select a country</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="UAE">United Arab Emirates</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Higher Qualification */}
          <div>
            <label htmlFor="higherQualification" className="block text-sm font-medium text-gray-700 mb-2">
              Higher Qualification
            </label>
              <div className="relative border border-blue-300 rounded-xl">
              <select
                id="higherQualification"
                name="higherQualification"
                value={formData.higherQualification}
                onChange={handleChange}
                className="w-full text-gray-500 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
              >
                <option value="">Select your highest qualification</option>
                <option value="Plus Two (+2)">Plus Two (+2)</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-1">E.g., Plus Two (+2), Bachelor's, Master's, etc.</p>
          </div>

          {/* Course Interested and Start Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Course Interested */}
            <div>
              <label htmlFor="courseInterested" className="block text-sm font-medium text-gray-700 mb-2">
                Course Interested in
              </label>
              <div className="relative border border-blue-300 rounded-xl">
                <select
                  id="courseInterested"
                  name="courseInterested"
                  value={formData.courseInterested}
                  onChange={handleChange}
                  className="w-full text-gray-500 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                >
                  <option value="">Select interested course</option>
                  <option value="Business">Business Management</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Arts">Arts & Humanities</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* When would you like to start study */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                When would you like to start study
              </label>
              <div className="relative border border-blue-300 rounded-xl">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  className="w-full text-gray-500 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* How did you hear about us */}
          <div>
            <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-2">
              How did you hear about us
            </label>
              <div className="relative border border-blue-300 rounded-xl">
              <select
                id="hearAbout"
                name="hearAbout"
                value={formData.hearAbout}
                onChange={handleChange}
                className="w-full text-gray-500 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
              >
                <option value="">Select here</option>
                <option value="Social Media">Social Media</option>
                <option value="Google Search">Google Search</option>
                <option value="Friend/Family">Friend/Family</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-3 py-3">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="termsAccepted" className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              I accept the <a href="#" className="text-blue-600 hover:underline">Terms & Condition</a>. By submitting this form, I consent to receive relevant communications via email, phone, or text from Aspire Zones X and its partners. I understand that my information will not be shared across Aspire Zones X Group and that I can opt out at any time by using the unsubscribe link provided in all communications.
              <br />
              <span className="block mt-1">
                The information I provide will be processed in accordance with Aspire Zones X <a href="#" className="text-blue-600 hover:underline">privacy policy</a>.
              </span>
            </label>
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