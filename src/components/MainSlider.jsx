import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import axiosInstance from "./api/axiosInstance";

const MainSlider = () => {
  const [images, setImages] = useState([]);
  const getImages = async () => {
    try {
      let data = await axiosInstance.get("/cms/image-list/");
      let imagesObj = data?.data?.[0];
      setImages(Object.values(imagesObj)?.slice(1));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <div className="w-full h-fit md:h-[calc(100vh-80px)] relative overflow-hidden">
        <div className="">
          <div>
            <Swiper
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="mySwiper"
            >
              {images?.map((image, index) => (
                <SwiperSlide key={index} className="swiper-wrapper">
                  <img
                    alt=""
                    src={image}
                    className="h-[300px] md:h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSlider;
