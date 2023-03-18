const VideoModal = ({ selectedVideo, setVideoModalOpen }) => {
  return (
    <>
      <div>
        <div
          onClick={() => setVideoModalOpen(false)}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black  opacity-30 z-30"
        ></div>
        <div className="h-[55vh] w-[98vw] md:w-[95vw] lg:w-[80vw] xl:w-[70vw] md:h-[80vh]  sm:h-[60vh] sm:w-[80%] bg-red-400 fixed inset-0 m-auto z-30 ">
          <iframe src={selectedVideo} className="w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default VideoModal;
