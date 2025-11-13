"use client"
import { useState } from 'react';
import { ChevronDown, FileText, Shield, Lock, HelpCircle, ClipboardList } from 'lucide-react';

export default function Dropdown({ policies = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

 const displayPolicies = policies && policies.length > 0 ? policies : [
    {
      question: "Booking Instructions",
      answer: "Select your desired destination and travel dates..."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    const getIcon = (index) => {
    const icons = [ClipboardList, FileText, Shield, Lock, HelpCircle];
    return icons[index % icons.length];
  };

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 md:px-8 lg:px-10 xl:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8 md:mb-12">
          Important Information & Policies
        </h1>

        <div className="space-y-2 sm:space-y-3 md:space-y-4 text-black">
          {displayPolicies.map((policy, index) => {
const Icon = getIcon(index);
            const isOpen = openIndex === index;

            return (
              <div
                key={policy._id || index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 text-black flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                    <div className="flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg font-semibold text-black truncate">
                      {policy.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-black transition-transform duration-300 flex-shrink-0 ml-2 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-4 sm:px-5 md:px-6 pb-3 sm:pb-4 md:pb-6 pt-1 sm:pt-2">
                    <div className="sm:pl-8 md:pl-10 text-xs sm:text-sm md:text-base">
                      {policy.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}