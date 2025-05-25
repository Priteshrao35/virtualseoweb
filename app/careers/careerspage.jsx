'use client'
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('https://virtualseoweb.pythonanywhere.com/careers/');
        const data = await response.json();
        setCareers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching career data:', error);
        setIsLoading(false);
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

  const filteredCareers = careers.filter(career =>
    career.Post_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.Job_Location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.Key_Skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32 md:py-10 xl:py-10" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/img/webpall/carrire_banner.webp')` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-3xl xl:text-3xl font-extrabold text-white mb-6"
          >
            Join Our Team and Make a Difference
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-lg xl:text-xl text-white mb-8 max-w-3xl mx-auto"
          >
            Start your career journey with BK Arogyam and pave the way to a future filled with innovation, growth, and endless possibilities.
          </motion.p>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="px-8 py-3 md:py-[2px] xl:py-1 bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            onClick={() => scrollToDiv('vacancies')}
          >
            Browse Vacancies
          </motion.button>
        </div>
      </section>

      {/* Vacancies Section */}
      <section className="py-20 md:py-5 xl:py-10 bg-gray-50" id="vacancies">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <p className="text-lg text-gray-600">Find the perfect opportunity that matches your skills and aspirations</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/4"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
                <div className="bg-orange-700 text-white p-4">
                  <h3 className="font-bold text-lg">Filter Jobs</h3>
                </div>
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full p-3 md:p-[3px] xl:p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="space-y-2">
                    <a
                      href="#"
                      className="block md:p-[3px] xl:p-2 pl-3 bg-orange-100 text-orange-700 p-3 rounded-lg font-medium"
                      onClick={() => scrollToDiv('vacancies')}
                    >
                      All Jobs
                    </a>
                    {careers.map(career => (
                      <a
                        key={career.id}
                        href="#"
                        className="block text-gray-700 md:text-sm xl:text-xl hover:bg-gray-100 p-3 rounded-lg transition-colors duration-200"
                        onClick={() => scrollToDiv(career.Post_Name.replace(/\s+/g, '_'))}
                      >
                        {career.Post_Name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job Listings */}
            <div className="lg:w-3/4">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : filteredCareers.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria</p>
                </div>
              ) : (
                <motion.div
                  className="space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  {filteredCareers.map(career => (
                    <motion.div
                      key={career.id}
                      variants={slideUp}
                      id={career.Post_Name.replace(/\s+/g, '_')}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <h3 className="text-xl md:text-xl x:text-xl font-bold text-gray-900 mb-1">{career.Post_Name}</h3>
                          <div className="flex flex-wrap gap-3 mt-2 mb-4">
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                              📍 {career.Job_Location}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                              ⏳ {career.Job_Experiance}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
                              💰 {career.Salary}
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/careers/apply/${career.id}`}
                          className="px-6 py-2 md:py-[2px] xl:py-1 bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-medium rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 mb-4 md:mb-0 text-center"
                        >
                          Apply Now
                        </Link>
                      </div>

                      <AnimatePresence>
                        {details === career.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-gray-800">Job Type:</h4>
                                  <p className="text-gray-600">{career.Job_Type}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">Posted On:</h4>
                                  <p className="text-gray-600">{new Date(career.Post_Date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">Qualification:</h4>
                                  <p className="text-gray-600">{career.Qualification}</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-800">Key Skills:</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {career.Key_Skill.split(',').map((skill, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                      {skill.trim()}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-800">Job Description:</h4>
                                <p className="text-gray-600 mt-2 whitespace-pre-line">{career.Post_Description}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        className="mt-4 text-orange-600 hover:text-orange-800 font-medium flex items-center"
                        onClick={() => toggleDetails(career.id)}
                      >
                        {details === career.id ? (
                          <>
                            <span>Show Less</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>Show More</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-5 xl:py-10 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="px-4 md:px-10 xl:px-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-xl xl:text-2xl font-bold text-gray-900 mb-4">What Our Team Says</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from people who've built their careers with us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                quote: "Working at BK Arogyam has given me the opportunity to grow both professionally and personally while making a real difference in healthcare.",
                name: "Priya Sharma",
                role: "Senior Developer",
                avatar: "👩‍💻"
              },
              {
                quote: "The collaborative culture and focus on innovation make this an exciting place to build a career in the healthcare technology space.",
                name: "Rahul Patel",
                role: "Product Manager",
                avatar: "👨‍💼"
              },
              {
                quote: "I've been able to take on new challenges and responsibilities that have accelerated my career growth beyond what I imagined.",
                name: "Anjali Mehta",
                role: "Data Scientist",
                avatar: "👩‍🔬"
              },
              {
                quote: "I've been able to take on new challenges and responsibilities that have accelerated my career growth beyond what I imagined.",
                name: "Anjali Mehta",
                role: "Data Scientist",
                avatar: "👩‍🔬"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-orange-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}