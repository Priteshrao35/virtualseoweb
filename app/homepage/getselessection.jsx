import React from 'react';

function GetSalesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center p-4 md:px-[10em] md:p-20 text-black">
      {/* Image will show on top for mobile screens */}
      <div className="image-content order-1 md:order-2">
        <img 
          src="/seo-graphic.png" 
          alt="SEO Services" 
          className="w-3/4 md:w-2/3 mx-auto h-auto" 
        />
      </div>
      
      <div className="text-content md:pr-2 order-2 md:order-1">
        <h2 className="text-xl xl:text-[18px] md:text-[15px] font-bold mb-3 md:mt-0 mt-7">DOMINATE SEARCH RESULTS, GET SALES</h2>
        <h3 className="text-lg xl:text-[18px] md:text-[15px] font-semibold mb-3">Virtualseoweb Updates: Your Global SEO Experts</h3>
        <p className="text-sm xl:text-[14px] md:text-[11px] mb-3">
          At Virtualseoweb Updates, we specialize in helping businesses thrive through effective SEO strategies. With over 7 years of experience, we provide tailored solutions to boost your website's ranking and visibility.
        </p>
        <p className="text-sm xl:text-[14px] md:text-[11px] mb-3">
          Did you know that 70% of users click on organic search results? Our team optimizes your website to be SEO-friendly, creating high-quality content that attracts and engages users.
        </p>
        <p className="text-sm xl:text-[14px] md:text-[11px] mb-3">
          SEO is not just about keywords; it’s about building a strong online presence. We develop strategies that include on-page SEO, off-page SEO, and technical SEO, ensuring your site is optimized for both users and search engines.
        </p>
        <p className="text-sm xl:text-[14px] md:text-[11px] mb-3">
          Let us help your business grow with customizable SEO packages. From keyword research to performance tracking, we’ve got you covered.
        </p>
      </div>
    </div>
  );
}

export default GetSalesSection;