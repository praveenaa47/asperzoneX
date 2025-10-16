import Header from '@/components/home/Header'
import React from 'react'
import Blogsdetails from './components/Blogs'
import AspireZonesFooter from '@/components/Footer'

function page() {
  return (
    <div>
      <Header/>
      <Blogsdetails/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
