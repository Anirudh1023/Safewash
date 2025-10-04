"use client";

import ImagesSlider from "./introduction/page";
import About from "./about-us/page";
import Footer from "./footer/page";
import Services from "./services/page";
import Process from "./our-process/page";
import Testimonials from "./testimonials/page";
import Blogs from "./blogs/page";
import Pricing from "./pricing/page";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section with Image Slider */}
      <ImagesSlider />

      {/* Dotted Separator - Blue */}
      <div className="w-full py-4 bg-gradient-to-b from-transparent via-white to-transparent">
        <div className="w-full border-t-2 border-dashed border-[#0084b8]/40"></div>
      </div>

      {/* About Section - Blue Theme */}
      <About />

      {/* Dotted Separator - Transitioning to Green */}
      <div className="w-full py-4 bg-gradient-to-b from-white to-white">
        <div className="w-full border-t-2 border-dashed border-[#65A006]/40"></div>
      </div>

      {/* Services - Green Theme */}
      <Services />

      {/* Dotted Separator - Transitioning to Blue */}
      <div className="w-full py-4 bg-gradient-to-b from-white to-white">
        <div className="w-full border-t-2 border-dashed border-[#0084b8]/40"></div>
      </div>

      {/* Process - Blue Theme */}
      <Process />

      {/* Dotted Separator - Transitioning to Green */}
      <div className="w-full py-4 bg-gradient-to-b from-white to-white">
        <div className="w-full border-t-2 border-dashed border-[#65A006]/40"></div>
      </div>

      {/* Testimonials - Green Theme */}
      <Testimonials />

      {/* Dotted Separator - Transitioning to Blue */}
      <div className="w-full py-4 bg-gradient-to-b from-white to-white">
        <div className="w-full border-t-2 border-dashed border-[#0084b8]/40"></div>
      </div>

      {/* Blogs - Blue Theme */}
      <Blogs />

      {/* Dotted Separator - Transitioning to Green */}
      <div className="w-full py-4 bg-gradient-to-b from-white to-white">
        <div className="w-full border-t-2 border-dashed border-[#65A006]/40"></div>
      </div>

      {/* Pricing - Green Theme */}
      <Pricing />

      {/* Dotted Separator - Final */}
      <div className="w-full py-4 bg-gradient-to-b from-white to-transparent">
        <div className="w-full border-t-2 border-dashed border-[#0084b8]/40"></div>
      </div>

      {/* Footer - Blue Theme */}
      <Footer />
    </main>
  );
}
