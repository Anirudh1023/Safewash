"use client";

import React, { useState, useEffect } from "react";
import { User, Lock, MapPin, Phone, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useUserManagement,
  UserFormData,
  AddressDetails,
} from "../useUserManagement";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SuccessModal from "./SuccessModal";

interface AuthModalWithButtonProps {
  buttonText?: string;
  className?: string;
}

const AuthModalWithButton = ({
  buttonText = "Sign Up",
  className,
}: AuthModalWithButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    phoneNumber: "",
    password: "",
  });
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    formattedAddress: "",
    coordinates: {
      latitude: null,
      longitude: null,
    },
    buildingName: "",
    wing: "",
    flatNumber: "",
    floor: "",
    landmark: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { createUserWithAuth, createOrder, loading, error } =
    useUserManagement();
  const supabase = createClientComponentClient();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle address input changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUserWithAuth(formData, "user", addressDetails);
      if (result.success) {
        const order = await createOrder(formData.phoneNumber);
        if (order && order.success !== false) {
          setIsOpen(false);
          setIsSuccessModalOpen(true);
          // Reset form data
          setFormData({
            name: "",
            phoneNumber: "",
            password: "",
          });
          setAddressDetails({
            formattedAddress: "",
            coordinates: {
              latitude: null,
              longitude: null,
            },
            buildingName: "",
            wing: "",
            flatNumber: "",
            floor: "",
            landmark: "",
          });
        }
      }
    } catch (err) {
      console.error("Sign up error:", err);
      // Error is already handled by the hook
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode to get address from coordinates
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            setAddressDetails({
              ...addressDetails,
              formattedAddress: data.display_name || "",
              coordinates: {
                latitude,
                longitude,
              },
            });
          } catch (error) {
            console.error("Error fetching address:", error);
          }

          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLocationLoading(false);
    }
  };

  // Search for addresses
  const searchAddress = async () => {
    if (searchQuery.length < 3) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for address:", error);
    }
  };

  // Select address from search results
  const selectAddress = (result: any) => {
    setAddressDetails({
      ...addressDetails,
      formattedAddress: result.display_name,
      coordinates: {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      },
    });
    setSearchResults([]);
    setSearchQuery("");
  };

  // Effect for address search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchAddress();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "group relative w-60 md:w-72 cursor-pointer overflow-hidden border rounded-full bg-background p-2 md:p-4 text-center font-semibold transition-colors duration-300 hover:bg-[#0084b8]",
          className
        )}
      >
        <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {buttonText}
        </span>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 text-[#0084b8] items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
          <span>{buttonText}</span>
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
          <div className="relative z-50 w-full max-w-md p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
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
              Create an Account
            </h2>

            {/* Form */}
            <form onSubmit={handleSignUp}>
              {/* Display error from hook if any */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Address Section */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <button
                    type="button"
                    onClick={() => setMapVisible(!mapVisible)}
                    className="text-sm text-[#0084b8] hover:underline"
                  >
                    {mapVisible ? "Hide Map" : "Show Map"}
                  </button>
                </div>

                {/* Location Search */}
                <div className="mb-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-20 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="Search for an address"
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-[#0084b8] hover:text-[#006a94]"
                    >
                      {locationLoading ? "Loading..." : "Current"}
                    </button>
                  </div>

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="mt-1 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-zinc-800">
                      {searchResults.map((result) => (
                        <div
                          key={result.place_id}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer text-sm text-gray-800 dark:text-gray-200"
                          onClick={() => selectAddress(result)}
                        >
                          {result.display_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Map Visibility Toggle */}
                {mapVisible && (
                  <div className="mb-3 relative h-40 rounded-lg overflow-hidden">
                    {/* Placeholder for the map - in production you would use a proper map library */}
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        OpenStreetMap would be displayed here
                        {addressDetails.coordinates.latitude && (
                          <div className="text-xs">
                            Lat:{" "}
                            {addressDetails.coordinates.latitude.toFixed(4)},
                            Lon:{" "}
                            {addressDetails.coordinates.longitude?.toFixed(4)}
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* Formatted Address Display */}
                {addressDetails.formattedAddress && (
                  <div className="mb-3 p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
                    <p className="font-medium">Selected Address:</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {addressDetails.formattedAddress}
                    </p>
                  </div>
                )}

                {/* Additional Address Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="buildingName"
                      value={addressDetails.buildingName}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
                      placeholder="Building Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="wing"
                      value={addressDetails.wing}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
                      placeholder="Wing"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="flatNumber"
                      value={addressDetails.flatNumber}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
                      placeholder="Flat Number"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="floor"
                      value={addressDetails.floor}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
                      placeholder="Floor"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    name="landmark"
                    value={addressDetails.landmark}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-[#0084b8] focus:border-[#0084b8] bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm"
                    placeholder="Landmark"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-[#0084b8] hover:bg-[#006a94] text-white rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                Create Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        title="Order Created Successfully!"
        message="Your order has been created and is now being processed. Thank you for choosing our service."
      />
    </>
  );
};

export default AuthModalWithButton;
