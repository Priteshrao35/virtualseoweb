"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spin } from "antd";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


// Function to create a slug from a name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function FooterSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [footerContent, setFooterContent] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchFooterContent = async () => {
      try {
        const response = await fetch(
          "https://virtualseoweb.pythonanywhere.com/footermaincontent/"
        );
        const data = await response.json();
        setFooterContent(data[0].Content);
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };

    fetchFooterContent();

    // Handle screen size change for mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // For mobile devices, truncate content to first 30 words
  const mobileText = footerContent.split(" ").slice(0, 30).join(" ") + "...";

  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://virtualseoweb.pythonanywhere.com/menu-items/")
      .then((response) => {
        const data = response.data;
        const transformedData = data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          const slug = createSlug(item.name);
          acc[item.category].push({
            key: item.id,
            label: (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/homepage/servicesdetails/${slug}`);
                }}
              >
                {item.name}
              </a>
            )
          });
          return acc;
        }, {});
        setMenuData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <Spin />;
  }

  const categoryLabels = {
    digital_marketing: "Digital Marketing",
    web_services: "Web Services",
    mobile_app: "Mobile Apps ",
    hiring_solutions: "Hiring Solutions"
  };

  return (
    <footer className="bg-gray-800 text-gray-300 md:mt-1">

      <div className="py-8 px-5">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-10">
          {Object.keys(menuData).map((category) => (
            <div key={category} className="text-black font-bold">
              <h3 className="text-xl md:text-[14px] xl:text-[18px] font-semibold text-white capitalize">
                {categoryLabels[category] || category}
              </h3>
              <hr
                className="mt-2 border-dotted border-white border-1"
                style={{ width: "50%" }}
              />

              <ul className="list-none text-white mt-3 hover:text-blue-900">
                {menuData[category].map((item) => (
                  <li key={item.key} className="mb-2 md:text-[11px] xl:text-[15px]">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(
                          `/homepage/servicesdetails/${createSlug(
                            item.label.props.children
                          )}`
                        );
                      }}
                      className="hover:text-blue-500"
                    >
                      {item.label.props.children}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-xl md:text-[13px] xl:text-[16px] font-semibold text-white uppercase">
              All Important
            </h2>
            <hr
              className="mt-2 border-dotted border-white border-1"
              style={{ width: "50%" }}
            />
            <div className="flex flex-col space-y-4 mt-3">
              <div
                onClick={() => router.push("/portfolio")}
                className="text-white font-bold hover:text-blue-500 cursor-pointer md:text-[11px] xl:text-[15px]"
              >
                Portfolio
              </div>
              <div
                onClick={() => router.push("/blogs")}
                className="text-white font-bold hover:text-blue-500 cursor-pointer md:text-[11px] xl:text-[15px]"
              >
                Blogs
              </div>
              <div
                onClick={() => router.push("/about")}
                className="text-white font-bold hover:text-blue-500 cursor-pointer md:text-[11px] xl:text-[15px]"
              >
                About Us
              </div>
              <div
                onClick={() => router.push("/careers")}
                className="text-white font-bold hover:text-blue-500 cursor-pointer md:text-[11px] xl:text-[15px]"
              >
                Careers
              </div>

            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-[13px] xl:text-[16px] font-semibold text-white uppercase">
              Follow Us
            </h2>
            <hr
              className="mt-2 border-dotted border-white border-1"
              style={{ width: "50%" }}
            />
            <div className="flex space-x-6 mt-3">
              <div className="md:flex space-x-2 md:space-x-1 xl:space-x-2 hidden">
                <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
                  <FaFacebook
                    className="text-white hover:text-gray-300 cursor-pointer"
                    size={22}
                  />
                </Link>
                <Link href="https://www.instagram.com/virtualseoweb/">
                  <FaInstagram
                    className="text-white hover:text-gray-300 cursor-pointer"
                    size={22}
                  />
                </Link>
                <Link href="https://www.linkedin.com/company/virtualseowebtechnology/about/">
                  <FaLinkedin
                    className="text-white hover:text-gray-300 cursor-pointer"
                    size={22}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 text-center py-2 px-2 md:px-0">
        <p className="text-gray-300 md:text-[14px] xl:text-xl text-sm">
          ©virtualseoweb. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
