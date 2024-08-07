import Image from "next/image";
import React from "react";

function AboutSection() {
  return (
    <div className="px-0 bg-white">
      <div className="relative flex flex-col md:flex-row gap-0 items-stretch p-0 bg-white">
        {/* Image Section */}
        <div className="relative flex justify-center flex-1">
          <Image
            src="/homepage/8.jpg"
            alt="Description"
            className="w-full h-full object-cover"
            width={500}
            height={300} // Adjust height to ensure it matches card height
          />
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-0 p-0 flex-1">
          {/* Card 1 */}
          <div className="bg-black p-14 shadow-lg flex flex-col items-center text-center w-full h-[360px]">
            <Image
              src="/homepage/6l.svg"
              alt="Icon 1"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">Card Title 1</h3>
            <p className="text-white">Card content goes here. This is an example of a card with some text.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-800 p-14 shadow-lg flex flex-col items-center text-center w-full h-[360px]">
            <Image
              src="/homepage/6l.svg"
              alt="Icon 2"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">Card Title 2</h3>
            <p className="text-white">Card content goes here. This is an example of a card with some text.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-800 p-14 shadow-lg flex flex-col items-center text-center w-full h-[355px]">
            <Image
              src="/homepage/6l.svg"
              alt="Icon 3"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">Card Title 3</h3>
            <p className="text-white">Card content goes here. This is an example of a card with some text.</p>
          </div>
          {/* Card 4 */}
          <div className="bg-black p-14 shadow-lg flex flex-col items-center text-center w-full h-[355px]">
            <Image
              src="/homepage/6l.svg"
              alt="Icon 4"
              className="w-16 h-16 mb-4"
              width={64}
              height={64}
            />
            <h3 className="text-2xl font-bold text-white mb-4">Card Title 4</h3>
            <p className="text-white">Card content goes here. This is an example of a card with some text.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
