'use client'
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import './styles.css';
import { Pagination, Autoplay } from 'swiper/modules';

export default function App() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch('https://virtualseoweb.pythonanywhere.com/mainbanner/');
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    }

    fetchBanners();
  }, []);

  return (
    <Swiper
      direction="vertical"
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="zoom-in">
            <img src={banner.Main_Banner} alt={`Slide ${banner.id}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
