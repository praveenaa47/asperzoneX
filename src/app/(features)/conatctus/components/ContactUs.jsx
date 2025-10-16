"use client";
import React, { useState } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function ContactSupport() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'How Quick Will I Get A Response ?',
      answer: 'We typically respond within 24 hours during business days. For urgent matters, please call us directly.'
    },
    {
      id: 2,
      question: 'Can I Visit Your Office In Person ?',
      answer: 'Yes, we welcome office visits! Please schedule an appointment in advance to ensure someone is available to assist you.'
    },
    {
      id: 3,
      question: 'How Do I Apply A Job ?',
      answer: 'You can apply for jobs through our careers page or send your resume to our HR email. We review all applications carefully.'
    }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-20 px-4"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            We're Here To Help - Get In Touch
          </h1>
          <p className="text-base md:text-lg mb-6 max-w-2xl">
            Have Questions Or Need Support? Reach Out Easily Through Any Of These Ways.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Contact us
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Enquiry Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enquiry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <textarea
                placeholder="Your message"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Leave Us a Message →
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className='border border-blue-400 p-3'>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Aspire Zones X</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Explore the future with smart, eco-centric, executive, and business services. 
                  Reach out to us now for personalized support and expert guidance.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-sm text-gray-600">
                      Building 126b, Infopark,
                      <br />
                      Building 120b, Koratty/pol, Kerala,
                      <br />
                      India, PIN - 576754
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">+91 70348 04717</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">aspire@aspirezones.com</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Assistance hours: Monday - Saturday 9 am to 6 pm IST
                  </p>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 border border-blue-300 rounded-full flex items-center justify-center hover:bg-blue-50 hover:border-blue-500 transition-colors">
                      <Facebook className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 border border-blue-300 rounded-full flex items-center justify-center hover:bg-blue-50 hover:border-blue-500 transition-colors">
                      <Instagram className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 border border-blue-300 rounded-full flex items-center justify-center hover:bg-blue-50 hover:border-blue-500 transition-colors">
                      <Twitter className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      openFaq === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === faq.id && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Email Us
          </button>
        </div>
      </div>
    </div>
  );
}