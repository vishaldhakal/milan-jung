import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import PageLoader from "./common/Loaders/PageLoader";

const Description = () => {
  const [aboutus, setAboutus] = useState("");
  const [id, setID] = useState();
  const [loader, setLoader] = useState(true);

  const getAllAbout = (signal) => {
    const imgTagRegex = /<img\b[^>]*>/gi;
    axiosInstance
      .get("/cms/aboutus-list/", signal)
      .then((res) => {
        setID(res?.data?.[0]?.id);
        let rawhtml = res?.data[0]?.content;
        const sanitizedhtml = rawhtml.replace(imgTagRegex, "");
        setAboutus(sanitizedhtml);
        setLoader(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getAllAbout(signal);
    return () => controller.abort();
  }, []);

  return loader ? (
    <div
      className="flex items-center justify-center min-h-full w-full text-lg text-white"
      style={{ zIndex: 9999 }}
    >
      <PageLoader />
    </div>
  ) : (
    <div className="container py-10 mx-auto" id="aboutusSection">
      <div className="flex flex-col  mb-6 items-center w-full text-3xl font-bold">
        <div className="text-dark">About</div>
        <div className="h-[1px] mb-0.5 mt-3 bg-gray-400 w-[50px]"></div>
        <div className="h-[1px] bg-gray-400 w-[50px]"></div>
      </div>
      <div className=" mx-4 sm:mx-6 md:mx-8 xl:mx-14 text-base text-[#666]">
        <div
          // className="line-clamp-6 text-justify"
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: aboutus }}
        />
        {/* {aboutus.length > 350 && (
          <div className="mt-7 flex justify-center gap-1 font-semibold">
            <Link
              to="about-us"
              className="border-2 transition duration-500 ease-in-out bg-midgreen p-3 hover:bg-normaldark text-white rounded"
            >
              READ MORE
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Description;
