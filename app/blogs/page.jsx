"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../homepage/header";
import Navbar from "../homepage/navbar";
import CentralBanner from "../homepage/centralbanner";
import FooterSection from "../homepage/footer";
import Link from "next/link";

function OurBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  useEffect(() => {
    // Fetch blogs data from API
    axios
      .get("https://virtualseoweb.pythonanywhere.com/blogs/")
      .then((response) => {
        setBlogs(response.data);
        // Extract unique category names from the blogs
        const uniqueCategories = [
          ...new Set(response.data.map((blog) => blog.category_name))
        ];
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0]); // Set the first category as default
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  // Filter blogs based on the selected category
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category_name === selectedCategory)
    : blogs;

  return (
    <div style={{ color: "black" }} className="bg-white">
      <Header />
      <hr />
      <Navbar />
      <CentralBanner />

      {/* Render category tabs */}
      <div className="tabs text-center my-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 mx-2 border rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {category} {/* Display category name */}
          </button>
        ))}
      </div>

      {/* Render blogs in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredBlogs.map((blog) => (
          <Link
          key={blog.id}
          href={`/blogs/blogdetails/${blog.id}`} // Use the blog ID for URL
        >
            <div className="blog-card border p-4 rounded shadow cursor-pointer hover:bg-gray-100">
              <img
                src={blog.Blog_Image}
                alt={blog.Blog_Name}
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-bold mb-2">{blog.Blog_Name}</h3>
              <p className="text-gray-700 mb-2">{blog.Sort_description}</p>
              <span className="text-gray-500">{blog.Uploaded_Date}</span>
            </div>
          </Link>
        ))}
      </div>
      <FooterSection />
    </div>
  );
}

export default OurBlogs;
