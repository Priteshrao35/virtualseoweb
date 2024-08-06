"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);

  const handleDropdown = (index) => {
    setDropdown(dropdown === index ? null : index);
  };

  return (
    <nav className="bg-white p-4">
      <div className="max-w-8xl mx-auto flex justify-center items-center space-x-5">
        {/* Left Side: Dropdowns */}
        <div
          className="relative group"
          onMouseEnter={() => handleDropdown(1)}
          onMouseLeave={() => handleDropdown(null)}
        >
          <div className="text-black hover:text-blue-600 cursor-pointer flex items-center">
            <span className="text-lg font-bold">Search Engine Optimization</span>
            <FaChevronDown className="ml-2" />
          </div>
          {dropdown === 1 && (
            <div className="absolute bg-white shadow-lg mt-2 rounded group-hover:block">
              <Link href="/seo1">
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  SEO Service 1
                </div>
              </Link>
              <Link href="/seo2">
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  SEO Service 2
                </div>
              </Link>
            </div>
          )}
        </div>

        

        <div
          className="relative group"
          onMouseEnter={() => handleDropdown(3)}
          onMouseLeave={() => handleDropdown(null)}
        >
          <div className="text-black hover:text-blue-600 cursor-pointer flex items-center">
            <span className="text-lg font-bold">Web Services</span>
            <FaChevronDown className="ml-2" />
          </div>
          {dropdown === 3 && (
            <div className="absolute bg-white shadow-lg mt-2 rounded group-hover:block">
              <Link href="/web1">
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  Web Service 1
                </div>
              </Link>
              <Link href="/web2">
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  Web Service 2
                </div>
              </Link>
            </div>
          )}
        </div>

        <div
          className="relative group"
          onMouseEnter={() => handleDropdown(4)}
          onMouseLeave={() => handleDropdown(null)}
        >
          <div className="text-black hover:text-blue-600 cursor-pointer flex items-center">
            <span className="text-lg font-bold">Mobile App Services</span>
            <FaChevronDown className="ml-2" />
          </div>
          {dropdown === 4 && (
            <div className="absolute bg-white shadow-lg mt-2 rounded group-hover:block">
              <Link href="/mobile1">
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  Mobile Service 1
                </div>
              </Link>
              <Link href="/mobile2">
                <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  Mobile Service 2
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Links */}
        <Link href="/about">
          <div className="text-black hover:text-blue-600 cursor-pointer font-bold">
            Portfolio
          </div>
        </Link>
        <Link href="/services">
          <div className="text-black hover:text-blue-600 cursor-pointer font-bold">
            Blogs
          </div>
        </Link>
        <Link href="/contact">
          <div className="text-black hover:text-blue-600 cursor-pointer font-bold">
            About Us
          </div>
        </Link>
        <Link href="/about">
          <div className="text-black hover:text-blue-600 cursor-pointer font-bold">
            Careers
          </div>
        </Link>
        <Link href="/contact">
          <div className="text-black hover:text-blue-600 cursor-pointer font-bold">
            Contacts
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
