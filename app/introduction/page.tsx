"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image1 from "@/public/assets/one.jpg";
import Image2 from "@/public/assets/two.jpg";
import Image3 from "@/public/assets/three.jpg";
import Image4 from "@/public/assets/four.jpg";
import Image5 from "@/public/assets/five.jpg";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import SparklesText from "@/components/ui/sparkles-text";

export default function ImagesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const images = [Image1.src, Image2.src, Image3.src, Image4.src, Image5.src];

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousIndex(currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
      {/* Base layer showing current static image with translucent overlay */}
      <div
        className="absolute inset-0 after:absolute after:inset-0 after:bg-black/40"
        style={{
          backgroundImage: `url(${images[previousIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Animated layer for next image with translucent overlay */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 after:absolute after:inset-0 after:bg-black/40"
          initial={{
            x: "100%",
            scale: 1,
          }}
          animate={{
            x: "0%",
            scale: 1,
            transition: {
              x: { duration: 3, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 3, ease: [0.4, 0, 0.2, 1] },
            },
          }}
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformOrigin: "center",
          }}
        />
      </AnimatePresence>

      {/* Content container - positioned on the right */}
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <motion.div className="text-6xl md:text-6xl text-left bg-clip-text font-semibold text-white dark:text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <SparklesText text="Hyderabad's First Premium Dry Cleaning Service" />
          </motion.div>
          <p className="font-rubik text-m md:text-2xl text-gray-300 dark:text-white py-3 md:py-5">
            TRUSTED SINCE 2015 FOR UNPARALLELED GARMENT CARE, QUALITY AND
            CONVENIENCE
          </p>

          <div className="flex">
            <InteractiveHoverButton buttonText="Schedule a pickup" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
