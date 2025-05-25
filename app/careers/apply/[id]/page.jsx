'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ApplicationForm({ params }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: ''
  });
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://virtualseoweb.pythonanywhere.com/careers/${params.id}/`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job:', error);
        router.push('/careers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [params.id, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append('subject', `Application for ${job.Post_Name} (ID: ${job.id})`);
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('linkedin', formData.linkedin);
    form.append('coverLetter', formData.coverLetter);
    if (resume) {
      form.append('resume', resume);
    }

    try {
      // In a real app, you would send this to your API endpoint
      // For demo, we'll use mailto as in your original code
      const mailtoLink = `mailto:hr@bkarogyam.com?subject=Application for ${job.Post_Name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ALinkedIn: ${formData.linkedin}%0D%0ACover Letter: ${formData.coverLetter}`;
      window.location.href = mailtoLink;
      
      // Show success message
      alert('Application submitted successfully!');
      router.push('/careers');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
          <button 
            onClick={() => router.push('/careers')}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-orange-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Apply for: {job.Post_Name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">
              📍 {job.Job_Location}
            </span>
            <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">
              ⏳ {job.Job_Experiance}
            </span>
            <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">
              💰 {job.Salary}
            </span>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Job Type:</h3>
              <p className="text-gray-600">{job.Job_Type}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Posted On:</h3>
              <p className="text-gray-600">{new Date(job.Post_Date).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Qualification:</h3>
              <p className="text-gray-600">{job.Qualification}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Key Skills:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.Key_Skill.split(',').map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700">Job Description:</h3>
            <p className="text-gray-600 mt-2 whitespace-pre-line">{job.Post_Description}</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Application Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full md:py-[3px] xl:py-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border md:py-[3px] xl:py-1 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border md:py-[3px] xl:py-1 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="linkedin">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full border md:py-[3px] xl:py-1 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="resume">
                Resume/CV *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors duration-200">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
                <label htmlFor="resume" className="cursor-pointer">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-gray-600">
                    {resume ? resume.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max. 5MB)</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="coverLetter">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows="5"
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Tell us why you're the perfect fit for this role..."
              ></textarea>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/careers')}
                className="px-6 py-3 md:py-[3px] xl:py-1 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Back to Careers
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 md:py-[3px] xl:py-1 bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white font-medium rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}