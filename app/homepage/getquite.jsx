"use client"; // Ensure this is at the top to specify it's a client component
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";

const cardData = [
  // Add your card data here
];

const GetQuite = () => {
  const [formData, setFormData] = useState({
    servicename: "", // Changed from null to empty string
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

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://virtualseoweb.pythonanywhere.com/navmenuandservices/"
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
    setFormData({ ...formData, servicename: value }); // Directly set servicename in formData
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
        "https://virtualseoweb.pythonanywhere.com/send_email/",
        formData, // Send all form data including selectedService
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
      }
    } catch (error) {
      setFormStatus("Failed to send email.");
      console.error("Error sending form details:", error);
    }
  };

  return (
    <div className="text-black md:mt-5 overflow-hidden">
      <p className="text-black text-center md:text-2xl xl:text-3xl text-xl md:px-0 px-2 font-bold mt-5">
        Your Digital Success Starts Here. Let's Make It Happen!
      </p>
      <hr className="w-1/2 mx-auto my-4 border-t-2 border-gray-400 rounded-full" />

      {/* Top Cards Section */}
      <div className="p-5 md:pb-5 rounded-xl md:px-[5em]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mb-8">
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
          <div className="col-span-1 hidden md:block">
            <h2 className="md:text-2xl text-2xl xl:text-xl font-semibold mb-4 md:text-left text-center">
              Points of contact
            </h2>
            <h2 className="text-xl xl:text-xl md:text-[17px] font-semibold mb-4 md:text-left text-center">
              Building 17A 2nd Floor, 7C, Sector 118  Noida Uttar Pradesh 201306
            </h2>

            <h3 className="text-lg font-semibold mt-4 md:text-left text-center">Information & Sales</h3>
            <p className="md:text-left text-center">info@virtualseoweb.com</p>
            <h3 className="text-lg font-semibold mt-4 md:text-left text-center md:block hidden">Support</h3>
            <p className="md:text-left text-center md:block hidden">info@virtualseoweb.com</p>

            <h3 className="text-lg font-semibold mt-4 md:text-left text-center md:block hidden">Contacts</h3>
            <p className="md:text-left text-center md:block hidden">+91 9450977593</p>

            <h3 className="text-lg font-semibold mt-4 md:text-left text-center md:block hidden">Our Other Office</h3>
            <h3 className="mt-2 md:text-left text-center md:block hidden">Uttar Pradesh, India</h3>
            <p className="md:text-left text-center md:block hidden">Mirzapur, Uttar Pradesh, India</p>
          </div>

          {/* Contact Form Section */}
          <div className="col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                className={`w-full ${errors.servicename ? "border-red-500" : "border-gray-300"
                  } rounded-md text-black`}
                placeholder="Select your service"
                onChange={handleServiceChange}
                loading={loading}
                value={formData.servicename || undefined} // Ensure undefined is passed if no value
                allowClear // This allows clearing the selected value
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
                className={`p-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md text-black w-full`}
              />
              <input
                type="email"
                name="email"
                style={{ fontSize: '16px' }}
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md text-black w-full`}
              />
              <input
                type="text"
                name="subject"
                style={{ fontSize: '16px' }}
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={`p-2 border ${errors.subject ? "border-red-500" : "border-gray-300"
                  } rounded-md text-black w-full`}
              />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile"
                style={{ fontSize: '16px' }}
                className={`p-2 border ${errors.mobile ? "border-red-500" : "border-gray-300"
                  } rounded-md text-black w-full`}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                style={{ fontSize: '16px' }}
                className={`p-2 border ${errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md text-black w-full`}
                rows="4"
              />
              {formStatus && (
                <p
                  className={`text-center mt-4 ${formStatus.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  {formStatus}
                </p>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-700 text-white py-2 px-4 rounded-md w-full md:w-2/4"
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