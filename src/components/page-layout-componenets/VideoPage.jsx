import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";
import PageLoader from "../common/Loaders/PageLoader";
import VideoModal from "../common/videoModal";
import Pagination from "./../common/Pagination";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [count, setCount] = useState(1);
  const [currentButton, setCurrentButton] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const handleModalOpen = (videoInfo) => {
    setSelectedVideo(videoInfo);
    setVideoModalOpen(true);
  };

  const getVideos = async () => {
    try {
      let data = await axiosInstance.get(
        `/cms/publish-video-list/?page=${currentButton}`
      );
      setVideos(data?.data?.Results);
      setPrevPage(data?.data?.PreviousPage);
      setNextPage(data?.data?.NextPage);

      const { TotalCount, countItemsOnPage } = data?.data;
      setCount(Math.ceil(TotalCount / countItemsOnPage));
      console.log(countItemsOnPage);

      setLoader(false);
    } catch (error) {}
  };

  useEffect(() => {
    getVideos();
    window.scrollTo(0, 0);
  }, [currentButton]);

  useEffect(() => {}, [selectedVideo]);

  return (
    <>
      {videoModalOpen && (
        <VideoModal
          selectedVideo={selectedVideo}
          setVideoModalOpen={setVideoModalOpen}
        />
      )}
      <div className="container mx-auto min-h-[80vh]">
        <div className="flex flex-col mt-10 mb-6 items-center w-full text-xl md:text-3xl font-bold">
          <div className="text-dark">VIDEOS</div>
          <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
          <div className="h-[1px] bg-gray-400 w-[50px]"></div>
        </div>
        <div className="py-5 mx-4 sm:mx-6 md:mx-8 xl:mx-14 text-base text-[#666]">
          <div className="m">
            The National Podcast is a new effort and a premium Nepali podcast to
            bring youths in the conversations on different subjects and opinions
            from the streets, villages, cities of Nepal.
          </div>

          <div className="mt-14">
            <div className=" text-center gap-6 mx-auto flex flex-wrap w-fit items-center justify-around">
              {videos?.map((video, index) => {
                let givenLink = video?.live_link;
                let url = new URL(givenLink);
                let finalLink;

                if (
                  givenLink.includes("youtu.be") &&
                  givenLink.includes("?list")
                ) {
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
                    className="relative w-[300px] sm:w-[380px] md:w-[400px] lg:w-[450px]"
                    onClick={() => handleModalOpen(finalLink)}
                    key={index}
                  >
                    <div className="rounded-xl overflow-hidden">
                      <iframe
                        onClick={(e) => e.preventDefault()}
                        className="h-60 w-full"
                        src={finalLink}
                      ></iframe>
                    </div>
                    <span className="mb-4 mt-2 line-clamp-1 font-semibold text-center">
                      {video.title}
                    </span>
                    <div
                      onClick={() => handleModalOpen(finalLink)}
                      className="absolute h-60 w-full top-0  bg-transparent z-20 mb-2
                  "
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {count > 1 && (
        <div className="flex justify-center my-3">
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            count={count}
            currentButton={currentButton}
            setCurrentButton={setCurrentButton}
          />
        </div>
      )}
      {loader && (
        <div
          className="flex items-center justify-center min-h-full w-full text-lg text-white"
          style={{ zIndex: 9999 }}
        >
          <PageLoader />
        </div>
      )}
    </>
  );
};

export default VideoPage;
