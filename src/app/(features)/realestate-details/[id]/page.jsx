"use client"
import AspireZonesFooter from "@/components/Footer";
import Header from "@/components/home/Header";
import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import RealEstateHero from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import PropertyFeatures from "./components/PropertyDetails";
import NearBy from "./components/NearBy";
import Location from "./components/Location";
// import SimilarProperties from "./components/SimilarProperties";
import { getEstatepropertybyId } from "@/redux/slices/realestateProprtySlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

function page() {
  const dispatch = useDispatch();
   const { id } = useParams(); 
const { singleProperty: property, loading, error } = useSelector((state) => state.property);

  useEffect(() => {
    console.log("Fetching property id:", id);
    if (id) {
      dispatch(getEstatepropertybyId(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading property details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Property not found</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="pb-0">
          <RealEstateHero property={property} />
        </section>
        {/* About Section */}
        <section className="-mt-10 md:-mt-16">
          <AboutUs property={property} />
        </section>
        <Features property={property} />
        <PropertyFeatures property={property} />
        <section className="-mt-10 md:-mt-16">
          <NearBy property={property} />
        </section>
        <section className="-mt-10 md:-mt-16">
          <Location property={property} />
        </section>
        {/* <SimilarProperties /> */}
      </div>
      <AspireZonesFooter />
    </div>
  );
}

export default page;
