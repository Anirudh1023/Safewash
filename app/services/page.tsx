"use client";

import React from "react";
import Image from "next/image";
import { Timeline } from "./timeline";

import Laundry from "./laundry.png";
import DryCleaning from "./drycleaning.png";
import ShoeHandbag from "./shoe-handbag.png";
import CurtainCarpet from "./curtain-carpet.png";

import laundry from "./Laundry.svg";
import dryCleaning from "./dryclean.svg";
import shoeHandbag from "./bag.svg";
import curtainCarpet from "./curtains.svg";

interface ServiceContent {
  title: string;
  content: React.ReactNode;
  icon: string;
}

export function Services() {
  const timelineData: ServiceContent[] = [
    {
      title: "LAUNDRY",
      icon: laundry,
      content: (
        <div className="space-y-12">
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal max-w-3xl">
            At Safewash, we offer efficient, affordable laundry services to
            simplify your daily routine. Our commitment includes careful garment
            handling, tailored cleaning methods, and use of imported,
            bacteria-free detergents. With advanced machines and expert
            technicians, we tackle everything from delicate fabrics to tough
            stains, ensuring your clothes always look and smell fresh.
          </p>
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl">
            <Image
              src={Laundry}
              alt="Laundry Services"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      ),
    },
    {
      title: "DRY CLEANING",
      icon: dryCleaning,
      content: (
        <div className="space-y-12">
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal max-w-3xl">
            We care as much about your clothes as you do, using the gentlest and
            most effective dry-cleaning methods to make them clean, fresh, and
            ready to wear. Our premium dry-cleaning service ensures every item
            undergoes a rigorous quality check, handled by experienced pressers.
            Minor repairs are included at no extra charge.
          </p>
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl">
            <Image
              src={DryCleaning}
              alt="Dry Cleaning Services"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      ),
    },
    {
      title: "HANDBAG, SHOE & LEATHER REVIVAL",
      icon: shoeHandbag,
      content: (
        <div className="space-y-12">
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal max-w-3xl">
            At Safewash Drycleaners, we specialize in expert care for your
            leather items, handbags, and shoes. Using advanced techniques and
            high-quality products, we restore the beauty and extend the lifespan
            of your valuables. Our leather cleaning services ensure your items
            are handled with precision, preserving their elegance for years to
            come.
          </p>
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl">
            <Image
              src={ShoeHandbag}
              alt="Leather Care Services"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      ),
    },
    {
      title: "CARPET & CURTAIN REFRESH",
      icon: curtainCarpet,
      content: (
        <div className="space-y-12">
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal max-w-3xl">
            Carpets and curtains trap dust, odour, hair, smoke, and allergens
            that can affect your health. Our skilled team specializes in
            cleaning all types of carpets, curtains, and blinds, using tailored
            methods to ensure a thorough clean. We also offer a convenient
            take-down and re-hang service for your convenience.
          </p>
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl">
            <Image
              src={CurtainCarpet}
              alt="Carpet and Curtain Cleaning"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      id="services"
      className="w-full min-h-screen bg-gray-700 dark:bg-neutral-950 z-50 relative py-24 px-5 md:px-10 lg:px-24"
    >
      <div className="max-w-[1800px] mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl">
        <div className="w-full min-h-[80vh] p-8 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-500 dark:text-neutral-500 mb-12">
              Our Services
            </h1>
            <p className="text-neutral-700 dark:text-neutral-300 text-xl md:text-2xl lg:text-3xl max-w-4xl mb-24">
              Experience premium care for all your garments and home furnishings
              with our comprehensive cleaning services.
            </p>
          </div>
          <Timeline data={timelineData} />
        </div>
      </div>
    </div>
  );
}