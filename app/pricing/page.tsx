"use client";
import React, { useState } from "react";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "./animated-modal";
import { motion } from "framer-motion";
import Price from "./Pricing.jpeg";
import { WaterFillButton } from "@/components/ui/WaterFillButton";
import FullscreenImage from "./magnifying-image";
import { AuthModal } from "@/components/ui/auth-modal";

export default function PricingModal() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <div
      id="pricing"
      className="py-24 flex items-center justify-center bg-gradient-to-b from-white via-[#E8F5E9] via-[#C8E6C9] to-white z-5 relative"
    >
      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #65A006 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <Modal>
        <div className="flex flex-col items-center justify-center text-center px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#65A006] mb-6">
            PRICING
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-8">
            Experience premium dry cleaning and laundry services at prices
            you&apos;ll love! Click below to know more.
          </p>
          <ModalTrigger className="relative overflow-hidden px-8 py-3 text-lg rounded-2xl font-semibold border-2 border-dashed border-[#65A006] text-[#65A006] hover:bg-[#65A006] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
            View Pricing
          </ModalTrigger>
        </div>

        <ModalBody className="w-[95%] md:w-[90%] lg:w-[85%] max-w-6xl max-h-[90vh] overflow-y-auto">
          <ModalContent className="p-4 md:p-6 flex flex-col">
            <h4 className="text-2xl md:text-3xl text-[#65A006] font-light text-center mb-8">
              OUR AFFORDABLE PRICING PLANS
            </h4>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl overflow-hidden border-2 border-dashed border-[#65A006]/30 bg-white/70 backdrop-blur-xl p-4 shadow-2xl shadow-[#65A006]/20"
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
            <WaterFillButton variant="primary" onClick={() => setIsAuthModalOpen(true)}>
              Schedule a Pickup
            </WaterFillButton>
          </div>
        </ModalBody>
      </Modal>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
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
