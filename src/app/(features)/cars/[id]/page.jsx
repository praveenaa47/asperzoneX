import React from 'react'
import CarHero from './components/CarHero'
import Header from '@/components/home/Header'
import CarListingPage from './components/CarLists'
import LatestBlogs from './components/LatestBlogs'
import AspireZonesFooter from '@/components/Footer'
import ClientsReview from './components/ClientsReview'
import HowItWorks from './components/HowitWorks'

function page() {
  return (
    <div>
        <Header/>
      <CarHero/>
      <CarListingPage/>
      <HowItWorks/>
      <ClientsReview/>
      <LatestBlogs/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
