"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Image } from "antd";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaSkype,
} from "react-icons/fa";
import MobileNavMenu from "./mobilenavbar";
import { useRouter } from "next/navigation";
import GetQuoteModal from "./getqutepopup";

const Header = () => {
  // State and functions for drawer
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <header className="bg-white p-1 fixed w-full z-30">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile drawer */}
        <MobileNavMenu open={open} showDrawer={showDrawer} onClose={onClose} />

        {/* Left Side: Logo for desktop and mobile */}
        <div className="items-center hidden md:block">
          <Link href="/">
            <div className="text-black text-lg font-bold cursor-pointer">
              <Image
                className="w-full"
                src="/favicon.ico"
                alt="logo"
                layout="responsive"
                preview={false}
                width={150}
                height={40}
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center md:hidden ml-10">
          <Link href="/">
            <div className="text-black text-lg font-bold cursor-pointer">
              <Image
                className="md:w-full w-5"
                src="/favicon.ico"
                alt="logo"
                layout="responsive"
                preview={false}
                width={50}
                height={30}
              />
            </div>
          </Link>
        </div>

        {/* Center: Contact Info */}
        <div className="flex space-x-4 items-center">
          <div className="flex items-center space-x-1">
            <FaPhone className="text-green-500 md:text-2xl text-sm md:ml-0 ml-2" />
            <a href="tel:+919450977593" className="text-black text-sm md:text-sm xl:text-[23px]">
              +919450977593
            </a>
          </div>
          <div className="md:flex items-center space-x-1 hidden">
            <FaEnvelope className="text-orange-600 md:text-2xl text-sm" />
            <a
              href="mailto:info@virtualseoweb.com"
              className="text-black text-sm md:text-lg xl:text-[23px]"
            >
              info@virtualseoweb.com
            </a>
          </div>
          <div className="md:flex items-center space-x-1 hidden">
            <FaSkype className="text-blue-400 md:text-lg xl:text-2xl text-sm" />
            <a
              href="skype:live:virtualseoweb?call"
              className="text-black text-sm md:text-lg xl:text-[23px]"
            >
              info@virtualseoweb.com
            </a>
          </div>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="md:flex space-x-2 md:space-x-1 xl:space-x-2 hidden">
          <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
            <FaFacebook
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
              size={22}
            />
          </Link>
          <Link href="https://www.instagram.com/virtualseoweb/">
            <FaInstagram
              className="text-orange-900 hover:text-pink-600 cursor-pointer"
              size={22}
            />
          </Link>
          <Link href="https://www.linkedin.com/company/virtualseowebtechnology/about/">
            <FaLinkedin
              className="text-blue-700 hover:text-blue-700 cursor-pointer"
              size={22}
            />
          </Link>
        </div>

        <GetQuoteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
};

export default Header;
