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
    <div className="bg-blue-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* FIXED GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* LEFT SECTION */}
          <div className="space-y-4 break-words">
            <p className="text-lg font-semibold leading-relaxed">
              Empowering your journey in travel, real estate, education,
              and business with innovation, trust, and a global vision.
            </p>
            <img
              src="/logo.png"
              className="w-40 h-auto object-contain mx-auto sm:mx-0"
              alt="logo"
            />
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-blue-200" href="#">Home</a></li>
              <li><a className="hover:text-blue-200" href="#">About</a></li>
              <li><a className="hover:text-blue-200" href="#">Contact Us</a></li>
              <li><a className="hover:text-blue-200" href="#">Blog</a></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-blue-200" href="#">Travel & Holidays</a></li>
              <li><a className="hover:text-blue-200" href="#">Real Estate</a></li>
              <li><a className="hover:text-blue-200" href="#">Finance And Business</a></li>
              <li><a className="hover:text-blue-200" href="#">Innovate X</a></li>
              <li><a className="hover:text-blue-200" href="#">Home Selling And Buying Car</a></li>
              <li><a className="hover:text-blue-200" href="#">Talent & Career</a></li>
              <li><a className="hover:text-blue-200" href="#">Higher Education</a></li>
              <li><a className="hover:text-blue-200" href="#">Dream Home Consulting</a></li>
            </ul>
          </div>

          {/* NEWSLETTER + CONTACT */}
          <div className="space-y-6 break-all">
            <div>
              <h3 className="font-semibold text-lg mb-3">Subscribe</h3>
              <p className="text-sm mb-3">Stay updated with news and promotions.</p>

              {/* FIX: FLEX WRAP ENABLED */}
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg font-medium text-sm w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Contact</h3>
              <p className="text-sm mb-1">Questions? Get in touch.</p>
              <p className="text-base font-semibold">+91 75588 00117</p>
              <p className="text-sm break-all">aspire@aspirezones.com</p>

              <div className="flex gap-4 mt-4">
                <Facebook className="w-6 h-6 hover:text-blue-200" />
                <Twitter className="w-6 h-6 hover:text-blue-200" />
                <Instagram className="w-6 h-6 hover:text-blue-200" />
                <Linkedin className="w-6 h-6 hover:text-blue-200" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
