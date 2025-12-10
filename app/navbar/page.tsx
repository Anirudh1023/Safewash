"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { InstallAppModal } from "@/components/ui/install-app-modal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Handle scroll transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "#about" },
    { name: "Services", path: "#services" },
    { name: "Blogs", path: "#blogs" },
    { name: "Pricing", path: "#pricing" },
    { name: "Contact", path: "#contact" },
  ];

  const handleScrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 pt-4"
    >
      <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-500 border-2 border-[#0084b8] ${isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-xl shadow-[#0084b8]/10"
          : "bg-white/20 backdrop-blur-lg border-opacity-40"
        }`}>
        <div className="flex justify-between items-center h-14 md:h-16 px-4 md:px-6">
          {/* Logo with Icon */}
          <motion.div
            className="flex-shrink-0 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/logo.png"
              alt="Safewash Logo"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <div>
              <span className={`font-semibold text-2xl md:text-3xl transition-colors duration-300 ${isScrolled ? "text-[#0084b8]" : "text-white drop-shadow-lg"
                }`}>
                SAFE
              </span>
              <span className={`font-semibold text-2xl md:text-3xl transition-colors duration-300 ${isScrolled ? "text-[#65A006]" : "text-white drop-shadow-lg"
                }`}>
                WASH
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) =>
              item.path.startsWith("#") ? (
                <motion.button
                  key={item.name}
                  onClick={() => handleScrollToSection(item.path)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium font-rubik transition-all duration-300 focus:outline-none ${isScrolled
                      ? "text-gray-700 hover:text-[#65A006]"
                      : "text-white hover:text-[#65A006]"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className={`absolute inset-0 rounded-full ${isScrolled ? "bg-gray-100" : "bg-white/20"
                      }`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ) : (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium font-rubik transition-all duration-300 inline-block focus:outline-none ${isScrolled
                        ? "text-gray-700 hover:text-[#65A006]"
                        : "text-white hover:text-[#65A006]"
                      }`}
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.span>
                    <motion.div
                      className={`absolute inset-0 rounded-full ${isScrolled ? "bg-gray-100" : "bg-white/20"
                        }`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              )
            )}

            {/* Schedule a Pickup Button */}
            <motion.button
              onClick={() => setIsInstallModalOpen(true)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`ml-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 border-2 ${isScrolled
                  ? "bg-white/60 backdrop-blur-md border-[#0084b8]/40 text-[#0084b8] hover:bg-[#0084b8]/10 hover:border-[#0084b8]/60"
                  : "bg-white/20 backdrop-blur-md border-white/40 text-white hover:bg-white/30 hover:border-white/60"
                }`}
            >
              Schedule a Pickup
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300 focus:outline-none ${isScrolled
                  ? "text-gray-800 bg-gray-100/50 backdrop-blur-sm"
                  : "text-white bg-white/20 backdrop-blur-sm"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
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
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-3xl bg-white/95 backdrop-blur-xl shadow-xl p-3 space-y-1">
              {navItems.map((item, index) =>
                item.path.startsWith("#") ? (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      handleScrollToSection(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-800 hover:bg-gradient-to-r hover:from-[#0084b8]/10 hover:to-[#65A006]/10 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    {item.name}
                  </motion.button>
                ) : (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className="block text-gray-800 hover:bg-gradient-to-r hover:from-[#0084b8]/10 hover:to-[#65A006]/10 px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 focus:outline-none"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install App Modal */}
      <InstallAppModal isOpen={isInstallModalOpen} onClose={() => setIsInstallModalOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
