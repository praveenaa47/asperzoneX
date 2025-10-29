import Header from '@/components/home/Header'
import React from 'react'
import MainSection from './components/MainSection'
import AboutUssection from './components/AboutSection'
import KeyHighlights from './components/KetHighlights'
import Gallery from './components/Gallery'
import Modals from './components/Modals'
import Testimonials from './components/Testimonials'
import BookUs from './components/BookUs'

function page() {
  return (
    <div>
      <Header/>
      <MainSection/>
      <AboutUssection/>
      <KeyHighlights/>
      <Gallery/>
      <Modals/>
      <Testimonials/>
      <BookUs/>
    </div>
  )
}

export default page
