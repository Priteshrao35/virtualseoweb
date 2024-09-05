"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";
import { Autoplay, Navigation } from "swiper/modules";

export default function LatestBlog() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch blogs from the API
    fetch("http://127.0.0.1:8000/blogs/")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        // Extract categories from the blogs
        const allCategories = ['All', ...new Set(data.map(blog => blog.category_name))];
        setCategories(allCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter blogs based on the selected category
  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category_name === selectedCategory);

  return (
    <div className="bg-slate-100 md:p-10 p-5 md:ml-72">
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
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="text-left">
          <div className="p-2 md:mt-10 text-xl font-bold text-black">
            <ul className="list-disc list-inside">
              <li>Our Latest Blogs</li>
            </ul>
          </div>
          <p className="md:p-5 md:text-4xl text-2xl font-bold text-black md:ml-10 ml-12">Latest Thinking</p>
        </div>
        <div className="flex items-center justify-end mt-5 md:mt-0 md:gap-[10em] gap-5">
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
          className="h-auto mt-2 relative"
        >
          {filteredBlogs.map((blog) => (
            <SwiperSlide
              key={blog.id}
              className="border border-black hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl"
            >
              <div className="relative w-full h-auto">
                <Image
                  src={blog.Blog_Image}
                  alt={blog.Blog_Name}
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
                <h3 className="text-2xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                  {blog.Blog_Name}
                </h3>
                <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2 text-xl">
                  {blog.Sort_description}
                </p>
                <p className="text-blue-500 text-left mt-2 hover:text-blue-700 transition duration-300 text-2xl">
                  <a href={`/blogs/blogdetails/${blog.id}`} target="_blank" rel="noopener noreferrer">
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
