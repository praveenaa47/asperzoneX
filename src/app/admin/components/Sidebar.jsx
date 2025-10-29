"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Clipboard,
  Building2,
  ChevronDown,
  ChevronRight,
  BoxesIcon,
  Car,
  Building,
  GlobeIcon,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Categories",
      icon: <BoxesIcon size={20} />,
      path: "/admin/category",
    },
    {
      name: "Services Manage ",
      icon: <Building2 size={20} />,
      isDropdown: true,
      subItems: [
        { name: "Car", icon: <Car size={18} />, path: "/admin/car" },
        { name: "Property", icon: <Building size={18} />, path: "/admin/property" },
        { name: "Tour Package", icon: <GlobeIcon size={18} />, path: "/admin/tour" },
      ],
    },
    { name: "Admissions", icon: <Clipboard size={20} />, path: "" },

  ];

  const footerItems = [
    {
      name: "Logout",
      icon: <LogOut size={20} />,
      path: "/login",
      action: () => {
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminToken");
        router.push("/login");
      },
    },
  ];

  const isActive = (path) => pathname === path;
  const isDropdownSectionActive = (subItems) =>
    subItems && subItems.some((subItem) => isActive(subItem.path));

  const toggleDropdown = (itemName) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <div
      className={`bg-white shadow-md h-full ${isHovered ? "w-64" : "w-20"
        } flex flex-col transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center px-6 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-500 font-bold">E</span>
          </div>
          {isHovered && <span className="text-xl font-semibold text-blue-600">EduPortal</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.isDropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`w-full flex items-center ${isHovered ? "space-x-3 px-4" : "justify-center px-2"
                      } py-3 rounded-md text-sm font-medium transition-colors
                      ${isDropdownSectionActive(item.subItems)
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {item.icon}
                    {isHovered && (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
                        {openDropdowns[item.name] ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </>
                    )}
                  </button>

                  {isHovered && openDropdowns[item.name] && (
                    <div className="mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path}
                          className={`flex items-center space-x-3 px-8 py-2 rounded-md text-sm transition-colors
                            ${isActive(subItem.path)
                              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                              : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center ${isHovered ? "space-x-3 px-4" : "justify-center px-2"
                    } py-3 rounded-md text-sm font-medium transition-colors
                    ${isActive(item.path)
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {item.icon}
                  {isHovered && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 px-2 py-4">
        {footerItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={`flex items-center ${isHovered ? "space-x-3 px-4" : "justify-center px-2"
              } py-3 text-gray-700 hover:bg-gray-100 rounded-md transition w-full text-left`}
          >
            {item.icon}
            {isHovered && <span>{item.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;