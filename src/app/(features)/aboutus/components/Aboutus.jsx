import React from "react";
import {
  Target,
  Eye,
  Award,
  Users,
  ShieldCheck,
  TrendingUp,
  MapPin,
} from "lucide-react";

export default function AboutUs() {
  const journeyMilestones = [
    {
      year: "2015",
      title: "Our Journey Of Excellence",
      description:
        "Helped Achieve Financial MBA A Civilian To Transform Travel And Real Estate Landscape.",
    },
    {
      year: "2017",
      title: "Milestones That Refine Us",
      description: "Launched Our First AI-Powered Property Search Platform.",
    },
    {
      year: "2019",
      title: "The Aspire Zone Story",
      description:
        "Expanded Into Luxury Real Estate And Commercial Property Sectors.",
    },
    {
      year: "2021",
      title: "Years Of Growth & Innovation",
      description:
        "Reached 10,000+ Properties Sold And Won The Global Service Excellence Award.",
    },
    {
      year: "2024",
      title: "Our Achievements Over The Years",
      description:
        "Introduced Smart Integrated Solutions For Seamless User Experiences.",
    },
  ];

  const leaders = [
    {
      name: "Ameer Hamza",
      position: "Founder & CEO",
      description:
        "A Visionary Leader With 15 Years Of Experience In Real Estate. Passionate About Innovation And Customer Success.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    },
    {
      name: "Periya Shar",
      position: "Chief Operating Officer",
      description:
        "Expert In Operations Management, Ensuring Smooth & Efficient Delivery Of Services To Our Clients.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    },
  ];

  const features = [
    {
      icon: <Award className="w-10 h-10 text-red-600" />,
      title: "Expertise",
      description:
        "Years Of Experience And Deep Understanding Of The Real Property.",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: "Global Network",
      description:
        "Access To A Wide Range Of Properties And International Buyers For Reach.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-purple-600" />,
      title: "Client-Centric",
      description:
        "Dedicated To Providing Personalized Service To Support All Foreveryone.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-green-600" />,
      title: "Innovative Solutions",
      description: "Use Of Cutting-Edge Technology Like AI And Analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mission & Vision Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
          Our Mission & Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4 text-black">Mission</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              To Simplify Real Estate And Travel Experiences With Transparency,
              Trust And Quality Services.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-purple-50 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4 text-black">Vision</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              To Become The Most Reliable Partner For Property And Travel
              Services In India.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Our Journey
          </h2>

          <div className="relative">
            {/* Timeline Line - Mobile */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-blue-300"></div>

            {/* Timeline Line - Desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-300"></div>

            {journeyMilestones.map((milestone, index) => (
              <div key={index} className="relative mb-16 last:mb-0">
                <div className="md:hidden flex gap-6 items-start">
                  {/* Year Badge */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md text-xs">
                      {milestone.year}
                    </div>
                    {/* small center dot aligned with the timeline */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>

                  <div className="flex-1 pt-2">
                    <div className="bg-white rounded-lg p-5 shadow-md">
                      <h4 className="font-bold text-lg mb-2 text-black">
                        {milestone.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-black">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center">
                  {index % 2 === 0 ? (
                    <>
                      {/* Left Content */}
                      <div className="flex-1 pr-12 text-right">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                          <h4 className="font-bold text-lg mb-2 text-black">
                            {milestone.title}
                          </h4>
                          <p className="text-sm  leading-relaxed text-black">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="flex-shrink-0 z-10 relative">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm">
                          {milestone.year}
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                      </div>

                      <div className="flex-1"></div>
                    </>
                  ) : (
                    <>
                      {/* Left Spacer */}
                      <div className="flex-1"></div>

                      {/* Year Badge */}
                      <div className="flex-shrink-0 z-10 relative">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm">
                          {milestone.year}
                        </div>
                        {/* Connection dot */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                      </div>

                      {/* Right Content */}
                      <div className="flex-1 pl-12 text-left">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                          <h4 className="font-bold text-lg mb-2 text-black">
                            {milestone.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-black">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Leadership
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                />
              </div>
              <h3 className="font-bold text-xl mb-1 text-black">
                {leader.name}
              </h3>
              <p className="text-blue-600 font-medium mb-3 ">
                {leader.position}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                {leader.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-black">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-black">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locate Us Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Locate Us
        </h2>

        <div className="bg-gray-100 rounded-lg p-6 mb-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-black">
            <MapPin className="w-5 h-5 text-red-600" />
            Location:
          </h3>
          <div
            className="bg-gray-200 rounded-lg overflow-hidden mb-4"
            style={{ height: "400px" }}
          >
            <iframe
              title="Map location"
              src="https://www.google.com/maps?q=33.5651,73.0479&z=12&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <p className="text-gray-700 text-center">
            <strong>Address:</strong> Harbingar Lane, gardinia plaza, Rawalpindi
            - 46000
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white ">
            Ready To Start Your Journey ?
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 ">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
            <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Our Properties
            </button>
            <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Discover Travel Deals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
