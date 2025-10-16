import AspireZonesFooter from '@/components/Footer'
import Header from '@/components/home/Header'
import React from 'react'
import FeaturedProperties from './components/FeaturedProperty'
import PropertyCard from "./components/KeralaDistricts"
import BeachfrontHero from './components/HeroSectionEstate'

function page() {
  return (
    <div>
        <Header/>
        <BeachfrontHero/>
    <PropertyCard/>
        <FeaturedProperties/>
        <AspireZonesFooter/>
        
      
    </div>
  )
}

export default page
