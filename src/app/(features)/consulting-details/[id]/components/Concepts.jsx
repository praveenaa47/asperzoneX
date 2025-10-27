import React from 'react';

export default function VillaPhases() {
  const phases = [
    {
      number: 1,
      title: "Concept & Planning",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
      description: "Our journey began with understanding the client's lifestyle and aspirations. We created multiple design concepts before finalizing a modern tropical theme — open, airy, and deeply connected with nature.",
      features: []
    },
    {
      number: 2,
      title: "Design & Visualization",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      description: "Our architects and interior designers worked together to visualize every space. The focus was on bringing natural light indoors, with large glass panels and warm wooden finishes.",
      features: ["Sustainable Materials", "Open Layouts", "Smart Lighting Design"]
    }
  ];

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Phases */}
        <div className="space-y-12 md:space-y-16 lg:space-y-20">
          {phases.map((phase, index) => (
            <div key={index} className="space-y-6">
              {/* Phase Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Phase {phase.number}: {phase.title}
              </h2>

              {/* Phase Image */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={phase.image}
                  alt={phase.title}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>

              {/* Phase Description */}
              <div className="space-y-4">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
                  {phase.description}
                </p>

                {/* Features */}
                {phase.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {phase.features.map((feature, idx) => (
                      <React.Fragment key={idx}>
                        <a 
                          href="#" 
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm md:text-base transition-colors"
                        >
                          {feature}
                        </a>
                        {idx < phase.features.length - 1 && (
                          <span className="text-gray-400">|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}