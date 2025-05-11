"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Testomonialsbackviews from "./testomonials";

function InfoSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://virtualseoweb.pythonanywhere.com/testomonialsbackview/")
      .then((response) => response.json())
      .then((data) => setData(data[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 bg-white md:mt-20">
      <div className="flex-grow text-center">
        <p className="md:p-10 p-2 md:text-4xl text-sm font-bold text-black md:mt-10">
          This is the best client testomonials
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 md:px-40 bg-white">
        <div className="relative flex justify-center">
          <Image
            src={data.Image}
            alt="Description"
            className="w-full h-auto rounded-lg hidden md:block"
            width={500}
            height={200}
          />
          <div className="">
            <Testomonialsbackviews />
          </div>
        </div>

        <div className="md:p-6 md:pl-40 md:mt-0 mt-[20em]">
          <div className="text-container">
            <p className="text-xl font-bold text-black">
              <ul style={{ listStyleType: "disc" }}>
                <li>{data.SubHeading}</li>
              </ul>
            </p>
            <p className="text-2xl md:text-4xl font-bold text-black mt-4 md:text-left text-center">
              {data.Heading}
            </p>
          </div>
          <p className="text-black mt-4 md:text-xl">{data.Content}</p>
          <ul className="text-black mt-6 list-disc ml-4 md:text-xl">
            <li>{data.Important_Topic_1}</li>
            <li>{data.Important_Topic_2}</li>
            <li>{data.Important_Topic_3}</li>
            <li>{data.Important_Topic_4}</li>
            <li>{data.Important_Topic_5}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
