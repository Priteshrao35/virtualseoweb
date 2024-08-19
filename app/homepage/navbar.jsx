'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Dropdown, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// Function to create a slug from a name
const createSlug = (name) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const Navbar = () => {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get('https://virtualseoweb.pythonanywhere.com/menu-items/')
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
              <a href="#" onClick={(e) => {
                e.preventDefault();
                router.push(`/homepage/servicesdetails/${slug}`);
              }}>
                {item.name}
              </a>
            ),
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
    <div className="hidden md:flex z-50 justify-center items-center space-x-4 w-full text-xl p-5">
      {Object.keys(menuData).map((category) => (
        <Dropdown key={category} menu={{ items: menuData[category] }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space className="text-black font-bold">
              {categoryLabels[category] || category} <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ))}

      <a onClick={() => router.push("/portfolio")} className="text-black font-bold">Portfolio</a>
      <a onClick={() => router.push("/blogs")} className="text-black font-bold">Blogs</a>
      <a onClick={() => router.push("/about-us")} className="text-black font-bold">About Us</a>
      <a onClick={() => router.push("/careers")} className="text-black font-bold">Careers</a>
      <a onClick={() => router.push("/contacts")} className="text-black font-bold">Contacts</a>
    </div>
  );
};

export default Navbar;
