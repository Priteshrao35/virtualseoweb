"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "antd";
import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function OurProjects() {
  return (
    <div className="bg-blue-50 p-10">
      <div className="services-container">
        <div className="text-container md:ml-72">
          <p className="p-2 mt-10 text-xl font-bold text-black ml-10">
            <ul style={{ listStyleType: "disc" }}>
              <li> Our Letest Projects</li>
            </ul>
          </p>
          <p className="p-5 text-4xl font-bold text-black ml-10">
            Case Studies
          </p>
        </div>
        <div className="swiper-buttons mr-10">
          <div className="swiper-button-prevs">Prev</div>
          <div className="swiper-button-nexts">Next</div>
        </div>
      </div>
      <div className="md:pl-72">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true
          }}
          navigation={{
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs"
          }}
          modules={[Pagination, Navigation]}
          className="serviceswiper"
        >
          <SwiperSlide className="border hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl">
            <Image
              className="w-full"
              src="/homepage/designDAGNGSGiLwIg3-wvYemc2BIlYukhRPMRgedit.png"
              alt="Design"
              layout="responsive"
              width={400}
              height={250}
            />
            <hr
              style={{
                width: "90%",
                margin: "20px auto",
                borderColor: "red"
              }}
            />
            <div className="text-left pl-5">
              <h3 className="text-xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Title Goes Here
              </h3>

              <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et sit, temporibus omnis voluptatibus rerum mollitia sed magni accusamus impedit ullam!
              </p>
              <p className="text-blue-500 text-left mt-5 hover:text-blue-700 transition duration-300">
                Learn More ....................
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide className="border hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl">
            <Image
              className="w-full"
              src="/homepage/designDAGNGSGiLwIg3-wvYemc2BIlYukhRPMRgedit.png"
              alt="Design"
              layout="responsive"
              width={400}
              height={250}
            />
            <hr
              style={{
                width: "90%",
                margin: "20px auto",
                borderColor: "red"
              }}
            />
            <div className="text-left pl-5">
              <h3 className="text-xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Title Goes Here
              </h3>

              <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et sit, temporibus omnis voluptatibus rerum mollitia sed magni accusamus impedit ullam!
              </p>
              <p className="text-blue-500 text-left mt-5 hover:text-blue-700 transition duration-300">
                Learn More ....................
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide className="border hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4">
            <Image
              className="w-full"
              src="/homepage/designDAGNGSGiLwIg3-wvYemc2BIlYukhRPMRgedit.png"
              alt="Design"
              layout="responsive"
              width={400}
              height={250}
            />
            <hr
              style={{
                width: "90%",
                margin: "20px auto",
                borderColor: "red"
              }}
            />
            <div className="text-left pl-5">
              <h3 className="text-xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Title Goes Here
              </h3>

              <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et sit, temporibus omnis voluptatibus rerum mollitia sed magni accusamus impedit ullam!
              </p>
              <p className="text-blue-500 text-left mt-5 hover:text-blue-700 transition duration-300">
                Learn More ....................
              </p>
            </div>
          </SwiperSlide>


          <SwiperSlide className="border hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl">
            <Image
              className="w-full"
              src="/homepage/designDAGNGSGiLwIg3-wvYemc2BIlYukhRPMRgedit.png"
              alt="Design"
              layout="responsive"
              width={400}
              height={250}
            />
            <hr
              style={{
                width: "90%",
                margin: "20px auto",
                borderColor: "red"
              }}
            />
            <div className="text-left pl-5">
              <h3 className="text-xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Title Goes Here
              </h3>

              <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et sit, temporibus omnis voluptatibus rerum mollitia sed magni accusamus impedit ullam!
              </p>
              <p className="text-blue-500 text-left mt-5 hover:text-blue-700 transition duration-300">
                Learn More ....................
              </p>
            </div>
          </SwiperSlide>


          <SwiperSlide className="border hover:border-red-600 hover:bg-gray-100 transition duration-300 flex flex-col items-center p-4 rounded-xl">
            <Image
              className="w-full"
              src="/homepage/designDAGNGSGiLwIg3-wvYemc2BIlYukhRPMRgedit.png"
              alt="Design"
              layout="responsive"
              width={400}
              height={250}
            />
            <hr
              style={{
                width: "90%",
                margin: "20px auto",
                borderColor: "red"
              }}
            />
            <div className="text-left pl-5">
              <h3 className="text-xl font-bold text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Title Goes Here
              </h3>

              <p className="text-black hover:bg-gray-200 hover:text-red-500 hover:pl-2 transition duration-300 mb-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et sit, temporibus omnis voluptatibus rerum mollitia sed magni accusamus impedit ullam!
              </p>
              <p className="text-blue-500 text-left mt-5 hover:text-blue-700 transition duration-300">
                Learn More ....................
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
