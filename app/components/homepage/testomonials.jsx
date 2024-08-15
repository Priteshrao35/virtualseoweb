"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
}

function Testomonialsbackviews() {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Fetch data from API
    fetch("https://virtualseoweb.pythonanywhere.com/testomonials/")
      .then(response => response.json())
      .then(data => {
        // Process data if needed
        const formattedReviews = data.map(review => ({
          name: review.Name || "Anonymous",
          image: review.Testomonials_Image || "/default-image.jpg",
          rating: review.Stars || 0,
          description: review.Comments || "No comments",
        }));
        setReviews(formattedReviews);
      })
      .catch(error => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div className="absolute md:bottom-[20%] md:right-[-20%] right-[-1em] md:w-[30em] w-[26em] h-auto bg-white text-white md:p-4 rounded-lg shadow-lg">
      <Swiper
        slidesPerView={1} // Show one slide at a time
        spaceBetween={10}
        autoplay={{
          delay: 6000,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="testomySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center text-center">
            <div className="flex flex-col items-center mb-4">
              <img
                src={review.image}
                alt={`Review ${index + 1}`}
                className="rounded-full w-24 h-24"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <h3 className="font-bold mb-2 text-black">{review.name}</h3>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((star, i) => (
                  <span
                    key={i}
                    className={`${
                      i < Math.floor(review.rating)
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-black">
                {review.rating}/5.0
              </span>
            </div>
            <p className="text-black pb-7">
              {truncateText(review.description, 15)}
              <span className="text-blue-500 cursor-pointer ml-1">
                See more
              </span>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testomonialsbackviews;
