"use client";
import React, { useEffect, useState } from "react";
import CentralBanner from "../homepage/centralbanner";
import Header from "../homepage/header";
import Navbar from "../homepage/navbar";
import FooterSection from "../homepage/footer";

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
      <Header />
      <hr />
      <Navbar />
      <CentralBanner />

      {/* Render category tabs */}
      <div className="text-center p-10 bg-gradient-to-t from-slate-100 to-red-200">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(category)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor:
                activeCategory === category ? "#007bff" : "#e0e0e0",
              color: activeCategory === category ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="md:px-40">
        {/* Render projects for the active category in a 4x4 grid */}
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px"
          }}
        >
          {projects
            .filter((project) => project.category === activeCategory)
            .map((project) => (
              <div
                key={project.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px"
                }}
              >
                <img
                  src={project.Project_Image}
                  alt={project.Project_Name}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="text-center mt-5">
                  <h3 className="text-black">{project.Project_Name}</h3>
                  <p className="text-black">{project.Sort_descrition}</p>
                </div>
                <a
                  href={project.Project_url_Link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                </a>
              </div>
            ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-5 bg-gradient-to-t from-slate-100 to-red-50 mt-20">
        <p className="text-black font-bold text-3xl mr-4">
          Have any questions and need to talk with us directly?
        </p>
        <a
          href="mailto:contact@example.com" // Replace with your contact email or link
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          Contact Now
        </a>
      </div>

      <FooterSection />
    </div>
  );
}

export default PortFolio;
