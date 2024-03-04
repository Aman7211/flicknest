import React, { useState } from "react";
import "./VideoSection.scss";
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import { PlayIcon } from "../PlayIcon/PlacIcon";
import VideoPopup from "../../../Components/VideoPlayer/VideoPopup";
import Img from "../../../Components/LazyLoadImage/Img";

  const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="videosSection">
      <ContentWrapper>
        {data?.results?.length === 0 ? (null):( <div className="sectionHeading">Official Videos</div>)}   {/* if there is no videos available of that particular movie then return null  */}
       
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => {
              return (
                <div
                  className="videoItem"
                  key={video.id}
                  onClick={() => {
                    setVideoId(video.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayIcon />
                  </div>
                  <div className="videoTitle">{video.name}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}

      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
