'use client';
import { Input, Select, Button, Space, message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const { Option } = Select;

function Whychose() {
  const [selectedService, setSelectedService] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [subject, setSubject] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState(''); // New state for website URL
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch services from the API on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://virtualseoweb.pythonanywhere.com/menu-items/');
        const serviceData = response.data.map(service => ({
          value: service.name,
          label: service.name,
        }));
        setServices(serviceData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (value) => {
    setSelectedService(value);
  };

  const handleSubmit = () => {
    axios.post('https://apis.prwebtechno.com/apis/apis/send_email/', {
      servicename: selectedService, // Include service name
      name: name, // Include name
      email: email, // Include email
      mobile: mobile, // Include mobile
      subject: subject, // Include subject
      url: websiteUrl, // Include website URL
      message: "Please provide your message here." // Replace with a real message input if needed
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log(response.data);
        if (response.data.status === 'success') {
          message.success('Your request was submitted successfully!');
          // Reset the form after successful submission
          setSelectedService('');
          setName('');
          setEmail('');
          setMobile('');
          setSubject('');
          setWebsiteUrl('');
        } else {
          message.error('Submission failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('Submission failed. Please try again.');
      });
  };

  return (
    <div className="overflow-hidden">
      <div className="col-span-1 md:px-[10em] p-2 md:p-10">
        <p className="md:mt-3 text-xl md:text-3xl font-bold text-black mb-2 text-center">
          Virtualseoweb Increases the Online Presence of Your Businesses
        </p>
        <p className="md:text-xl text-sm font-bold text-black mb-5 mx-0 md:px-[3em] text-center">
          Virtualseoweb is one of the best and rapidly growing digital marketing companies in the area. We have vast experience of navigating the rapidly evolving digital marketing landscape and delivering quality digital marketing services.
        </p>

        <div className="flex flex-col mb-5 md:mb-1 md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2 md:mx-0 mx-7">
          <Select
            className="w-full md:w-auto mx-0"
            placeholder={loading ? "Loading services..." : "Select and get the best services"}
            onChange={handleServiceChange}
            loading={loading}
            value={selectedService || undefined} 
          >
            {services.map(service => (
              <Option key={service.value} value={service.value}>
                {service.label}
              </Option>
            ))}
          </Select>

          <Space.Compact className='w-10% md:w-40%'>
            <Input 
              placeholder="Enter Your Email Id" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              style={{ fontSize: '16px' }}
            />
            <Button className='bg-blue-800' type="primary" onClick={handleSubmit}>
              Get Quote
            </Button>
          </Space.Compact>
        </div>

        <div className="hidden md:flex flex-wrap justify-center items-center space-x-4 mt-5 mx-0">
          <p className="text-xl font-bold text-black">100+ Projects In Running</p>
          <p className="text-xl font-bold text-black my-2 md:my-0 px-10">1000+ Projects Done</p>
          <p className="text-xl font-bold text-black">50+ Development Team</p>
        </div>
      </div>
    </div>
  );
}

export default Whychose;