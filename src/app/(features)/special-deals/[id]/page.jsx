"use client"
import Header from '@/components/home/Header'
import React, { useEffect } from 'react'
import MainSection from './components/MainSection'
import AboutUssection from './components/AboutSection'
import KeyHighlights from './components/KetHighlights'
import Gallery from './components/Gallery'
import Modals from './components/Modals'

import BookUs from './components/BookUs'
import { getTourPackageById } from '@/redux/slices/tourPackageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'



function page() {

  const dispatch = useDispatch();
  const {selectedTourPackage, loading, error}=useSelector((state)=>state.tourPackages)
  const {id} = useParams();

  useEffect(()=>{
    if(id){
      dispatch(getTourPackageById(id));
    }
  },[dispatch, id])

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-gray-500 text-lg">Loading carousel...</p>
      </div>
    );
  }

    if (error) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-red-500 text-lg">Failed to load data: {error}</p>
      </div>
    );
  }

  if (!selectedTourPackage) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-gray-500 text-lg">No tour package found.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <MainSection
        title={selectedTourPackage.title}
        subtitle={selectedTourPackage.subtitle}
        bannerImage={selectedTourPackage.bannerImage}
        about={selectedTourPackage.about} 
      />
      <AboutUssection about={selectedTourPackage.about} />
      <KeyHighlights 
        itinerary={selectedTourPackage.itinerary} 
        duration={selectedTourPackage.duration}
        keyHighlights={selectedTourPackage.keyHighlights} 
        includedHighlights={selectedTourPackage.includedHighlights} 
        exclusions={selectedTourPackage.exclusions} 
      />
      <Gallery gallery={selectedTourPackage.gallery} />
      {}
      <Modals importantInfoAndPolicies={selectedTourPackage.importantInfoAndPolicies} />
      <BookUs />
    </div>
  )
}

export default page
