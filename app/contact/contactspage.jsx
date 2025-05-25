"use client";
import Image from "next/image";
import ServicesSliderSection from "../homepage/servicesslider";
import GetQuite from "../homepage/getquite";

const cardData = [
];

const ContactForm = () => {

  return (
    <div className="bg-gray-100 text-black">
      <div className="relative w-full md:mt-0 mt-14">
        <Image
          src="/contactbanner.png"
          layout="responsive"
          width={1920}
          height={1080}
          alt="Picture of the author"
          className="object-cover h-64 sm:h-96 md:h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-xl xl:text-5xl md:text-4xl font-bold md:mb-4">
            Contact Us
          </h1>
          <p className="text-sm xl:text-2xl md:text-xl font-bold">
            We are here to help you with any questions or concerns you may have.
          </p>
        </div>
      </div>


      {/* Top Cards Section */}
      <div className="p-5 bg-blue-50 rounded-xl md:px-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
        <GetQuite />
        <hr className="mt-5 font-bold" />

        <div className="mt-5 md:mt-5">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-xl xl:text-xl font-bold mb-4">
              GOT A QUESTION? TALK WITH US DIRECT
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            {/* Sales Inquiry */}
            <div className="md:p-4 bg-gray-100 rounded-lg flex flex-col items-center">
              <img
                src="/sales-inquiry-icon.png"
                alt="Sales Inquiry"
                className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-md mb-4"
              />
              <h3 className="text-md md:text-lg font-semibold mb-2 text-center">
                Sales Inquiry
              </h3>
              <p className="mb-2 text-center text-sm md:text-base">
                Email:{" "}
                <a
                  href="mailto:sales@mediasearchgroup.com"
                  className="text-blue-500"
                >
                  info@virtualseoweb.com
                </a>
              </p>
              <p className="text-center text-sm md:text-base">
                Phone No:{" "}
                <a href="tel:+91 9450977593" className="text-blue-500">
                  +91 9450977593
                </a>
              </p>
            </div>

            {/* Customer Support */}
            <div className="md:p-4 bg-gray-100 rounded-lg flex flex-col items-center">
              <img
                src="/customer-support-icon.png"
                alt="Customer Support"
                className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-md mb-4"
              />
              <h3 className="text-md md:text-lg font-semibold mb-2 text-center">
                Customer Support
              </h3>
              <p className="mb-2 text-center text-sm md:text-base">
                Email:{" "}
                <a
                  href="mailto:supports@mediasearchgroup.com"
                  className="text-blue-500"
                >
                  info@virtualseoweb.com
                </a>
              </p>
              <p className="text-center text-sm md:text-base">
                Phone No:{" "}
                <a href="tel:+91 9450977593" className="text-blue-500">
                  +91 9450977593
                </a>
              </p>
            </div>

            {/* Career */}
            <div className="md:p-4 bg-gray-100 rounded-lg flex flex-col items-center">
              <img
                src="/career-icon.png"
                alt="Career"
                className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-md mb-4"
              />
              <h3 className="text-md md:text-lg font-semibold mb-2 text-center">
                Career
              </h3>
              <p className="mb-2 text-center text-sm md:text-base">
                Email:{" "}
                <a
                  href="mailto:career@mediasearchgroup.com"
                  className="text-blue-500"
                >
                  info@virtualseoweb.com
                </a>
              </p>
              <p className="text-center text-sm md:text-base">
                Phone No:{" "}
                <a href="tel:+91 9450977593" className="text-blue-500">
                  +91 9450977593
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-200">
        <ServicesSliderSection />
      </div>

    </div>
  );
};

export default ContactForm;
