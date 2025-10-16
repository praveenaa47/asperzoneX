import Header from '@/components/home/Header'
import React from 'react'
import HeroCarousel from './components/HeroSection'
import CarListing from './components/PopularDestination'
import SpecialDeal from './components/SpecialDeals'
import WhyBookUs from './components/WhyBookUs'
import Review from './components/Reviews'
import AspireZonesFooter from '@/components/Footer'
import PoliciesAccordion from './components/Policies'
import TravelBookingTabs from './components/Forms'

function page() {
  return (
    <div>
        <Header/>
        <HeroCarousel/>
        <TravelBookingTabs/>
        <CarListing/>
        <SpecialDeal/>
        <PoliciesAccordion/>
        <WhyBookUs/>
        <Review/>
        <AspireZonesFooter/>

        
    </div>
  )
}

export default page
