"use client"
import { useState } from 'react';
import { ChevronDown, FileText, Shield, Lock, HelpCircle, ClipboardList } from 'lucide-react';

export default function PoliciesAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const policies = [
    {
      icon: ClipboardList,
      title: "Booking Instructions",
      content: `
        <h3 class="font-semibold text-lg mb-3">How to Book Your Trip</h3>
        <ul class="space-y-2 text-gray-700">
          <li>• Select your desired destination and travel dates</li>
          <li>• Choose your preferred accommodation and package options</li>
          <li>• Fill in all required passenger information accurately</li>
          <li>• Review your booking details and total cost</li>
          <li>• Complete the payment process securely</li>
          <li>• You will receive a confirmation email within 24 hours</li>
          <li>• Keep your booking reference number for future correspondence</li>
        </ul>
        <p class="mt-4 text-gray-700">For group bookings (10+ people), please contact our sales team for special rates.</p>
      `
    },
    {
      icon: FileText,
      title: "Terms & Conditions",
      content: `
        <h3 class="font-semibold text-lg mb-3">General Terms</h3>
        <ul class="space-y-2 text-gray-700">
          <li>• All bookings are subject to availability and confirmation</li>
          <li>• Prices are subject to change without prior notice</li>
          <li>• Valid passport required for all international travel</li>
          <li>• Travel insurance is highly recommended</li>
          <li>• Customers are responsible for obtaining necessary visas</li>
          <li>• Full payment must be received before travel documents are issued</li>
          <li>• Any changes to bookings may incur additional charges</li>
        </ul>
        <p class="mt-4 text-gray-700">By proceeding with your booking, you agree to our complete terms and conditions.</p>
      `
    },
    {
      icon: Shield,
      title: "Refund & Cancellation Policy",
      content: `
        <h3 class="font-semibold text-lg mb-3">Cancellation Terms</h3>
        <div class="space-y-3 text-gray-700">
          <div class="bg-gray-50 p-3 rounded">
            <p class="font-medium">More than 30 days before departure:</p>
            <p>90% refund of total booking amount</p>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="font-medium">15-30 days before departure:</p>
            <p>50% refund of total booking amount</p>
          </div>
          <div class="bg-gray-50 p-3 rounded">
            <p class="font-medium">Less than 15 days before departure:</p>
            <p>No refund available</p>
          </div>
        </div>
        <p class="mt-4 text-gray-700">Refunds will be processed within 10-15 business days. Cancellation fees may apply for certain services.</p>
      `
    },
    {
      icon: Lock,
      title: "Privacy Policy (Summary)",
      content: `
        <h3 class="font-semibold text-lg mb-3">Your Data Protection</h3>
        <ul class="space-y-2 text-gray-700">
          <li>• We collect personal information necessary for booking and travel arrangements</li>
          <li>• Your data is stored securely and never shared with third parties without consent</li>
          <li>• Payment information is encrypted using industry-standard SSL technology</li>
          <li>• You have the right to access, modify, or delete your personal data</li>
          <li>• We use cookies to improve your browsing experience</li>
          <li>• Marketing communications can be opted out at any time</li>
          <li>• We comply with GDPR and international data protection regulations</li>
        </ul>
        <p class="mt-4 text-gray-700">Read our full privacy policy for complete details on data handling practices.</p>
      `
    },
    {
      icon: HelpCircle,
      title: "Contact & Support",
      content: `
        <h3 class="font-semibold text-lg mb-3">Get in Touch</h3>
        <div class="space-y-4 text-gray-700">
          <div>
            <p class="font-medium mb-1">Customer Service Hours:</p>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div>
            <p class="font-medium mb-1">Phone:</p>
            <p>+1 (800) 123-4567</p>
          </div>
          <div>
            <p class="font-medium mb-1">Email:</p>
            <p>support@travelcompany.com</p>
          </div>
          <div>
            <p class="font-medium mb-1">Emergency 24/7 Hotline:</p>
            <p>+1 (800) 999-8888</p>
          </div>
        </div>
        <p class="mt-4 text-gray-700">We aim to respond to all inquiries within 24 hours during business days.</p>
      `
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Important Information & Policies
        </h1>

        <div className="space-y-3 sm:space-y-4">
          {policies.map((policy, index) => {
            const Icon = policy.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      {policy.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                    <div className="pl-0 sm:pl-10 text-sm sm:text-base">
                      <div dangerouslySetInnerHTML={{ __html: policy.content }} />
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