import Header from '@/components/home/Header'
import React from 'react'
import FrontHero from './components/HeroSection'
import FeaturedProperties from './components/ListProperty'
import PropertyListingForm from './components/Form'
import AspireZonesFooter from '@/components/Footer'

function page() {
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero + Overlapping Form */}
        <div className="relative">
          <FrontHero />
          <div className="relative z-10 -mt-16 sm:-mt-20 max-w-5xl mx-auto px-4">
            {/* 👇 Floating effect for the form */}
            <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8">
              <PropertyListingForm />
            </div>
          </div>
        </div>

        <div className="h-20" />
      </div>

      <FeaturedProperties />
      <AspireZonesFooter />
    </div>
  )
}

export default page
