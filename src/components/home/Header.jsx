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
            <div className="w-32 sm:w-36 lg:w-40 h-12 flex items-center">
              <img
                src="/logo.png"
                alt="Aspire Zones X Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation (Only on large screens) */}
          <nav className="hidden lg:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="/aboutus" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About Us</a>
            <a href="/Blogs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Blog</a>
            <a href="/conatctus" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => router.push("/My-Ads")}
              className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
            >
              My Ads <SquareMenu className="w-4 h-4 ml-2" />
            </button>

            <button
              onClick={() => router.push("/saved")}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Favorites <Heart className="w-4 h-4 ml-2" />
            </button>

            {token ? (
              <button
                onClick={() => router.push("/userProfile")}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <User className="w-4 h-4 mr-2" /> Profile
              </button>
            ) : (
              <button
                onClick={() => router.push("/Login")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Log in
              </button>
            )}
          </div>

          {/* Mobile Actions (for all screens < 1024px) */}
          <div className="flex lg:hidden items-center space-x-3">
            {!token && (
              <button
                onClick={() => router.push("/Login")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Log in
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
          <nav className="px-4 py-4 space-y-1">
            <a href="/" className="block py-3 px-4 rounded-lg hover:bg-blue-50">Home</a>
            <a href="/aboutus" className="block py-3 px-4 rounded-lg hover:bg-blue-50">About Us</a>
            <a href="/Blogs" className="block py-3 px-4 rounded-lg hover:bg-blue-50">Blog</a>
            <a href="/conatctus" className="block py-3 px-4 rounded-lg hover:bg-blue-50">Contact</a>

            <div className="pt-4 border-t space-y-2">
              <button
                onClick={() => router.push("/My-Ads")}
                className="w-full flex justify-between px-4 py-3 hover:bg-blue-50"
              >
                My Ads <SquareMenu className="w-4 h-4" />
              </button>

              <button
                onClick={() => router.push("/saved")}
                className="w-full flex justify-between px-4 py-3 hover:bg-blue-50"
              >
                Favorites <Heart className="w-4 h-4" />
              </button>

              {token ? (
                <>
                  <button
                    onClick={() => router.push("/userProfile")}
                    className="w-full flex justify-between px-4 py-3 hover:bg-blue-50"
                  >
                    Profile <User className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
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
