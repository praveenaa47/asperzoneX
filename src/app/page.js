import Header from "@/components/home/Header";
import Image from "next/image";
import HeroSection from "./(features)/home/components/HeroSection";
import ServicesSection from "./(features)/home/components/Services";
import FeaturedProperties from "./(features)/home/components/FeaturedProperties";
import CarListing from "./(features)/home/components/FeaturedCars";
import WhyChooseUs from "./(features)/home/components/WhyChooseus";
import WhoWeAre from "./(features)/home/components/Whoweare";
import BlogSection from "./(features)/home/components/Blogs";
import TestimonialSection from "./(features)/home/components/Testimonials";
import AspireZonesFooter from "@/components/Footer";

export default function Home() {
  return (
   <>
   <Header />
   <HeroSection/>
   <ServicesSection/>
   <FeaturedProperties/>
   <CarListing/>
   <WhyChooseUs/>
   <WhoWeAre/>
   <BlogSection/>
   <TestimonialSection/>
  <AspireZonesFooter/>

   </>
  );
}
