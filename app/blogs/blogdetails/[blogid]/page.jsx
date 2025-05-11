"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "antd";
import { useParams } from "next/navigation";
import Navbar from "@/app/homepage/navbar";
import FooterSection from "@/app/homepage/footer";
import Header from "@/app/homepage/header";
import { FaStar } from "react-icons/fa";

// Utility function to create a URL-friendly slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const BlogDetails = () => {
  const { blogid } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [comment, setComment] = useState({
    name: "",
    email: "",
    website: "",
    commentText: "",
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (blogid) {
      axios
        .get(`https://virtualseoweb.pythonanywhere.com/blogs/?slug=${blogid}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setBlog(response.data[0]);
            setLoading(false);
          } else {
            setError("Blog not found");
            setLoading(false);
          }
        })
        .catch((error) => {
          setError("Error fetching blog details.");
          setLoading(false);
          console.error("Error fetching blog details:", error);
        });
    } else {
      setError("Invalid blog slug.");
      setLoading(false);
    }

    axios
      .get("https://virtualseoweb.pythonanywhere.com/blogs/")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs list:", error);
      });
  }, [blogid]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Implement comment submission logic here (e.g., POST request)
    console.log("Comment submitted:", comment);
    // Reset comment form
    setComment({
      name: "",
      email: "",
      website: "",
      commentText: "",
    });
  };

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  if (error) {
    return <div className="text-black">{error}</div>;
  }

  const filteredBlogs = blogs.filter((b) =>
    b.Blog_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 text-black">
      <Header />
      <hr />
      <Navbar />

      <div className="flex flex-col lg:flex-row md:px-[15em]">
        {/* Left side: Blog details */}
        <div className="w-full lg:w-2/3 px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{blog.Blog_Name}</h1>

            <div className="flex flex-col lg:flex-row items-start text-sm sm:text-base text-gray-600 mb-6">
              <div className="flex items-center w-full lg:w-1/2 mb-4 lg:mb-0">
                <span className="mr-4">{blog.Uploaded_Date}</span>
                <div className="flex items-center mr-4">
                  <span className="mr-2">1.5k views</span>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  by: <span className="text-black font-bold">Admin</span>
                </span>
              </div>
            </div>

            <Image
              src={blog.Blog_Image}
              className="w-full h-auto object-cover mb-4"
              preview={false}
            />

            <p className="text-gray-700 mb-4">{blog.Sort_description}</p>
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: blog.Description }}
            />

            {/* Comment Form */}
            <div className="mt-8">
            <h2 className="text-4xl font-bold mb-4">Comments</h2>
              <h2 className="text-2xl font-bold mb-4">Leave a Reply</h2>
              <form onSubmit={handleCommentSubmit} className="bg-white p-4 rounded-md shadow-md">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={comment.name}
                    onChange={handleCommentChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={comment.email}
                    onChange={handleCommentChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={comment.website}
                    onChange={handleCommentChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Comment *</label>
                  <textarea
                    name="commentText"
                    value={comment.commentText}
                    onChange={handleCommentChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right side: Blog list with search (hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/3 px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Discover Blogs by Name</h2>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
          />
          <ul>
            {filteredBlogs.map((b) => (
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
