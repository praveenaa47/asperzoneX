"use client";
import React, { useEffect, useState } from "react";
import CarHero from "./components/CarHero";
import Header from "@/components/home/Header";
import LatestBlogs from "./components/LatestBlogs";
import AspireZonesFooter from "@/components/Footer";
import ClientsReview from "./components/ClientsReview";
import HowItWorks from "./components/HowitWorks";
import Filters from "./components/Filter";
import CarList from "./components/CarLists";
import { getAllCars } from "@/redux/slices/carSlice";
import { useDispatch, useSelector } from "react-redux";

function page() {
  const dispatch = useDispatch();
  const { carList, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const [expandedFilters, setExpandedFilters] = useState({
    brand: true,
    model: true,
    location: false,
    price: false,
    seating: false,
    year: false,
    owners: false,
    inspection: false,
    km: false,
    fuel: false,
    transmission: false,
    colour: false,
  });

  const [selectedBrands, setSelectedBrands] = useState(["Toyota"]);
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const toggleFilter = (filter) => {
    setExpandedFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const toggleFavorite = (carId) => {
    setFavorites((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    // You can implement sorting logic here
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-600">Loading cars...</div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load cars: {error}
      </div>
    );

  return (
    <div>
      <Header />
      <CarHero />
      <div className="min-h-screen">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-6">
            <Filters
              expandedFilters={expandedFilters}
              toggleFilter={toggleFilter}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
            />

            <CarList
              cars={(carList || []).map((car) => ({
                id: car._id,
                image: car.media?.[0]?.url || "/placeholder.jpg", 
                model: `${car.brand} ${car.model}`,
                price: `₹${car.price?.totalPrice?.toLocaleString() || 0}`, 
                year: car.year,
                km: `${car.kmsDriven} km`,
                location: `${car.location?.city || ""}, ${
                  car.location?.country || ""
                }`,
                fuel: car.fuelType,
                transmission: car.transmission,
                color: car.color,
              }))}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
      </div>
      <HowItWorks />
      <ClientsReview />
      <LatestBlogs />
      <AspireZonesFooter />
    </div>
  );
}

export default page;
