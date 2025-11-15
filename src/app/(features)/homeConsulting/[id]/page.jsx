import Header from '@/components/home/Header'
import React from 'react'
import BannerSection from './components/BannerSection'
import Destinations from './components/Destinations'
import WhyChooseUs from './components/WhyChooseUs'
import Clients from './components/Clients'
import AspireZonesFooter from '@/components/Footer'
import ConsultingForm from './components/ConsultingForm'
// import Touch from './components/Touch'


function page() {
  return (
    <div>
      <Header/>
      <BannerSection/>
      <ConsultingForm/>
      <Destinations/>
      <WhyChooseUs/>
      <Clients/>
      {/* <Touch/> */}
      <AspireZonesFooter/>
    </div>
  )
}

export default page
