import Image from "next/image";
import React from "react";

function InfoSection() {
  return (
    <div className="px-40 bg-white">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-40 bg-white">
        <div className="relative flex justify-center">
          <Image
            src="/homepage/8.jpg"
            alt="Description"
            className="w-full h-auto rounded-lg"
            width={500}
            height={200}
          />
          <div className="absolute bottom-[10%] right-[-10%] w-72 h-48 bg-white text-white p-4 rounded-lg shadow-lg">
            <div className="flex">
              <Image
                src="/homepage/f1-200x206.jpg"
                alt="Description"
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
              />
              <Image
                src="/homepage/f1-200x206.jpg"
                alt="Description"
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
              />
              <Image
                src="/homepage/f1-200x206.jpg"
                alt="Description"
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
              />
              <Image
                src="/homepage/f1-200x206.jpg"
                alt="Description"
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
              />
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                {/* Star icons */}
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-gray-400">★</span>
              </div>
              <span className="text-sm text-black">4.0/5.0</span>
            </div>
            <p className="mt-4 text-center text-black"> From +5000 reviews</p>
          </div>
        </div>
        <div className="p-6 pl-40">
          <div className="text-container">
            <p className="text-xl font-bold text-black">
              <ul style={{ listStyleType: "disc" }}>
                <li>Designed for Developers</li>
              </ul>
            </p>
            <p className="p-5 text-4xl font-bold text-black ml-10">
              Powerful and Easy
            </p>
          </div>
          <p className="text-black">
            Our platform is tailor-made for developers, providing a powerful and
            easy-to-use solution. With our tools, you can streamline your
            development process and achieve better outcomes. We offer a range of
            features that enable you to create robust applications quickly and
            efficiently.
          </p>
          <ul style={{ listStyleType: "disc" }} className="text-black mt-10">
            <li>Our platform places emphasis on user experience.</li>
            <li>Building a website, mobile app or software.</li>
            <li>Our platform is designed to help you.</li>
            <li>Achieve your goals and exceed expectations.</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="bg-white flex space-x-4 p-5 px-40">
        <div className="flex flex-col items-center  p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>

        <div className="flex flex-col items-center  p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>

        <div className="flex flex-col items-center  p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>

        <div className="flex flex-col items-center  p-4">
          <Image
            src="/homepage/serv11.svg"
            alt="Description"
            className="w-10 h-10 rounded-full"
            width={96}
            height={96}
          />
          <p className="mt-4 text-2xl font-bold text-black">
            Powerful and Easy
          </p>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Description goes here. This is a brief description of the section.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
