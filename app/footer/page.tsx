"use client";

import { FC } from "react";
import Link from "next/link";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="bg-gray-100 py-4 sm:py-6 border-t relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Policies Section */}
        <nav className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-4">
          <Link
            href="/policies"
            className="text-gray-800 text-sm sm:text-base hover:underline hover:text-gray-600 transition-colors whitespace-nowrap text-center"
          >
            Terms and Conditions
          </Link>
          <Link
            href="/policies"
            className="text-gray-800 text-sm sm:text-base hover:underline hover:text-gray-600 transition-colors whitespace-nowrap text-center"
          >
            Return and Refund Policy
          </Link>
          <Link
            href="/policies"
            className="text-gray-800 text-sm sm:text-base hover:underline hover:text-gray-600 transition-colors whitespace-nowrap text-center"
          >
            Privacy Policy
          </Link>
          <Link
            href="/policies"
            className="text-gray-800 text-sm sm:text-base hover:underline hover:text-gray-600 transition-colors whitespace-nowrap text-center"
          >
            Shipment and Payment Policy
          </Link>
        </nav>

        {/* Horizontal Line */}
        <div className="w-full max-w-2xl h-px bg-gray-300 my-4" />

        {/* Made by Text */}
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Designed and Developed by{" "}
          <a
            href="https://digilore.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-gray-800 transition-colors"
          >
            DigiLore.AI
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
