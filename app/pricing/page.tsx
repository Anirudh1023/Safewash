"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./animated-modal";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import Price from "./Pricing.jpeg";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import FullscreenImage from "./magnifying-image"; // Add this import

export default function PricingModal() {
  return (
    <div
      id="pricing"
      className="pb-10 flex items-center justify-center bg-white z-5 relative"
    >
      <Modal>
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
            Experience premium dry cleaning and laundry services at prices
            you&apos;ll love!
            <br />
            Click below to know more.
          </h3>
          <ModalTrigger className="bg-[#65A006] dark:bg-white dark:text-black text-white flex justify-center group/modal-btn relative overflow-hidden px-6 py-2 rounded-md">
            <span className="group-hover/modal-btn:translate-x-32 text-center transition duration-500">
              View Pricing
            </span>
            <div className="absolute inset-0 -translate-x-32 group-hover/modal-btn:translate-x-0 flex items-center justify-center transition duration-500">
              <DollarSign className="h-5 w-5" />
            </div>
          </ModalTrigger>
        </div>

        <ModalBody className="w-[95%] md:w-[90%] lg:w-[85%] max-w-6xl max-h-[90vh] overflow-y-auto">
          <ModalContent className="p-4 md:p-6 flex flex-col">
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-6">
              Our{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Affordable
              </span>{" "}
              Pricing Plans
            </h4>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FullscreenImage src={Price.src} alt="pricing plans" />
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-4 items-start justify-center">
              <div className="flex items-center">
                <CheckIcon className="mr-2 text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Quality Assured
                </span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="mr-2 text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  On-Time Delivery
                </span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="mr-2 text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Free Pickup & Drop
                </span>
              </div>
            </div>
          </ModalContent>
          <div className="flex items-center justify-center gap-2 py-6">
            <InteractiveHoverButton buttonText="Schedule a pickup" />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};
