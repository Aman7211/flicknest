import React, { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs'
import './TopRated.scss'
import useFetch from '../../../Hooks/useFetch'
import Carousel from '../../../Components/carousel/Carousel'
const TopRated = () => {

  const[endpoint,setEndpoint]=useState("movie")

  const{data,loading}=useFetch(`/${endpoint}/top_rated`)
  // console.log(data);

    const onTabChange = (tab)=>
    {
         if(tab==="Movies")
         setEndpoint("movie")
         else
         setEndpoint("tv")
    }
  return (
    <div className='carousel-Section'>
         <ContentWrapper>
            <span className='carouselTitle'>Top Rated</span>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange} />
         </ContentWrapper>

         <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated;
