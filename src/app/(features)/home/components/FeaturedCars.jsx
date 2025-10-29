import { Heart, MapPin, Calendar, Gauge, ArrowRight } from "lucide-react";

export default function CarListing() {
  const cars = [
    {
      id: 1,
      name: "Audi Q5",
      location: "Gulshan Abad, Rawalpindi",
      year: 2018,
      mileage: "29,252 km",
      price: "Rs 14.2 lakhs",
      postedTime: "2 Weeks Ago",
      image:
        "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Benz S Class",
      location: "Gulshan Abad, Rawalpindi",
      year: 2018,
      mileage: "29,252 km",
      price: "Rs 14.2 lakhs",
      postedTime: "2 Weeks Ago",
      image:
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Toyota Corolla",
      location: "Gulshan Abad, Rawalpindi",
      year: 2018,
      mileage: "29,252 km",
      price: "Rs 14.2 lakhs",
      postedTime: "2 Weeks Ago",
      image:
        "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Honda Civic",
      location: "Gulshan Abad, Rawalpindi",
      year: 2019,
      mileage: "18,400 km",
      price: "Rs 18.5 lakhs",
      postedTime: "1 Week Ago",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 sm:px-10 lg:px-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-black mb-12">
        Popular Cars & Bikes
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-3"
          >
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden ">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute top-3 left-3 bg-gray-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                For Sale
              </span>
              <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow hover:bg-gray-100 transition">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="text-base font-semibold mb-1 text-black">
                {car.name}
              </h3>

              <div className="flex items-center text-gray-600 text-xs mb-2">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                <span>{car.location}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600 text-xs mb-3">
                <div className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center">
                  <Gauge className="w-3.5 h-3.5 mr-1" />
                  <span>{car.mileage}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-base font-bold text-blue-600">
                  {car.price}
                </span>
                <span className="text-[11px] text-gray-500">
                  {car.postedTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-8 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-300">
          View all
          <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
