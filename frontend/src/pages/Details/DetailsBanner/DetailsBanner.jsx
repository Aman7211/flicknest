import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import useFetch from "../../../Hooks/useFetch";
import Genres from "../../../Components/Genres/Genres";
import CircleRating from "../../../Components/CircleRating/CircleRating";
import Img from "../../../Components/LazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayIcon/PlacIcon";
import VideoPopup from "../../../Components/VideoPlayer/VideoPopup";



const DetailsBanner = ({ video, crew }) => {

  const[show,setShow] = useState(false);
  const[videoId,setVideoId] =useState(null);


  const { mediaType, id } = useParams(); // It is a hook which can take parameters value from the URL.
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const genresA = data?.genres?.map((item) => item.id);
//   console.log("jha");
//   console.log(genresA);

const director = crew?.filter((item)=> item.job ==="Director" ); //director is an array of object(in which job property value is equal to "Director")
const writer = crew?.filter((item) => item.job === "Screenplay" || item.job==="Story"|| item.job==="writer")   //writter is an array of object(in which job property value is equal to "Screenplay" or "Story" or "writer")

  const toHoursAndMinutes = (totalMinutes) => 
  {                                                  // a function which convert time in minute to time in hour and minute.
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;

  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <div>
          <div className="backdrop-img">
            <Img src={url.backdrop + data?.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data?.poster_path ? (
                  <Img
                    src={url.backdrop + data?.poster_path}
                    className="posterImg"
                  />
                ) : (
                  <Img src={PosterFallback} className="posterImg" />
                )}
              </div>

              <div className="right">
                <div className="title">
                  {`${data?.name || data?.title} (${dayjs(
                    data?.release_date
                  ).format("YYYY")})`}
                </div>
                <div className="subtitle">{data?.tagline}</div>
                <Genres data={genresA} />

                <div className="row">
                  <CircleRating rating={data?.vote_average.toFixed(1)} />

                  <div className="playbtn" onClick={()=>{
                    setShow(true);
                    setVideoId(video.key)
                  }}>
                   
                   <PlayIcon/>
                   <span className="text">
                    Watch Trailer
                   </span>
                  </div>
                </div>

                <div className="overview">
                    <div className="heading">Overview</div>
                    <div className="description">
                            {data?.overview}
                    </div>
                </div>

                <div className="info">
                    {data?.status && (
                        <div className="infoItem">
                            <span className="text bold"> Status:{" "}</span>
                            <span className="text">
                                {data?.status}
                            </span>
                        </div>
                    )}

                    {data?.release_date && (
                        <div className="infoItem">
                            <span className="text bold"> Release Date:{" "}</span>
                            <span className="text">
                                {
                                    dayjs(data?.release_date).format("MMM D, YYYY")
                                }
                            </span>
                        </div>
                    )}

                    {data?.runtime && (
                        <div className="infoItem">
                            <span className="text bold"> Release Date:{" "}</span>
                            <span className="text">
                                {
                                    toHoursAndMinutes(data?.runtime)
                                }
                            </span>
                        </div>
                    )}
                  </div>
                  
                  {director?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Director:{" "}</span>
                      <span className="text">
                        {
                          director?.map((item,i) => {
                           return (
                            <span key={i}>{item.name} 
                            {
                              (director?.length -1 !==i && ", ")
                            }
                            </span>
                           )         
                          })
                        }
                      </span>
                    </div>
                  )}

                  {writer?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Writter:{" "}</span>
                      <span className="text">
                        {
                          writer?.map((item2,i) => {
                           return (
                            <span key={i}>{item2.name} 
                            {
                              (writer?.length -1 !==i && ", ")
                            }
                            </span>
                           )         
                          })
                        }
                      </span>
                    </div>
                  )}
                 
                 {data?.created_by?.length > 0 && (
                    <div className="info">
                      <span className="text bold">Creator:{" "}</span>
                      <span className="text">
                        {
                          data?.created_by?.map((item2,i) => {
                           return (
                            <span key={i}>{item2.name} 
                            {
                              (data?.created_by?.length -1 !==i && ", ")
                            }
                            </span>
                           )         
                          })
                        }
                      </span>
                    </div>
                  )}
              </div>
            </div>
            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
          </ContentWrapper>
        </div>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
