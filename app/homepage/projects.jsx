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
    fetch("https://virtualseoweb.pythonanywhere.com/ourproject/")
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


  const normalizeUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };


  return (
    <div className="p-5 md:ml-10">
      <div className="flex-grow text-left">
        <div className="p-2 text-xl font-bold text-black">
          <ul className="list-disc">
            <li>Our Latest Projects</li>
          </ul>
        </div>
        <p className="p-2 md:text-xl xl:text-3xl md:pl-10 text-2xl font-bold text-black">
          Case Studies
        </p>
      </div>
      {/* Tabs and Navigation Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 md:pl-[18em] xl:md:pl-[28em]">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center md:justify-center gap-2 mb-5">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(category)}
              className={`px-1 md:px-2 xl:px-3 py-1 md:py-1 xl:py-2  rounded-lg transition-colors text-sm md:text-[14px] xl:text-[15px] ${activeCategory === category
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
          <div className="swiper-button-prevs text-blue-800 cursor-pointer text-xl md:text-[16px] xl:text-2xl">
            Prev
          </div>
          <div className="swiper-button-nexts text-blue-800 cursor-pointer text-xl md:text-[16px] xl:text-2xl">
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

                <a
                  href={normalizeUrl(project.Project_url_Link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full"
                >
                  <div className="relative w-full h-auto">
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
                  <div className="text-left">
                    <h3 className="text-2xl md:text-sm xl:text-xl font-bold text-black hover:text-blue-500 hover:pl-2 transition duration-300 mb-2">
                      {project.Project_Name}
                    </h3>
                    <p className="text-black hover:text-blue-500 hover:pl-2 transition duration-300 mb-2 md:text-sm xl:text-[16px] text-xl">
                      {project.Sort_descrition}
                    </p>

                  </div>
                </a>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
