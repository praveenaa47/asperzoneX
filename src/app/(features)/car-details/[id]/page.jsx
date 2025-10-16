import Header from '@/components/home/Header'
import React from 'react'
import CarDetailPage from './components/DetailHero'
import AspireZonesFooter from '@/components/Footer'
import CarOverview from './components/CarOverview'
import SimilarCard from './components/SimilarCar'
import ClientsTest from './components/ClientsTest'

function page() {
  return (
    <div>
      <Header/>
      <CarDetailPage/>
      <CarOverview/>
      <SimilarCard/>
      <ClientsTest/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
