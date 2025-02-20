import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FullscreenImageProps {
  src: string;
  alt: string;
  className?: string;
}

const FullscreenImage: React.FC<FullscreenImageProps> = ({
  src,
  alt,
  className = "",
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div
        className={`relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden cursor-pointer ${className}`}
        onClick={() => setIsFullscreen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
        />
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-[90vw] h-[90vh]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                priority
                sizes="90vw"
              />
            </motion.div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
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
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FullscreenImage;
