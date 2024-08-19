'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../navbar';
import Header from '../../header';
import OurTeam from '../../ourteam';
import FooterSection from '../../footer';

// Function to create a slug from a name
const createSlug = (name) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const ServiceDetailsPage = ({ params }) => {
  const { servicesid } = params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://virtualseoweb.pythonanywhere.com/menu-items/')
      .then((response) => {
        const data = response.data;
        const service = data.find(
          (item) => createSlug(item.name) === servicesid
        );
        if (service) {
          setService(service);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching service details:', error);
        setLoading(false);
      });
  }, [servicesid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <hr />
      <Navbar />

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
          {/* Content Section */}
          <div className="p-6 rounded-lg max-w-full">
            <h2 className="text-2xl font-semibold mb-4 text-black">
              {service.name}
            </h2>
            <p className="text-black">{service.Content}</p>
          </div>

          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[25em] transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Get a Free Consultation
            </h2>
            <form action="/submit" method="post">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default ServiceDetailsPage;
