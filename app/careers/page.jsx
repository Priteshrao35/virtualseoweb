'use client'
import { useState, useEffect } from 'react';
import FooterSection from '../homepage/footer';
import CentralBanner from '../homepage/centralbanner';
import Navbar from '../homepage/navbar';
import Header from '../homepage/header';

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [details, setDetails] = useState(null);
  const [applyCareerId, setApplyCareerId] = useState(null); // State to manage which career is applying

  useEffect(() => {
    // Fetch career data from API
    const fetchCareers = async () => {
      try {
        const response = await fetch('https://virtualseoweb.pythonanywhere.com/careers/');
        const data = await response.json();
        setCareers(data);
      } catch (error) {
        console.error('Error fetching career data:', error);
      }
    };

    fetchCareers();
  }, []);

  const toggleDetails = (careerId) => {
    setDetails(details === careerId ? null : careerId);
  };

  const scrollToDiv = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyClick = (careerId) => {
    setApplyCareerId(careerId); // Set the current career ID to show the form
  };

  const handleFormClose = () => {
    setApplyCareerId(null); // Hide the form
  };

  return (
    <div className='bg-white'>
      <Header />
      <hr />
      <Navbar />
      <CentralBanner />
      <section className="bg-cover bg-center py-20" style={{ backgroundImage: `url('/img/webpall/carrire_banner.webp')` }}>
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-extrabold text-black mb-4">Join Our Team and Make a Difference</h1>
          <p className="text-xl text-black mb-6">Start your career journey with BK Arogyam and pave the way to a future filled with innovation, growth, and endless possibilities.</p>
          <button
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg"
            onClick={() => scrollToDiv('vacancies')}
          >
            Browse Vacancies
          </button>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Building Meaningful Careers</h2>
            <p className="text-lg text-black">Building meaningful careers at BK Arogyam involves more than just jobs; it's an opportunity to contribute to a healthier world and make a real impact.</p>
          </div>
          <div id="vacancies">
            <div className="flex flex-col md:flex-row">
              <nav className="flex flex-col md:w-1/4 bg-gray-200 rounded-lg shadow-md">
                <a
                  href="#"
                  className="bg-[#bb3810] text-white p-4 rounded-t-lg hover:bg-[#a62a0a]"
                  onClick={() => scrollToDiv('vacancies')}
                >
                  All Jobs
                </a>
                {careers.map(career => (
                  <a
                    key={career.id}
                    href="#"
                    className="text-black p-4 border-t border-gray-300 hover:bg-gray-100"
                    onClick={() => scrollToDiv(career.Post_Name.replace(/\s+/g, '_'))}
                  >
                    {career.Post_Name}
                  </a>
                ))}
              </nav>
              <div className="w-full md:w-3/4 pl-4">
                <div className="space-y-6">
                  {careers.map(career => (
                    <div key={career.id} id={career.Post_Name.replace(/\s+/g, '_')} className="bg-white p-6 rounded-lg shadow-lg">
                      <h3 className="text-black text-xl font-bold mb-2">{career.Post_Name}</h3>
                      <p className="text-black mb-2"><strong>Location:</strong> {career.Job_Location}</p>
                      <p className="text-black mb-2"><strong>Experience:</strong> {career.Job_Experiance}</p>
                      {details === career.id && (
                        <div className="mt-4">
                          <p className="text-black"><strong>Job Type:</strong> {career.Job_Type}</p>
                          <p className="text-black"><strong>Post Date:</strong> {new Date(career.Post_Date).toLocaleDateString()}</p>
                          <p className="text-black"><strong>Salary:</strong> {career.Salary}</p>
                          <p className="text-black"><strong>Qualification:</strong> {career.Qualification}</p>
                          <p className="text-black"><strong>Key Skills:</strong> <br />{career.Key_Skill}</p>
                          <p className="text-black"><strong>Post Description:</strong> <br />{career.Post_Description}</p>
                        </div>
                      )}
                      <div className="mt-4 flex space-x-4"> {/* Flex container for buttons */}
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => toggleDetails(career.id)}
                        >
                          {details === career.id ? 'Read Less' : 'Read More'}
                        </button>
                        <button
                          className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-lg"
                          onClick={() => handleApplyClick(career.id)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now Form */}
      {applyCareerId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-black mb-4">Apply for Job</h2>
            <form
              action="mailto:hr@bkarogyam.com"
              method="post"
              encType="multipart/form-data"
              className="space-y-4"
            >
              <input
                type="hidden"
                name="subject"
                value={`Application for Job ID: ${applyCareerId}`}
              />
              <div>
                <label className="block text-black mb-2" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2" htmlFor="resume">Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2" htmlFor="coverLetter">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows="4"
                  className="w-full border border-gray-300 p-2 rounded-lg"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-lg"
              >
                Submit Application
              </button>
              <button
                type="button"
                className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg shadow-lg"
                onClick={handleFormClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}
