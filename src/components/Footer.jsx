"use client";
import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function AspireZonesFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="bg-blue-600 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Section - Logo and Tagline */}
          <div className="md:col-span-2 lg:col-span-5">
            <p className="leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
              Empowering your journey in travel, real estate, education, and
              business with innovation, trust, and a global vision.
            </p>
            <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[200px] lg:max-w-[250px] mx-auto sm:mx-0">
              <img
                src="/logo.png"
                alt="Aspire Zones X Logo"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Middle Section - Quick Links and Services */}
          <div className="md:col-span-2 lg:col-span-4 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Services</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Travel & Holidays
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Real Estate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Finance And Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Innovate X
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Home Selling And Buying Car
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Talent & Career
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Higher Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors inline-block">
                    Dream Home Consulting
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Newsletter and Contact */}
          <div className="md:col-span-2 lg:col-span-3 space-y-5 sm:space-y-6 md:space-y-8">
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">
                Subscribe to our newsletter
              </h3>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4">
                Be the first to receive exciting news, insider tips, and special
                promotions.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 sm:py-2.5 rounded-lg bg-white text-gray-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  onClick={handleSubscribe}
                  className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 bg-blue-700 hover:bg-blue-800 rounded-lg font-medium text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Contact</h3>
              <p className="text-xs sm:text-sm mb-2">
                Have a questions?{" "}
                <span className="font-semibold italic">Get in touch</span> or
                check out our{" "}
                <span className="font-semibold italic">Help Center</span>.
              </p>
              <p className="text-xs sm:text-sm mb-1">
                You can also text our support team at
              </p>
              <p className="font-semibold text-sm sm:text-base mb-1">+91 75588 00117</p>
              <p className="text-xs sm:text-sm">
                or email us at{" "}
                <span className="font-semibold italic break-all">
                  aspire@aspirezones.com
                </span>
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-5 md:mt-6">
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}