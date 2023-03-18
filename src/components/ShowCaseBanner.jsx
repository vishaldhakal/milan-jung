import React, { useState, useEffect } from "react";
import axiosInstance from "./api/axiosInstance";

const ShowcaseBanner = () => {
  const [background, setBackground] = useState(null);
  const [slogan, setSlogan] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/auth/user-public-list/`)
      .then((data) => {
        setBackground(data?.data[0]?.slogan_image);
        setSlogan(data?.data[0]?.slogan);
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <>
      <div
        style={{ backgroundImage: `url("${background}")` }}
        className="bg-cover bg-fixed h-[200px] md:h-[270px] lg:h-[450px] xl:h-[500px] mt-8 text-white text-xl md:text-3xl font-extrabold overflow-hidden "
      >
        <div className="h-[200px] md:h-[270px] lg:h-[450px] xl:h-[500px]  bg-gradient-to-r from-zinc-800">
          <h1 className="text-center mx-2 py-10 md:mx-10 leading-loose md:p-14 lg:mx-30 lg:pt-40 lg:px-40 lg:pb-20 xl:mx-40 xl:pt-40 xl:px-40 xl:pb-15  ">
            {slogan?.length > 80 ? `${slogan.slice(0, 80)}` : slogan}
          </h1>
          {/* <div className="flex flex-col mb-6 items-center w-full text-3xl lg:text-4xl font-bold">
            <div className="text-normaldark font-extrabold">Slogan</div>
            <div className="h-[1px] mb-0.5 mt-3 bg-white w-[50px]"></div>
            <div className="h-[1px] bg-gray-400 w-[50px]"></div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ShowcaseBanner;
