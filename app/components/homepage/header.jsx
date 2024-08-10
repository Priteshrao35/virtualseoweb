import { Image } from "antd";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaSkype
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex items-center">
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

        {/* Center: Contact Info */}
        <div className="flex space-x-4 items-center">
          <div className="flex items-center space-x-1">
            <FaPhone className="text-green-500 text-2xl" />
            <a href="tel:+919450977593" className="text-black text-md">
              Call Us: +91 9450977593
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <FaEnvelope className="text-orange-600 text-2xl" />
            <a
              href="mailto:info@virtualseoweb.com"
              className="text-black text-md"
            >
              Email: info@virtualseoweb.com
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <FaSkype className="text-blue-400 text-2xl" />
            <a
              href="skype:live:virtualseoweb?call"
              className="text-black text-md"
            >
              Skype: live:virtualseoweb
            </a>
          </div>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex space-x-4">
          <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
            <FaFacebook
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
              size={24}
            />
          </Link>
          <Link href="#">
            <FaXTwitter
              className="text-black hover:text-blue-400 cursor-pointer"
              size={24}
            />
          </Link>
          <Link href="#">
            <FaInstagram
              className="text-orange-900 hover:text-pink-600 cursor-pointer"
              size={24}
            />
          </Link>
          <Link href="https://www.facebook.com/Virtualseowebsoftware/about">
            <FaLinkedin
              className="text-blue-700 hover:text-blue-700 cursor-pointer"
              size={24}
            />
          </Link>

          <Link href="#">
            <p className="text-white bg-blue-600 hover:bg-white hover:text-blue-600 rounded-xl font-bold px-5">
              Get Quete
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
