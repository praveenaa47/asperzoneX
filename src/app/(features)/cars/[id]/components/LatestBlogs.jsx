import { Heart, MapPin, Calendar, Gauge, ArrowRight, Phone } from "lucide-react";

export default function LatestBlogs() {
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
    {
      id: 4,
      name: "Switzerland: Scenic Adventure",
      location:
        "Experience world-class shopping, desert safaris, and iconic skyscrapers in the heart of UAE.",
      image: "/tour.jpg",
    },
  ];

  return (
   <div className="px-10">
  <h2 className="text-3xl font-bold text-center text-black mb-8">
    Special Deals
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {cars.map((car) => (
      <div
        key={car.id}
        className=" overflow-hidden hover:shadow-xl duration-300"
      >
        <div className="relative">
          <span className="absolute top-3 left-3 bg-gray-400 text-white text-xs font-semibold px-3 py-1 rounded">
            Exterior
          </span>
          <img
            src={car.image}
            alt={car.name}
            className="w-100 h-48 object-cover rounded-2xl"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-black">{car.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <span>{car.location}</span>
          </div>

        </div>
      </div>
    ))}
  </div>
</div>

  );
}
