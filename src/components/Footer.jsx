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
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Section - Logo and Tagline */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <p className=" leading-relaxed text-2xl font-bold">
                Empowering your journey in travel, real estate, education, and
                business with innovation, trust, and a global vision.
              </p>
            </div>
            <div className="w-50 h-50 flex ms-30 items-center justify-center">
              <img
                src="/logo.png"
                alt="Aspire Zones X Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Middle Section - Quick Links and Services */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Travel & Holidays
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Real Estate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Finance And Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Innovate X
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Home Selling And Buying Car
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Talent & Career
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Higher Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Dream Home Consulting
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Newsletter and Contact */}
          <div className="lg:col-span-3 space-y-8">
            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm mb-4">
                Be the first to receive exciting news, insider tips, and special
                promotions.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <p className="text-sm mb-2">
                Have a questions?{" "}
                <span className="font-semibold italic">Get in touch</span> or
                check out our{" "}
                <span className="font-semibold italic">Help Center</span>.
              </p>
              <p className="text-sm mb-1">
                You can also text our support team at
              </p>
              <p className="font-semibold mb-1">+91 75588 00117</p>
              <p className="text-sm">
                or email us at{" "}
                <span className="font-semibold italic">
                  aspire@aspirezones.com
                </span>
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-4 mt-6">
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="hover:text-blue-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
         
    </div>
  );
}
