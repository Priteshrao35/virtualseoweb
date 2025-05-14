'use client';
import React from 'react';

function Creativity() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center p-6 md:px-16 bg-white">
      <div className="image-content">
        <img 
          src="/graphic-cut.png" 
          alt="Creative Design" 
          className="w-3/4 md:w-2/3 mx-auto h-auto" 
        />
      </div>
      <div className="text-content md:pr-6 text-black">
        <h2 className="text-xl md:text-xl xl:text-xl font-bold mb-3  md:mt-0 mt-7">DELIVERING MORE THAN JUST CREATIVITY</h2>
        <h3 className="text-lg md:text-[15px] xl:text-xl font-semibold mb-3">Creating Stunning Websites & Smart Mobile Applications</h3>
        <p className="text-sm md:text-[12px] xl:text-[15px] mb-3">
          In today's digital world, websites and mobile apps are business essentials. Virtualseoweb Updates creates innovative, responsive websites and mobile applications that capture attention and provide an enhanced user experience.
        </p>
        <p className="text-sm md:text-[12px] xl:text-[15px] mb-3">
          Our designs ensure your website and apps work flawlessly across all devices. Whether your audience is on desktop or mobile, they will enjoy a consistent, visually appealing experience.
        </p>
        <p className="text-sm md:text-[12px] xl:text-[15px] mb-3">
          Our mobile applications provide intuitive navigation and impressive functionality, helping your brand connect effectively with your audience.
        </p>
        <p className="text-sm md:text-[12px] xl:text-[15px]">
          At Virtualseoweb Updates, we combine creativity with technology to help your business thrive, delivering high-quality solutions that set you apart in the digital marketplace.
        </p>
      </div>
    </div>
  );
}

export default Creativity;