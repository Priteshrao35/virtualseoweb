"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterSection from "../homepage/footer";
import Header from "../homepage/header";
import Navbar from "../homepage/navbar";
import CentralBanner from "../homepage/centralbanner";

function AboutusPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/aboutus/")
      .then((response) => {
        console.log("API Response:", response.data); // Log the response data
        if (Array.isArray(response.data) && response.data.length > 0) {
          setAboutData(response.data[0]); // Set the first item in the array
        } else {
          setAboutData(null); // Handle empty array case
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the About Us data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  // Check if aboutData and details exist and are correctly formatted
  const hasDetails =
    aboutData &&
    Array.isArray(aboutData.details) &&
    aboutData.details.length > 0;

  return (
    <div className=" bg-white">
      <Header />
      <hr />
      <Navbar />
      <CentralBanner />
      {aboutData ? (
        <div>
          {aboutData.About_Banner && (
            <img
              src={aboutData.About_Banner}
              alt="About Us Banner"
              className="w-full h-auto mb-4"
            />
          )}
          <div className="md:px-40">
            <h1 className="text-2xl font-bold mb-4 text-black text-center p-10">
              {aboutData.About_Heading}
            </h1>

            {hasDetails ? (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {aboutData.details.map((detail, index) => (
                  <div
                    key={detail.id}
                    className={`flex ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    } items-center gap-4`}
                  >
                    {detail.About_Image && (
                      <div className="w-1/2">
                        <img
                          src={detail.About_Image}
                          alt={`About Us Detail ${detail.id}`}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    <div className="w-1/2 mt-0">
                      {/* Display Title and Content */}
                      <p className="flex-1 text-black text-3xl font-bold py-2">
                        {detail.About_Title}
                      </p>
                      <p className="flex-1 text-black text-lg">
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
      <FooterSection />
    </div>
  );
}

export default AboutusPage;
