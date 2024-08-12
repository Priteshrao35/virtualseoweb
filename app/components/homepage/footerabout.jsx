"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function AboutSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://virtualseoweb.pythonanywhere.com/FooterAbout/")
      .then((response) => response.json())
      .then((data) => setData(data[0])) // Assuming the API returns an array with a single object
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <p>Loading...</p>; // Show loading state while data is being fetched

  return (
    <div className="px-0 bg-white">
      <div className="relative flex flex-col md:flex-row gap-0 items-stretch p-0 bg-white">
        {/* Image Section */}
        <div className="relative flex justify-center flex-1">
          <Image
            src={data.Image} // Use the image URL from the API
            alt={data.Content_On_Image || "Description"} // Use content as alt text if available
            className="w-full h-full object-cover"
            width={500}
            height={300}
          />
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-0 p-0 flex-1">
          {/* Card 1 */}
          <div className="bg-black p-14 shadow-lg flex flex-col items-center text-center w-full h-[360px]">
            <Image
              src={data.Card1_Image} // Use the image URL from the API
              alt="Icon 1"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">{data.Card1_Title}</h3>
            <p className="text-white">{data.Card1_Description}</p>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-800 p-14 shadow-lg flex flex-col items-center text-center w-full h-[360px]">
            <Image
              src={data.Card2_Image} // Use the image URL from the API
              alt="Icon 2"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">{data.Card2_Title}</h3>
            <p className="text-white">{data.Card2_Description}</p>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-800 p-14 shadow-lg flex flex-col items-center text-center w-full h-[355px]">
            <Image
              src={data.Card3_Image} // Use the image URL from the API
              alt="Icon 3"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">{data.Card3_Title}</h3>
            <p className="text-white">{data.Card3_Description}</p>
          </div>
          {/* Card 4 */}
          <div className="bg-black p-14 shadow-lg flex flex-col items-center text-center w-full h-[355px]">
            <Image
              src={data.Card4_Image} // Use the image URL from the API
              alt="Icon 4"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">{data.Card4_Title}</h3>
            <p className="text-white">{data.Card4_Description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;