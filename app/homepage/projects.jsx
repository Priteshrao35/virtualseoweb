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
    let mounted = true;
    fetch("https://virtualseoweb.pythonanywhere.com/ourproject/")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;
        const items = Array.isArray(data) ? data : [];

        // Normalize categories, replace null/undefined with "Uncategorized"
        const categoryList = Array.from(
          new Set(items.map((project) => project.category ?? "Uncategorized"))
        );

        setProjects(items);
        setCategories(categoryList);
        setActiveCategory(categoryList.length ? categoryList[0] : null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setProjects([]);
        setCategories([]);
        setActiveCategory(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Function to handle tab click
  const handleTabClick = (category) => {
    setActiveCategory(category);
  };

  // Returns a normalized URL string or null if the url is missing/invalid
  const normalizeUrl = (url) => {
    if (!url) return null;
    const trimmed = String(url).trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  // Truncate text to maxWords
  const truncateWords = (text, maxWords = 25) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // If no activeCategory selected, show all projects; otherwise filter by category (handle nulls)
  const visibleProjects = activeCategory
    ? projects.filter((project) => (project.category ?? "Uncategorized") === activeCategory)
    : projects;

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 md:pl-[18em]">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center md:justify-center gap-2 mb-5">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(category)}
              className={`px-1 md:px-2 xl:px-3 py-1 md:py-1 xl:py-2 rounded-lg transition-colors text-sm md:text-[14px] xl:text-[15px] ${
                activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
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
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            767: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
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
          modules={[Autoplay, Navigation]}
          className="h-auto mt-2"
        >
          {visibleProjects.map((project) => {
            const href = normalizeUrl(project.Project_url_Link);
            const imgSrc = project.Project_Image ? String(project.Project_Image).trim() : null;

            const CardInner = (
              <>
                <div className="relative w-full h-48 overflow-hidden rounded-lg">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={project.Project_Name ?? "project image"}
                      className="object-cover w-full h-full rounded-lg"
                      preview={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                      <span className="text-sm text-gray-600">No image</span>
                    </div>
                  )}
                </div>

                <hr
                  style={{
                    width: "100%",
                    margin: "10px auto",
                    borderColor: "red",
                  }}
                />
                <div className="text-left">
                  <h3 className="text-2xl md:text-sm xl:text-xl font-bold text-black hover:text-blue-500 hover:pl-2 transition duration-300 mb-2">
                    {project.Project_Name}
                  </h3>
                  <p className="text-black hover:text-blue-500 hover:pl-2 transition duration-300 mb-2 md:text-sm xl:text-[16px] text-xl">
                    {truncateWords(project.Sort_descrition, 30)}
                  </p>
                </div>
              </>
            );

            return (
              <SwiperSlide
                key={project.id ?? Math.random()}
                className="border border-black hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl"
              >
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="w-full h-full">
                    {CardInner}
                  </a>
                ) : (
                  <div className="w-full h-full">{CardInner}</div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
