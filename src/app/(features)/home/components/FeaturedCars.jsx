import { Heart, MapPin, Calendar, Gauge, ArrowRight } from "lucide-react";

export default function CarListing() {
  const cars = [
    {
      id: 1,
      name: "Audi Q5",
      location: "Gulshan Abad, Rawalpindi",
      year: 2018,
      mileage: "29 252",
      price: "Rs 14.2 lkhs",
      postedTime: "2 Weeks Ago",
      image:
        "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Benz S Class",
      location: "Gulshan Abad, Rawalpindi",
      year: 2018,
      mileage: "29 252",
      price: "Rs 14.2 lkhs",
      postedTime: "2 Weeks Ago",
      image:
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Toyota Corolla",
      location: "Gulshan Abad, Rawalpindi",
      year: 2018,
      mileage: "29 252",
      price: "Rs 14.2 lkhs",
      postedTime: "2 Weeks Ago",
      image:
        "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className=" px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Popular Cars & Bikes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded">
                For Sale
              </span>
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">{car.name}</h3>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{car.location}</span>
              </div>

              <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center">
                  <Gauge className="w-4 h-4 mr-1" />
                  <span>{car.mileage}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-xl font-bold text-blue-600">
                  {car.price}
                </span>
                <span className="text-xs text-gray-500">{car.postedTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-8 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-300">
          View all
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
