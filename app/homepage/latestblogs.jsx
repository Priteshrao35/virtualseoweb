"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";

export default function LatestBlog() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch blogs from the API
    fetch("https://virtualseoweb.pythonanywhere.com/blogs/")
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

  // Helper function to truncate text to a word limit
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="md:px-10 px-2 md:py-5 bg-white">
      {/* Render category tabs */}
      <div className="tabs text-center md:my-4 flex flex-wrap justify-center gap-2 md:gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 md:py-[1px] xl:py-[4px] border rounded transition duration-300 ease-in-out ${selectedCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:mt-0 mt-3">
        <div className="text-left">
          <div className="p-2 text-xl font-bold text-black">
            <ul className="list-disc list-inside">
              <li>Our Latest Blogs</li>
            </ul>
          </div>
          <p className="md:p-5 md:text-2xl xl:text-2xl text-2xl font-bold text-black md:ml-10 ml-12">Latest Thinking</p>
        </div>
        <div className="flex items-center justify-end mt-5 md:mt-0 md:gap-[10em] gap-5">
          <div className="swiper-button-prevs text-blue-800 cursor-pointer text-2xl md:text-xl xl:text-xl">
            Prev
          </div>
          <div className="swiper-button-nexts text-blue-800 cursor-pointer text-2xl md:text-xl xl:text-xl">
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
              className="border border-black hover:border-red-600 hover:bg-gray-100 transition duration-300 p-0 rounded-xl md:min-h-[315px] md:max-h-[315px] xl:min-h-[400px] xl:max-h-[400px] cursor-pointer"
            >
              <Link
                href={{
                  pathname: `/blogs/blogdetails/${blog.id}`,
                  query: {
                    Blog_Name: blog.Blog_Name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'),
                  },
                }}
                className="flex flex-col items-center w-full h-full p-4 no-underline text-black"
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
                <div className="text-left pl-5 w-full">
                  <h3 className="text-2xl md:text-[14px] xl:text-[16px] font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-1">
                    {truncateText(blog.Blog_Name, 5)}
                  </h3>
                  <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 text-xl md:text-[12px] xl:text-[14px]">
                    {truncateText(blog.Sort_description, 15)}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  );
}