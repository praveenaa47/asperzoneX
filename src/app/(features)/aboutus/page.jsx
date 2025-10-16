import Header from '@/components/home/Header'
import React from 'react'
import AboutUs from './components/Aboutus'
import AspireZonesFooter from '@/components/Footer'
import HeroAbout from './components/HeroAbout'

function page() {
  return (
    <div>
      <Header/>
      <HeroAbout/>
      <AboutUs/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
