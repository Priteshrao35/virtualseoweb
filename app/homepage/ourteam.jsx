'use client';
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

function OurTeam() {
  const [teamData, setTeamData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    fetch("https://virtualseoweb.pythonanywhere.com/ourteams/")
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error("Error fetching data:", error));

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="bg-gray-100 pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-2xl xl:text-3xl font-bold text-gray-900 mb-4">
            Meet Our Expert Digital Team
          </h2>
          <p className="text-base sm:text-lg md:text-[12px] xl:text-[17px] text-gray-600 max-w-4xl mx-auto">
            At Virtualseoweb, we are specialists in SEO, SMO, website development, and mobile app development, committed to enhancing your brand's online presence. Our experts improve website visibility, grow social media impact, create high-performance websites, and develop custom mobile apps.
          </p>
        </motion.div>

        {/* Team Members Swiper */}
        <div className="relative">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            navigation={!isMobile}
            modules={[Pagination, Navigation, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24
              }
            }}
            className="!pb-12"
          >
            {teamData.map((teamMember) => (
              <SwiperSlide key={teamMember.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4 rounded-full overflow-hidden border-4 border-blue-500">
                      <Image
                        src={teamMember.Image}
                        alt={teamMember.Name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl md:text-xl xl:text-2xl font-bold text-gray-900 text-center">
                      {teamMember.Name}
                    </h3>
                    <p className="text-blue-600 font-medium mt-1 text-center">
                      {teamMember.Desination}
                    </p>
                    <p className="text-gray-600 mt-3 text-sm md:text-[10px] xl:text-sm text-center line-clamp-3">
                      {teamMember.Sort_descrition}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default OurTeam;