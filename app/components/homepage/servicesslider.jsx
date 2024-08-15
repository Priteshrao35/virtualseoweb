"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Navigation } from "swiper/modules";

export default function ServicesSliderSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://virtualseoweb.pythonanywhere.com/ourservices/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching the services data:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-gray-200 p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full mt-2">
        <div className="flex-grow md:ml-72 text-left">
          <div className="p-2 md:mt-10 text-xl font-bold text-black">
            <ul className="list-disc">
              <li>Our Services and Solutions</li>
            </ul>
          </div>
          <p className="md:p-10 p-2 md:text-4xl text-2xl font-bold text-black">
            Technological Applications
          </p>
        </div>
        <div className="flex items-center justify-end mt-5 md:mt-0 md:gap-[10em] gap-5">
          <div className="swiper-button-prevs text-blue-800 cursor-pointer text-2xl">
            Prev
          </div>
          <div className="swiper-button-nexts text-blue-800 cursor-pointer text-2xl">
            Next
          </div>
        </div>
      </div>
      <div className="md:pl-72">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            767: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          }}
          modules={[ Navigation]}
          className="h-auto mt-2 relative"
        >
          {services.map((service) => (
            <SwiperSlide
              key={service.id}
              className="border border-black hover:border-green-600 hover:bg-gray-100 transition duration-300 rounded-xl p-5"
            >
              <p className="text-black mt-10 text-2xl font-bold hover:text-red-600">
                {service.Service_Name}
              </p>
              <p className="text-black mt-7 pl-5 text-center hover:text-red-600 text-xl">
                {service.Sort_descrition}
              </p>
              <hr className="w-4/5 mx-auto border-red-600 mt-7" />
              <ul className="text-black text-left pl-5 mt-7 gap-5 list-disc text-xl">
                {service.Services_Main_Points_1 && (
                  <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                    {service.Services_Main_Points_1}
                  </li>
                )}
                {service.Services_Main_Points_2 && (
                  <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                    {service.Services_Main_Points_2}
                  </li>
                )}
                {service.Services_Main_Points_3 && (
                  <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                    {service.Services_Main_Points_3}
                  </li>
                )}
                {service.Services_Main_Points_4 && (
                  <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                    {service.Services_Main_Points_4}
                  </li>
                )}
                {service.Services_Main_Points_5 && (
                  <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                    {service.Services_Main_Points_5}
                  </li>
                )}
              </ul>
              <p className="text-blue-500 pl-16 mt-5 hover:text-blue-700 transition duration-300 text-2xl">
                Learn More ...
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
