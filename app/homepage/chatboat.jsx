'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const ChatButton = () => {
  const [formData, setFormData] = useState({
    servicename: "",
    name: "",
    email: "",
    subject: "",
    mobile: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Check if it's the user's first visit
  useEffect(() => {
    const isFirstVisit = localStorage.getItem('isChatFormOpened') === null;
    if (isFirstVisit) {
      setIsFormVisible(true);
      localStorage.setItem('isChatFormOpened', 'true');
    }
  }, []);

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://virtualseoweb.pythonanywhere.com/menu-items/"
        );
        const serviceData = response.data.map((service) => ({
          value: service.name,
          label: service.name,
        }));
        setServices(serviceData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (value) => {
    setFormData({ ...formData, servicename: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.servicename?.trim()) newErrors.servicename = "Service name is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile number must be 10 digits";
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
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFormStatus(
          "Email sent successfully! A confirmation message has been sent to your email."
        );
        setFormData({
          servicename: "",
          name: "",
          email: "",
          subject: "",
          mobile: "",
          message: "",
        });
        setErrors({});
        setTimeout(() => {
          setIsFormVisible(false);
        }, 1500);
      }
    } catch (error) {
      setFormStatus("Failed to send email.");
      console.error("Error sending form details:", error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 10px",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="chat-button"
      >
        <i className="fas fa-comment-dots" style={{ fontSize: "30px" }}></i>
      </button>

      {isFormVisible && (
        <div className="chat-form" style={{
          position: "fixed",
          bottom: "50px",
          right: "20px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 999,
          width: "300px"
        }}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-black">Request a Quote</h2> {/* Header Section */}
            <button
              onClick={() => setIsFormVisible(false)}
              style={{
                background: "none",
                border: "none",
                color: "black",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              &times; {/* Close button (×) */}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              className={`w-full ${errors.servicename ? "border-red-500" : "border-gray-300"
                } rounded-md text-black`}
              placeholder="Select your service"
              onChange={handleServiceChange}
              loading={loading}
              value={formData.servicename || undefined}
              allowClear
            >
              {services.map((service) => (
                <Select.Option key={service.value} value={service.value}>
                  {service.label}
                </Select.Option>
              ))}
            </Select>

            {errors.servicename && (
              <p className="text-red-500">{errors.servicename}</p>
            )}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              style={{ fontSize: '16px' }}
              className={`p-2 border py-2 md:py-[1px] xl:py-1 ${errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              style={{ fontSize: '16px' }}
              className={`p-2 border py-2 md:py-[1px] xl:py-1 ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email}</p>
            )}
            <input
              type="text"
              name="subject"
              style={{ fontSize: '16px' }}
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={`p-2 py-2 md:py-[1px] xl:py-1 border ${errors.subject ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
            />
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              style={{ fontSize: '16px' }}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={`p-2 py-2 md:py-[1px] xl:py-1 border ${errors.mobile ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
            />
            {errors.mobile && (
              <p className="text-red-500">{errors.mobile}</p>
            )}
            <textarea
              name="message"
              value={formData.message}
              style={{ fontSize: '16px' }}
              onChange={handleChange}
              placeholder="Message"
              className={`p-2 py-2 md:py-[1px] xl:py-1 border ${errors.message ? "border-red-500" : "border-gray-300"
                } rounded-md text-black w-full`}
              rows="2"
            />
            {errors.message && (
              <p className="text-red-500" style={{ fontSize: '16px' }}>{errors.message}</p>
            )}
            <button
              type="submit"
              className="w-full md:py-[1px] xl:py-1 bg-blue-500  text-white font-bold py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {formStatus && (
            <p className={`mt-4 ${formStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {formStatus}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatButton;