import AspireZonesFooter from '@/components/Footer'
import Header from '@/components/home/Header'
import React from 'react'
import HeroFinance from './components/HeroFinance'
import SupportForm from './components/EnquiryForm'
import Insights from './components/Insights'
import WhoWeAreSection from './components/WhoWeAre'
import WhatOffer from './components/WhatOffer'
import MeetOurTeam from './components/OurTeam'
import OurStories from './components/Stories'
// import Touch from '../../homeConsulting/[id]/components/Touch'
import ClientsReview from './components/Reviews'

function page() {
  return (
    <div>
      <Header/>
      <HeroFinance/>
      <SupportForm/>
      <Insights/>
      <WhoWeAreSection/>
      <WhatOffer/>
      <MeetOurTeam/>
      <OurStories/>
      <ClientsReview/>
      {/* <Touch/> */}
      <AspireZonesFooter/>
    </div>
  )
}   

export default page
