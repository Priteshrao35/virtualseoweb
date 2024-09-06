"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";
import { useParams } from "next/navigation"; // Correct import for App Router
import Navbar from "@/app/homepage/navbar";
import CentralBanner from "@/app/homepage/centralbanner";
import FooterSection from "@/app/homepage/footer";
import Header from "@/app/homepage/header";

const BlogDetails = () => {
  const { blogid } = useParams(); // Get the blog id from URL parameter
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (blogid) {
      // Fetch blog details from API based on blog id
      axios
        .get(`https://virtualseoweb.pythonanywhere.com/blogs/${blogid}/`) // Ensure endpoint ends with a slash
        .then((response) => {
          if (response.data) {
            setBlog(response.data);
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
      setError("Invalid blog ID.");
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
