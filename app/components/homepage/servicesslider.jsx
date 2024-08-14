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
      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-2">
        <div className="flex-grow md:ml-72 text-center md:text-left">
          <p className="p-2 md:mt-10 text-xl font-bold text-black">
            <ul className="list-disc">
              <li>Our Services and Solutions</li>
            </ul>
          </p>
          <p className="md:p-10 p-2 md:text-4xl text-2xl font-bold text-black">
            Technological Applications
          </p>
        </div>
        <div className="flex items-center gap-40 md:gap-12 mt-5 md:mt-0 mr-0 md:mr-10">
          <div className="bg-none text-blue-800 text-xl md:text-2xl cursor-pointer swiper-button-prevs">
            Prev
          </div>
          <div className="bg-none text-blue-800 text-xl md:text-2xl cursor-pointer swiper-button-nexts">
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
          className="h-[55vh] mt-2 relative"
        >
          {services.map((service) => (
            <SwiperSlide
              key={service.id}
              className="border border-black hover:border-green-600 hover:bg-gray-100 transition duration-300 rounded-xl p-5"
            >
              <p className="text-black mt-10 text-2xl font-bold hover:text-red-600">
                {service.Service_Name}
              </p>
              <p className="text-black mt-7 pl-5 text-center hover:text-red-600">
                {service.Sort_descrition}
              </p>
              <hr className="w-4/5 mx-auto border-red-600 mt-7" />
              <ul className="text-black text-left pl-5 mt-7 gap-5 list-disc">
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
              <p className="text-blue-500 text-left pl-16 mt-5 hover:text-blue-700 transition duration-300">
                Learn More ....................
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
