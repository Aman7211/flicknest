import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill  ,BsFillArrowRightCircleFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../LazyLoadImage/Img";
import PosterFallback from '../../assets/no-poster.png';
import Genres from "../Genres/Genres";
import CircleRating from "../CircleRating/CircleRating";


import "./Carousel_style.scss"
const Carousel = ({data,loading,endpoint, title}) => {

  const carouselContainer = useRef();  //to give reference to any element just like in js we use document.get.elementById() method
  const {url}=useSelector((state)=>state.home)
  const navigate=useNavigate();

  function navigation(direction)      //This function is used to provide scroll feature when we click on left arrow or right arrow 
  {
      const container =carouselContainer.current;

      const scrollAmount= (direction === "left") ?
        (container.scrollLeft  - (container.offsetWidth + 20))  //container.scrollLeft: Represents the current horizontal scroll position of the container.
      : (container.scrollLeft + (container.offsetWidth  + 20));    //container.offsetWidth: Represents the width of the container.
    
      container.scrollTo({
        left:scrollAmount,
        behavior:"smooth",
      });
  };

  function skItem()
  {
    return(
      <div className="skeletonItem">

        <div className="posterBlock skeleton"></div>
          <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>

      </div>
    )
  }
  return (
    <div className="carousel">

      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>navigation("left")}/>

        <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>navigation("right")}/>
        {
          !loading ? (
              <div className="carouselItems" ref={carouselContainer}>
                {
                  data?.map((item)=>{
                    const posterUrl=item.poster_path ? url.poster + item.poster_path:PosterFallback;
                    return (
                      <div key={item.id} className="carouselItem" onClick={()=>(navigate(`/${item?.media_type || endpoint}/${item?.id}`))}>  {/*on clicking move to detail page of that movie or tv show whichever is media type*/}

                        <div className="posterBlock">
                          <Img src={posterUrl}></Img>
                          <CircleRating rating={item.vote_average.toFixed(1)}/>
                         
                         <Genres data={item?.genre_ids?.slice(0,2)}/>
                        </div>

                        <div className="textBlock">
                          <span className="title">{item.title|| item.name}</span>
                          <span className="date">{dayjs(item.release_Date).format("MMM D,YYYY")}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              
          ):(
           <div className="loadingSkeleton">
            {skItem()}   {/*to get rid of writting HTML code again and again i make a function of it. */}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
           </div>
          )
        }
      </ContentWrapper>
       
    </div>
  )
}

export default Carousel
