import { Heart, MapPin, Calendar, Gauge, ArrowRight } from "lucide-react";

export default function CarListing() {
  const cars = [
    {
      id: 1,
      name: "Maldives: Paradise Getaway",
      location:
        "Explore snow-capped mountains, serene lakes, and charming alpine villages",
      image: "/tour.jpg",
    },
    {
      id: 2,
      name: "Dubai: City of Wonders",
      location:
        "Experience world-class shopping, desert safaris, and iconic skyscrapers in the heart of UAE.",
      image: "/tour.jpg",
    },
    {
      id: 3,
      name: "Switzerland: Scenic Adventure",
      location:
        "Experience world-class shopping, desert safaris, and iconic skyscrapers in the heart of UAE.",
      image: "/tour.jpg",
    },
  ];

  return (
    <div className=" px-10 py-10">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">{car.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <span>{car.location}</span>
              </div>

              {/* Enquiry Button */}
              <button className="w-full flex gap-2  text-blue-600 font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white">
                <p className="ml-2">Enquiry Now</p>
                <ArrowRight className="w-5 h-7" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
