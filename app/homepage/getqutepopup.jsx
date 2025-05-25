"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Select } from "antd";

const GetQuoteModal = ({ isOpen, setIsOpen }) => {
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

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

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

        if (isOpen) {
            fetchServices();
        }
    }, [isOpen]);

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
                    "Your Enqury submited successfully! Our team has received your request and will get back to you shortly. A confirmation email has also been sent to your inbox."
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
        <>
            <button
                className="text-blue-500 bg-gradient-to-r from-red-300 via-yellow-100 to-red-300 hover:bg-white hover:text-green-600 rounded-lg font-bold p-1 xl:p-1 px-5 xl:px-7 md:py-[1px] xl:py-2 cursor-pointer"
                onClick={toggleModal}
            >
                Get Quote
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div
                                className="absolute inset-0 bg-gray-500 opacity-75"
                                onClick={toggleModal}
                            ></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full md:max-w-4xl md:max-h-[90vh] xl:max-w-5xl xl:max-h-80vh]">
                            <div className="bg-white">
                                <div className="modal-content">
                                    <button
                                        type="button"
                                        className="close absolute right-4 top-4 z-10"
                                        onClick={toggleModal}
                                    >
                                        <span aria-hidden="true" className="text-2xl md:text-lg xl:text-2xl">×</span>
                                    </button>

                                    <div className="modal-body p-0">
                                        <div className="login-wrapper">
                                            <div className="container-fluid p-0">
                                                <div className="row m-0 flex flex-wrap">
                                                    {/* Left Side - Form */}
                                                    <div className="w-full md:w-2/4 p-6 md:p-4 xl:p-6">
                                                        <div className="login-form-col">
                                                            <h2 className="text-2xl font-bold mb-2 md:text-xl xl:text-2xl text-black">Get a Quote</h2>
                                                            <p className="text-gray-600 mb-4 md:text-sm xl:text-base">
                                                                Please fill in the form and our expert will get back to you.
                                                            </p>

                                                            <form onSubmit={handleSubmit} className="wpcf7-form">
                                                                <div className="row flex flex-wrap -mx-2">
                                                                    <div className="w-full px-2 mb-4 md:mb-2 xl:mb-4 py-2 md:py-[1px] xl:py-2">
                                                                        <div className="form-group">
                                                                            <label className="block text-gray-700 mb-1 md:text-xs xl:text-sm">
                                                                                Select Services
                                                                            </label>
                                                                            <Select
                                                                                className={`w-full ${errors.servicename ? "border-red-500" : "border-gray-300"} rounded-md text-black md:text-xs xl:text-sm`}
                                                                                placeholder="Select your service"
                                                                                onChange={handleServiceChange}
                                                                                loading={loading}
                                                                                value={formData.servicename || undefined}
                                                                                allowClear
                                                                                size="middle" // use "middle" for md screen, "large" makes it taller
                                                                            >
                                                                                {services.map((service) => (
                                                                                    <Select.Option key={service.value} value={service.value}>
                                                                                        {service.label}
                                                                                    </Select.Option>
                                                                                ))}
                                                                            </Select>
                                                                            {errors.servicename && (
                                                                                <span className="text-red-500 text-sm md:text-[0.6rem] xl:text-sm">
                                                                                    {errors.servicename}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>


                                                                    <div className="w-full sm:w-1/2 px-2 mb-4 md:mb-3 xl:mb-4">
                                                                        <div className="form-group">
                                                                            <label className="block text-gray-700 mb-1 md:text-xs xl:text-sm">
                                                                                Your Name
                                                                                <input
                                                                                    type="text"
                                                                                    name="name"
                                                                                    value={formData.name}
                                                                                    onChange={handleChange}
                                                                                    placeholder="Your Name"
                                                                                    className={`w-full p-2 py-2 md:py-[3px] xl:py-1 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded md:text-xs xl:text-sm`}
                                                                                />
                                                                                {errors.name && <span className="text-red-500 text-sm md:text-[0.6rem] xl:text-sm">{errors.name}</span>}
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full sm:w-1/2 px-2 mb-4 md:mb-3 xl:mb-4">
                                                                        <div className="form-group">
                                                                            <label className="block text-gray-700 mb-1 md:text-xs xl:text-sm">
                                                                                Your Email
                                                                                <input
                                                                                    type="email"
                                                                                    name="email"
                                                                                    value={formData.email}
                                                                                    onChange={handleChange}
                                                                                    placeholder="Email Id"
                                                                                    className={`w-full p-2 py-2 md:py-[3px] xl:py-1 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded md:text-xs xl:text-sm`}
                                                                                />
                                                                                {errors.email && <span className="text-red-500 text-sm md:text-[0.6rem] xl:text-sm">{errors.email}</span>}
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full sm:w-1/2 px-2 mb-4 md:mb-3 xl:mb-4">
                                                                        <div className="form-group">
                                                                            <label className="block text-gray-700 mb-1 md:text-xs xl:text-sm">
                                                                                Subject
                                                                                <input
                                                                                    type="text"
                                                                                    name="subject"
                                                                                    value={formData.subject}
                                                                                    onChange={handleChange}
                                                                                    placeholder="Subject"
                                                                                    className={`w-full p-2 py-2 md:py-[3px] xl:py-1 border ${errors.subject ? "border-red-500" : "border-gray-300"} rounded md:text-xs xl:text-sm`}
                                                                                />
                                                                                {errors.subject && <span className="text-red-500 text-sm md:text-[0.6rem] xl:text-sm">{errors.subject}</span>}
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full sm:w-1/2 px-2 mb-4 md:mb-3 xl:mb-4">
                                                                        <div className="form-group">
                                                                            <label className="block text-gray-700 mb-1 md:text-xs xl:text-sm">
                                                                                Mobile No.
                                                                                <input
                                                                                    type="tel"
                                                                                    name="mobile"
                                                                                    value={formData.mobile}
                                                                                    onChange={handleChange}
                                                                                    placeholder="Enter Mobile Number"
                                                                                    className={`w-full py-2 md:py-[3px] xl:py-1 p-2 border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded md:text-xs xl:text-sm`}
                                                                                />
                                                                                {errors.mobile && <span className="text-red-500 text-sm md:text-[0.6rem] xl:text-sm">{errors.mobile}</span>}
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="w-full px-2 mb-4 md:mb-3 xl:mb-4">
                                                                        <div className="form-group">
                                                                            <label className="block text-gray-700 mb-1 md:text-xs xl:text-sm">
                                                                                Project Description
                                                                                <textarea
                                                                                    name="message"
                                                                                    value={formData.message}
                                                                                    onChange={handleChange}
                                                                                    placeholder="Project Description"
                                                                                    className={`w-full p-2 py-2 md:py-[1px] xl:py-1 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded md:text-xs xl:text-sm`}
                                                                                    rows="4"
                                                                                ></textarea>
                                                                                {errors.message && <span className="text-red-500 text-sm md:text-[0.6rem] xl:text-sm">{errors.message}</span>}
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    {formStatus && (
                                                                        <div className="w-full px-2 md:mb-3 xl:mb-4">
                                                                            <p
                                                                                className={`text-center md:text-sm xl:text-base ${formStatus.includes("successfully")
                                                                                    ? "text-green-600"
                                                                                    : "text-red-600"
                                                                                    }`}
                                                                            >
                                                                                {formStatus}
                                                                            </p>
                                                                        </div>
                                                                    )}

                                                                    <div className="w-full px-2">
                                                                        <div className="form-group main_class_btn">
                                                                            <button
                                                                                type="submit"
                                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded md:text-xs xl:text-sm"
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>

                                                    {/* Right Side - Image */}
                                                    <div className="w-full md:w-1/2 p-0 hidden md:block">
                                                        <div className="login-figure h-full relative">
                                                            <h4 className="absolute top-4 left-4 text-white text-xl font-bold z-10 md:text-sm xl:text-xl">
                                                                Discover The Possibilities
                                                            </h4>
                                                            <Image
                                                                src="/paperrr-4.jpg"
                                                                alt="Discover possibilities"
                                                                layout="fill"
                                                                objectFit="cover"
                                                                className="rounded-r-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GetQuoteModal;