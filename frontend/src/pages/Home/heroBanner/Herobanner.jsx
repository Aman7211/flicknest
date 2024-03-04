import React, { useState,useEffect } from 'react'
import './Herobanner.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import {useSelector } from 'react-redux';
import Img from '../../../Components/LazyLoadImage/Img';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
const Herobanner = () => {

  const[background,setBackground]=useState("");
  const[query,setQuery]=useState("");
  const navigate=useNavigate();

  const {data,loading}=useFetch("/movie/upcoming")
  // console.log(data);
  const {url}=useSelector((state)=>state.home);

  useEffect(()=>{
    const bg=url.backdrop  +  data?.results?.[Math.floor(Math.random()*20)].backdrop_path;
    // console.log(bg);
    setBackground(bg);
  },[data])

  const searchQueryHandler=(event)=>{
    if(event.key=="Enter" && query.length>0)
    {
      navigate(`/search/${query}`);
    }
  }
  return (
    <div className='heroBanner'>


           
           {!loading && <div className='backdrop-img'>
            <Img src={background}></Img>
            </div>}

          <div className="opacity-layer"></div>

        <ContentWrapper>
            <div className='heroBannerContent'>
                <span className='title'>Welcome</span>
                <p className='subTitle'>Million of movie and serials are available here Explore Now !</p>
              
                <div className='searchInput'>
                    <input type='text' placeholder='Search for movie or T.V..' onKeyUp={searchQueryHandler} onChange={(event)=>setQuery(event.target.value)}></input>
                    <button onClick={()=>{
                        navigate(`/search/${query}`);
                    }}>Search</button>
                </div>
            </div>
        </ContentWrapper>


    
      
    </div>
  )
}

export default Herobanner
