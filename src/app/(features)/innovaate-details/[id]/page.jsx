import Header from '@/components/home/Header'
import React from 'react'
import IdeaDetails from './components/IdeaDetails'
import RelatedArticles from './components/RelatedArticles'
import AspireZonesFooter from '@/components/Footer'

function page() {
  return (
    <div>
      <Header/>
      <IdeaDetails/>
      <RelatedArticles/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
