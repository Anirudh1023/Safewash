import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface AddressDetails {
  formattedAddress: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  buildingName: string;
  wing: string;
  flatNumber: string;
  floor: string;
  landmark: string;
}

export interface UserFormData {
  name: string;
  phoneNumber: string;
  password: string;
}

export function useUserManagement() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUserWithAuth = async (
    formData: UserFormData,
    role: "user" | "driver",
    addressDetails?: AddressDetails
  ) => {
    try {
      setLoading(true);
      setError(null);

      // 1. Create auth user with phone number as email
      const { error: authError } = await supabase.auth.signUp({
        email: `${formData.phoneNumber}@safewash`,
        password: formData.password,
        phone: formData.phoneNumber,
      });

      if (authError) throw authError;

      // 2. Insert into users table
      const { error: userError } = await supabase.from("users").insert({
        mobile: formData.phoneNumber,
        name: formData.name,
        role: role,
        pass: formData.password,
      });

      if (userError) throw userError;

      // 3. If user role and address exists, insert address
      if (role === "user" && addressDetails) {
        const { error: addressError } = await supabase.from("address").insert({
          mobile: formData.phoneNumber,
          address: addressDetails,
        });

        if (addressError) throw addressError;
      }

      return { success: true };
    } catch (err) {
      // Clean up if any step fails
      try {
        if (formData.phoneNumber) {
          await supabase
            .from("users")
            .delete()
            .eq("mobile", formData.phoneNumber);
        }
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }

      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (userPhone: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            user: userPhone,
            pickup_status: false,
            payment_status: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the order"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (phone: string) => {
    try {
      if (!phone) {
        throw new Error("Please enter your phone number");
      }

      // Query the password from the public.users table
      const { data, error } = await supabase
        .from("users")
        .select("pass")
        .eq("mobile", phone)
        .single();

      if (error) throw error;

      if (!data || !data.pass) {
        throw new Error("No account found with this phone number");
      }

      // Send SMS with the password
      const password = data.pass;
      await sendPasswordSMS(phone, password);

      return { success: true, error: null };
    } catch (error) {
      return error;
    }
  };

  const sendPasswordSMS = async (phone: string, password: string) => {
    try {
      // Prepare the SMS API call with correct values from your dashboard
      const username = "safewash123";
      const apikey = "56d8fffb089659fd9177";
      const senderid = "SFEWSH"; // Updated to match what's in your dashboard
      const templateid = "1707168121270085181"; // Updated to match what's in your dashboard

      // Format the complete message as per the template
      const message = `Want your curtain or carpets to be cleaned along with your clothes?
Safewash Drycleaners are now available for your doorstep pickup. Call us on ${password}`;

      // Construct the API URL with the complete message
      const apiUrl = `https://smslogin.co/v3/api.php?username=${username}&apikey=${apikey}&senderid=${senderid}&mobile=${phone}&message=${encodeURIComponent(
        message
      )}&templateid=${templateid}`;

      console.log("SMS API URL:", apiUrl); // For debugging

      // Make the API request
      const response = await fetch(apiUrl);
      const responseData = await response.text();

      console.log("SMS API Response:", responseData);

      // Check response for success
      if (
        responseData.includes("TEMPLATE_ERROR") ||
        responseData.includes("Failed")
      ) {
        throw new Error("SMS sending failed: Template error");
      }

      return true;
    } catch (error) {
      console.error("SMS sending error:", error);
      throw error;
    }
  };

  return {
    createUserWithAuth: Object.assign(createUserWithAuth, { supabase }),
    createOrder,
    forgotPassword,
    loading,
    error,
  };
}
