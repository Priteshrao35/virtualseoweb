"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";

// Function to truncate text to a specified number of characters
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Function to get 50 words from a description
const getShortDescription = (text, isMobile) => {
  if (isMobile) {
    return text.split(" ").slice(0, 50).join(" ") + "...";
  }
  return text;
};

function OurTeam() {
  const [teamData, setTeamData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://virtualseoweb.pythonanywhere.com/ourteams/")
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error("Error fetching data:", error));

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-white p-5 md:px-20 px-5">
      <p className="text-orange-500 text-2xl md:text-4xl text-center p-5">
        Meet Our Expert Digital Team of Virtualseoweb
      </p>
      <p className="text-black text-sm md:text-lg text-center p-5 md:px-32">
        {getShortDescription(
          `At Virtualseoweb, our digital team stands as a beacon of innovation and
          expertise. We are a diverse group of professionals dedicated to
          elevating your brand's online presence through a combination of
          cutting-edge strategies and personalized solutions. Our team includes
          SEO specialists, skilled web developers, creative digital marketers, and
          data analysts, all working in harmony to drive measurable results. Our
          SEO experts use the latest techniques to enhance your website’s
          visibility and rankings. Our web developers create visually stunning and
          functionally robust websites tailored to your specific needs. Meanwhile,
          our digital marketers craft compelling campaigns that engage and
          convert, using data-driven insights to refine strategies. Our analysts
          continuously monitor performance, ensuring that every decision is
          informed by accurate, actionable data. We believe in collaboration and
          transparency, working closely with you to understand your goals and
          challenges.`,
          isMobile
        )}
      </p>
      <Swiper
        className="mt-10"
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000, // Slide delay in milliseconds
          disableOnInteraction: false // Continue autoplay even after user interaction
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          767: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }
        }}
      >
        {teamData.map((teamMember) => (
          <SwiperSlide key={teamMember.id}>
            <div className="flex flex-col items-center md:p-4">
              <Image
                src={teamMember.Image}
                alt={teamMember.Name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                width={80}
                height={80}
              />
              <p className="mt-4 text-lg md:text-2xl font-bold text-black text-center">
                {teamMember.Name}
              </p>
              <p className="mt-2 text-sm md:text-lg text-gray-700 text-center">
                {teamMember.Desination}
              </p>
              <p className="mt-2 text-xs md:text-sm text-gray-500 text-center">
                {truncateText(teamMember.Sort_descrition, 1000)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OurTeam;
