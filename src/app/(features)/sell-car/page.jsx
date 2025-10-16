import React from 'react'
import CarDetailsForm from './components/CarSection'
import AspireZonesFooter from '@/components/Footer'
import Header from '@/components/home/Header'
import CarDetailSection from './components/CarSection'
import SellForm from './components/SellForm'

function page() {
  return (
    <div>
        <Header/>
        <CarDetailSection/>
        <SellForm/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
