import React from 'react'

function AboutUs() {
  return (
    <div className="flex justify-start px-4 md:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-sm w-full md:w-3/4 lg:w-2/3 p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          About This Property
        </h2>
        
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p className="text-base md:text-lg">
            This Beautiful Double-Storey House Offers A Perfect Blend Of Comfort
            And Convenience. Located In The Heart Of Gulshan Abad, Rawalpindi,
            The Property Is Surrounded By Peaceful Greenery And Offers Easy
            Access To Schools, Markets, Hospitals, And Public Transport.
          </p>

          <p className="text-base md:text-lg">
            The Home Features Spacious Bedrooms, Modern Bathrooms, And A Fully
            Equipped Kitchen, With Natural Light Streaming Into Every Corner.
            This House Is Ideal For Families Looking For A Welcoming Environment
            To Settle In.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
