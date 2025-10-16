import Header from '@/components/home/Header'
import React from 'react'
import SavedProperties from './components/Favourites'
import AspireZonesFooter from '@/components/Footer'

function page() {
  return (
    <div>
      <Header/>
      <SavedProperties/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
