import React from 'react';
import BlogDetails from '../blogdetails';

export async function generateMetadata({ params }) {
  const blogId = params.id;

  try {
    const response = await fetch(`https://virtualseoweb.pythonanywhere.com/blogs/`);
    const blogs = await response.json();

    const blog = blogs.find((item) => item.id.toString() === blogId);

    if (blog) {
      return {
        title: blog.Blog_Name || "Blog - PRWebTechno",
        description: blog.Sort_description || blog.full_description.slice(0, 160) || "Read the latest insights on our blog.",
        keywords: blog.keywords || "web development, SEO, digital marketing, PRWebTechno, blogs",
        openGraph: {
          title: blog.Blog_Name || "Blog - PRWebTechno",
          description: blog.Sort_description || blog.full_description.slice(0, 160) || "Read the latest insights on our blog.",
          images: blog.Blog_Image ? [{ url: blog.Blog_Image, alt: blog.Blog_Name }] : [],
          type: 'article',
          url: `https://prwebtechno.com/blog/${blogId}`,
          article: {
            published_time: blog.published_at || null,
            author: blog.author || "PRWebTechno",
            tags: blog.tags || [],
          },
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.Blog_Name || "Blog - PRWebTechno",
          description: blog.Sort_description || blog.full_description.slice(0, 160) || "Read the latest insights on our blog.",
          images: blog.Blog_Image ? [blog.Blog_Image] : [],
        },
        robots: 'index, follow',
        canonical: `https://prwebtechno.com/blog/${blogId}`,
      };
    } else {
      return {
        title: "Blog not found",
        description: "The blog post you are looking for is unavailable.",
        openGraph: {
          title: "Blog not found",
          description: "The blog post you are looking for is unavailable.",
          images: [],
          type: 'article',
          url: `https://prwebtechno.com/blog/${blogId}`,
        },
        twitter: {
          card: 'summary',
          title: "Blog not found",
          description: "The blog post you are looking for is unavailable.",
        },
        robots: 'noindex, nofollow',
        canonical: `https://prwebtechno.com/blog/${blogId}`,
      };
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);

    return {
      title: "Error loading blog",
      description: "Unable to load the blog due to an error.",
      openGraph: {
        title: "Error loading blog",
        description: "Unable to load the blog due to an error.",
        images: [],
        type: 'article',
        url: `https://prwebtechno.com/blog/${blogId}`,
      },
      twitter: {
        card: 'summary',
        title: "Error loading blog",
        description: "Unable to load the blog due to an error.",
      },
      robots: 'noindex, nofollow',
      canonical: `https://prwebtechno.com/blog/${blogId}`,
    };
  }
}

const Page = ({ params }) => {
  return <BlogDetails params={params} />;
};

export default Page;