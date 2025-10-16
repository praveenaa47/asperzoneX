import { Heart, MapPin, Calendar, Gauge, ArrowRight, Phone } from "lucide-react";

export default function SpecialDeal() {
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
   <div className="px-10 py-8">
  <h2 className="text-3xl font-bold text-center text-black mb-8">
    Special Deals
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    {cars.map((car) => (
      <div
        key={car.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative">
          <span className="absolute top-3 left-3 bg-[#6385CF] text-white text-xs font-semibold px-3 py-1 rounded">
            For Sale
          </span>
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-black">{car.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <span>{car.location}</span>
          </div>

          {/* Two Buttons */}
          <div className="flex gap-3">
            {/* Submit Enquiry */}
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white">
              <ArrowRight className="w-5 h-5" />
              <span>Submit Enquiry</span>
            </button>

            {/* Contact Seller */}
            <button className="flex-1 flex items-center justify-center gap-2  text-white bg-green-600 font-semibold py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:text-white">
              <Phone className="w-5 h-5" />
              <span>Contact Seller</span>
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
