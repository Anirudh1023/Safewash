import Image from "next/image";
import { cn } from "@/lib/utils";
import rack from "./blackwhite-removebg-preview.png";

export default function WhoWeAre() {
  return (
    <div id="about" className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-white via-[#E3F2FD] via-[#BBDEFB] to-white">
      {/* Dotted pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #0084b8 2px, transparent 2px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Bento Card Container */}
      <div className="relative p-4 md:p-8 lg:p-12 flex items-center min-h-screen">
        <div
          className={cn(
            "w-full relative overflow-hidden rounded-3xl h-[80vh]",
            "backdrop-blur-xl bg-white/70",
            "border-2 border-dashed border-[#0084b8]",
            "transform-gpu hover:scale-[1.005] transition-all duration-500",
            "dark:bg-gray-900/40 dark:border-[#0084b8]",
            "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-40",
            "[transform-style:preserve-3d]",
            "shadow-[0_10px_40px_-10px_rgba(0,132,184,0.15)]"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full mt-10 z-10">
            <div className="absolute right-0 top-0 w-full md:w-[45%] h-[60%] md:h-[80%] opacity-90">
              <Image
                src={rack}
                alt="Clothes hanging on rack"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <div className="relative z-20 flex flex-col gap-4 p-6 md:p-8 lg:p-12 mt-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-[#0084b8] dark:text-[#0084b8]">
              WHO WE ARE
            </h1>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 flex w-full flex-col p-6 md:p-8 lg:p-12 bg-gradient-to-t from-[#0084b8]/30 via-[#0084b8]/20 to-transparent backdrop-blur-md rounded-b-3xl z-20 border-t-2 border-dashed border-[#0084b8]">
            <p className="text-base md:text-lg lg:text-xl font-medium text-gray-800 dark:text-white max-w-2xl leading-relaxed">
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
