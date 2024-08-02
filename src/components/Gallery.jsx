import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

const Gallery = ({ viewAll }) => {

    const dummyData = [{
        title: '',
        image: 'gallery/1.jpg',
        description: 'Interviewing a disabled maoist combatant at his home while shooting for a documentary in Thawang, Rolpa, Nepal. (June, 2024)'
    },
    {
        title: '',
        image: 'gallery/2.jpg',
        description: 'Participating in a multi-stakeholder interaction on protecting labor rights and promoting safer migration in Nepal co-organized by the National Policy Forum (NPF). (April, 2024)'
    }
        , {
        title: '',
        image: 'gallery/3.jpg',
        description: 'Hosting an interaction on “Accountability, Governance, and Protection of Civic Space in Nepal” alongside Nepal Smajbadi Party leader Manushi Yami Bhattarai, Journalist Siromani Dhungana, Civic organization leader Pranav Bhattarai and federalism and governance expert Ramesh Adhikari. (December, 2023)'
    },
    {
        title: '',
        image: 'gallery/4.jpg',
        description: 'At Nepal government’s think tank Policy Research Institute (PRI), taking part in a discussion on Research and Policymaking process with the students of Master’s in Development Studies at the Kathmandu University School of Arts. (January, 2024)'
    }
        , {
        title: '',
        image: 'gallery/5.jpg',
        description: 'Receiving award at a school function while in grade 9 (2012) from the hands of Narayan Prasad Dahal, now the Chairperson of the National Assembly of Nepal.'
    }];

    return (
        <section class="py-10 bg-white sm:py-16 sm:pt-8 lg:pt-24 lg:pb-8">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="max-w-2xl mx-auto text-center">
                    <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        Gallery
                    </h2>
                </div>
                <div className="mt-12">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        autoplay={{
                            delay: 5500,
                            disableOnInteraction: false
                        }}
                        navigation={true}
                        className="mySwiper"
                    >
                        {dummyData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center justify-center">
                                    <img src={item.image} alt={item.title} className="w-full rounded-lg" />
                                    <div className="mt-4 text-center">
                                        <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Gallery