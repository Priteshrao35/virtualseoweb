"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function OurBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8; // Show 8 blogs per page

  useEffect(() => {
    // Fetch blogs from the API
    fetch("https://virtualseoweb.pythonanywhere.com/blogs/")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        // Use Set to avoid duplicate categories
        const uniqueCategories = ["All", ...new Set(data.map((blog) => blog.category_name))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);


  // Filter blogs by category and search query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category_name === selectedCategory;
    const matchesSearch =
      blog.Blog_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.Sort_description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Truncate text to a word limit
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Get the range of page numbers to display (max 5)
  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    let pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="p-8 bg-white md:pt-28">
      {/* Categories */}
      <div className="text-center mb-5 space-x-3">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-1 mb-3 rounded-full transition transform hover:scale-105 duration-300 text-lg font-medium ${selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 border-2 border-gray-300"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="text-center mb-8 relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-xl px-6 py-1 text-black border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105 duration-300"
          >
            <img
              src={blog.Blog_Image}
              alt={blog.Blog_Name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 hover:text-blue-600 transition duration-300">
                {truncateText(blog.Blog_Name, 5)}
              </h3>
              <p className="text-black mb-4 text-sm">{truncateText(blog.Sort_description, 15)}</p>
              <Link className="text-blue-700 font-bold"
                href={{
                  pathname: `/blogs/blogdetails/${blog.id}`,
                  query: {
                    Blog_Name: blog.Blog_Name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'),
                  }
                }}
              >
                Learn More ....................
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-6 py-1 bg-blue-600 text-white rounded-full disabled:opacity-50 transition"
        >
          Previous
        </button>

        {/* Display 5 page numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-6 py-1 border-2 border-gray-300 rounded-full ${currentPage === page ? "bg-blue-600 text-white" : "text-blue-600"
              } transition duration-300`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-6 py-1 bg-blue-600 text-white rounded-full disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}