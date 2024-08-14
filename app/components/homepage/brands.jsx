'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Import Swiper modules
import { Autoplay } from "swiper/modules";

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get("https://virtualseoweb.pythonanywhere.com/ourpartnerbrand/")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the brands data:", error);
      });
  }, []);

  return (
    <div className="p-10 md:p-10 bg-white flex items-center justify-center">
      <Swiper
        slidesPerView={1} // Show 1 item on mobile
        spaceBetween={10} // Space between slides on mobile
        breakpoints={{
          768: {
            slidesPerView: 3, // Show 4 items on desktop and larger screens
            spaceBetween: 10, // Space between slides on desktop
          },
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000, // Delay between slides (in milliseconds)
          disableOnInteraction: false, // Keep autoplay running after interactions
        }}
        modules={[Autoplay]}
        className="w-full max-w-screen-2xl"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id} className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-black text-xl md:text-3xl font-bold">
              <img
                src={brand.Brand_Logo}
                alt={brand.Brand_Name}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              {brand.Brand_Name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Brands;
