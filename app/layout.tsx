import React from "react";
import "./globals.css"; // Make sure this import is here to include the global styles
import Navbar from "./navbar/page";

export const metadata = {
  title: "Safewash",
  description: "TRUSTED SINCE 2015 FOR UNPARALLELED GARMENT CARE, QUALITY AND CONVENIENCE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-rubik antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
