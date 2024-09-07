import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaFacebook,
  FaTwitter as FaXTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Space, Dropdown, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";

// Function to create a slug from a name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const MobileNavMenu = ({ open, showDrawer, onClose }) => {
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
                  onClose(); // Close the drawer after navigating
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
    digital_marketing: "Digital Marketing Services",
    web_services: "Web Services",
    mobile_app: "Mobile App Services",
    hiring_solutions: "Hiring Solutions"
  };

  return (
    <div className="md:hidden">
      <FaBars
        className="text-3xl cursor-pointer text-blue-900"
        onClick={showDrawer}
      />
      <Drawer
        title={<div style={{ fontSize: "22px" }}>VIRTUALSEOWEB</div>}
        placement="left" // Drawer will open from the left
        onClose={onClose}
        open={open}
        width="80vw" // Drawer covers 80% of the screen width
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col h-full">
          {/* Main content with scrollable area */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-6">
              {Object.keys(menuData).map((category) => (
                <div key={category} className="mb-4">
                  <Dropdown
                    menu={{ items: menuData[category] }}
                    trigger={["click"]}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="text-black font-bold hover:text-blue-500"
                      style={{ fontSize: "18px" }}
                    >
                      <Space>
                        {categoryLabels[category] || category} <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              ))}
              <p
                onClick={() => {
                  router.push("/portfolio");
                  onClose();
                }}
                className="text-black font-bold hover:text-blue-500 mb-4 text-lg"
              >
                Portfolio
              </p>
              <p
                onClick={() => {
                  router.push("/blogs");
                  onClose();
                }}
                className="text-black font-bold hover:text-blue-500 mb-4 text-lg"
              >
                Blogs
              </p>
              <p
                onClick={() => {
                  router.push("/aboutus");
                  onClose();
                }}
                className="text-black font-bold hover:text-blue-500 mb-4 text-lg"
              >
                About Us
              </p>
              <p
                onClick={() => {
                  router.push("/careers");
                  onClose();
                }}
                className="text-black font-bold hover:text-blue-500 mb-4 text-lg"
              >
                Careers
              </p>
              <p
                onClick={() => {
                  router.push("/contactus");
                  onClose();
                }}
                className="text-black font-bold hover:text-blue-500 mb-4 text-lg"
              >
                Contacts
              </p>
            </div>
          </div>
          {/* Social media icons fixed at the bottom */}
          <div className="flex justify-between items-center p-4 border-t border-gray-300">
            <a
              href="https://www.facebook.com/Virtualseowebsoftware/about"
              className="text-blue-500 hover:text-blue-600 mx-2"
            >
              <FaFacebook size={30} />
            </a>
            <a href="#" className="text-black hover:text-blue-400 mx-2">
              <FaXTwitter size={30} />
            </a>
            <a href="#" className="text-orange-900 hover:text-pink-600 mx-2">
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.linkedin.com/company/virtualseoweb"
              className="text-blue-700 hover:text-blue-800 mx-2"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNavMenu;
