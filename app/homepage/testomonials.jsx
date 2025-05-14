'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { StarFilled } from '@ant-design/icons';
import { motion } from "framer-motion";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [mainData, setMainData] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    // Fetch testimonials data
    fetch("https://virtualseoweb.pythonanywhere.com/testomonials/")
      .then(response => response.json())
      .then(data => {
        const formattedReviews = data.map(review => ({
          id: review.id,
          name: review.Name || "Anonymous",
          image: review.Testomonials_Image || "/default-profile.jpg",
          rating: review.Stars || 0,
          text: review.Comments || "No comments provided",
        }));
        setTestimonials(formattedReviews);
      })
      .catch(error => console.error("Error fetching testimonials:", error));

    // Fetch main section data
    fetch("https://virtualseoweb.pythonanywhere.com/testomonialsbackview/")
      .then(response => response.json())
      .then(data => setMainData(data[0]))
      .catch(error => console.error("Error fetching main data:", error));
  }, []);

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!mainData) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="relative mt-10 md:px-16 px-6 py-14 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="md:p-6">
            <p className="text-xl font-bold text-black mb-2">
              {mainData.SubHeading}
            </p>
            <h2 className="text-3xl md:text-3xl font-bold text-black mb-6">
              {mainData.Heading}
            </h2>
            <p className="text-gray-700 mb-6">{mainData.Content}</p>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{mainData.Important_Topic_1}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{mainData.Important_Topic_2}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{mainData.Important_Topic_3}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{mainData.Important_Topic_4}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{mainData.Important_Topic_5}</span>
              </li>
            </ul>
          </div>

          {/* Right Content - Testimonials */}
          <div className="relative">
            <Image
              src={mainData.Image}
              alt="Testimonials background"
              width={500}
              height={400}
              className="w-full h-auto rounded-lg hidden md:block"
            />
            
            <div className="md:absolute md:bottom-[-50px] md:right-[-50px] bg-white p-6 rounded-lg shadow-xl w-full md:w-[120%]">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="w-full"
              >
                {testimonials.map((review) => {
                  const words = review.text.split(" ");
                  const shortText = words.slice(0, 20).join(" ");
                  const isLongReview = words.length > 20;

                  return (
                    <SwiperSlide key={review.id}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col p-6 bg-gray-50 rounded-lg h-full min-h-[240px]"
                      >
                        <div className="flex items-center mb-4">
                          <Image
                            src={review.image}
                            alt={`Review from ${review.name}`}
                            width={50}
                            height={50}
                            className="w-12 h-12 object-cover rounded-full border border-gray-300"
                          />
                          <div className="ml-4">
                            <p className="text-lg font-bold text-gray-900">{review.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center mb-4 text-yellow-500">
                          {Array(5).fill(0).map((_, i) => (
                            <StarFilled 
                              key={i} 
                              className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                            />
                          ))}
                        </div>

                        <p className="text-gray-700 italic flex-grow">
                          {expandedReviews[review.id] ? review.text : shortText}
                          {isLongReview && (
                            <button
                              className="text-blue-500 ml-2 hover:underline"
                              onClick={() => toggleExpand(review.id)}
                            >
                              {expandedReviews[review.id] ? "Show Less" : "...Show More"}
                            </button>
                          )}
                        </p>
                      </motion.div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Testimonials;