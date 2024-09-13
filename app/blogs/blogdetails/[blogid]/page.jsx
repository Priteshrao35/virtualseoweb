"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";
import { useParams } from "next/navigation"; // Correct import for App Router
import Navbar from "@/app/homepage/navbar";
import CentralBanner from "@/app/homepage/centralbanner";
import FooterSection from "@/app/homepage/footer";
import Header from "@/app/homepage/header";

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
  }, [blogid]);

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  if (error) {
    return <div className="text-black">{error}</div>;
  }

  if (!blog) {
    return <div className="text-black">Blog not found</div>;
  }

  return (
    <div className="bg-gray-100 text-black">
      <Header />
      <hr />
      <Navbar />
      <CentralBanner />
      <Image
        src={blog.Blog_Image}
        className="w-full h-auto object-cover"
        preview={false}
      />

      <div className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{blog.Blog_Name}</h1>
          <p className="text-gray-700 mb-4">{blog.Sort_description}</p>
          <span className="text-gray-500">{blog.Uploaded_Date}</span>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default BlogDetails;
