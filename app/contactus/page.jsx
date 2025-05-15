"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Header from "../homepage/header";
import Navbar from "../homepage/navbar";
import FooterSection from "../homepage/footer";
import ServicesSliderSection from "../homepage/servicesslider";

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
    <div className="bg-gray-100 text-black">
      <Header />
      <hr />
      <Navbar />

      <div className="relative w-full md:mt-0 mt-14">
        <Image
          src="/contactbanner.png"
          layout="responsive"
          width={1920}
          height={1080}
          alt="Picture of the author"
          className="object-cover h-64 sm:h-96 md:h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-xl sm:text-5xl md:text-[5em] font-bold md:mb-4">
            Contact Us
          </h1>
          <p className="text-sm sm:text-xl md:text-2xl font-bold">
            We are here to help you with any questions or concerns you may have.
          </p>
        </div>
      </div>


      {/* Top Cards Section */}
      <div className="p-5 bg-blue-50 rounded-xl md:px-[15em] px-5">
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

        <div className="md:p-5 text-center">
          <p className="text-black text-2xl md:text-3xl font-bold ">
            We're Here to Help You 24/7!
          </p>
          <p className="text-black text-lg md:text-xl md:m-5 ">
            Get in touch with our expert team for swift support and personalized
            solutions tailored to your needs.
          </p>
        </div>

        {/* Contact Form and Company Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Company Information Section */}
          <div className="md:p-6  mt-5 text-center md:text-left col-span-1  md:mt-[3em]">
            <h2 className="text-2xl md:text-4xl font-semibold mb-4">
              Points of Contact
            </h2>
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Uttar Pradesh, India VIRTUALSEOWEB
            </h2>

            <p>
              Building 17 A 2rd Floor 7C Shri Ram Apartment, Sector 118, Noida,
              Uttar Pradesh 201306
            </p>

            <h3 className="text-md md:text-lg font-semibold mt-4">
              Information & Sales
            </h3>
            <p>info@virtualseoweb.com</p>
            <h3 className="text-md md:text-lg font-semibold mt-4">Support</h3>
            <p>info@virtualseoweb.com</p>

            <h3 className="text-md md:text-lg font-semibold mt-4">
              Our Other Office
            </h3>
            <h3 className="text-md md:text-lg font-semibold mt-4">
              Mirzapur, Uttar Pradesh, India
            </h3>
            <p>Mirzapur, Uttar Pradesh, India</p>
          </div>

          {/* Contact Form Section */}
          <div className="md:p-6 p-2 mt-5 md:mt-0 col-span-2">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Contact Us
            </h2>
            <p className="mb-4">
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
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 w-full md:w-60"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <hr className="mt-5 font-bold" />

        <div className="mt-5 md:mt-20">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              GOT A QUESTION? TALK WITH US DIRECT
            </h2>
            <a
              href="tel:+919450977593"
              className="text-black font-bold text-xl md:text-3xl mb-2"
            >
              <span className="text-yellow-600">Call:</span> +91 9450977593
            </a>
            <a
              href="mailto:info@virtualseoweb.com"
              className="text-white py-1 px-3 rounded-lg text-lg md:text-xl font-bold bg-blue-500"
            >
              info@virtualseoweb.com
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {/* Sales Inquiry */}
            <div className="md:p-4 bg-gray-100 rounded-lg flex flex-col items-center">
              <img
                src="/sales-inquiry-icon.png"
                alt="Sales Inquiry"
                className="w-24 h-24 md:w-40 md:h-40 object-contain rounded-md mb-4"
              />
              <h3 className="text-md md:text-lg font-semibold mb-2 text-center">
                Sales Inquiry
              </h3>
              <p className="mb-2 text-center text-sm md:text-base">
                Email:{" "}
                <a
                  href="mailto:sales@mediasearchgroup.com"
                  className="text-blue-500"
                >
                  info@virtualseoweb.com
                </a>
              </p>
              <p className="text-center text-sm md:text-base">
                Phone No:{" "}
                <a href="tel:+91 9450977593" className="text-blue-500">
                  +91 9450977593
                </a>
              </p>
            </div>

            {/* Customer Support */}
            <div className="md:p-4 bg-gray-100 rounded-lg flex flex-col items-center">
              <img
                src="/customer-support-icon.png"
                alt="Customer Support"
                className="w-24 h-24 md:w-40 md:h-40 object-contain rounded-md mb-4"
              />
              <h3 className="text-md md:text-lg font-semibold mb-2 text-center">
                Customer Support
              </h3>
              <p className="mb-2 text-center text-sm md:text-base">
                Email:{" "}
                <a
                  href="mailto:supports@mediasearchgroup.com"
                  className="text-blue-500"
                >
                  info@virtualseoweb.com
                </a>
              </p>
              <p className="text-center text-sm md:text-base">
                Phone No:{" "}
                <a href="tel:+91 9450977593" className="text-blue-500">
                  +91 9450977593
                </a>
              </p>
            </div>

            {/* Career */}
            <div className="md:p-4 bg-gray-100 rounded-lg flex flex-col items-center">
              <img
                src="/career-icon.png"
                alt="Career"
                className="w-24 h-24 md:w-40 md:h-40 object-contain rounded-md mb-4"
              />
              <h3 className="text-md md:text-lg font-semibold mb-2 text-center">
                Career
              </h3>
              <p className="mb-2 text-center text-sm md:text-base">
                Email:{" "}
                <a
                  href="mailto:career@mediasearchgroup.com"
                  className="text-blue-500"
                >
                  info@virtualseoweb.com
                </a>
              </p>
              <p className="text-center text-sm md:text-base">
                Phone No:{" "}
                <a href="tel:+91 9450977593" className="text-blue-500">
                  +91 9450977593
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:px-28 bg-slate-200">
        <ServicesSliderSection />
      </div>

      <FooterSection />
    </div>
  );
};

export default ContactForm;
