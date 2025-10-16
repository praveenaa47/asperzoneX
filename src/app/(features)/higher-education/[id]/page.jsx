import Header from "@/components/home/Header";
import React from "react";
import HomeBanner from "./components/HomeBanner";
import Programs from "./components/Programs";
import FillForm from "./components/FillForm";
import SuccessStories from "./components/SuccessStories";
import Cards from "./components/Cards";
import AspireZonesFooter from "@/components/Footer";
import Providers from "./components/Provide";

function page() {
  return (
    <div>
      <Header />
      <HomeBanner />
      <FillForm />
      <Programs />
      <Providers/>
      <SuccessStories />
      <Cards />
      <AspireZonesFooter />
    </div>
  );
}

export default page;
