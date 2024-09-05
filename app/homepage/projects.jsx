"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";
import { Autoplay, Navigation } from "swiper/modules";

export default function OurProjects() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://127.0.0.1:8000/ourproject/")
      .then((response) => response.json())
      .then((data) => {
        // Extract categories and projects from the data
        const categoryList = [
          ...new Set(data.map((project) => project.category))
        ];
        setCategories(categoryList);
        setProjects(data);
        setActiveCategory(categoryList[0]); // Set the first category as active by default
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle tab click
  const handleTabClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="bg-slate-100 md:p-10 p-5 md:ml-72 mt-10">
      <div className="text-left">
        <p className="text-center text-black text-3xl font-bold mt-10"> Our Latest Projects</p>
      </div>
      {/* Tabs and Navigation Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center md:justify-center gap-4 mb-5">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(category)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          <div className="swiper-button-prevs text-blue-800 cursor-pointer text-2xl">
            Prev
          </div>
          <div className="swiper-button-nexts text-blue-800 cursor-pointer text-2xl">
            Next
          </div>
        </div>
      </div>

      {/* Swiper for the active category */}
      <div className="relative mt-2">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            767: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
          pagination={{
            clickable: true
          }}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs"
          }}
          modules={[Autoplay, Navigation]}
          className="h-auto mt-2"
        >
          {projects
            .filter((project) => project.category === activeCategory)
            .map((project) => (
              <SwiperSlide
                key={project.id}
                className="border border-black hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl"
              >
                <div className="relative w-full md:h-[250px] h-auto">
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
                    borderColor: "red"
                  }}
                />
                <div className="text-left pl-5">
                  <h3 className="text-2xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                    {project.Project_Name}
                  </h3>
                  <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2 text-xl">
                    {project.Sort_descrition}
                  </p>
                  <p className="text-blue-500 text-left mt-2 hover:text-blue-700 transition duration-300 text-2xl">
                    <a
                      href={project.Project_url_Link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
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
