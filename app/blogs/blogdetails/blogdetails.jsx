"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Spin, Collapse } from "antd";
import Link from "next/link";
import { motion } from "framer-motion";
import { CaretDownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`https://virtualseoweb.pythonanywhere.com/blogs/${id}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setBlog(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog details:", error);
          setLoading(false);
          setMessage('Error fetching blog details. Please try again later.');
        });
    }

    fetch("https://virtualseoweb.pythonanywhere.com/blogs/?limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setLatestBlogs(data))
      .catch((error) => {
        console.error("Error fetching latest blogs:", error);
        setMessage('Error fetching latest blogs. Please try again later.');
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Attempting to send email data:', {
        name: blog.Blog_Name,
        email: email,
        url: url,
        phone: phone,
      });

      const response = await fetch('https://apis.prwebtechno.com/apis/apis/send_email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: blog.Blog_Name,
          email: email,
          url: url,
          phone: phone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        setMessage('Your Form Submitted successfully!');
        setUrl('');
        setEmail('');
        setPhone('');

        setTimeout(() => {
          setMessage('');
        }, 5000);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setMessage(`Error: ${error.message}`);
    }
  };


  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500 font-semibold">Blog not found!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row p-6 md:p-12 bg-gray-50">
      <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-6 mb-6 md:mb-0 mr-0 md:mr-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Inquiry Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="website-url" className="block text-sm font-medium mb-2">Website URL</label>
            <input
              type="url"
              id="website-url"
              placeholder="https://prwebtechno.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="border border-gray-300 rounded-lg w-full p-2 text-black focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="prwebtechno@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 text-black rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="+91 9170475552"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 text-black rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
          >
            Get My Free SEO Report
          </button>
        </form>

        {message && <p className="text-green-700 mb-4 font-bold text-xl mt-3">{message}</p>}

        {/* Latest Blogs Section Below Inquiry Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Blogs</h2>
          <ul>
            {latestBlogs.map((blog) => (
              <li key={blog.id} className="mb-4 border-b pb-2">
                <Link
                  href={{
                    pathname: `/blogs/blogdetails/${blog.id}`,
                    query: {
                      Blog_Name: blog.Blog_Name
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-'),
                    },
                  }}
                  className="text-lg text-blue-600 hover:underline"
                >
                  {blog.Blog_Name}
                </Link>
                <p className="text-sm text-gray-600 mt-2">
                  {truncateDescription(blog.Sort_description)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section - Blog Details */}
      <div className="md:w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 py-8 px-6">
          {blog.Blog_Name}
        </h1>
        <div className="relative w-full h-[500px] mb-6 overflow-hidden rounded-lg">
          <img
            src={blog.Blog_Image}
            alt={blog.Blog_Name}
            className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-105"
          />
        </div>
        <div className="px-6 text-lg text-gray-800">
          <p className="mb-4 text-gray-600 italic">{blog.Sort_description}</p>
          <div className="space-y-4">
            <p>{blog.full_description}</p>
          </div>
        </div>

        {/* FAQ */}
        {/* FAQ */}
        <div className="md:px-5 md:lg:px-[5em] bg-white">
          <h1 className="text-2xl md:text-3xl md:pt-10 lg:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
            Frequently Asked Questions
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:mt-10">
            {/* FAQ Section */}
            <div className="md:p-6 flex-1 md:min-h-[300px]">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Collapse
                  bordered={false}
                  defaultActiveKey={["0"]}
                  expandIcon={({ isActive }) => (
                    <CaretDownOutlined
                      className={`${isActive ? "rotate-180" : "rotate-0"}`}
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "12px",
                        color: "black",
                        zIndex: "-1"
                      }}
                    />
                  )}
                  expandIconPosition="right"
                  className="bg-transparent"
                >
                  {blog.faqs && blog.faqs.map((faqItem, index) => (
                    <Panel
                      header={
                        <motion.div
                          className="relative flex items-center justify-between w-full bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1, ease: "easeInOut" }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-black">{faqItem.FAQ_heading}</span>
                          <CaretDownOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black opacity-50 text-2xl" />
                        </motion.div>
                      }
                      key={index.toString()}
                      className="bg-transparent"
                    >
                      <p className="px-4 md:px-6 py-4 text-black">{faqItem.FAQ_content}</p>
                    </Panel>
                  ))}
                </Collapse>
              </motion.div>
            </div>
          </div>
        </div>
        {/* End of FAQ */}
      </div>
    </div>
  );
}