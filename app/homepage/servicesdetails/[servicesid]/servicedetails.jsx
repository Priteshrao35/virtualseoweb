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
    ?.toLowerCase()
    ?.replace(/ /g, "-")
    ?.replace(/[^\w-]+/g, "") || "";
};

export function stripHtmlTags(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const limitWords = (text, limit) => {
  if (!text) return "";
  return text.split(" ").slice(0, limit).join(" ");
};

const ServiceDetailsPage = ({ params }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const stepsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
          if (!stepElement) continue;
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
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://virtualseoweb.pythonanywhere.com/menu-items/"
        );
        const data = response.data;
        const matchedService = data.find(
          (item) => createSlug(item?.name) === servicesid
        );
        if (matchedService) {
          setService(matchedService);
          setFormData((prev) => ({ ...prev, servicename: matchedService?.name || "" }));
        } else {
          setService({});
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setService({});
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
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
          "Form Submitted successfully! A confirmation message has been sent to your email."
        );
        setFormData({
          name: "",
          email: "",
          subject: "",
          mobile: "",
          message: ""
        });
        setErrors({});
        setTimeout(() => {
          setFormStatus("");
        }, 5000);
      }
    } catch (error) {
      setFormStatus("Failed to send email.");
      console.error("Error sending form details:", error);
    }
  };

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  if (!service || Object.keys(service).length === 0) {
    return <div className="text-black">Service not found</div>;
  }

  const fullContent = stripHtmlTags(service?.content || "");
  const limitedContent = limitWords(fullContent, 70);

  return (
    <div className="bg-gray-100 text-black overflow-hidden">
      {/* Banner Image with fallback */}
      {service?.service_Banner ? (
        <Image
          src={service.service_Banner}
          alt="Service Banner"
          className="w-full h-full object-cover md:mt-0 mt-10"
          width={1820}
          height={1080}
          priority
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span>No banner image available</span>
        </div>
      )}

      <div className="md:px-10 px-6 bg-white py-5">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-16">
          {/* Content Section */}
          <motion.div
            className="md:p-6 py-3 md:py-0 px-1 rounded-lg w-full md:w-2/3 md:mt-5 shadow-lg bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <motion.h2
              className="md:text-lg xl:text-2xl text-xl mt-5 font-semibold md:text-left text-center text-gray-800"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {service?.name || "Service Name"}
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

            {fullContent.length > limitedContent.length && (
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
            )}
          </motion.div>

          {/* Form Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 w-full md:w-1/3">
            <h2 className="text-xl md:text-sm xl:text-xl font-semibold mb-3">GET A QUOTE</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="servicename" value={formData.servicename} />

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
      {service?.Why_Hire_Agency_Main_Heading && (
        <div className="md:px-5 px-3 lg:px-[5em] pt-5 bg-white">
          <motion.h1
            className="text-xl md:text-2xl xl:text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {service.Why_Hire_Agency_Main_Heading}
          </motion.h1>

          {service?.Why_Hire_Agency?.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {service.Why_Hire_Agency.map((agency, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                >
                  <p className="text-xl md:text-sm xl:text-lg font-bold mb-2 text-gray-800">
                    {agency?.Why_Hire_Agency_title || "Title"}
                  </p>

                  {agency?.Why_Hire_Agency_image_icon ? (
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <Image
                        src={agency.Why_Hire_Agency_image_icon}
                        alt="Why Hire Agency Icon"
                        width={200}
                        height={200}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </motion.div>
                  ) : (
                    <div className="mb-4 w-20 h-20 bg-gray-200 rounded-lg"></div>
                  )}

                  <p className="text-sm md:text-[12px] xl:text-sm text-gray-600">
                    {agency?.Why_Hire_Agency_description || "Description"}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Why Do You Need A SEO Agency */}
      {service?.why_need_agency_heading && (
        <div className="md:px-5 px-3 lg:px-[5em] py-4 bg-white">
          <motion.h1
            className="text-xl md:text-2xl xl:text-2xl font-bold text-center md:p-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {service.why_need_agency_heading}
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              className="flex-1 flex flex-col px-2 md:px-4 order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p
                className="text-gray-700 text-lg md:text-[12px] xl:text-[14px]"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(service?.why_need_agency_description || "") }}
              />
            </motion.div>

            {service?.why_need_agency_image ? (
              <motion.div
                className="flex justify-center md:justify-end flex-1 order-1 md:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src={service.why_need_agency_image}
                  alt="Why You Need an Agency"
                  width={700}
                  height={100}
                  className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </motion.div>
            ) : (
              <div className="flex-1 order-1 md:order-2 bg-gray-200 flex items-center justify-center">
                <span>No image available</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Services_Better_Than_Others */}
      {service?.Services_Better_Than_Others_heading && (
        <div className="px-3 md:px-5 lg:px-[5em] py-8 bg-white">
          <motion.h1
            className="text-xl md:text-2xl lg:text-2xl font-bold text-center mb-8 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {service.Services_Better_Than_Others_heading}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service?.Services_Better_Than_Others_image ? (
              <motion.div
                className="flex justify-center md:justify-start"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={service.Services_Better_Than_Others_image}
                  alt={service.Services_Better_Than_Others_heading}
                  width={300}
                  height={100}
                  className="w-full h-auto max-w-xs md:max-w-full rounded-lg"
                />
              </motion.div>
            ) : (
              <div className="flex justify-center md:justify-start bg-gray-200 items-center">
                <span>No image available</span>
              </div>
            )}

            <motion.div
              className="flex flex-col px-2 md:px-4 md:text-sm xl:text-base"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(service?.Services_Better_Than_Others_description || "") }} />
            </motion.div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      {service?.why_choose_us_heading && (
        <div className="px-3 md:px-5 lg:px-[5em] bg-white">
          <motion.h1
            className="text-xl md:text-2xl lg:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {service.why_choose_us_heading}
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              className="flex-1 flex flex-col px-2 md:px-4 order-3 md:order-2 md:mt-5 text-xl md:text-sm lg:text-base"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(service?.why_choose_us_description || "") }} />
            </motion.div>

            {service?.why_choose_us_image ? (
              <motion.div
                className="flex justify-center md:justify-start flex-1 order-2 md:order-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={service.why_choose_us_image}
                  alt={service.why_choose_us_heading}
                  width={500}
                  height={300}
                  className="w-full h-auto max-w-xs md:max-w-full rounded-lg"
                />
              </motion.div>
            ) : (
              <div className="flex-1 order-2 md:order-1 bg-gray-200 flex items-center justify-center">
                <span>No image available</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* How We Work With You Every Step of The Way! */}
      {service?.How_We_Work_Step_Heading && service?.How_We_Work_Step?.length > 0 && (
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mr-3 text-orange-500"
                  >
                    <path d="M13.293 5.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L17.586 11 13.293 6.707a1 1 0 010-1.414z" />
                    <path d="M6.293 5.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L10.586 11 6.293 6.707a1 1 0 010-1.414z" />
                  </svg>
                  {step?.How_We_Work_Step_Title || "Step Title"}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="flex flex-col items-center md:p-6 rounded-xl bg-white shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
            >
              {service.How_We_Work_Step[activeStep] && (
                <div className="flex flex-col items-center text-gray-800">
                  {service.How_We_Work_Step[activeStep]?.How_We_Work_Step_image_icon ? (
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
                  ) : (
                    <div className="w-20 h-28 md:w-28 md:h-28 mb-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <span>No icon</span>
                    </div>
                  )}
                  <h3 className="text-center font-bold text-2xl md:text-xl xl:text-xl mb-3">
                    {service.How_We_Work_Step[activeStep]?.How_We_Work_Step_Title || "Step Title"}
                  </h3>
                  <p className="text-center text-gray-600 text-sm md:text-[12px] xl:text-base leading-relaxed px-4">
                    {service.How_We_Work_Step[activeStep]?.How_We_Work_Step_short_description || "Step description"}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      <ServicesSliderSection />

      {/* Industries We've Delivered Results In */}
      {service?.Industries_We_Delivered_Results_Heading && service?.Industries_We_Delivered_Results?.length > 0 && (
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
                  delay: 0.3 + index * 0.1,
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-center font-bold text-white">
                  {serviceItem?.Industries_We_Delivered_Results_name || "Industry"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* FAQ */}
      {service?.FAQ?.length > 0 && (
        <div className="md:px-5 md:lg:px-[5em] bg-white">
          <h1 className="text-2xl md:text-2xl xl:text-2xl md:pt-10 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
            Frequently Asked Questions
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:mt-10">
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
                            {serviceItem?.FAQ_heading || "Question"}
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
                        {serviceItem?.FAQ_content || "Answer"}
                      </p>
                    </Panel>
                  ))}
                </Collapse>
              </motion.div>
            </div>

            <div className="w-full md:w-[300px] lg:w-[400px] h-[400px] px-5 md:px-0">
              <h2 className="text-lg md:text-xl font-semibold">
                Send your Query
              </h2>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="servicename" value={formData.servicename} />

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
      )}
    </div>
  );
};

export default ServiceDetailsPage;