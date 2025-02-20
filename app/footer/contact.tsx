"use client";

import { FC } from "react";
import Image from "next/image";
import Play from "./Finalgoogle.png";
import Apple from "./Finalapple.png";
import Logo from "./LOGO.png";

const ContactSection: FC = () => {
  return (
    <footer
      id="contact"
      className="bg-gray-700 text-white py-4 sm:py-6 md:py-8 relative"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 md:gap-8">
          {/* Address Section */}
          <Image
            src={Logo}
            alt="Logo"
            className="w-[20%] h-auto rounded-xl"
            width={200}
            height={60}
          />
          <div className="w-full lg:w-1/3 space-y-3 md:space-y-4 text-center lg:text-left pl-3">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Safewash Dry Cleaners
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              A Unit of Safewash Cleaning Solutions
              <br />
              GST: 36AEHFS7200R1ZH
              <br className="hidden sm:block" />
              <span className="block sm:hidden my-1" />
              Address: 12-6-23/6/4, Opp. Kukatpally Bus Depot,
              <br className="hidden sm:block" />
              <span className="block sm:hidden my-1" />
              Moosapet, Hyderabad - 500081.
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              Phone:{" "}
              <a
                href="tel:8121999111"
                className="hover:text-blue-400 transition-colors"
              >
                8121999111
              </a>
              ,
              <a
                href="tel:9705678679"
                className="hover:text-blue-400 transition-colors"
              >
                9705678679
              </a>
              <br />
              Email:{" "}
              <a
                href="mailto:safewash123@gmail.com"
                className="hover:text-blue-400 transition-colors"
              >
                safewash123@gmail.com
              </a>
            </p>
          </div>

          {/* Navigation Links */}

          {/* App Store Links */}
          <div className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 pb-4 lg:pb-0 mt-5">
            <Image
              src={Play}
              alt="Get it on Google Play"
              className="w-[20%] h-auto rounded-xl"
              width={200}
              height={60}
            />

            <Image
              src={Apple}
              alt="Download on the App Store"
              className="w-[20%] h-auto rounded-xl"
              width={200}
              height={60}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
