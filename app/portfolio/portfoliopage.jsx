"use client";
import React, { useEffect, useState } from "react";
import Brands from "../homepage/brands";
import ServicesSliderSection from "../homepage/servicesslider";

function PortFolio() {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://virtualseoweb.pythonanywhere.com/ourproject/")
      .then((response) => response.json())
      .then((data) => {
        // Extract categories from the data
        const categoryList = [
          ...new Set(data.map((project) => project.category))
        ];
        setCategories(categoryList);
        setProjects(data);
        setActiveCategory(categoryList[0]); // Set the first category as active by default
      });
  }, []);

  // Function to handle tab click
  const handleTabClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="bg-white">
      <p className="text-black text-xl md:text-2xl xl:text-2xl py-5 font-bold p-2 text-center">
        Our Best Portfolio – VirtualSEOweb
      </p>
      <p className="text-black text-sm md:text-[11px] xl:text-base font-bold px-12 md:text-center">
        At VirtualSEOweb, we are dedicated to delivering innovative web
        development and SEO solutions that enhance online visibility and drive
        meaningful engagement. Our portfolio reflects a diverse range of
        successful projects, including high-performance websites, mobile
        applications, and comprehensive SEO strategies designed to elevate our
        clients’ digital presence. From concept to execution, our team of
        skilled developers and SEO experts works closely with clients to ensure
        that each project is optimized for success. We create responsive,
        user-friendly websites that not only look great but are also built to
        rank well on search engines, ensuring greater visibility for your
        business. Our expertise spans both frontend and backend development,
        allowing us to build scalable, efficient digital solutions that support
        business growth. Whether you're seeking a robust SEO strategy, a custom
        website, or an engaging mobile app, VirtualSEOweb is here to transform
        your vision into a reality that drives real results.
      </p>

      {/* Render category tabs */}
      <div className="text-center md:p-10 p-2 py-1 bg-gradient-to-t from-white to-red-50 mt-10">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(category)}
            className={`m-1 p-2 md:m- md:py-[1px] ${activeCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
              } rounded-md border-none cursor-pointer`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="md:px-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {projects
            .filter((project) => project.category === activeCategory)
            .map((project) => (
              <div
                key={project.id}
                className="border border-gray-300 p-4 rounded-md"
              >
                <img
                  src={project.Project_Image}
                  alt={project.Project_Name}
                  className="w-full h-auto"
                />
                <div className="text-center mt-5">
                  <h3 className="text-black font-semibold">
                    {project.Project_Name}
                  </h3>
                  <p className="text-black md:text-[10px] xl:text-base">{project.Sort_descrition}</p>
                </div>
                <a
                  href={project.Project_url_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 mt-3 hover:underline md:text-sm"
                >
                  Visit Project
                </a>
              </div>
            ))}
        </div>
      </div>

      <div className=" bg-slate-200">
        <ServicesSliderSection />
      </div>

    </div>
  );
}

export default PortFolio;
