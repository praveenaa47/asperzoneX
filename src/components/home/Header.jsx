"use client";
import { useEffect, useState } from "react";
import { Heart, Menu, SquareMenu, User, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [token, setToken] = useState(null);
  const router = useRouter();

    useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setToken(null);
    router.push("/Login");
  };


  return (
    <header className="bg-white shadow-sm py-3 relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-32 sm:w-40 md:w-50 h-12 sm:h-14 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Aspire Zones X Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="/aboutus"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About us
            </a>
            <a
              href="/Blogs"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Blog
            </a>
            <a
              href="/conatctus"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "/My-Ads")}
              className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <span className="mr-2">My Ads</span>
              <SquareMenu className="w-4 h-4" />
            </button>

            <button
              onClick={() => (window.location.href = "/saved")}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Favorites
              <Heart className="w-4 h-4 ml-2" />
            </button>

          {token ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => router.push("/userProfile")}
                  className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
              
              </div>
            ) : (
              <button
                onClick={() => router.push("/Login")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Log in
              </button>
            )}
          </div>
          {/* </div> */}

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => router.push("/Login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
            >
              Log in
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <nav className="px-4 py-4 space-y-1">
            <a
              href="/"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/aboutus"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About us
            </a>
            <a
              href="/Blogs"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="/conatctus"
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>

            <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => {
                  window.location.href = "/My-Ads";
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              >
                <span>My Ads</span>
                <SquareMenu className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  window.location.href = "/saved";
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              >
                <span>Favorites</span>
                <Heart className="w-4 h-4" />
              </button>
{token ? (
                <>
                  <button
                    onClick={() => {
                      router.push("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                  >
                    <span>Profile</span>
                    <User className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg font-medium transition-colors"
                  >
                    <span>Logout</span>
                  </button>
                </>
              ) : null}
              
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}