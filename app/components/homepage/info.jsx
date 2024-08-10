"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination, Autoplay } from "swiper/modules";

const reviews = [
  {
    name: "John Doe",
    image: "/homepage/f1-200x206.jpg",
    rating: 4.5,
    description: "Great service! Really helped me with my project.",
  },
  {
    name: "Jane Smith",
    image: "/homepage/f1-200x206.jpg",
    rating: 4.0,
    description: "The platform is user-friendly and easy to navigate.",
  },
  {
    name: "Emily Johnson",
    image: "/homepage/f1-200x206.jpg",
    rating: 5.0,
    description: "Excellent tools and support. Highly recommend!",
  },
  {
    name: "Michael Brown",
    image: "/homepage/f1-200x206.jpg",
    rating: 3.5,
    description: "Good experience, but some features could be improved.",
  },
  {
    name: "Sophia Wilson",
    image: "/homepage/f1-200x206.jpg",
    rating: 4.8,
    description: "Amazing platform with powerful features.",
  },
  {
    name: "Sophia Wilson",
    image: "/homepage/f1-200x206.jpg",
    rating: 4.8,
    description: "Amazing platform with powerful features.",
  },
];

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
}

function InfoSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="px-40 bg-white">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-40 bg-white">
        <div className="relative flex justify-center">
          <Image
            src="/homepage/8.jpg"
            alt="Description"
            className="w-full h-auto rounded-lg"
            width={500}
            height={200}
          />

          {/* Testimonials */}
          <div className="absolute bottom-[20%] right-[-20%] w-72 h-auto bg-white text-white p-4 rounded-lg shadow-lg">
            <div className="flex">
              <Swiper
                slidesPerView={4} // Show 4 testimonials images
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
                  <SwiperSlide key={index}>
                    <div
                      className={`cursor-pointer transition-transform duration-300 transform ${
                        index === activeIndex ? "scale-110" : "scale-100"
                      }`}
                    >
                      <img
                        src={review.image}
                        alt={`Review ${index + 1}`}
                        className="rounded-full w-15 h-15 mx-auto"
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Display details of the active testimonial */}
            <div className="mt-4 text-center text-black">
              <h3 className="font-bold">{reviews[activeIndex].name}</h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((star, i) => (
                    <span
                      key={i}
                      className={`${
                        i < Math.floor(reviews[activeIndex].rating)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-black">
                  {reviews[activeIndex].rating}/5.0
                </span>
              </div>
              <p className="mt-4 text-center text-black">
                {truncateText(reviews[activeIndex].description, 5)}
                <span className="text-blue-500 cursor-pointer ml-1">
                  See more
                </span>
              </p>
            </div>
          </div>
          {/* End Testimonials */}
        </div>

        <div className="p-6 pl-40">
          <div className="text-container">
            <p className="text-xl font-bold text-black">
              <ul style={{ listStyleType: "disc" }}>
                <li>Designed for Developers</li>
              </ul>
            </p>
            <p className="p-5 text-4xl font-bold text-black ml-10">
              Powerful and Easy
            </p>
          </div>
          <p className="text-black">
            Our platform is tailor-made for developers, providing a powerful and
            easy-to-use solution. With our tools, you can streamline your
            development process and achieve better outcomes. We offer a range of
            features that enable you to create robust applications quickly and
            efficiently.
          </p>
          <ul style={{ listStyleType: "disc" }} className="text-black mt-10">
            <li>Our platform places emphasis on user experience.</li>
            <li>Building a website, mobile app, or software.</li>
            <li>Our platform is designed to help you.</li>
            <li>Achieve your goals and exceed expectations.</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="bg-white flex space-x-4 p-5 px-40">
        <div className="flex flex-col items-center p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>

        <div className="flex flex-col items-center p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>

        <div className="flex flex-col items-center p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>

        <div className="flex flex-col items-center p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
