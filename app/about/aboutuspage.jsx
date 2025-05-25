"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ServicesSliderSection from "../homepage/servicesslider";
import Brands from "../homepage/brands";
import LatestBlog from "../homepage/latestblogs";
import GetQuite from "../homepage/getquite";
import OurProjects from "../homepage/projects";

function AboutusPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://virtualseoweb.pythonanywhere.com/aboutus/")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAboutData(response.data[0]); 
        } else {
          setAboutData(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the About Us data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  const hasDetails = aboutData?.details?.length > 0;

  return (
    <div className="bg-white">
      {aboutData ? (
        <div>
          {aboutData.About_Banner && (
            <img
              src={aboutData.About_Banner}
              alt="About Us Banner"
              className="w-full h-auto mb-4 md:mt-0 mt-10"
            />
          )}
          <div className="px-1 md:px-40">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-black text-center p-5 md:p-10">
              {aboutData.About_Heading}
            </h1>

            {hasDetails ? (
              <div className="grid grid-cols-1 gap-6">
                {aboutData.details.map((detail, index) => (
                  <div
                    key={detail.id}
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-4`}
                  >
                    {detail.About_Image && (
                      <div className="w-full md:w-1/2">
                        <img
                          src={detail.About_Image}
                          alt={`About Us Detail ${detail.id}`}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    <div className="w-full md:w-1/2 mt-0 text-center md:text-left">
                      <p className="text-xl md:text-3xl font-bold py-2 text-black">
                        {detail.About_Title}
                      </p>
                      <p className="text-base md:text-lg text-black">
                        {detail.Abouts_Content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">No details available</div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">No data available</div>
      )}
      <hr className="md:mt-20 mt-10" />
      <div className="mt-5">
        <Brands />
      </div>
      <div className="px-4 bg-slate-200">
        <ServicesSliderSection />
      </div>
      <OurProjects />
      <LatestBlog />
      <GetQuite />
    </div>
  );
}

export default AboutusPage;
