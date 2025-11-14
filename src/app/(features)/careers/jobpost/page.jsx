import AspireZonesFooter from '@/components/Footer'
import Header from '@/components/home/Header'
import React from 'react'
import CareersBanner from './components/Banner'
import AddJobForm from './components/JobPostForm'

function page() {
  return (
    <div>
        <Header/>
        {/* <CareersBanner/> */}
        <AddJobForm/>
        <AspireZonesFooter/>
      
    </div>
  )
}

export default page
