import React from 'react'

function AboutUs({ property }) {
  return (
    <div className="flex justify-start px-4 md:px-6 lg:px-16">
      <div className="bg-white rounded-2xl shadow-sm w-230 p-8">
        <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-4">
          About This Property
        </h2>
        
        <div className="space-y-2 text-gray-600 leading-relaxed">
          <p className="text-base md:text-md">
            {property?.description || "This Beautiful Double-Storey House Offers A Perfect Blend Of Comfort And Convenience."}
          </p>

         {!property?.description && (
            <p className="text-base md:text-md">
              The Home Features Spacious Bedrooms, Modern Bathrooms, And A Fully
              Equipped Kitchen, With Natural Light Streaming Into Every Corner.
              This House Is Ideal For Families Looking For A Welcoming Environment
              To Settle In.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AboutUs