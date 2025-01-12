import React from "react";
import "./globals.css"; // Make sure this import is here to include the global styles
import Navbar from "./navbar/page";

export const metadata = {
  title: "My Next.js App",
  description: "Description of my app",
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
