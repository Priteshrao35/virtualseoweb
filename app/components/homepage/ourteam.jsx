"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";

function OurTeam() {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://virtualseoweb.pythonanywhere.com/ourteams/")
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white p-5 md:px-20 px-5">
      <p className="text-black text-2xl md:text-4xl text-center p-2">
        Meet Our Expert Digital Team of Media Search Group
      </p>
      <p className="text-black text-sm md:text-lg text-center p-2">
        Our team at virtualseoweb is composed of dedicated professionals with
        extensive expertise in SEO. Trust our expert digital team to elevate
        your brand and enhance your online presence.
      </p>
      <Swiper
        className="mt-10"
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000, // Slide delay in milliseconds
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 2 },
          767: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {teamData.map((teamMember) => (
          <SwiperSlide key={teamMember.id}>
            <div className="flex flex-col items-center p-4">
              <Image
                src={teamMember.Image} // Use the image URL from the API
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
                {teamMember.Sort_descrition}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default OurTeam;
