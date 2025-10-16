import Header from '@/components/home/Header'
import React from 'react'
import Innovaate from './components/InnovateSection'
import BusinessIdeasSection from './components/BussinessIdeas'
import UnleashIdeasForm from './components/EnquireForm'
import AspireZonesFooter from '@/components/Footer'

function page() {
  return (
    <div>
      <Header/>
      <Innovaate/>
      <BusinessIdeasSection/>
      <UnleashIdeasForm/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
