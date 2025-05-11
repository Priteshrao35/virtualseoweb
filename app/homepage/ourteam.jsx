"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const getShortDescription = (text, isMobile) => {
  if (isMobile) {
    return text.split(" ").slice(0, 50).join(" ") + "...";
  }
  return text;
};

function OurTeam() {
  const [teamData, setTeamData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    fetch("https://virtualseoweb.pythonanywhere.com/ourteams/")
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error("Error fetching data:", error));

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" text-white py-10 md:p-10 px-4">
      <p className="text-3xl md:text-5xl font-bold text-center mb-5 animate-pulse text-black">
        Meet Our Expert Digital Team
      </p>
      <p className="text-center text-sm md:text-lg max-w-4xl mx-auto p-5 text-black">
        {getShortDescription(
          `At Virtualseoweb, we are specialists in SEO, SMO, website development, and mobile app development, committed to enhancing your brand’s online presence. Our experts improve website visibility, grow social media impact, create high-performance websites, and develop custom mobile apps. Let us help your business thrive in the digital space!`,
          isMobile
        )}
      </p>
      <Swiper
        className="mt-10"
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={!isMobile}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          767: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {teamData.map((teamMember) => (
          <SwiperSlide key={teamMember.id}>
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <Image
                src={teamMember.Image}
                alt={teamMember.Name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500"
                width={100}
                height={100}
              />
              <p className="mt-4 text-xl md:text-2xl font-bold text-gray-900">{teamMember.Name}</p>
              <p className="mt-2 text-sm md:text-lg text-indigo-700 font-semibold">{teamMember.Desination}</p>
              <p className="mt-2 text-xs md:text-sm text-gray-600">{truncateText(teamMember.Sort_descrition, 150)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OurTeam;