import Image from "next/image";
import { cn } from "@/lib/utils";
import rack from "./blackwhite-removebg-preview.png";

export default function WhoWeAre() {
  return (
    <div id="about" className="min-h-screen w-full relative">
      {/* Background split */}
      <div className="h-[100vh] bg-gray-700" />

      {/* Bento Card Container */}
      <div className="absolute inset-0 p-4 md:p-8 lg:p-12 flex items-center">
        <div
          className={cn(
            "w-full relative overflow-hidden rounded-xl h-[80vh]",
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            "transform-gpu",
            "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full mt-10 z-50">
            <div className="absolute right-0 top-0 w-full md:w-[45%] h-[60%] md:h-[80%]">
              <Image
                src={rack}
                alt="Clothes hanging on rack"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <div className="z-10 flex flex-col gap-4 p-6 md:p-8 lg:p-12 mt-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-500 dark:text-neutral-500">
              WHO WE ARE
            </h1>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 flex w-full flex-col p-6 md:p-8 lg:p-12 bg-gray-700">
            <p className="text-base md:text-lg lg:text-xl text-white dark:text-neutral-400 max-w-2xl">
              Safewash, established in 2015, is Hyderabad&apos;s first premium
              laundry and dry-cleaning service. We combine exceptional customer
              service, advanced cleaning methods, and innovative technology to
              provide safe, efficient, and high-quality care for every garment.
              Our mission is to redefine fabric care excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
