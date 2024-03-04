import React, { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs'
import './Trending.scss'
import useFetch from '../../../Hooks/useFetch'
import Carousel from '../../../Components/carousel/Carousel'
const Trending = () => {

  const[endpoint,setEndpoint]=useState("day")

  const{data,loading}=useFetch(`/trending/all/${endpoint}`)
  // console.log(data);

    const onTabChange = (tab)=>
    {
         if(tab==="Day")
         setEndpoint("day")
         else
         setEndpoint("week")
    }
  return (
    <div className='carousel-Section'>
         <ContentWrapper>
            <span className='carouselTitle'>Trending</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange} />
         </ContentWrapper>

         <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending
