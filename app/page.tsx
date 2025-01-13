"use client";

import ImagesSlider from "./introduction/page";
import About from "./about-us/page";
import Footer from "./footer/page";
import Services from "./services/page";
import Process from "./our-process/page";
import Testimonials from "./testimonials/page";
import Blogs from "./blogs/page";
import Contact from "./footer/contact";
import Pricing from "./pricing/page";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section with Image Slider */}
      <ImagesSlider />
      {/* Spacer to push content below fixed hero */}
      <div className="h-screen w-full" />

      {/* About Section */}
      <About />

      <Services />

      <Process />

      <Testimonials />

      <Blogs />

      <Pricing />

      <Contact />

      <Footer />
    </main>
  );
}
