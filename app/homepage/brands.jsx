"use client";
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
    <div>
      <div className="w-full bg-white flex items-center justify-center px-10 md:px-[2em] xl:px-[3em] py-5 md:my-1">
        <Swiper
          slidesPerView={2} // Show 1 item on mobile
          spaceBetween={10} // Space between slides on mobile
          breakpoints={{
            768: {
              slidesPerView: 5, // Show 4 items on desktop and larger screens
              spaceBetween: 10 // Space between slides on desktop
            }
          }}
          pagination={{
            clickable: true
          }}
          autoplay={{
            delay: 3000, // Delay between slides (in milliseconds)
            disableOnInteraction: false // Keep autoplay running after interactions
          }}
          modules={[Autoplay]}
          className="w-full"
        >
          {brands.map((brand) => (
            <SwiperSlide
              key={brand.id}
              className="flex items-center justify-center md:pl-10"
            >
              <div className="flex items-center gap-2 text-black text-xl md:text-2xl font-bold">
                <img
                  src={brand.Brand_Logo}
                  alt={brand.Brand_Name}
                  className="w-7 h-7 md:w-12 md:h-12 rounded-full"
                />
                <p className="text-sm md:text-[15px] xl:text-[18px] font-bold">
                  {brand.Brand_Name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Brands;
