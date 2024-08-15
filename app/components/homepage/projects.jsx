"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";
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
    <div className="bg-slate-100 p-10 md:ml-72">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="p-2 mt-10 text-xl font-bold text-black">
            <ul className="list-disc list-inside">
              <li>Our Latest Projects</li>
            </ul>
          </p>
          <p className="p-5 text-4xl font-bold text-black">Case Studies</p>
        </div>
        <div className="flex items-center justify-center md:justify-end mt-5 md:mt-0 gap-4">
          <div className="swiper-button-prevs text-blue-800 cursor-pointer text-2xl">
            Prev
          </div>
          <div className="swiper-button-nexts text-blue-800 cursor-pointer text-2xl">
            Next
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Swiper
          slidesPerView={1} // Show 1 item on mobile
          spaceBetween={10} // Space between slides on mobile
          breakpoints={{
            640: {
              slidesPerView: 1, // Show 1 item on small screens
              spaceBetween: 20,
            },
            767: {
              slidesPerView: 2, // Show 2 items on medium screens
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4, // Show 4 items on larger screens
              spaceBetween: 20,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          }}
          modules={[Pagination, Navigation]}
          className="h-auto mt-2 relative"
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="border border-black hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl"
              style={{ width: "350px", height: "500px" }} // Adjust width and height
            >
              <div className="relative w-full md:h-[250px] h-[200px]"> {/* Fixed height for image */}
                <Image
                  src={project.Project_Image}
                  alt={project.Project_Name}
                  className="object-cover w-full h-full rounded-lg"
                  preview={false}
                />
              </div>
              <hr
                style={{
                  width: "100%",
                  margin: "10px auto",
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
                <p className="text-blue-500 text-left mt-2 hover:text-blue-700 transition duration-300">
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
