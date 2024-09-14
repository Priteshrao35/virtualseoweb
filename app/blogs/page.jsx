"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";
import { useParams } from "next/navigation"; // Correct import for App Router
import Navbar from "@/app/homepage/navbar";
import CentralBanner from "@/app/homepage/centralbanner";
import FooterSection from "@/app/homepage/footer";
import Header from "@/app/homepage/header";
import { FaStar } from "react-icons/fa"; // Import star icons
import Link from "next/link";

// Utility function to create a URL-friendly slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const BlogDetails = () => {
  const { blogid } = useParams(); // Get the slug from URL parameter
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]); // State to store the list of blogs

  useEffect(() => {
    if (blogid) {
      // Fetch blog details from API based on slug
      axios
        .get(`https://virtualseoweb.pythonanywhere.com/blogs/?slug=${blogid}`) // Adjust endpoint for slug-based query
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setBlog(response.data[0]); // Assuming API returns an array
            setLoading(false);
          } else {
            setError("Blog not found");
            setLoading(false);
          }
        })
        .catch((error) => {
          setError("Error fetching blog details.");
          setLoading(false);
          console.error("Error fetching blog details:", error); // Log the error
        });
    } else {
      setError("Invalid blog slug.");
      setLoading(false);
    }

    // Fetch all blogs for the right-side list
    axios
      .get("https://virtualseoweb.pythonanywhere.com/blogs/") // Fetch the list of all blogs
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs list:", error);
      });
  }, [blogid]);

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  if (error) {
    return <div className="text-black">{error}</div>;
  }

  return (
    <div className="bg-gray-100 text-black">
      <Header />
      <hr />
      <Navbar />
      <CentralBanner />

      <div className="flex">
        {/* Left side: Blog details */}
        <div className="w-2/3 px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Image
              src={blog.Blog_Image}
              className="w-full h-auto object-cover mb-4"
              preview={false}
            />
            <h1 className="text-3xl font-bold mb-4">{blog.Blog_Name}</h1>
            <p className="text-gray-700 mb-4">{blog.Sort_description}</p>
            <div className="flex items-center justify-between text-sm sm:text-base text-gray-600 mb-4">
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
            <div className="flex justify-between items-center mt-2 mb-6">
              <span className="text-xs sm:text-sm text-gray-600">
                Uploaded by:{" "}
                <span className="text-black font-bold">Admin</span>
              </span>
              <Link
                href={`/blogs/blogdetails/${createSlug(blog.Blog_Name)}`}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>

        {/* Right side: Blog list */}
        <div className="w-1/3 px-4 py-8 border-l border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Other Blogs</h2>
          <ul>
            {blogs.map((b) => (
              <li key={b.id} className="mb-4">
                <a
                  href={`/blogs/${createSlug(b.Blog_Name)}`}
                  className="text-blue-500 hover:underline"
                >
                  {b.Blog_Name}
                </a>
                <p className="text-sm text-gray-600">{b.Uploaded_Date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default BlogDetails;
