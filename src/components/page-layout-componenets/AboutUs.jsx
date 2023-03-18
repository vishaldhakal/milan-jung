import axiosInstance from "../api/axiosInstance";
import { useState, useEffect } from "react";
import PageLoader from "../common/Loaders/PageLoader";

const AboutUs = () => {
  const [aboutus, setAboutus] = useState("");
  const [id, setID] = useState();
  const [loader, setLoader] = useState(true);
  const [safari, setSafari] = useState(false);
  const [chrome, setChrome] = useState(false);

  const getAllAbout = (signal) => {
    axiosInstance
      .get("/cms/aboutus-list/", { signal })
      .then((res) => {
        setID(res?.data?.[0]?.id);
        setAboutus(res?.data[0]?.content);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSafari(navigator?.userAgent?.indexOf("Safari") > -1);
    setChrome(navigator?.userAgent?.indexOf("Chrome") > -1);
    if (!chrome && safari) setSafari(true);
    else setSafari(false);

    const controller = new AbortController();
    const { signal } = controller;
    getAllAbout(signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="container mx-auto min-h-[80vh]">
      <div className="flex flex-col mt-10 mb-6 items-center w-full text-3xl font-bold">
        <div className="text-dark">About</div>
        <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
        <div className="h-[1px] bg-gray-400 w-[50px]"></div>
      </div>
      <div className="py-5 mx-4 sm:mx-6 md:mx-8 xl:mx-14 text-base text-[#666] min-h-[500px]">
        {loader && (
          <div
            className="mt-14 flex items-center justify-center min-h-full w-full text-lg text-white"
            style={{ zIndex: 9999 }}
          >
            <PageLoader />
          </div>
        )}
        <div
          className={`flex flex-col ${safari && "space-y-6"}`}
          dangerouslySetInnerHTML={{ __html: aboutus }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
