"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Input } from "./Input";
import { cn } from "@/lib/utils";

interface AuthModalWithButtonProps {
  buttonText?: string;
  className?: string;
}

const AuthModalWithButton = ({
  buttonText = "Sign In / Sign Up",
  className,
}: AuthModalWithButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your signup logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your signin logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative w-60 md:w-72 cursor-pointer overflow-hidden border rounded-full  bg-background p-2 md:p-4 text-center font-semibold transition-colors duration-300 hover:bg-[#0084b8]",
          className
        )}
      >
        <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {buttonText}
        </span>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 text-[#0084b8] items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
          <span>{buttonText}</span>
          <ArrowRight />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-50 w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Welcome
            </h2>

            {/* Tab buttons */}
            <div className="flex mb-6 space-x-2">
              <button
                onClick={() => setIsSignIn(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isSignIn
                    ? "bg-[#0084b8] text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !isSignIn
                    ? "bg-[#0084b8] text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Forms */}
            {isSignIn ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-[#0084b8] hover:bg-[#006a94] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-[#0084b8] hover:bg-[#006a94] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? "Loading..." : "Sign Up"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModalWithButton;
