"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Building2,
  ChevronDown,
  ChevronRight,
  BoxesIcon,
  Car,
  Building,
  GlobeIcon,
  Home,
  Users2,
  Image,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    { name: "Categories", icon: <BoxesIcon size={20} />, path: "/admin/category" },
    {
      name: "Services Manage",
      icon: <Building2 size={20} />,
      isDropdown: true,
      subItems: [
        { name: "Car", icon: <Car size={18} />, path: "/admin/car" },
        { name: "Property", icon: <Building size={18} />, path: "/admin/property" },
        { name: "Tour Package", icon: <GlobeIcon size={18} />, path: "/admin/tour" },
        { name: "Home Consulting", icon: <Home size={18} />, path: "/admin/home-consulting" }
      ],
    },
    { name: "Testimonials", icon: <Users2 size={20} />, path: "/admin/testimonials" },
    { name: "Carousels", icon: <Image size={20} />, path: "/admin/carousel" },

  ];

  const footerItems = [
    {
      name: "Logout",
      icon: <LogOut size={20} />,
      action: () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/(auth)/login");
      },
    },
  ];

  const isActive = (path) => pathname === path;

  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="bg-white w-64 h-screen flex flex-col border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200">
        <p className="text-2xl font-bold text-blue-600">AsperzoneX</p>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {!item.isDropdown ? (
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm transition
                    ${isActive(item.path)
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ) : (
                <div>
                  <button
                    className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-sm transition
                      ${openDropdowns[item.name]
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                      }`}
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.icon}
                    <span className="flex-1 text-left">{item.name}</span>
                    {openDropdowns[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {openDropdowns[item.name] && (
                    <div className="pl-10 pr-3 py-2 space-y-1">
                      {item.subItems.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.path}
                          className={`flex items-center gap-2 py-2 px-3 rounded-md text-sm
                          ${isActive(sub.path)
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-blue-50"
                            }`}
                        >
                          {sub.icon}
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer (Logout) */}
      <div className="p-4 border-t border-gray-200">
        {footerItems.map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="flex items-center gap-3 w-full py-3 px-4 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
