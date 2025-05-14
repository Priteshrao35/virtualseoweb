'use client';
import React, { useState } from 'react';

function FreeSEOAuditPage() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://apis.prwebtechno.com/apis/apis/send_email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Free SEO Audit Report',
          email: email,
          url: url,
          phone: phone,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setMessage('Your Form Submitted successfully!');
        // Clear form fields
        setUrl('');
        setEmail('');
        setPhone('');

        // Hide message after 3 seconds
        setTimeout(() => {
          setMessage('');
        }, 5000);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 text-black overflow-hidden bg-slate-100">
      <h1 className="text-2xl md:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6">Avail Free SEO Audit Report</h1>
      <p className="text-base sm:text-lg md:text-sm xl:text-xl mb-4">Get a free SEO report of your website in just a few minutes!</p>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col sm:flex-row flex-wrap justify-between">
        <div className="mb-4 w-full sm:w-1/3 sm:pr-2">
          <label htmlFor="website-url" className="block text-sm font-medium mb-2">
            Website URL
          </label>
          <input
            type="url"
            id="website-url"
            placeholder="https://virtualseoweb.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{ fontSize: '16px' }}
            className="border border-gray-300 rounded-lg w-full md:py-1 xl:py-1 p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 w-full sm:w-1/3 sm:px-2">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="virtualseoweb@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ fontSize: '16px' }}
            className="border border-gray-300 rounded-lg w-full md:py-1 xl:py-1 p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mb-4 w-full sm:w-1/3 sm:pl-2">
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+91 917xxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ fontSize: '16px' }}
            className="border border-gray-300 rounded-lg w-full md:py-1 xl:py-1 p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 md:py-1 xl:py-2 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
        >
          Get My Free SEO Report
        </button>
      </form>
      {message && <p className="text-green-700 mb-4 font-bold text-xl mt-3">{message}</p>}
    </div>
  );
}

export default FreeSEOAuditPage;