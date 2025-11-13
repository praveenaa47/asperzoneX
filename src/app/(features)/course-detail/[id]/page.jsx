"use client"
import Header from '@/components/home/Header'
import React, { useEffect } from 'react'
import Hero from './components/Hero'
import KeyHighlights from './components/KeyHiglights'
import Careers from './components/Career'
import AdmissionRequirements from './components/Requirments'
import Fees from './components/Fees'
import Client from './components/Testimonials'
import AspireZonesFooter from '@/components/Footer'
import { getSingleCourse } from '@/redux/slices/courseSlice'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'


function page() {

    const {id} = useParams();
    const dispatch = useDispatch();
    const{singleCourse, loading, error}=useSelector((state)=>state.courses);

     useEffect(() => {
    if (id) dispatch(getSingleCourse(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading course details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load: {error}</p>
      </div>
    );

  if (!singleCourse)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-lg">No course found.</p>
      </div>
    );
const course = singleCourse;

  return (
    <div>
      <Header/>
      <Hero
       title={course.name}
          shortName={course.shortName}
        subtitle={course.about}
        bannerImage={course.bannerImage}
        duration={course.duration}
        mode={course.mode}
        level={course.level}
        eligibility={course.eligibility}
        intakes={course.intakes}
        about={course.about}/>
      <KeyHighlights highlights={course?.keyHighlights} />
      <Careers careers={course.careerOpportunities} />
      <AdmissionRequirements requirements={course.admissionRequirements} />
      <Fees fees={course.feeStructure} />
      <Client/>
      <AspireZonesFooter/>
    </div>
  )
}

export default page
