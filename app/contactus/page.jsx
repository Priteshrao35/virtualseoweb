// components/ContactForm.js

"use client";

import { useState } from "react";
import axios from "axios";
import Header from "../homepage/header";
import Navbar from "../homepage/navbar";
import CentralBanner from "../homepage/centralbanner";
import FooterSection from "../homepage/footer";

const cardData = [
  // Your cardData remains unchanged
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    mobile: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://virtualseoweb.pythonanywhere.com/send-email",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        setFormStatus(
          "Email sent successfully! A confirmation message has been sent to your email."
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          mobile: "",
          message: ""
        });
        setErrors({});
      }
    } catch (error) {
      setFormStatus("Failed to send email.");
      console.error("Error sending form details:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <hr />
      <Navbar />
      <CentralBanner />

      {/* Top 3 Cards Section */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4 text-black">
                {card.title}
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {card.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Form and Company Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Form Section */}
          <div className="bg-white p-4 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-black">Contact Us</h1>
            <p className="mb-4 text-black">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`p-2 border border-gray-300 rounded text-black ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`p-2 border border-gray-300 rounded text-black ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={`p-2 border border-gray-300 rounded text-black ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className={`p-2 border border-gray-300 rounded text-black ${
                    errors.mobile ? "border-red-500" : ""
                  }`}
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className={`p-2 border border-gray-300 rounded text-black w-full ${
                  errors.message ? "border-red-500" : ""
                }`}
                rows="4"
              />
              {formStatus && (
                <p
                  className={`text-center ${
                    formStatus.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formStatus}
                </p>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
          {/* Company Information Section */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4 text-black">
              Company Information:
            </h2>
            <p className="text-black">Themesberg LLC</p>
            <p className="text-black">Tax id: USXXXXXX</p>
            <h3 className="text-lg font-bold mt-4 text-black">Address:</h3>
            <p className="text-black">
              SILVER LAKE, United States 1941 Late Avenue
            </p>
            <p className="text-black">Zip Code/Postal code: 03875</p>
            <h3 className="text-lg font-bold mt-4 text-black">Call us:</h3>
            <p className="text-black">
              Call us to speak to a member of our team. We are always happy to
              help.
            </p>
            <p className="text-black">+1 (646) 786-5060</p>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default ContactForm;
