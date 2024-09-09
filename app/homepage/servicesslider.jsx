"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

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
  // Limit the content to 1000 characters and add "..." if it's longer
  return text.length > 600 ? text.slice(0, 600) + "  ..........................." : text;
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
    <div className="bg-gray-200 p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full mt-2">
        <div className="flex-grow md:ml-72 text-left">
          <div className="p-2 md:mt-10 text-xl font-bold text-black">
            <ul className="list-disc">
              <li>Our Services and Solutions</li>
            </ul>
          </div>
          <p className="md:p-10 p-2 md:text-4xl text-2xl font-bold text-black">
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
      <div className="md:pl-72">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            767: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30
            }
          }}
          pagination={{
            clickable: true
          }}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs"
          }}
          modules={[Autoplay, Navigation]}
          className="h-auto mt-2 relative"
        >
          {services.map((service) => (
            <SwiperSlide
              key={service.id}
              className="border border-black hover:border-green-600 hover:bg-gray-100 transition duration-300 rounded-xl p-5 cursor-pointer flex flex-col h-[400px]" // Fixed height
            >
              <div className="flex flex-col flex-grow">
                <p
                  onClick={() =>
                    router.push(
                      `/homepage/servicesdetails/${createSlug(service.name)}`
                    )
                  }
                  className="text-black mt-10 text-2xl font-bold hover:text-red-600 cursor-pointer"
                >
                  {service.name}
                </p>
                <p
                  onClick={() =>
                    router.push(
                      `/homepage/servicesdetails/${createSlug(service.name)}`
                    )
                  }
                  className="text-black mt-7 pl-5 hover:text-blue-600 flex-grow text-[15px]"
                >
                  {stripHtmlTags(service.content)}
                </p>
                <div className="flex-grow"></div>
              </div>

              <hr className="w-4/5 mx-auto border-red-600 mt-7" />

              <p
                onClick={() =>
                  router.push(
                    `/homepage/servicesdetails/${createSlug(service.name)}`
                  )
                }
                className="text-blue-500  pl-20 md:pl-16 mt-5 hover:text-blue-700 transition duration-300 text-2xl cursor-pointer"
              >
                Learn More ...
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
