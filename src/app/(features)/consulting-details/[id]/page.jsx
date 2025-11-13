"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeConsultingById } from "@/redux/slices/homeConsultingSlice";

import Header from "@/components/home/Header";
import AspireZonesFooter from "@/components/Footer";
import ConsultingHero from "./components/ConsultingHero";
import VillaIntroduction from "./components/Intro";
import VillaPhases from "./components/Concepts";
import PhotoGallery from "./components/Gallery";
import SimilarProjects from "./components/SimilarProjects";
import { useParams } from "next/navigation";

export default function ConsultingPage({ params }) {
  const dispatch = useDispatch();
  const { selected, loading } = useSelector((state) => state.homeConsulting);
const{id} = useParams()

  useEffect(() => {
    dispatch(getHomeConsultingById(id));
  }, [dispatch, id]);

  if (loading || !selected)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading consulting details...
      </div>
    );

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <ConsultingHero
        title={selected.title}
        subtitle={selected.subtitle}
        bannerImage={selected.bannerImage}
      />

      {/* Introduction Section */}
      {selected.introduction && (
        <VillaIntroduction
          description={selected.introduction.description}
          image={selected.introduction.image}
        />
      )}

      {/* Phases or Sections */}
      {selected.sections && <VillaPhases sections={selected.sections} />}

      {/* Gallery */}
      {selected.gallery && <PhotoGallery gallery={selected.gallery} />}

      <SimilarProjects />
      <AspireZonesFooter />
    </div>
  );
}
