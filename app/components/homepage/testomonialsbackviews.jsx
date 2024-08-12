"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Testomonialsbackviews from "./testomonials";
import OurTeam from "./ourteam";

function InfoSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://virtualseoweb.pythonanywhere.com/testomonialsbackview/")
      .then(response => response.json())
      .then(data => setData(data[0])) 
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-40 bg-white">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-40 bg-white">
        <div className="relative flex justify-center">
          <Image
            src={data.Image}
            alt="Description"
            className="w-full h-auto rounded-lg"
            width={500}
            height={200}
          />
          <Testomonialsbackviews />
        </div>

        <div className="p-6 pl-40">
          <div className="text-container">
            <p className="text-xl font-bold text-black">
              <ul style={{ listStyleType: "disc" }}>
                <li>{data.SubHeading}</li>
              </ul>
            </p>
            <p className="p-5 text-4xl font-bold text-black ml-10">
              {data.Heading}
            </p>
          </div>
          <p className="text-black">
            {data.Content}
          </p>
          <ul style={{ listStyleType: "disc" }} className="text-black mt-10">
            <li>{data.Important_Topic_1}</li>
            <li>{data.Important_Topic_2}</li>
            <li>{data.Important_Topic_3}</li>
            <li>{data.Important_Topic_4}</li>
            <li>{data.Important_Topic_5}</li>
          </ul>
        </div>
      </div>
      <hr />
      <OurTeam />
    </div>
  );
}

export default InfoSection;
