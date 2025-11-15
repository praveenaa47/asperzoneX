"use client";
import Header from "@/components/home/Header";
import React, { useEffect } from "react";
import CarDetailPage from "./components/DetailHero";
import AspireZonesFooter from "@/components/Footer";
import CarOverview from "./components/CarOverview";
import SimilarCard from "./components/SimilarCar";
import ClientsTest from "./components/ClientsTest";
import { getCarById } from "@/redux/slices/carSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

function Page() {
  const dispatch = useDispatch();
  const {carId } = useParams();
  const { selectedCar, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    if (carId) dispatch(getCarById(carId));
  }, [dispatch, carId]);

  if (loading) return <p className="text-center py-10">Loading car details...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!selectedCar) return null;

  return (
    <div>
      <Header />
      <CarDetailPage car={selectedCar} />
      <CarOverview car={selectedCar} />
      <SimilarCard />
      <ClientsTest />
      <AspireZonesFooter />
    </div>
  );
}

export default Page;
