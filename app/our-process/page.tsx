"use client";

import { useEffect} from "react";
import { Compare } from "./compare";
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import tag from "./tag.svg";
import cctv from "./cctv.svg";
import squareScissors from "./square-scissors.svg";
import dryclean from "./dryclean.svg";
import anvil from "./anvil.svg";
import shieldCheck from "./shield-check.svg";
import handHeart from "./hand-heart.svg";
import Before from "./before.jpeg";
import After from "./after.jpeg";
import FlickeringGrid from "./FlickeringGrid";

const AnimatedList = React.memo(
  ({
    className,
    children,
    delay = 1000,
  }: {
    className?: string;
    children: React.ReactNode;
    delay?: number;
  }) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    );

    useEffect(() => {
      if (index === childrenArray.length - 1) {
        const resetTimeout = setTimeout(() => {
          setIndex(0);
        }, delay * 2);
        return () => clearTimeout(resetTimeout);
      } else {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, delay);
        return () => clearTimeout(timeout);
      }
    }, [index, delay, childrenArray.length]);

    const itemsToShow = useMemo(() => {
      const result = childrenArray.slice(0, index + 1).reverse();
      return result;
    }, [index, childrenArray]);

    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <AnimatePresence mode="popLayout">
          {itemsToShow.map((item: React.ReactNode) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="w-full">
      {children}
    </motion.div>
  );
}

const ProcessStep = ({
  name,
  description,
  icon,
  color,
}: {
  name: string;
  description: string;
  icon: string;
  color: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-full min-h-[90px] rounded-xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        "bg-white shadow-md",
        "transform-gpu dark:bg-neutral-900 dark:border dark:border-neutral-800 "
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: color }}
        >
          <Image
            src={icon}
            alt={name}
            width={20}
            height={20}
            className="invert"
          />
        </div>
        <div className="flex flex-col justify-center">
          <figcaption className="text-base font-semibold text-gray-700 dark:text-white mb-1">
            {name}
          </figcaption>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const processSteps = [
  {
    name: "Garment Reception and Tagging",
    description:
      "Initial receipt of customer garments and labeling for tracking.",
    icon: tag,
    color: "#00C9A7",
  },
  {
    name: "Sorting and Spot Cleaning",
    description:
      "Categorizing garments by fabric type, cleaning method, and pre-treating visible stains.",
    icon: cctv,
    color: "#FFB800",
  },
  {
    name: "Repair and Preparation",
    description:
      "Fixing buttons, embellishments, and preparing garments for cleaning.",
    icon: squareScissors,
    color: "#FF3D71",
  },
  {
    name: "Dry Cleaning Process",
    description: "Main cleaning process using solvent.",
    icon: dryclean,
    color: "#1E86FF",
  },
  {
    name: "Pressing and Ironing",
    description: "Applying finishing touches to ensure garments are neat.",
    icon: anvil,
    color: "#9747FF",
  },
  {
    name: "Inspection and Quality Control",
    description: "Checking cleaned garments for quality and completeness.",
    icon: shieldCheck,
    color: "#00C9A7",
  },
  {
    name: "Customer Handover",
    description: "Final delivery of cleaned items with receipt verification.",
    icon: handHeart,
    color: "#FFB800",
  },
];

const iteratedSteps = Array.from({ length: 3 }, () => processSteps).flat();

const ProcessSec = () => {
  return (
    <section
      id="process"
      className="w-full bg-neutral-50 dark:bg-neutral-900 z-50 relative"
    >
      <div className="absolute inset-0 z-0">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.5}
          color="rgb(34, 197, 94)"
          maxOpacity={0.15}
          className="w-full h-full"
        />
      </div>
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left side: Process title and steps */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold mb-8 lg:hidden text-neutral-500 dark:text-neutral-500">
              OUR PROCESS
            </h2>
            <div className="flex gap-8">
              <div className="hidden lg:block">
                <div
                  className="rotate-180 text-6xl font-bold tracking-wide text-neutral-500 dark:text-neutral-500"
                  style={{ writingMode: "vertical-rl" }}
                >
                  OUR PROCESS
                </div>
              </div>
              <div className="h-[600px] overflow-hidden bg-transparent w-full">
                <AnimatedList delay={2000}>
                  {iteratedSteps.map((step, idx) => (
                    <ProcessStep {...step} key={idx} />
                  ))}
                </AnimatedList>
              </div>
            </div>
          </div>

          {/* Right side: Compare component */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[600px] relative">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Compare
                  firstImage={Before.src}
                  secondImage={After.src}
                  firstImageClassName="object-cover w-full h-full"
                  secondImageClassname="object-cover w-full h-full"
                  className="w-full h-full"
                  slideMode="hover"
                  autoplay={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSec;
