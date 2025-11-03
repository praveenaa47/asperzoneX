import React from 'react'
import { Bath, Bed, Car } from 'lucide-react'

function Features({property}) {
  return (
    <div className="flex justify-start px-4 md:px-6 lg:px-16">
      <div className="bg-white rounded-2xl shadow-sm w-full md:w-230 p-8 lg:p-10 mt-5">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Property Details
        </h2>

        <div className="overflow-x-auto">
          <div>
            {/* Row 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
              <div className="py-4 px-0 md:px-4">
                <span className="text-gray-600 text-sm md:text-base">Property type</span>
              </div>
              <div className="py-4 px-0 md:px-4 text-right md:text-left">
                <span className="text-gray-900 font-semibold text-sm md:text-base">{property.propertyType}</span>
              </div>
              <div className="py-4 px-0 md:px-4">
                <span className="text-gray-600 text-sm md:text-base">Owner ship</span>
              </div>
              <div className="py-4 px-0 md:px-4 text-right md:text-left">
                <span className="text-gray-900 font-semibold text-sm md:text-base">Freehold</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
              <div className="py-4 px-0 md:px-4">
                <span className="text-gray-600 text-sm md:text-base">Year built</span>
              </div>
              <div className="py-4 px-0 md:px-4 text-right md:text-left">
                <span className="text-gray-900 font-semibold text-sm md:text-base">2019</span>
              </div>
              <div className="py-4 px-0 md:px-4">
                <span className="text-gray-600 text-sm md:text-base">Floors</span>
              </div>
              <div className="py-4 px-0 md:px-4 text-right md:text-left">
                <span className="text-gray-900 font-semibold text-sm md:text-base">{property.totalFloors}</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
              <div className="py-4 px-0 md:px-4">
                <span className="text-gray-600 text-sm md:text-base">Status</span>
              </div>
              <div className="py-4 px-0 md:px-4 text-right md:text-left">
                <span className="text-gray-900 font-semibold text-sm md:text-base">Ready to Move</span>
              </div>
              <div className="py-4 px-0 md:px-4">
                <span className="text-gray-600 text-sm md:text-base">Facing</span>
              </div>
              <div className="py-4 px-0 md:px-4 text-right md:text-left">
                <span className="text-gray-900 font-semibold text-sm md:text-base">East</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
