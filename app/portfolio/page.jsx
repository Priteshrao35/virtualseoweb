"use client";
import React, { useEffect, useState } from "react";
import Header from "../homepage/header";
import Navbar from "../homepage/navbar";
import FooterSection from "../homepage/footer";
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
    <div className="bg-gray-100">
      <Header />
      <hr />
      <Navbar />
      <p className="text-black text-xl md:text-5xl font-bold p-2 md:p-5 text-center md:mt-10">
        Our Best Portfolio – VirtualSEOweb
      </p>
      <p className="text-black text-sm md:text-lg font-bold px-5 md:px-48 md:text-center">
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
      <div className="text-center md:p-10 p-2 bg-gradient-to-t from-slate-100 to-red-200 mt-10">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(category)}
            className={`m-1 p-2 md:m-2 md:p-3 ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            } rounded-md border-none cursor-pointer`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="md:px-40 px-4">
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                  <p className="text-black">{project.Sort_descrition}</p>
                </div>
                <a
                  href={project.Project_url_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 mt-3 hover:underline"
                >
                  Visit Project
                </a>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-5">
        <Brands />
      </div>

      <div className="md:px-28 bg-slate-200">
        <ServicesSliderSection />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center p-5 bg-gradient-to-t from-slate-100 to-red-50 mt-20">
        <p className="text-black font-bold text-center md:text-left text-lg md:text-3xl mb-4 md:mb-0 md:mr-4">
          Have any questions and need to talk with us directly?
        </p>
        <a
          href="/contactus"
          className="px-6 py-2 md:py-3 bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          Contact Now
        </a>
      </div>

      <FooterSection />
    </div>
  );
}

export default PortFolio;
