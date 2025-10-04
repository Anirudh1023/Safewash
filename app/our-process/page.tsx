"use client";

import { Compare } from "./compare";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Tag,
  Eye,
  Scissors,
  Sparkles,
  Flame,
  ShieldCheck,
  HandHeart,
  type LucideIcon
} from "lucide-react";
import Before from "./before.jpeg";
import After from "./after.jpeg";

const ProcessStep = ({
  name,
  description,
  icon: Icon,
  index,
}: {
  name: string;
  description: string;
  icon: LucideIcon;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative rounded-2xl p-6",
        "bg-white/70 backdrop-blur-xl",
        "border-2 border-dashed border-[#0084b8]/30",
        "transition-all duration-300",
        "hover:bg-white/90 hover:border-[#0084b8]/60",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#0084b8]/30"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            "bg-white/60 backdrop-blur-sm border-2 border-dashed border-[#0084b8]/30",
            "group-hover:bg-[#0084b8]/20 group-hover:border-[#0084b8]/50",
            "transition-all duration-300"
          )}
        >
          <Icon className="h-6 w-6 text-[#0084b8] group-hover:text-[#0084b8] transition-colors" strokeWidth={2} />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const processSteps = [
  {
    name: "Garment Reception and Tagging",
    description:
      "Initial receipt of customer garments and labeling for tracking.",
    icon: Tag,
  },
  {
    name: "Sorting and Spot Cleaning",
    description:
      "Categorizing garments by fabric type, cleaning method, and pre-treating visible stains.",
    icon: Eye,
  },
  {
    name: "Repair and Preparation",
    description:
      "Fixing buttons, embellishments, and preparing garments for cleaning.",
    icon: Scissors,
  },
  {
    name: "Dry Cleaning Process",
    description: "Main cleaning process using solvent.",
    icon: Sparkles,
  },
  {
    name: "Pressing and Ironing",
    description: "Applying finishing touches to ensure garments are neat.",
    icon: Flame,
  },
  {
    name: "Inspection and Quality Control",
    description: "Checking cleaned garments for quality and completeness.",
    icon: ShieldCheck,
  },
  {
    name: "Customer Handover",
    description: "Final delivery of cleaned items with receipt verification.",
    icon: HandHeart,
  },
];

const ProcessSec = () => {
  return (
    <section
      id="process"
      className="w-full relative overflow-hidden bg-gradient-to-b from-white via-[#E3F2FD] via-[#BBDEFB] to-white"
    >
      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #0084b8 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="container mx-auto px-4 py-24 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left side: Process title and steps */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl font-light mb-8 lg:hidden text-[#0084b8]">
              OUR PROCESS
            </h2>
            <div className="flex gap-8">
              <div className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="rotate-180 text-6xl font-light tracking-wide text-[#0084b8]"
                  style={{ writingMode: "vertical-rl" }}
                >
                  OUR PROCESS
                </motion.div>
              </div>

              <div className="w-full">
                <div className="grid grid-cols-1 gap-4">
                  {processSteps.map((step, idx) => (
                    <ProcessStep {...step} key={idx} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Compare component */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-[600px] lg:sticky lg:top-24"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-dashed border-[#0084b8]/30 shadow-2xl shadow-[#0084b8]/20">
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSec;
