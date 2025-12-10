"use client";

import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: FC = () => {
  const policies = [
    { name: "Terms and Conditions", href: "/policies" },
    { name: "Return and Refund Policy", href: "/policies" },
    { name: "Privacy Policy", href: "/policies" },
    { name: "Shipment and Payment Policy", href: "/policies" },
  ];

  const contactInfo: Array<{ icon: React.ElementType; text: string; href?: string }> = [
    { icon: Phone, text: "8121999111", href: "tel:8121999111" },
    { icon: Mail, text: "safewash123@gmail.com", href: "mailto:safewash123@gmail.com" },
    { icon: MapPin, text: "Phase-1, IDA, Patancheru, Telangana - 502319" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-white via-[#E3F2FD] via-[#BBDEFB] to-white py-16 sm:py-20 overflow-hidden">
      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #0084b8 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#0084b8]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0084b8]/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border-2 border-[#0084b8]/40 bg-white/70 backdrop-blur-xl p-8 md:p-12 lg:p-16 shadow-2xl shadow-[#0084b8]/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Logo and Description */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-normal text-3xl sm:text-4xl text-[#0084b8]">SAFE</span>
                  <span className="font-normal text-3xl sm:text-4xl text-[#65A006]">WASH</span>
                </div>
                <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                  Safewash Dry Cleaners
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mt-1">
                  A Unit of Safewash Cleaning Solutions
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                  GST: 36AEHFS7200R1ZH
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                  Experience the finest garment care with advanced cleaning methods and exceptional service since 2015.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl font-semibold text-[#0084b8]"
              >
                Quick Links
              </motion.h3>
              <motion.nav
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {policies.map((policy) => (
                  <Link
                    key={policy.name}
                    href={policy.href}
                    className="group relative inline-block w-fit text-gray-600 text-sm font-medium transition-all duration-300"
                  >
                    <span className="relative z-10 group-hover:text-[#0084b8] transition-colors duration-300">
                      {policy.name}
                    </span>
                    <motion.div
                      className="absolute -left-2 -right-2 -top-1 -bottom-1 bg-[#0084b8]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      whileHover={{ scale: 1.05 }}
                    />
                  </Link>
                ))}
              </motion.nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl font-semibold text-[#0084b8]"
              >
                Get in Touch
              </motion.h3>
              <motion.div
                className="flex flex-col space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-[#0084b8]/30 group-hover:border-[#0084b8]/60 transition-all duration-300">
                      <info.icon className="h-5 w-5 text-[#0084b8]" />
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 text-sm font-medium hover:text-[#0084b8] transition-colors duration-300"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-600 text-sm font-medium">
                        {info.text}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-[#0084b8]/30 to-transparent my-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Made by */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-md border-2 border-[#0084b8]/30 shadow-lg"
            >
              <p className="text-gray-700 text-sm font-medium">
                Designed and Developed by{" "}
                <motion.a
                  href="https://digilore.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold bg-gradient-to-r from-[#0084b8] to-[#65A006] bg-clip-text text-transparent hover:from-[#65A006] hover:to-[#0084b8] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  DigiLore.AI
                </motion.a>
              </p>
            </motion.div>

            {/* Copyright */}
            <motion.p
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              © {new Date().getFullYear()} Safewash. All rights reserved.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
