"use client"
import Header from '@/components/home/Header'
import React, { useEffect } from 'react'
import About from './components/AboutSection'
import GalleryPhoto from './components/Gallery'
import Dropdown from './components/Dropdowm'
import WhyBookUs from './components/Highlights'
import AspireZonesFooter from '@/components/Footer'
import PopularPlaces from './components/Explore'
import { getSingleDestination } from '@/redux/slices/destinationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import DealsHero from './components/DealsHero'

function Page() {
  const dispatch = useDispatch();
  const { singleDestination, loading, error } = useSelector((state) => state.destinations);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleDestination(id));
    }
  }, [dispatch, id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">Error: {error}</div>;
  if (!singleDestination) return <div className="text-center py-10">Destination not found</div>;

  return (
    <div>
      <Header />
      <DealsHero
        title={singleDestination.title}
        subtitle={singleDestination.subtitle}
        image={singleDestination.coverImage}
        about={singleDestination.about}
      />
      <About 
      highlights={singleDestination.keyHighlights}/>
      <PopularPlaces places={singleDestination.popularPlaces} />
      <GalleryPhoto gallery={singleDestination.gallery} />
      <Dropdown policies={singleDestination.policies} />
      <WhyBookUs highlights={singleDestination.keyHighlights} />
      <AspireZonesFooter />
    </div>
  )
}

export default Page