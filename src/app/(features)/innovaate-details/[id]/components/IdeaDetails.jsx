import React from 'react';
import { Home, Zap, Leaf, Users } from 'lucide-react';

export default function SmartHomeDetails() {
  const features = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Customizable Spaces",
      description: "Smart modular homes are built with customization in mind. From the layout to the finishes, everything can be tailored to fit your specific needs and lifestyle preferences."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Energy-Efficient & Eco-Friendly",
      description: "These homes are designed with sustainability at their core. They incorporate energy-efficient materials, solar panels, and smart home technology to reduce your environmental footprint."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Cost-Effective & Long-Lasting",
      description: "Modular construction is more affordable than traditional building methods. With factory-built modules, you save on labor costs and construction time without compromising on quality."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Adaptable to Your Lifestyle",
      description: "Whether you're a growing family or downsizing for retirement, modular homes can adapt to your changing needs. Add rooms, reconfigure spaces, or expand as your life evolves."
    },
  
  ];

  const takeaways = [
    "Smart modular homes offer a blend of modern technology and sustainable living.",
    "They offer energy-efficient solutions and flexible layouts.",
    "Ideal for eco-conscious homeowners.",
    "Faster build times compared to traditional construction and less waste.",
    "Lower costs without sacrificing comfort or style."
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Smart Modular Homes: The Future of Modern Living
          </h1>
          
          <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=400&fit=crop" 
            alt="Modern home exterior"
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-md"
          />
          <p className="text-center text-gray-600 mt-4 font-medium">
            Reimagining Homeownership
          </p>
        </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            In recent years, the concept of smart modular homes has revolutionized the way we think about housing. These innovative homes are not only cost-effective but also offer a level of flexibility and customization that traditional housing simply can't match. Whether you're looking to downsize, expand, or create a sustainable living space, smart modular homes might be the perfect solution for you. Let's dive into what makes these homes so special and why they're changing the game in modern architecture.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className=" px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Banner */}
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=400&fit=crop" 
            alt="Modern home exterior"
            className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-md"
          />
          <p className="text-center text-gray-600 mt-4 font-medium">
            Reimagining Homeownership
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {takeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                <span className="text-gray-700">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
              <span className="text-gray-700 font-medium">Save & Share</span>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input 
                type="email"
                placeholder="Get More Tips In Your Inbox"
                className="flex-1 md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder-gray-400"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}