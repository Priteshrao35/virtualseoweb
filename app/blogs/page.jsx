"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../homepage/header";
import Navbar from "../homepage/navbar";
import FooterSection from "../homepage/footer";
import Link from "next/link";
import { FaStar } from "react-icons/fa"; // Import star icon
import { FaShareAlt } from "react-icons/fa"; // Import share icon

// Utility function to create a URL-friendly slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Function to truncate text to 20 words
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

function OurBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Default is "All"
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const blogsPerPage = 6; // Number of blogs per page

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
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  // Filter blogs based on search query (across all categories) or selected category
  const filteredBlogs = blogs.filter((blog) => {
    return (
      (searchQuery.trim() === "" ||
        blog.Blog_Name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedCategory || blog.category_name === selectedCategory)
    );
  });

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle sharing
  const handleShare = (url) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this blog",
          url: url
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Share functionality is not supported on this browser.");
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <hr />
      <Navbar />

      {/* Banner Section */}
      <div className="relative mt-14 md:mt-0">
        <img
          src="/contactbanner.png"
          alt="Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Search box for mobile */}
      <div className="block lg:hidden p-2">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-base" // Use text-base to ensure 16px font size
          style={{ maxWidth: "100%", overflow: "hidden" }}
        />
      </div>

      <div className="px-2 md:px-20 bg-gradient-to-t from-slate-50 to-stone-200">
        {/* Render category tabs */}
        <div className="text-center mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 mx-2 border rounded mt-10 font-bold text-sm sm:text-base ${
              !selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            All
          </button>

          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 mx-2 border rounded font-bold text-sm sm:text-base ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog and Other Blog List - Two Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left side: Display paginated blogs */}
          <div className="w-full lg:w-2/3 lg:pr-8 mb-6 lg:mb-0 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/blogdetails/${createSlug(blog.Blog_Name)}`}
                >
                  <div className="blog-card border p-4 rounded shadow cursor-pointer hover:bg-gray-100 flex flex-col relative">
                    {/* Share Button */}
                    <div
                      className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 cursor-pointer text-lg"
                      onClick={() =>
                        handleShare(
                          window.location.origin +
                            `/blogs/blogdetails/${createSlug(blog.Blog_Name)}`
                        )
                      }
                    >
                      <FaShareAlt
                        style={{ fontSize: "40px" }}
                        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-blue-800"
                        onClick={() => handleShare(blogUrl)}
                      />
                    </div>

                    <img
                      src={blog.Blog_Image}
                      alt={blog.Blog_Name}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-black">
                      {blog.Blog_Name}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base mb-2">
                      {truncateText(blog.Sort_description, 20)}
                    </p>

                    {/* Blog Details and Button */}
                    <div className="flex items-center justify-between text-sm sm:text-base text-gray-600">
                      <span>{blog.Uploaded_Date}</span>
                      <div className="flex items-center">
                        <span className="mr-2">1.5k views</span>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs sm:text-sm text-gray-600">
                        Uploaded by:{" "}
                        <span className="text-black font-bold">Admin</span>
                      </span>
                      <Link
                        href={`/blogs/blogdetails/${createSlug(
                          blog.Blog_Name
                        )}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 border rounded disabled:opacity-50 text-sm sm:text-base text-black"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-1 mx-1 border rounded text-sm sm:text-base ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 border rounded disabled:opacity-50 text-sm sm:text-base text-black"
              >
                Next
              </button>
            </div>
          </div>

          {/* Right side: Display a list of other blogs and search box */}
          <div className="w-full lg:w-1/3 px-4 hidden md:block">
            <p className="text-lg sm:text-2xl font-bold p-5 text-black">
              Discover Blogs by Name
            </p>
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by blog name..."
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <ul className="list-none">
              {blogs
                .filter((blog) =>
                  blog.Blog_Name.toLowerCase().includes(
                    searchQuery.toLowerCase()
                  )
                )
                .slice(0, 6)
                .map((b) => (
                  <li
                    key={b.id}
                    className="border-b py-2 mb-2 text-black text-sm sm:text-base"
                  >
                    <Link
                      href={`/blogs/blogdetails/${createSlug(b.Blog_Name)}`}
                      className="flex justify-between items-center text-blue-900"
                    >
                      <span>{b.Blog_Name}</span>
                      <span className="text-xs sm:text-base text-gray-600">
                        {b.Uploaded_Date}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}

export default OurBlogs;
