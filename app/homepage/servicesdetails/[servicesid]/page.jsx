"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../../navbar";
import Header from "../../header";
import FooterSection from "../../footer";
import { Image, Collapse } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const ServiceDetailsPage = ({ params }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const stepElements = stepsRef.current;
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Center of the viewport

      let newActiveStep = activeStep; // Default to current active step
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
  }, [activeStep]);

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

  return (
    <div className="bg-gray-100 text-black">
      <Header />
      <hr />
      <Navbar />

      <Image
        src={service.service_Banner}
        className="w-full h-auto object-cover"
        preview={false}
      />

      <div className="px-[12em] mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-40">
          {/* Content Section */}
          <div className="p-6 rounded-lg max-w-full col-span-2">
            <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
            <p>{service.content}</p>
          </div>

          {/* Form Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 col-span-1">
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

      {/* Why Hire Seo Agency Section */}
      <div className="px-[20em] py-8 mt-10">
        <h1 className="text-6xl font-bold text-center mb-8 mt-10 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.Why_Hire_Agency_Main_Heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {service.Why_Hire_Agency.map((agency, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={agency.Why_Hire_Agency_image_icon}
                className="w-24 h-24 object-cover mb-2 rounded-full"
              />
              <p className="text-center font-bold">
                {agency.Why_Hire_Agency_title}
              </p>
              <p className="text-center px-14">
                {agency.Why_Hire_Agency_description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Why Hire Seo Agency Section */}

      {/* Why Do You Need A SEO Agency */}
      <div className="px-[20em] py-8 mt-10">
        <h1 className="text-5xl font-bold text-center mb-8 mt-5 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.why_need_agency_heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col px-4">
            <p className="">{service.why_need_agency_description}</p>
          </div>

          <div className="flex">
            <img
              src={service.why_need_agency_image}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      {/* Why Do You Need A SEO Agency */}

      {/* Services_Better_Than_Others */}
      <div className="px-[20em] py-8 mt-10">
        <h1 className="text-6xl font-bold text-center mb-8 mt-5 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.Services_Better_Than_Others_heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex">
            <img
              src={service.Services_Better_Than_Others_image}
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-col px-4">
            <p className="">
              {service.Services_Better_Than_Others_description}
            </p>
          </div>
        </div>
      </div>
      {/* Services_Better_Than_Others */}

      {/* Why Do You Need A SEO Agency */}
      <div className="px-[20em] py-8 mt-10">
        <h1 className="text-6xl font-bold text-center mb-8 mt-5 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.why_choose_us_heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col px-4">
            <p className="">{service.why_choose_us_description}</p>
          </div>

          <div className="flex">
            <img src={service.why_choose_us_image} className="w-full h-auto" />
          </div>
        </div>
      </div>
      {/* Why Do You Need A SEO Agency */}

      {/* List of the SEO Services We Offer */}
      <div className="px-[25em] py-8 mt-10">
        <h1 className="text-6xl font-bold text-center mb-8 mt-10 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.why_need_agency_heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {service.List_of_the_SEO_Services_We_Offer.map(
            (serviceItem, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
              >
                <p className="text-center font-bold">
                  {serviceItem.List_of_the_SEO_Services_We_Offer_title}
                </p>
                <p className="text-center px-14">
                  {serviceItem.List_of_the_SEO_Services_We_Offer_description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      {/* List of the SEO Services We Offer */}

      {/* How We Work With You Every Step of The Way! */}
      <div className="px-[25em] py-8 mt-10">
        <h1 className="text-6xl font-bold text-center mb-8 mt-10 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.How_We_Work_Step_Heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          {/* Left Column - Titles */}
          <ul className="space-y-4">
            {service.How_We_Work_Step.map((step, index) => (
              <li
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`font-bold text-xl ${
                  activeStep === index ? "text-orange-500" : ""
                }`}
              >
                {step.How_We_Work_Step_Title}
              </li>
            ))}
          </ul>

          {/* Right Column - Details */}
          <div>
            {service.How_We_Work_Step[activeStep] && (
              <div className="flex flex-col items-center">
                <img
                  src={
                    service.How_We_Work_Step[activeStep]
                      .How_We_Work_Step_image_icon
                  } // Fixed this line
                  className="w-24 h-24 object-cover mb-2 rounded-full"
                  alt={
                    service.How_We_Work_Step[activeStep].How_We_Work_Step_Title
                  } // Adding alt attribute for accessibility
                />
                <p className="text-center font-bold mb-2">
                  {service.How_We_Work_Step[activeStep].How_We_Work_Step_Title}
                </p>
                <p className="text-center px-14">
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
      {/* How We Work With You Every Step of The Way! */}
      {/* Industries We’ve Delivered Results In */}
      <div className="px-[15em] py-8 mt-10">
        <h1 className="text-6xl font-bold text-center mb-8 mt-10 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          {service.Industries_We_Delivered_Results_Heading}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-20">
          {service.Industries_We_Delivered_Results.map((serviceItem, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-lg bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-yellow-500 hover:via-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg"
            >
              <p className="text-center font-bold text-white">
                {serviceItem.Industries_We_Delivered_Results_name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Industries We’ve Delivered Results In */}

      {/* FAQ */}
      <div className="px-[25em] py-8 mt-10">
        <h1 className="text-6xl font-bold text-center mb-8 mt-10 px-40 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-normal">
          Frequently Asked Questions
        </h1>

        <div className="flex flex-col md:flex-row gap-6 mt-20">
          {/* FAQ Section */}
          <div className="p-6 flex-1 min-h-[300px]">
            <Collapse
              bordered={false}
              defaultActiveKey={["0"]}
              expandIcon={({ isActive }) => (
                <CaretDownOutlined
                  className={`${isActive ? "rotate-180" : "rotate-0"}`}
                />
              )}
              expandIconPosition="right" // Ensure the icon is on the right
              className="bg-transparent" // Ensure no background color for Collapse
            >
              {service.FAQ.map((serviceItem, index) => (
                <Panel
                  header={
                    <div className="flex items-center justify-between w-full">
                      <span>{serviceItem.FAQ_heading}</span>
                      {/* Optional: You can add additional elements here if needed */}
                    </div>
                  }
                  key={index.toString()}
                  className="bg-transparent" // Ensure no background color for Panel
                >
                  <p className="px-6 py-4 text-black">
                    {serviceItem.FAQ_content}
                  </p>
                </Panel>
              ))}
            </Collapse>
          </div>

          {/* Consultation Form */}
          <div className="md:w-[500px] lg:w-[400px] xl:w-[500px] h-[500px]">
            <h2 className="text-xl font-semibold mb-3">Send your Query</h2>
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
      {/* FAQ */}

      <FooterSection />
    </div>
  );
};

export default ServiceDetailsPage;
