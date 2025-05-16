/** @type {import('next-sitemap').IConfig} */
const axios = require("axios");

const config = {
  siteUrl: "https://virtualseoweb.com", 
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [],
  changefreq: "daily",
  priority: 0.7,

  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: path === "/" ? 1.0 : 0.7,
    };
  },

  additionalPaths: async (config) => {
    const dynamicPaths = [];

    try {
      // Fetch blogs
      const blogsResponse = await axios.get("https://virtualseoweb.pythonanywhere.com/blogs/");
      const blogs = blogsResponse.data;

      blogs.forEach((blog) => {
        dynamicPaths.push({
          loc: `/blogs/blogdetails/${blog.id}?Blog_Name=${blog.Blog_Name.replace(/ /g, "_")}`,
          lastmod: blog.Uploaded_Date || new Date().toISOString(),
          changefreq: "daily",
          priority: 0.8,
        });
      });


      // Fetch services
      const servicesResponse = await axios.get("https://virtualseoweb.pythonanywhere.com/menu-items/");
      const services = servicesResponse.data;

      services.forEach((service) => {
        dynamicPaths.push({
          loc: `/homepage/servicesdetails/${service.name.toLowerCase().replace(/ /g, "-")}`,
          lastmod: new Date().toISOString(),
          changefreq: "daily",
          priority: 0.8,
        });
      });
    } catch (error) {
      console.error("Error fetching dynamic routes for sitemap:", error);
    }

    return dynamicPaths;
  },
};

module.exports = config;