import AspireZonesFooter from '@/components/Footer'
import Header from '@/components/home/Header'
import React from 'react'
import HeroSection from './components/HeroSection'
import RealEstateHero from './components/HeroSection'
import AboutUs from './components/AboutUs'
import Features from './components/Features'
import PropertyFeatures from './components/PropertyDetails'
import NearBy from './components/NearBy'
import Location from './components/Location'
import SimilarProperties from './components/SimilarProperties'

function page() {
  return (
    <div>
      <Header/>
  <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="pb-0">
        <RealEstateHero />
      </section>

      {/* About Section */}
      <section className="-mt-10 md:-mt-16">
        <AboutUs />
      </section>
      <Features/>
      <PropertyFeatures/>
      <section className="-mt-10 md:-mt-16">
      <NearBy/>
      </section>
            <section className="-mt-10 md:-mt-16">

      <Location/>
        </section>
        <SimilarProperties/>
    </div>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
