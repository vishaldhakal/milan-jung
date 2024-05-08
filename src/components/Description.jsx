import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import PageLoader from "./common/Loaders/PageLoader";
import aboutImages from "../assets/images/about.jpeg";
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
    <section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
        <div class="mx-auto text-left md:max-w-lg lg:max-w-2xl md:text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                I am on a mission to
                <span class="relative inline-block">
                    <span class="absolute inline-block w-full h-2 bg-midgreen bottom-1.5"></span>
                    <span class="relative"> change the world </span>
                </span>
            </h2>
        </div>

        <div class="grid grid-cols-1 mt-8 md:mt-20 gap-y-6 md:grid-cols-2 gap-x-10">
            <div className="text-center">
                <img class="w-full mx-auto rounded-tr-extralarge rounded-bl-extralarge sm:max-w-xs" src={aboutImages} alt="" />
                <p class="mt-6 text-base leading-relaxed text-gray-600">
                  Milan Jung Katuwal
                </p>
                <p>
                  <span class="block text-base font-semibold text-black">Founder & CEO</span>
                </p>
            </div>

            <div
                      dangerouslySetInnerHTML={{ __html: aboutus }}>
                
            </div>
        </div>
    </div>
</section>
  );
};

export default Description;
