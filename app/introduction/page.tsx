"use client";

import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Image1 from "@/public/assets/one.jpg";
import Image2 from "@/public/assets/two.jpg";
import Image3 from "@/public/assets/three.jpg";
import Image4 from "@/public/assets/four.jpg";
import Image5 from "@/public/assets/five.jpg";
import bg from "@/public/assets/safewashFinal.png";
import { WaterFillButton } from "@/components/ui/WaterFillButton";
import SparklesText from "@/components/ui/sparkles-text";
import { Apple, PlayCircle } from "lucide-react";
import { AuthModal } from "@/components/ui/auth-modal";

export default function ImagesSlider() {
  const container = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const controls = useAnimation();
  const zoomControls = useAnimation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const images = [Image1, bg, Image2, bg, Image3, bg, Image4, bg, Image5, bg];

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0vh", "-15vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  useEffect(() => {
    const slideNext = async () => {
      // Animate image reveal with clipPath and zoom
      await Promise.all([
        controls.start({
          clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
          transition: { duration: 1.8, ease: [0.65, 0, 0.35, 1] },
        }),
        zoomControls.start({
          scale: [1.15, 1],
          transition: { duration: 2.2, ease: [0.65, 0, 0.35, 1] },
        }),
      ]);

      // Update indices
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setNextIndex((prev) => (prev + 1) % images.length);

      // Reset for next animation
      controls.set({ clipPath: "inset(0 100% 0 0)" });
      zoomControls.set({ scale: 1.15 });
    };

    const interval = setInterval(slideNext, 5000);
    return () => clearInterval(interval);
  }, [controls, zoomControls, images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden" ref={container}>
      <motion.div style={{ y }} className="relative h-full">
        {/* Current Image with Enhanced Gradient Overlay */}
        <div className="absolute inset-0">
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        </div>

        {/* Next Image with ClipPath Reveal and Zoom Animation */}
        <motion.div
          className="absolute inset-0"
          animate={controls}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <motion.div
            className="w-full h-full relative"
            animate={zoomControls}
            initial={{ scale: 1.15 }}
          >
            <Image
              src={images[nextIndex]}
              alt={`Slide ${nextIndex + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
          </motion.div>
        </motion.div>

        {/* Content Container with Parallax Scaling */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-20">
          <motion.div
            style={{
              y: contentY,
              scale,
              opacity,
            }}
            className="space-y-5 md:space-y-7 max-w-6xl"
          >
            {/* Animated Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-left font-bold text-white leading-tight">
                <SparklesText text="Hyderabad's First Premium Dry Cleaning Service" />
              </motion.div>
              <p className="font-rubik text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl mt-4">
                TRUSTED SINCE 2015 FOR UNPARALLELED GARMENT CARE, QUALITY AND
                CONVENIENCE
              </p>
            </motion.div>

            {/* Button and App Store Icons Container */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
              <WaterFillButton variant="primary" onClick={() => setIsAuthModalOpen(true)}>
                Schedule a Pickup
              </WaterFillButton>

              {/* Glassomorphic App Store Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-3"
              >
                {/* Play Store */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-dashed border-white/20 hover:bg-white/20 hover:border-white/40 transition-all shadow-lg"
                >
                  <PlayCircle size={20} className="text-white" />
                  <span className="text-white text-sm font-medium hidden md:block">
                    Play Store
                  </span>
                </motion.a>

                {/* App Store */}
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-dashed border-white/20 hover:bg-white/20 hover:border-white/40 transition-all shadow-lg"
                >
                  <Apple size={20} className="text-white" />
                  <span className="text-white text-sm font-medium hidden md:block">
                    App Store
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
