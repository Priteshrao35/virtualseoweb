'use client'
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import './styles.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        direction="vertical"
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000, // 5 seconds delay
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="zoom">
            <img src="/homepage/6.jpg" alt="Slide 1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="zoom">
            <img src="/homepage/6.jpg" alt="Slide 2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="zoom">
            <img src="/homepage/6.jpg" alt="Slide 3" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="zoom">
            <img src="/homepage/6.jpg" alt="Slide 4" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="zoom">
            <img src="/homepage/6.jpg" alt="Slide 5" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
