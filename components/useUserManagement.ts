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

// Helper function to format phone number and create email
const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // Add +91 if not present and phone has 10 digits
  if (cleaned.length === 10 && !cleaned.startsWith('91')) {
    cleaned = '91' + cleaned;
  }

  // Add + at the beginning if not present
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }

  return cleaned;
};

const phoneToEmail = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  return `${cleaned}@safewash.app`;
};

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

      const formattedPhone = formatPhoneNumber(formData.phoneNumber);
      const email = phoneToEmail(formattedPhone);

      // 1. Create auth user with phone number as email
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: role,
            password: formData.password,
            phone: formattedPhone
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");

      // 2. Insert into public.users table
      const { data: publicUser, error: userError } = await supabase
        .from("users")
        .insert({
          auth_user_id: authData.user.id,
          phone: formattedPhone,
          name: formData.name,
          role: role,
          password: formData.password,
          status: 'active'
        })
        .select()
        .single();

      if (userError) throw userError;
      if (!publicUser) throw new Error("Failed to create user in database");

      // 3. If user role and address exists, insert address
      if (role === "user" && addressDetails && publicUser.id) {
        const { error: addressError } = await supabase.from("addresses").insert({
          user_id: publicUser.id,
          block_name: addressDetails.buildingName || '',
          street_name: `${addressDetails.wing} ${addressDetails.flatNumber} ${addressDetails.floor}`.trim(),
          area: addressDetails.formattedAddress || '',
          city: 'Hyderabad', // Default city
          lat: addressDetails.coordinates.latitude || 17.3850,
          lng: addressDetails.coordinates.longitude || 78.4867,
          label: 'Home',
          is_default: true
        });

        if (addressError) throw addressError;
      }

      return { success: true, userId: publicUser.id };
    } catch (err) {
      // Clean up if any step fails
      try {
        if (formData.phoneNumber) {
          const formattedPhone = formatPhoneNumber(formData.phoneNumber);
          await supabase
            .from("users")
            .delete()
            .eq("phone", formattedPhone);
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
      const formattedPhone = formatPhoneNumber(userPhone);

      // Get user ID and address ID
      const { data: userData, error: userFetchError } = await supabase
        .from("users")
        .select("id")
        .eq("phone", formattedPhone)
        .single();

      if (userFetchError) throw userFetchError;
      if (!userData) throw new Error("User not found");

      // Get default address
      const { data: addressData, error: addressFetchError } = await supabase
        .from("addresses")
        .select("id")
        .eq("user_id", userData.id)
        .eq("is_default", true)
        .single();

      if (addressFetchError) throw addressFetchError;
      if (!addressData) throw new Error("Default address not found");

      // Generate order number
      const orderNumber = `SW${Date.now()}`;

      // Create order
      const { data, error } = await supabase
        .from("orders")
        .insert({
          user_id: userData.id,
          pickup_address_id: addressData.id,
          order_number: orderNumber,
          total_amount: 0,
          status: 'created',
          pickup_status: 'pending',
          drop_status: 'pending',
          payment_status: 'pending'
        })
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

      const formattedPhone = formatPhoneNumber(phone);

      // Query the password from the public.users table
      const { data, error } = await supabase
        .from("users")
        .select("password")
        .eq("phone", formattedPhone)
        .single();

      if (error) throw error;

      if (!data || !data.password) {
        throw new Error("No account found with this phone number");
      }

      // Send SMS with the password
      const password = data.password;
      await sendPasswordSMS(formattedPhone, password);

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
      const templateid = "1707174495253037751"; // Updated to match what's in your dashboard

      // Format the complete message as per the template
      const message = `Thank you for using Safewash Drycleaners. Your forgotten password is ${password}.`;

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
