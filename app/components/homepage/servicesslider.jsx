"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// Import required modules
import { Pagination, Navigation } from "swiper/modules";

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
    <div className="bg-gray-200 p-10">
      <div className="services-container">
        <div className="text-container md:ml-72">
          <p className="p-2 mt-10 text-xl font-bold text-black ml-10">
            <ul style={{ listStyleType: "disc" }}>
              <li> Our Services and Solutions</li>
            </ul>
          </p>
          <p className="p-10 text-4xl font-bold text-black ml-10">
            Technological Applications
          </p>
        </div>
        <div className="swiper-buttons mr-10">
          <div className="swiper-button-prevs">Prev</div>
          <div className="swiper-button-nexts">Next</div>
        </div>
      </div>
      <div className="md:pl-72">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          }}
          modules={[Pagination, Navigation]}
          className="serviceswiper"
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
              <hr
                style={{
                  width: "80%",
                  margin: "0 auto",
                  borderColor: "red",
                  marginTop: "30px",
                }}
              />
              <ul
                className="text-black text-left pl-5 mt-7 gap-5"
                style={{ listStyleType: "disc" }}
              >
                <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                  {service.Services_Main_Points_1}
                </li>
                <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                  {service.Services_Main_Points_2}
                </li>
                <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                  {service.Services_Main_Points_3}
                </li>
                <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                  {service.Services_Main_Points_4}
                </li>
                <li className="p-3 hover:bg-gray-200 hover:pl-5 transition duration-300">
                  {service.Services_Main_Points_5}
                </li>
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
