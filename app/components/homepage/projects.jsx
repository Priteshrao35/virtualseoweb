"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";
import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";

export default function OurProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://virtualseoweb.pythonanywhere.com/ourproject/")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-blue-50 p-10">
      <div className="services-container">
        <div className="text-container md:ml-72">
          <p className="p-2 mt-10 text-xl font-bold text-black ml-10">
            <ul style={{ listStyleType: "disc" }}>
              <li> Our Latest Projects</li>
            </ul>
          </p>
          <p className="p-5 text-4xl font-bold text-black ml-10">Case Studies</p>
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
          className="projectswiper"
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="border border-black hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl"
            >
              <Image
                className="w-full"
                src={project.Project_Image}
                alt={project.Project_Name}
                layout="responsive"
                preview={false}
                width={350}
                height={200}
              />
              <hr
                style={{
                  width: "100%",
                  margin: "20px auto",
                  borderColor: "red",
                }}
              />
              <div className="text-left pl-5">
                <h3 className="text-xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                  {project.Project_Name}
                </h3>

                <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                  {project.Sort_descrition}
                </p>
                <p className="text-blue-500 text-left mt-5 hover:text-blue-700 transition duration-300">
                  <a href={project.Project_url_Link} target="_blank" rel="noopener noreferrer">
                    Learn More ....................
                  </a>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
