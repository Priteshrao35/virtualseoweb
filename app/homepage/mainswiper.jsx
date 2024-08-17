"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Pagination, Autoplay } from "swiper/modules";

export default function App() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch(
          "https://virtualseoweb.pythonanywhere.com/mainbanner/"
        );
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchBanners();
  }, []);

  return (
    <Swiper
      direction="vertical"
      spaceBetween={30}
      pagination={{
        clickable: true
      }}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false
      }}
      modules={[Pagination, Autoplay]}
      className="w-full md:h-[60vh] h-[50vh] flex items-center justify-center"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="transform transition-transform duration-300 hover:scale-110">

            {/* Image for default screen */}
            <img
              src={banner.Main_Banner}
              alt={`Slide ${banner.id}`}
              className="max-w-full max-h-full object-contain hidden md:block"
            />

            {/* Image for mobile */}
            <img
              src={banner.Main_Banner_For_Mobile}
              alt={`Slide ${banner.id}`}
              className="max-w-full object-cover md:hidden"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
