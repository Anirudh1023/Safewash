"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Loader2, Phone, Lock, User, CheckCircle, AlertCircle } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface GeocodingResult {
  place_id: number;
  display_name: string;
  address: {
    building?: string;
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  lat: string;
  lon: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login form state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("safewash123");
  const [addressSearch, setAddressSearch] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({
    block_name: "",
    street_name: "",
    area: "",
    city: "",
    label: "Home",
  });

  // Address search state
  const [addressSuggestions, setAddressSuggestions] = useState<GeocodingResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setMode("login");
      setError(null);
      setSuccess(null);
      setLoginPhone("");
      setLoginPassword("");
      setSignupName("");
      setSignupPhone("");
      setSignupPassword("safewash123");
      setAddressSearch("");
      setSelectedAddress({
        block_name: "",
        street_name: "",
        area: "",
        city: "",
        label: "Home",
      });
    }
  }, [isOpen]);

  // Debounced geocoding search
  useEffect(() => {
    if (!addressSearch || addressSearch.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const searchTimeout = setTimeout(() => {
      searchAddress(addressSearch);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [addressSearch]);

  const searchAddress = async (query: string) => {
    setIsSearchingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `format=json&` +
        `addressdetails=1&` +
        `limit=10&` +
        `countrycodes=in&` +
        `viewbox=78.15,17.65,78.75,17.15&` +
        `bounded=0`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "SafewashWebsite/1.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Geocoding search failed");
      }

      const results: GeocodingResult[] = await response.json();

      const filteredResults = results.filter((result) => {
        const addr = result.address;
        const isHyderabad =
          addr.city?.toLowerCase().includes("hyderabad") ||
          addr.state_district?.toLowerCase().includes("hyderabad") ||
          result.display_name.toLowerCase().includes("hyderabad") ||
          addr.state?.toLowerCase() === "telangana";
        return isHyderabad;
      });

      const finalResults = filteredResults.length > 0 ? filteredResults : results.slice(0, 10);
      setAddressSuggestions(finalResults);
      setShowSuggestions(finalResults.length > 0);
    } catch (error) {
      console.error("Address search error:", error);
      setAddressSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsSearchingAddress(false);
    }
  };

  const handleSelectAddress = (result: GeocodingResult) => {
    const addr = result.address;
    const blockName = addr.building || addr.house_number || "";
    const streetName = addr.road || "";
    const area = addr.neighbourhood || addr.suburb || addr.city || "";
    const city = addr.city || "Hyderabad";

    setAddressSearch(result.display_name);
    setSelectedAddress({
      block_name: blockName,
      street_name: streetName,
      area: area,
      city: city,
      label: "Home",
    });
    setShowSuggestions(false);
  };

  const handleLogin = async () => {
    setError(null);
    setSuccess(null);

    if (!loginPhone || !loginPassword) {
      setError("Please fill all fields");
      return;
    }

    if (!/^[0-9]{10}$/.test(loginPhone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = `+91-${loginPhone}`;

      // Check if user exists with phone and password
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("phone", formattedPhone)
        .eq("password", loginPassword)
        .eq("role", "user")
        .single();

      if (userError || !userData) {
        throw new Error("Invalid phone number or password");
      }

      if (!userData.default_address) {
        throw new Error("User account found but no address configured. Please contact support.");
      }

      // Create order for the user
      // Generate a unique order number
      const orderNumber = `SW${Date.now().toString().slice(-8)}`;

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            order_number: orderNumber,
            user_id: userData.id,
            pickup_address_id: userData.default_address,
            status: "created",
            pickup_status: "pending",
            drop_status: "pending",
            payment_status: "pending",
            total_amount: 0,
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error(`Failed to create order: ${orderError.message || JSON.stringify(orderError)}`);
      }

      console.log("Order created successfully:", orderData);

      setSuccess("🎉 Order created successfully! We'll contact you shortly.");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Login error details:", error);
      let errorMessage = "Login failed. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message || JSON.stringify(error);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError(null);
    setSuccess(null);

    if (!signupName || !signupPhone || !signupPassword || !selectedAddress.area) {
      setError("Please fill all required fields including address");
      return;
    }

    if (!/^[0-9]{10}$/.test(signupPhone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = `+91-${signupPhone}`;

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("phone", formattedPhone)
        .single();

      if (existingUser) {
        throw new Error("User with this phone number already exists. Please login.");
      }

      // 1. Create auth user
      const email = `${formattedPhone.replace(/\+|-/g, "")}@safewash.com`;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: signupPassword,
        options: {
          data: {
            phone: formattedPhone,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Failed to create auth user");
      }

      // 2. Create user record
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([
          {
            name: signupName,
            phone: formattedPhone,
            role: "user",
            status: "active",
            auth_user_id: authData.user.id,
            password: signupPassword,
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      // 3. Create address
      const { data: addressData, error: addressError } = await supabase
        .from("addresses")
        .insert([
          {
            user_id: userData.id,
            block_name: selectedAddress.block_name,
            street_name: selectedAddress.street_name,
            area: selectedAddress.area,
            city: selectedAddress.city,
            label: selectedAddress.label,
            lat: 17.385,
            lng: 78.4867,
            is_default: true,
          },
        ])
        .select()
        .single();

      if (addressError) throw addressError;

      // 4. Update user with default address
      const { error: updateError } = await supabase
        .from("users")
        .update({ default_address: addressData.id })
        .eq("id", userData.id);

      if (updateError) throw updateError;

      // 5. Create order
      // Generate a unique order number
      const orderNumber = `SW${Date.now().toString().slice(-8)}`;

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            order_number: orderNumber,
            user_id: userData.id,
            pickup_address_id: addressData.id,
            status: "created",
            pickup_status: "pending",
            drop_status: "pending",
            payment_status: "pending",
            total_amount: 0,
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error(`Failed to create order: ${orderError.message || JSON.stringify(orderError)}`);
      }

      console.log("Order created successfully:", orderData);

      setSuccess("🎉 Account created and order placed successfully! We'll contact you shortly.");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Signup error details:", error);
      let errorMessage = "Signup failed. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message || JSON.stringify(error);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-dashed border-[#0084b8]/30"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="p-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-3xl text-[#0084b8]">SAFE</span>
              <span className="font-bold text-3xl text-[#65A006]">WASH</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {mode === "login" ? "Welcome Back!" : "Create Your Account"}
            </h2>
            <p className="text-gray-600 mt-1">
              {mode === "login"
                ? "Login to schedule your pickup"
                : "Sign up to get started with our premium service"}
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="px-8 pt-6">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                  mode === "login"
                    ? "bg-white text-[#0084b8] shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-white text-[#65A006] shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Error/Success Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-4 bg-red-50 border-2 border-dashed border-red-200 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-4 bg-green-50 border-2 border-dashed border-green-200 rounded-2xl flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-green-800 text-sm">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {mode === "login" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0084b8] focus:outline-none transition-colors"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter your 10-digit phone number</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0084b8] focus:outline-none transition-colors"
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#0084b8] to-[#0084b8]/80 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#0084b8]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login & Schedule Pickup"
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#65A006] focus:outline-none transition-colors"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#65A006] focus:outline-none transition-colors"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter 10-digit number. Will be saved as +91-XXXXXXXXXX</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#65A006] focus:outline-none transition-colors"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Default: safewash123 (you can change it)</p>
                </div>

                {/* Address Section */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Address Details *</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Type any location in Hyderabad..."
                          value={addressSearch}
                          onChange={(e) => setAddressSearch(e.target.value)}
                          onFocus={() => addressSuggestions.length > 0 && setShowSuggestions(true)}
                          className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-[#65A006] focus:outline-none transition-colors"
                          disabled={loading}
                        />
                        {isSearchingAddress && (
                          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
                        )}
                        {showSuggestions && addressSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            {addressSuggestions.map((suggestion) => (
                              <div
                                key={suggestion.place_id}
                                className="px-4 py-3 hover:bg-[#65A006]/10 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                onClick={() => handleSelectAddress(suggestion)}
                              >
                                <div className="flex items-start gap-2">
                                  <MapPin className="h-4 w-4 text-[#65A006] mt-0.5 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 text-sm truncate">
                                      {suggestion.display_name.split(",")[0]}
                                    </div>
                                    <div className="text-xs text-gray-500 line-clamp-2">
                                      {suggestion.display_name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Type at least 3 characters. Address details will auto-fill.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Block/Building Name"
                        value={selectedAddress.block_name}
                        onChange={(e) =>
                          setSelectedAddress({ ...selectedAddress, block_name: e.target.value })
                        }
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#65A006] focus:outline-none transition-colors"
                        disabled={loading}
                      />
                      <input
                        type="text"
                        placeholder="Street Name"
                        value={selectedAddress.street_name}
                        onChange={(e) =>
                          setSelectedAddress({ ...selectedAddress, street_name: e.target.value })
                        }
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#65A006] focus:outline-none transition-colors"
                        disabled={loading}
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Area/Locality *"
                      value={selectedAddress.area}
                      onChange={(e) =>
                        setSelectedAddress({ ...selectedAddress, area: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#65A006] focus:outline-none transition-colors"
                      disabled={loading}
                    />

                    <input
                      type="text"
                      placeholder="City"
                      value={selectedAddress.city}
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#65A006] to-[#65A006]/80 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#65A006]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up & Schedule Pickup"
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
