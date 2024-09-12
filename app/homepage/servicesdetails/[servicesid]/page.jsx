"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../../navbar";
import Header from "../../header";
import FooterSection from "../../footer";
import { Image, Collapse } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import ServicesSliderSection from "../../servicesslider";
import Brands from "../../brands";
import OurProjects from "../../projects";
import InfoSection from "../../testomonialsbackviews";

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

  if (loading) {
    return <div className="text-black">Loading...</div>;
  }

  if (!service) {
    return <div className="text-black">Service not found</div>;
  }

  const fullContent = stripHtmlTags(service.content);
  const limitedContent = limitWords(fullContent, 70);

  return (
    <div className="bg-gray-100 text-black">
      <Header />
      <hr />
      <Navbar />

      <Image
        src={service.service_Banner}
        className="w-full h-auto object-cover md:mt-0 mt-10"
        preview={false}
      />

      <div className="md:px-[12em] px-2 md:mt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-40">
          {/* Content Section */}
          <div className="p-6 rounded-lg max-w-full md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
            <p className="text-black hidden md:block">{fullContent}</p>
            <p className="text-black block md:hidden">
              {showFullContent ? fullContent : limitedContent}
            </p>
            {/* Show "Read More" or "Show Less" button on mobile */}
            <div className="block md:hidden">
              {!showFullContent && (
                <button
                  onClick={() => setShowFullContent(true)}
                  className="text-indigo-600 hover:underline mt-2"
                >
                  Read More
                </button>
              )}
              {showFullContent && (
                <button
                  onClick={() => setShowFullContent(false)}
                  className="text-indigo-600 hover:underline mt-2"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 md:col-span-1">
            <h2 className="text-xl font-semibold mb-3">GET A QUOTE</h2>
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-1 border ${
                    errors.subject ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  style={{ minHeight: "80px" }}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
            {formStatus && (
              <p
                className={`mt-4 text-sm ${
                  formStatus.includes("successfully")
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

      <div className="mt-5">
        <Brands />
      </div>

      {/* Why Hire SEO Agency Section */}
      <div className="md:px-16 px-3 lg:px-[25em] md:py-8 md:mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-8 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.Why_Hire_Agency_Main_Heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-20">
          {service.Why_Hire_Agency.map((agency, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={agency.Why_Hire_Agency_image_icon}
                className="w-16 h-16 md:w-24 md:h-24 object-cover mb-4 rounded-full"
              />
              <p className="text-lg font-bold mb-2">
                {agency.Why_Hire_Agency_title}
              </p>
              <p className="text-sm md:text-base px-4 md:px-10">
                {agency.Why_Hire_Agency_description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* End of Why Hire SEO Agency Section */}

      {/* Why Do You Need A SEO Agency */}
      <div className="px-2 md:px-16 lg:px-[20em] py-8 mt-10 bg-slate-200">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-8 mt-5 md:p-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.why_need_agency_heading}
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Mobile view: Content first, then Image */}
          <div className="flex-1 flex flex-col px-2 md:px-4 order-2 md:order-1">
            <p>{service.why_need_agency_description}</p>
          </div>

          <div className="flex justify-center md:justify-end flex-1 order-1 md:order-2">
            <img
              src={service.why_need_agency_image}
              className="w-full h-auto max-w-xs md:max-w-full"
              alt="Why Need SEO Agency"
            />
          </div>
        </div>
      </div>
      {/* End of Why Do You Need A SEO Agency */}

      {/* Services_Better_Than_Others */}
      <div className="px-4 md:px-16 lg:px-[20em] py-8 md:mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-8 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.Services_Better_Than_Others_heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center md:justify-start">
            <img
              src={service.Services_Better_Than_Others_image}
              className="w-full h-auto max-w-xs md:max-w-full"
            />
          </div>
          <div className="flex flex-col px-2 md:px-4">
            <p>{service.Services_Better_Than_Others_description}</p>
          </div>
        </div>
      </div>
      {/* End of Services_Better_Than_Others */}

      <div className="md:px-28 bg-slate-200">
        {" "}
        <ServicesSliderSection />
      </div>

      {/* Why Choose Us Section */}
      <div className="px-4 md:px-16 lg:px-[20em] py-8 md:mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-8 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.why_choose_us_heading}
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Mobile view: Content last, then Image */}
          <div className="flex-1 flex flex-col px-2 md:px-4 order-3 md:order-2">
            <p>{service.why_choose_us_description}</p>
          </div>

          <div className="flex justify-center md:justify-start flex-1 order-2 md:order-1">
            <img
              src={service.why_choose_us_image}
              className="w-full h-auto max-w-xs md:max-w-full"
              alt="Why Choose Us"
            />
          </div>
        </div>
      </div>
      {/* End of Why Choose Us Section */}

      {/* How We Work With You Every Step of The Way! */}
      <div className="px-4 md:px-8 lg:px-[25em] py-8 md:mt-10 text-center bg-slate-200">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-8 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.How_We_Work_Step_Heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          {/* Left Column - Titles */}
          <ul className="space-y-4 mx-auto md:mt-28">
            {service.How_We_Work_Step.map((step, index) => (
              <li
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                onClick={() => setActiveStep(index)} // Adding the onClick event here
                className={`cursor-pointer font-bold text-lg md:text-xl ${
                  activeStep === index ? "text-orange-500" : ""
                }`}
              >
                {step.How_We_Work_Step_Title}
              </li>
            ))}
          </ul>

          {/* Right Column - Details */}
          <div className="flex flex-col items-center">
            {service.How_We_Work_Step[activeStep] && (
              <div className="flex flex-col items-center">
                <img
                  src={
                    service.How_We_Work_Step[activeStep]
                      .How_We_Work_Step_image_icon
                  }
                  className="w-16 h-16 md:w-24 md:h-24 object-cover mb-2 rounded-full"
                  alt={
                    service.How_We_Work_Step[activeStep].How_We_Work_Step_Title
                  }
                />
                <p className="text-center font-bold mb-2">
                  {service.How_We_Work_Step[activeStep].How_We_Work_Step_Title}
                </p>
                <p className="text-center px-4 md:px-14">
                  {
                    service.How_We_Work_Step[activeStep]
                      .How_We_Work_Step_short_description
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End of How We Work With You Every Step of The Way! */}

      <OurProjects />

      {/* Industries We’ve Delivered Results In */}
      <div className="px-4 md:px-8 lg:px-[15em] py-8 mt-10 bg-slate-200">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-8 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.Industries_We_Delivered_Results_Heading}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-10 md:mt-20">
          {service.Industries_We_Delivered_Results.map((serviceItem, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 md:p-6 rounded-lg bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-yellow-500 hover:via-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg"
            >
              <p className="text-center font-bold text-white">
                {serviceItem.Industries_We_Delivered_Results_name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* End of Industries We’ve Delivered Results In */}

      <InfoSection />

      {/* FAQ */}
      <div className="md:px-10 md:lg:px-[20em] md:py-8 md:mt-10">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center mb-8 mt-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col md:flex-row gap-6 md:mt-10">
          {/* FAQ Section */}
          <div className="md:p-6 flex-1 md:min-h-[300px]">
            <Collapse
              bordered={false}
              defaultActiveKey={["0"]}
              expandIcon={({ isActive }) => (
                <CaretDownOutlined
                  className={`${isActive ? "rotate-180" : "rotate-0"}`}
                  style={{
                    position: "absolute", // Position the icon absolutely
                    right: "16px", // Align it to the right side
                    top: "50%", // Center it vertically
                    transform: "translateY(-50%)", // Adjust for perfect vertical centering
                    fontSize: "12px", // Smaller size for the icon
                    color: "black", // Change icon color to black
                    zIndex: "-1" // Send the icon to the background
                  }}
                />
              )}
              expandIconPosition="right"
              className="bg-transparent"
            >
              {service.FAQ.map((serviceItem, index) => (
                <Panel
                  header={
                    <div className="relative flex items-center justify-between w-full bg-blue-200 p-2 rounded-md">
                      <span className="text-black">
                        {serviceItem.FAQ_heading}
                      </span>
                      <CaretDownOutlined
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black opacity-50 text-2xl" 
                      />
                    </div>
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
          </div>

          {/* Consultation Form */}
          <div className="w-full md:w-[400px] lg:w-[500px] h-[500px] px-5 md:px-0">
            <h2 className="text-lg md:text-xl font-semibold mb-3">
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-1 border ${
                    errors.subject ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
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
                  className={`mt-1 block w-full px-2 py-2 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  style={{ minHeight: "80px" }}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
            {formStatus && (
              <p
                className={`mt-4 text-sm ${
                  formStatus.includes("successfully")
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

      <FooterSection />
    </div>
  );
};

export default ServiceDetailsPage;
