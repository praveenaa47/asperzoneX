"use client";
import { Heart, Menu, SquareMenu } from "lucide-react";


export default function Header() {
  return (
    <header className="bg-white  py-3">
      <div className="sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-50 h-50 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Aspire Zones X Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </a>
            <a
              href="/aboutus"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About us
            </a>
            <a
              href="/Blogs"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Blog
            </a>
            <a
              href="/conatctus"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "/My-Ads")}
              className="hidden md:flex items-center text-gray-700 hover:text-blue-600 font-medium"
            >
              <span className="mr-2">My Ads</span>
              <SquareMenu className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => (window.location.href = "/saved")}
              className="hidden md:flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Favorites
              <Heart className="w-4 h-4 ml-2" />
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Log in
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
