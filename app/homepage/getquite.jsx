"use client";
import { useState } from "react";
import axios from "axios";

const cardData = [
  // Your cardData remains unchanged
];

const GetQuite = () => {
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
    <div className="bg-gradient-to-t from-pink-100 to-blue-100 text-black overflow-hidden">
      <p className=" text-2xl md:text-5xl font-bold text-center mt-10 md:mt-32 p-2">
        We are here to help you with any questions or concerns you may have.
      </p>
      <p className="text-sm text-black px-2 md:px-[25em] text-center mt-5 md:mt-10">
        We are ready to turn your vision into reality! At virtualseoweb, we are
        passionate about delivering creative and effective solutions tailored to
        your needs. Whether you're looking to boost your online presence,
        enhance your website, or need expert advice to grow your business, we're
        here to help. Our team of dedicated professionals brings years of
        expertise in web development, design, and digital marketing
      </p>
      {/* Top Cards Section */}
      <div className="p-5 md:pb-20 rounded-xl md:px-[25em]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Company Information Section */}
          <div className=" md:p-6 col-span-1 md:mt-[3em]">
            <h2 className="md:text-4xl text-2xl font-semibold mb-4">
              Points of contact
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Uttar Pradesh, India VIRTUALSEOWEB
            </h2>

            <p>
              Building 17 A 2rd Floor 7C Shri Ram Apartment, Sector 118, Noida,
              Uttar Pradesh 201306
            </p>

            <h3 className="text-lg font-semibold mt-4">Information & Sales</h3>
            <p>info@virtualseoweb.com</p>
            <h3 className="text-lg font-semibold mt-4">Support</h3>
            <p>info@virtualseoweb.com</p>

            <h3 className="text-lg font-semibold mt-4">Our Other Office</h3>
            <h3 className="text-lg font-semibold mt-4">
              Mirzapur, Uttar Pradesh, India
            </h3>
            <p>Mirzapur, Uttar Pradesh, India</p>
          </div>

          {/* Contact Form Section */}
          <div className="md:p-6 col-span-2">
            <p className="mb-4 text-xl">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`p-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={`p-2 border ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
              />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile"
                className={`p-2 border ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className={`p-2 border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
                rows="4"
              />
              {formStatus && (
                <p
                  className={`text-center mt-4 ${
                    formStatus.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formStatus}
                </p>
              )}
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-60"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuite;
