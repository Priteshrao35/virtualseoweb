'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import './styles.css';
import { Pagination, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <Swiper
      direction="vertical"
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000, 
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="zoom-in">
          <img src="/homepage/seo.png" alt="Slide 1" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="zoom-in">
          <img src="/homepage/web.jpeg" alt="Slide 2" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
