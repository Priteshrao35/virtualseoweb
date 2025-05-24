"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Collapse } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import ServicesSliderSection from "../../servicesslider";
import sanitizeHtml from 'sanitize-html';
import { motion } from "framer-motion"
import Image from 'next/image';

const { Panel } = Collapse;

const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export function stripHtmlTags(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const limitWords = (text, limit) => {
  return text.split(" ").slice(0, limit).join(" ");
};

const ServiceDetailsPage = ({ params }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This code will only run in the browser
      setIsMobile(window.innerWidth <= 768);

      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!isMobile && typeof window !== "undefined") {
      const handleScroll = () => {
        const stepElements = stepsRef.current;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        let newActiveStep = activeStep;
        for (let i = 0; i < stepElements.length; i++) {
          const stepElement = stepElements[i];
          const rect = stepElement.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = rect.bottom + window.scrollY;

          if (scrollPosition > elementTop && scrollPosition < elementBottom) {
            newActiveStep = i;
            break;
          }
        }
        if (newActiveStep !== activeStep) {
          setActiveStep(newActiveStep);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [activeStep, isMobile]);

  const { servicesid } = params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    mobile: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("https://virtualseoweb.pythonanywhere.com/menu-items/")
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
        console.error("Error fetching service details:", error);
        setLoading(false);
      });
  }, [servicesid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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
        "https://apis.prwebtechno.com/apis/apis/send_email/",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        setFormStatus(
          "Form Submited successfully! A confirmation message has been sent to your email."
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

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  if (!service) {
    return <div className="text-black">Service not found</div>;
  }

  const fullContent = stripHtmlTags(service.content);
  const limitedContent = limitWords(fullContent, 70);

  return (
    <div className="bg-gray-100 text-black overflow-hidden">

      <Image
        src={service.service_Banner} // Source of the image
        alt="Service Banner" // Add a descriptive alt text
        className="w-full h-full object-cover md:mt-0 mt-10" // Styling classes
        layout="responsive" // Ensures the image is responsive
        width={1820} // Set desired width
        height={1080} // Set desired height
        priority // Loads this image with higher priority
      />


      <div className="md:px-10 px-6 bg-white py-5">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-16">

          {/* Content Section */}
          <motion.div
            className="md:p-6 py-3 md:py-0 px-1 rounded-lg w-full md:w-2/3 md:mt-5 shadow-lg bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{
              scale: 1.03, // Slight scaling on hover
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Add shadow on hover
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1.05, // Slight scale increase when entering the viewport
            }}
            viewport={{ once: false, amount: 0.3 }} // Trigger animation when 30% of the section is visible
          >
            <motion.h2
              className="md:text-lg xl:text-2xl text-xl mt-5 font-semibold md:text-left text-center text-gray-800"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {service.name}
            </motion.h2>

            <motion.p
              className="text-black hidden md:block md:text-sm xl:text-base xl:mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {fullContent}
            </motion.p>

            <motion.p
              className="text-black md:hidden text-sm p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {showFullContent ? fullContent : limitedContent}
            </motion.p>

            {/* Show "Read More" or "Show Less" button on mobile */}
            <div className="block md:hidden mt-3 text-center">
              {!showFullContent ? (
                <motion.button
                  onClick={() => setShowFullContent(true)}
                  className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setShowFullContent(false)}
                  className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show Less
                </motion.button>
              )}
            </div>
          </motion.div>
          {/* Content Section */}



          {/* Form Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 w-full md:w-1/3">
            <h2 className="text-xl md:text-sm xl:text-xl font-semibold mb-3">GET A QUOTE</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Name"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject"
                  className={`mt-1 block w-full px-2 py-1 md:py-[1px] xl:py-1 border ${errors.subject ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.subject && (
                  <p className="text-red-600 text-sm">{errors.subject}</p>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="Mobile"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.mobile ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.mobile && (
                  <p className="text-red-600 text-sm">{errors.mobile}</p>
                )}
              </div>
              <div className="mb-5">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Message"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  style={{ minHeight: "80px" }}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 md:py-[1px] xl:py-1 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
            {formStatus && (
              <p
                className={`mt-4 text-sm ${formStatus.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {formStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Why Hire SEO Agency Section */}
      <div className="md:px-5 px-3 lg:px-[5em] pt-5 bg-white">
        {/* Heading */}
        <motion.h1
          className="text-xl md:text-2xl xl:text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {service.Why_Hire_Agency_Main_Heading}
        </motion.h1>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          initial={{ opacity: 0, x: -50 }} // Start position (left to right)
          whileInView={{ opacity: 1, x: 0 }} // End position (center)
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // Animation triggers only once
        >
          {service.Why_Hire_Agency.map((agency, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50, // Alternate direction for animation
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }} // Stagger animation
            >
              {/* Title */}
              <p className="text-xl md:text-sm xl:text-lg font-bold mb-2 text-gray-800">
                {agency.Why_Hire_Agency_title}
              </p>

              {/* Image */}
              <motion.div
                whileHover={{
                  scale: 1.1, // Slight zoom-in for the image
                  rotate: 5, // Adds a small playful tilt
                }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Image
                  src={agency.Why_Hire_Agency_image_icon}
                  alt="Why Hire Agency Icon"
                  className="w-full h-auto object-cover rounded-lg"
                  width={200} // Specify the width
                  height={200} // Specify the height
                  layout="intrinsic" // Ensures image keeps its original dimensions
                />
              </motion.div>

              {/* Content */}
              <p className="text-sm md:text-[12px] xl:text-sm text-gray-600">{agency.Why_Hire_Agency_description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* End of Why Hire SEO Agency Section */}



      {/* Why Do You Need A SEO Agency */}
      <div className="md:px-5 px-3 lg:px-[5em] py-4 bg-white">
        {/* Animated Heading */}
        <motion.h1
          className="text-xl md:text-2xl xl:text-2xl font-bold text-center md:p-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {service.why_need_agency_heading}
        </motion.h1>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Content: Animated Fade-in */}
          <motion.div
            className="flex-1 flex flex-col px-2 md:px-4 order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-gray-700 text-lg md:text-[12px] xl:text-lg"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.why_need_agency_description) }}
            />
          </motion.div>

          {/* Image: Animated Fade-in */}
          <motion.div
            className="flex justify-center md:justify-end flex-1 order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={service.why_need_agency_image}
              alt="Why You Need an Agency"
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              width={700} // Increased width
              height={100} // Decreased height
              objectFit="cover" // Ensures the image scales proportionally without distortion
            />
          </motion.div>

        </div>
      </div>
      {/* End of Why Do You Need A SEO Agency */}



      {/* Services_Better_Than_Others */}
      <div className="px-3 md:px-5 lg:px-[5em] py-8 bg-white">
        <motion.h1
          className="text-xl md:text-2xl lg:text-2xl font-bold text-center mb-8 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} // Animation when the heading is in view
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is visible
        >
          {service.Services_Better_Than_Others_heading}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }} // Animation for image when in view
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is visible
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src={service.Services_Better_Than_Others_image}
              alt={service.Services_Better_Than_Others_heading}
              width={300} // Adjust as necessary for your layout
              height={100} // Adjust as necessary for your layout
              className="w-full h-auto max-w-xs md:max-w-full rounded-lg"
            />
          </motion.div>

          <motion.div
            className="flex flex-col px-2 md:px-4 md:text-sm xl:text-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }} // Animation for text when in view
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is visible
          >
            <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.Services_Better_Than_Others_description) }} />
          </motion.div>
        </div>
      </div>
      {/* End of Services_Better_Than_Others */}


      {/* Why Choose Us Section */}
      <div className="px-3 md:px-5 lg:px-[5em] bg-white">
        <motion.h1
          className="text-xl md:text-2xl lg:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} // Animation when the heading is in view
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is visible
        >
          {service.why_choose_us_heading}
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Mobile view: Content last, then Image */}
          <motion.div
            className="flex-1 flex flex-col px-2 md:px-4 order-3 md:order-2 md:mt-5 text-xl md:text-sm lg:text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }} // Animation for text when in view
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is visible
          >
            <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.why_choose_us_description) }} />
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-start flex-1 order-2 md:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }} // Animation for image when in view
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is visible
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src={service.why_choose_us_image}
              alt={service.why_choose_us_heading}
              width={500} // Adjust as necessary for your layout
              height={300} // Adjust as necessary for your layout
              className="w-full h-auto max-w-xs md:max-w-full rounded-lg"
            />
          </motion.div>
        </div>
      </div>
      {/* End of Why Choose Us Section */}

      {/* How We Work With You Every Step of The Way! */}
      <div className="px-3 md:px-10 lg:px-[6em] py-10 bg-gradient-to-b from-white to-gray-100">
        <motion.h1
          className="text-2xl md:text-2xl xl:text-3xl font-extrabold text-center mb-10 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-snug drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {service.How_We_Work_Step_Heading}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Left Column - Steps */}
          <motion.ul
            className="space-y-6 mx-auto w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {service.How_We_Work_Step.map((step, index) => (
              <motion.li
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                onClick={() => setActiveStep(index)}
                className={`flex items-center cursor-pointer font-semibold text-base md:text-[18px] xl:text-xl px-5 py-3 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg 
          ${activeStep === index
                    ? "text-orange-600 bg-gray-100 shadow-md"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Arrow Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mr-3 text-orange-500"
                >
                  <path d="M13.293 5.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L17.586 11 13.293 6.707a1 1 0 010-1.414z" />
                  <path d="M6.293 5.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L10.586 11 6.293 6.707a1 1 0 010-1.414z" />
                </svg>
                {step.How_We_Work_Step_Title}
              </motion.li>
            ))}
          </motion.ul>

          {/* Right Column - Step Details */}
          <motion.div
            className="flex flex-col items-center md:p-6 rounded-xl bg-white shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
          >
            {service.How_We_Work_Step[activeStep] && (
              <div className="flex flex-col items-center text-gray-800">
                <motion.div
                  className="w-20 h-28 md:w-28 md:h-28 object-cover mb-6 rounded-full shadow-lg bg-gradient-to-tr from-orange-100 to-white p-2"
                  whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={service.How_We_Work_Step[activeStep].How_We_Work_Step_image_icon}
                    alt={service.How_We_Work_Step[activeStep].How_We_Work_Step_Title}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                </motion.div>
                <h3 className="text-center font-bold text-2xl md:text-xl xl:text-xl mb-3">
                  {service.How_We_Work_Step[activeStep].How_We_Work_Step_Title}
                </h3>
                <p className="text-center text-gray-600 text-sm md:text-[12px] xl:text-xl leading-relaxed px-4">
                  {service.How_We_Work_Step[activeStep].How_We_Work_Step_short_description}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* End of How We Work With You Every Step of The Way! */}

      <ServicesSliderSection />

      {/* Industries We’ve Delivered Results In */}
      <div className="px-4 md:px-8 lg:px-[5em] py-8 bg-white">
        <motion.h1
          className="text-2xl md:text-2xl lg:text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {service.Industries_We_Delivered_Results_Heading}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-10 md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {service.Industries_We_Delivered_Results.map((serviceItem, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-4 md:p-2 rounded-lg bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-yellow-500 hover:via-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.1, // Stagger the animation for each item
                duration: 0.6,
                ease: "easeInOut",
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-center font-bold text-white">
                {serviceItem.Industries_We_Delivered_Results_name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* End of Industries We’ve Delivered Results In */}


      {/* FAQ */}
      <div className="md:px-5 md:lg:px-[5em] bg-white">
        <h1 className="text-2xl md:text-2xl xl:text-2xl md:pt-10 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col md:flex-row gap-6 md:mt-10">
          {/* FAQ Section */}
          <div className="md:p-6 flex-1 md:min-h-[300px]">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Collapse
                bordered={false}
                defaultActiveKey={["0"]}
                expandIcon={({ isActive }) => (
                  <CaretDownOutlined
                    className={`${isActive ? "rotate-180" : "rotate-0"}`}
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "12px",
                      color: "black",
                      zIndex: "-1"
                    }}
                  />
                )}
                expandIconPosition="right"
                className="bg-transparent"
              >
                {service.FAQ.map((serviceItem, index) => (
                  <Panel
                    header={
                      <motion.div
                        className="relative flex items-center justify-between w-full bg-blue-200 p-2 rounded-md hover:bg-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1, ease: "easeInOut" }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-black">
                          {serviceItem.FAQ_heading}
                        </span>
                        <CaretDownOutlined
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black opacity-50 text-2xl"
                        />
                      </motion.div>
                    }
                    key={index.toString()}
                    className="bg-transparent"
                  >
                    <p className="px-4 md:px-6 py-4 text-black">
                      {serviceItem.FAQ_content}
                    </p>
                  </Panel>
                ))}
              </Collapse>
            </motion.div>
          </div>

          {/* Consultation Form */}
          <div className="w-full md:w-[300px] lg:w-[400px] h-[400px] px-5 md:px-0">
            <h2 className="text-lg md:text-xl font-semibold">
              Send your Query
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Name"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Subject"
                  className={`mt-1 block w-full px-2 py-1 md:py-[1px] xl:py-1 border ${errors.subject ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.subject && (
                  <p className="text-red-600 text-sm">{errors.subject}</p>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="Mobile"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.mobile ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {errors.mobile && (
                  <p className="text-red-600 text-sm">{errors.mobile}</p>
                )}
              </div>
              <div className="mb-5">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Message"
                  className={`mt-1 block w-full px-2 py-2 md:py-[1px] xl:py-1 border ${errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  style={{ minHeight: "80px" }}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 md:py-[1px] xl:py-1 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
            {formStatus && (
              <p
                className={`mt-4 text-sm ${formStatus.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {formStatus}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* End of FAQ */}

    </div>
  );
};

export default ServiceDetailsPage;