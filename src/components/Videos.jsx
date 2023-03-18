import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";

const Videos = ({ handleModalOpen }) => {
  const [videos, setVideos] = useState([]);
  const [windowSize, setWindowSize] = useState();
  const getVideos = async () => {
    try {
      let data = await axiosInstance.get("/cms/publish-video-list/");
      setVideos(data?.data.Results);
    } catch (error) {}
  };

  useEffect(() => {
    getVideos();
  }, []);

  /////////
  return (
    <>
      <div className="mt-10 container px-5 mx-auto" id="videoSection">
        <div className="flex flex-col  mb-6 items-center w-full text-3xl font-bold">
          <div className="text-dark">THE NATIONAL PODCAST</div>
          <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
          <div className="h-[1px] bg-gray-400 w-[50px]"></div>
        </div>

        <div
          className={`mx-auto items-center text-center gap-6 flex flex-wrap justify-center `}
        >
          {videos?.slice(0, 3)?.map((video, index) => {
            let givenLink = video?.live_link;
            let url = new URL(givenLink);
            let finalLink;

            if (givenLink.includes("youtu.be") && givenLink.includes("?list")) {
              finalLink = `https://www.youtube.com/embed/${
                givenLink.split("/").slice(-1).join().split("?")[0]
              }`;
            } else if (givenLink.includes("youtu.be")) {
              finalLink = `https://www.youtube.com/embed/${
                givenLink.split("/").slice(-1)[0]
              }`;
            } else {
              finalLink = `https://www.youtube.com/embed/${url.searchParams.get(
                "v"
              )}`;
            }
            return (
              <div
                className="relative cursor-pointer max-w-[380px] mx-auto w-full overflow-hidden "
                onClick={() => handleModalOpen(finalLink)}
                key={index}
              >
                <div className="w-full mx-auto rounded-lg cursor-pointer">
                  <iframe
                    onClick={(e) => e.preventDefault()}
                    className="h-60 w-full rounded-lg"
                    src={finalLink}
                  ></iframe>
                </div>
                <span className="w-full mt-1 line-clamp-1 text-ellipsis overflow-hidden  font-semibold text-left">
                  {video.title}
                </span>
                <div
                  onClick={() => handleModalOpen(finalLink)}
                  className="absolute h-60 w-full top-0  bg-transparent z-20"
                ></div>
              </div>
            );
          })}
        </div>
        <NavLink
          to="/videos"
          className="mt-7 mb-20 flex justify-center gap-1 font-semibold"
        >
          {videos?.length > 3 && (
            <button className="border-2 transition duration-500 ease-in-out bg-midgreen p-3 hover:bg-normaldark text-white rounded">
              View More
            </button>
          )}
        </NavLink>
      </div>
    </>
  );
};

export default Videos;
