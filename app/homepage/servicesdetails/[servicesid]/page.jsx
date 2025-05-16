import React from 'react';
import ServiceDetailsPage from './servicedetails';

export async function generateMetadata({ params }) {
  const servicesid = params.servicesid;

  try {
    const response = await fetch(`https://virtualseoweb.pythonanywhere.com/menu-items/`);
    const services = await response.json();

    const service = services.find(
      (item) => createSlug(item.name) === servicesid
    );

    if (service) {
      return {
        title: service.name || "Service Details - Virtualseoweb", // Main SEO title
        description: service.service_sort_description || service.content || "Learn more about our services.", // Meta description
        keywords: service.keywords || "web development, SEO, digital marketing, Virtualseoweb", // Optional: Keywords
        openGraph: {
          title: service.name || "Service Details - Virtualseoweb", // OG title
          description: service.service_sort_description || service.content || "Learn more about our services.", // OG description
          images: service.image_url ? [{ url: service.image_url, alt: service.name }] : [], // OG image with alt text
          type: 'website',
          url: `https://virtualseoweb.com/homepage/servicesdetails/${servicesid}`, // Canonical URL for the service page
        },
        twitter: {
          card: 'summary_large_image', // Twitter card type
          title: service.name || "Service Details - Virtualseoweb", // Twitter title
          description: service.service_sort_description || service.content || "Learn more about our services.", // Twitter description
          images: service.image_url ? [service.image_url] : [], // Twitter image
        },
        robots: 'index, follow', // Allow indexing and following links
        canonical: `https://virtualseoweb.com/homepage/servicesdetails/${servicesid}`, // Canonical URL
      };
    } else {
      // Fallback metadata for when the service is not found
      return {
        title: "Service not found",
        description: "The service you are looking for is unavailable.",
        openGraph: {
          title: "Service not found",
          description: "The service you are looking for is unavailable.",
          images: [],
          type: 'website',
          url: `https://virtualseoweb.com/homepage/servicesdetails/${servicesid}`,
        },
        twitter: {
          card: 'summary',
          title: "Service not found",
          description: "The service you are looking for is unavailable.",
        },
        robots: 'noindex, nofollow', // Prevent indexing for not-found pages
        canonical: `https://virtualseoweb.com/homepage/servicesdetails/${servicesid}`,
      };
    }
  } catch (error) {
    console.error("Error fetching services data:", error);

    // Fallback metadata for errors
    return {
      title: "Error loading service details",
      description: "Unable to load service details due to an error.",
      openGraph: {
        title: "Error loading service details",
        description: "Unable to load service details due to an error.",
        images: [],
        type: 'website',
        url: `https://virtualseoweb.com/homepage/servicesdetails/${servicesid}`,
      },
      twitter: {
        card: 'summary',
        title: "Error loading service details",
        description: "Unable to load service details due to an error.",
      },
      robots: 'noindex, nofollow',
      canonical: `https://virtualseoweb.com/homepage/servicesdetails/${servicesid}`,
    };
  }
}

const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '');
};

const Page = ({ params }) => {
  return <ServiceDetailsPage params={params} />;
};

export default Page;