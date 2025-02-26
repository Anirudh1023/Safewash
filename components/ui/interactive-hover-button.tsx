"use client";

import React, { useState } from "react";
import { ArrowRight, Phone, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallModalWithButtonProps {
  buttonText?: string;
  className?: string;
  phoneNumber?: string;
}

const CallModalWithButton = ({
  buttonText = "Contact Us",
  className,
  phoneNumber = "+91 8121999111",
}: CallModalWithButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber.replace(/[^0-9+]/g, "")}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative w-60 md:w-72 cursor-pointer overflow-hidden border rounded-full bg-background p-2 md:p-4 text-center font-semibold transition-colors duration-300 hover:bg-[#0084b8]",
          className
        )}
      >
        <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {buttonText}
        </span>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 text-[#0084b8] items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
          <span>{buttonText}</span>
          <ArrowRight />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-50 w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Contact Us
            </h2>

            {/* Call Section */}
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <Phone size={48} className="text-[#0084b8]" />
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Call us for immediate assistance
              </p>
              <p className="text-xl font-bold text-[#0084b8] mb-4">
                {phoneNumber}
              </p>
              <button
                onClick={handleCallClick}
                className="w-full py-3 px-4 bg-[#0084b8] hover:bg-[#006a94] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </button>
            </div>

            {/* Download App Section */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Download size={48} className="text-[#0084b8]" />
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                Download our app for personalized orders
              </p>
              <div className="flex gap-4 justify-center">
                <button className="flex-1 py-3 px-2 bg-black text-white rounded-lg font-medium transition-colors hover:bg-gray-800">
                  App Store
                </button>
                <button className="flex-1 py-3 px-2 bg-[#0084b8] hover:bg-[#006a94] text-white rounded-lg font-medium transition-colors">
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CallModalWithButton;
