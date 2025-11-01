"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-50">

      {/* Search Bar */}
      <div className="relative w-72 sm:w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-11 pr-4 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
      </div>

      {/* Profile + Notifications */}
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <button className="relative p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-sm font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
            AU
          </div>

          <ChevronDown size={18} className="text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;
