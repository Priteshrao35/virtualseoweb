'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Space, Dropdown, Spin, Menu, Drawer, Button } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';

const createSlug = (name) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const Navbar = () => {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
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
                setMobileMenuVisible(false);
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
    return <div className="flex justify-center items-center h-16"><Spin /></div>;
  }

  const categoryLabels = {
    digital_marketing: "Digital Marketing Services",
    web_services: "Web Services",
    mobile_app: "Mobile App Services",
    hiring_solutions: "Hiring Solutions"
  };

  const mobileMenuItems = [
    ...Object.keys(menuData).map((category) => ({
      key: category,
      label: categoryLabels[category] || category,
      children: menuData[category].map(item => ({
        ...item,
        onClick: () => {
          router.push(`/homepage/servicesdetails/${createSlug(item.label.props.children)}`);
          setMobileMenuVisible(false);
        }
      }))
    })),
    {
      key: 'portfolio',
      label: 'Portfolio',
      onClick: () => {
        router.push('/portfolio');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'blogs',
      label: 'Blogs',
      onClick: () => {
        router.push('/blogs');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'contactus',
      label: 'Contacts',
      onClick: () => {
        router.push('/contactus');
        setMobileMenuVisible(false);
      }
    }
  ];

  return (
    <>
      <div className="hidden md:flex z-50 justify-center items-center space-x-2 w-full text-sm sm:text-base lg:text-xl p-2 md:p-3 cursor-pointer mt-16">
        {Object.keys(menuData).map((category) => (
          <Dropdown key={category} menu={{ items: menuData[category] }} trigger={['hover']}>
            <a onClick={(e) => e.preventDefault()} className="text-black hover:text-blue-500 capitalize">
              <Space>
                {categoryLabels[category] || category} <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ))}

        <a onClick={() => router.push("/portfolio")} className="text-black hover:text-blue-500">Portfolio</a>
        <a onClick={() => router.push("/contactus")} className="text-black hover:text-blue-500">Contacts</a>
      </div>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Your Logo</div>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(true)}
          className="text-black"
        />
      </div>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        visible={mobileMenuVisible}
        className="md:hidden"
      >
        <Menu
          mode="vertical"
          items={mobileMenuItems}
          style={{ borderRight: 0 }}
        />
      </Drawer>

      {mobileMenuVisible && <div className="h-16 md:h-0"></div>}
    </>
  );
};

export default Navbar;