"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface WaterFillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

export const WaterFillButton: React.FC<WaterFillButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const waterColor = variant === "primary" ? "#0084b8" : "#65A006";

  // Generate bubbles once to avoid hydration issues
  const bubbles = useMemo(() => [
    { id: 0, width: 6, height: 6, left: 15, delay: 0, duration: 2 },
    { id: 1, width: 8, height: 8, left: 30, delay: 0.1, duration: 2.5 },
    { id: 2, width: 5, height: 5, left: 45, delay: 0.2, duration: 1.8 },
    { id: 3, width: 7, height: 7, left: 60, delay: 0.3, duration: 2.2 },
    { id: 4, width: 6, height: 6, left: 75, delay: 0.4, duration: 2.8 },
    { id: 5, width: 9, height: 9, left: 20, delay: 0.5, duration: 2.4 },
    { id: 6, width: 5, height: 5, left: 85, delay: 0.15, duration: 2.6 },
    { id: 7, width: 7, height: 7, left: 50, delay: 0.35, duration: 2.1 },
  ], []);

  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-2xl font-semibold border-2 border-dashed ${className}`}
      style={{
        backgroundColor: "transparent",
        borderColor: waterColor,
        color: waterColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Water fill effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: waterColor,
        }}
        initial={{ y: "100%" }}
        animate={{
          y: isHovered ? "0%" : "100%",
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Wave effect on top of water */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-4 opacity-30"
          style={{
            background: `linear-gradient(to bottom, transparent, ${waterColor})`,
          }}
          animate={{
            x: isHovered ? ["-100%", "100%"] : "0%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Bubbles */}
      {isHovered &&
        bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full z-10"
            style={{
              width: bubble.width,
              height: bubble.height,
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              left: `${bubble.left}%`,
              bottom: 0,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [-50, -100, -150],
              opacity: [0, 1, 0],
              x: [0, (bubble.id % 2 === 0 ? 10 : -10), (bubble.id % 2 === 0 ? 15 : -15)],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Button text */}
      <span
        className="relative z-20 transition-colors duration-300"
        style={{
          color: isHovered ? "white" : waterColor,
        }}
      >
        {children}
      </span>
    </motion.button>
  );
};
