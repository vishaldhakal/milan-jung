import React, { useState, useEffect } from "react";
import Description from "./Description";
import ShowcaseBanner from "./ShowCaseBanner";
import MainSlider from "./MainSlider";
import Videos from "./Videos";
import BlogHomepage from "./BlogHomepage";
import PageLoader from "./common/Loaders/PageLoader";
import ContactUs from "./page-layout-componenets/ContactUs";
import VideoModal from "./common/videoModal";
import { AiOutlineArrowUp } from "react-icons/ai";

const HomePage = ({ setBlogID, blogID }) => {
  // Video Loader Section
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [scrollLength, setScrollLength] = useState(0);

  const handleModalOpen = (videoInfo) => {
    setSelectedVideo(videoInfo);
    setVideoModalOpen(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => setScrollLength(window.scrollY));
    return () =>
      window.removeEventListener("scroll", () =>
        setScrollLength(window.scrollY)
      );
  });
  return (
    <div className="relative">
      <MainSlider />
      <Description />
      <BlogHomepage setBlogID={setBlogID} blogID={blogID} />
      
      <ShowcaseBanner />
      <Videos handleModalOpen={handleModalOpen} />
      <ContactUs />

      {videoModalOpen && (
        <VideoModal
          selectedVideo={selectedVideo}
          setVideoModalOpen={setVideoModalOpen}
        />
      )}

      {scrollLength > 500 && (
        <span
          onClick={() => window.scrollTo(0, 0)}
          className="fixed w-[40px] h-[40px] flex items-center justify-center right-10 bottom-16 rounded-lg z-50 text-white bg-green hover:bg-darkgreen cursor-pointer"
        >
          <AiOutlineArrowUp size={30} />
        </span>
      )}
    </div>
  );
};

export default HomePage;
