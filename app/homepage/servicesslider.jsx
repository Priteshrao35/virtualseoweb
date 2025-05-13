"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Autoplay, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";

// Function to create a slug from a name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function stripHtmlTags(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent || "";

  if (window.innerWidth <= 768) {
    return text.split(/\s+/).slice(0, 65).join(" ") + "...";
  }

  return text.length > 300 ? text.slice(0, 500) + "..." : text;
}


export default function ServicesSliderSection() {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://virtualseoweb.pythonanywhere.com/menu-items/"
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching the services data:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <motion.div
      className="p-1 md:p-10 md:px-10 bg-white"
      initial={{ opacity: 0, y: 50 }} // Start animation: invisible and moved down
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% is visible
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
        <div className="flex-grow md:text-left">
          <div className="p-1 mt-5 md:mt-10 text-xl md:pl-0 pl-8 font-bold text-black">
            <ul className="list-disc">
              <li>Our Services and Solutions</li>
            </ul>
          </div>
          <p className="md:p-10 p-2 md:text-4xl text-xl font-bold text-black md:text-left text-center">
            Technological Applications
          </p>
        </div>
        <div className="flex items-center justify-end mt-5 md:mt-0 md:gap-[10em] gap-5">
          <div className="swiper-button-prevs text-blue-800 cursor-pointer text-2xl">
            Prev
          </div>
          <div className="swiper-button-nexts text-blue-800 cursor-pointer text-2xl">
            Next
          </div>
        </div>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            767: {
              slidesPerView: 34,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          }}
          modules={[Autoplay, Navigation]}
          className="h-auto mt-2 relative"
        >
          {services.map((service) => (
            <SwiperSlide
              key={service.id}
              className="border border-black hover:border-green-600 hover:bg-gray-100 transition duration-300 rounded-xl md:p-5 p-2 cursor-pointer flex flex-col justify-between"
              style={{ minHeight: "470px", maxHeight: "470px" }} // Fixed height
            >
              <motion.div
                className="flex flex-col flex-grow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <p
                  onClick={() =>
                    router.push(
                      `/homepage/servicesdetails/${createSlug(service.name)}`
                    )
                  }
                  className="text-black mt-5 text-2xl font-bold hover:text-red-600 cursor-pointer"
                >
                  {service.name}
                </p>
                <p
                  onClick={() =>
                    router.push(
                      `/homepage/servicesdetails/${createSlug(service.name)}`
                    )
                  }
                  className="text-black mt-7 hover:text-blue-600 flex-grow text-[16px]"
                >
                  {stripHtmlTags(service.content)}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
}