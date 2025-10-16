"use client";
import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { ImUsers } from "react-icons/im";
import { FaCar } from "react-icons/fa";
import { RiPlaneLine } from "react-icons/ri";
import { FaHouseChimney } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
    const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
   const menuItems = [
      {
        id: 'book-trip',
        icon: RiPlaneLine,
        label: 'Book Trip',
        options: ['Flights', 'Hotels', 'Car Rentals']
      },
      {
        id: 'consulting',
        icon: FaBagShopping,
        label: 'Consulting',
        options: ['Contact Advisor', 'Schedule Meeting', 'Bussiness Solutions']
      },
      {
        id: 'buy-property',
        icon: FaHandHoldingHeart,
        label: 'Buy Property',
        options: ['Flights', 'Hotels', 'Car Rentals']
      },
      {
        id: 'sell-property',
        icon: FaHouseChimney,
        label: 'Sell Property',
        options: ['Houses ', 'Apartments', 'Villas']
      },
      {
        id: 'sell-car',
        icon: FaCar,
        label: 'Sell Car',
        options: ['Add Lisiting', 'View Offers', 'Sell Online']
      },
      {
        id: 'career-guidance',
        icon: ImUsers,
        label: 'Career Guidance',
        options: ['collegues', 'Colleges', 'Job oppurtunities']
      }
    ];

  const tabs = [
    'Search For',
    'All',
    'Travel & Holidays',
    'real estate',
    'dream home consulting',
    'Car',
    'Finance and business'
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in category:', activeTab);
  };

  return (
    <>
      <div className="border-t border-gray-200">
      <div className="px-4 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between  py-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-center">
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors group whitespace-nowrap hover:bg-gray-50"
                  >
                    <div className="w-8 h-8 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 ml-2 text-[#2563EB]" />
                    </div>
                    <span className="text-gray-900 font-medium">{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        openDropdown === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            console.log(`Selected: ${option}`);
                            setOpenDropdown(null);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {index < menuItems.length - 1 && (
                  <div className="border-l border-gray-300 h-8 mx-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <div className="relative h-[500px] sm:h-[400px] lg:h-[380px] w-full overflow-hidden">
    
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bgimaage.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-12 max-w-7xl leading-tight">
          Your All-In-One Platform For Life's Big Choices
        </h1>

        {/* Search Card */}
        <div className="w-full max-w-4xl  backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6">
          {/* Search For Label and Tabs */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
              
              {/* Tabs */}
              <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white shadow-md'
                        : ' text-white '
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Input and Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search For Anything"
                className="w-full px-4 text-gray-700 py-3 sm:py-4 pr-12 rounded-lg border bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 sm:py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl whitespace-nowrap text-sm sm:text-base"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
        </>

  );
};

export default HeroSection;