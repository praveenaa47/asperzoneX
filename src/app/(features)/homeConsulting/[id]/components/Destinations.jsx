"use client"
import { ArrowRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function Destinations() {
  const router = useRouter();
  // const {id} = useParams()
  const destination = [
    {
      id: 1,
      name: "Maldives: Paradise Getaway",
      location:
        "Explore snow-capped mountains, serene lakes, and charming alpine villages",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    },
    {
      id: 2,
      name: "Dubai: City of Wonders",
      location:
        "Experience world-class shopping, desert safaris, and iconic skyscrapers in the heart of UAE.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    },
    {
      id: 3,
      name: "Switzerland: Scenic Adventure",
      location:
        "Experience world-class shopping, desert safaris, and iconic skyscrapers in the heart of UAE.",
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80",
    },
  ];
  
  const handleNavigate = (id) => {
    router.push(`/consulting-details/${id}`);
  };

  return (
    <div className="px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Featured Projects
      </h2>

      {/* Mobile: Horizontal scroll, Desktop: 2-column grid */}
      <div className="md:grid md:grid-cols-2 md:gap-6 md:p-10 mb-8">
        <div className="flex md:contents overflow-x-auto gap-4 md:gap-0 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide px-4 md:px-0 -mx-4 md:mx-0">
          {destination.map((dest) => (
            <div
              key={dest.id}
                 onClick={() => handleNavigate(dest.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-[calc(100vw-2rem)] md:w-auto snap-center"
            >
              <div className="relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-black">{dest.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <span>{dest.location}</span>
                </div>

                <button className="w-full flex gap-2 text-blue-600 font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white">
                  <p className="ml-2">Enquiry Now</p>
                  <ArrowRight className="w-5 h-7" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}