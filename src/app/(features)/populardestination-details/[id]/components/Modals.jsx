"use client"
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react'


function Modals() {
      const [openFaq, setOpenFaq] = useState(null);


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



  return (
    <div>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 px-10">
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
    </div>
  )
}

export default Modals
