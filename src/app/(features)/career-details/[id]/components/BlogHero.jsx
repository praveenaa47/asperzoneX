"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CareersBanner() {

  const slides = [
    {
      title: "Unleash Your Ideas. Inspire the Future",
      subtitle: "Relax On Pristine Beaches And Enjoy Luxury Resorts With Stunning Ocean Views.",
      image: "/innovate.jpg"
    },
  ];

  return (
    <>
    <div className="relative w-full  h-[60vh] overflow-hidden bg-white mt-5">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
         <div
  key={index}
  className={`absolute inset-0 transition-opacity duration-1000 ${
    index === currentSlide ? 'opacity-100' : 'opacity-0'
  }`}
>
  {/* Background Image */}
  <div
    className="relative mx-auto w-[90%] h-[400px] sm:h-[450px] lg:h-[370px] bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
    style={{ backgroundImage: `url(${slide.image})` }}
  >
    {/* Optional dark overlay */}
    <div className="absolute inset-0 bg-black/40"></div>
  </div>
</div>
        ))}
      </div>
    </div>
 
    </>
  );
}