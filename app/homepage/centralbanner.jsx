'use client'
import React, { useState, useEffect } from 'react';
import { Image } from 'antd';

function CentralBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch('https://virtualseoweb.pythonanywhere.com/centralbanner/');
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    }

    fetchBanners();
  }, []);

  return (
    <div className="w-full bg-white md:mt-20 mt-5 md:px-0 px-2">
      {banners.map((banner) => (
        <Image
          key={banner.id} // Assuming each banner has a unique `id`
          className="w-full"
          preview={false}
          src={banner.Center_Banner} // Corrected the variable name to match the data structure
        />
      ))}
    </div>
  );
}

export default CentralBanner;
