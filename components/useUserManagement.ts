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

  return {
    createUserWithAuth,
    createOrder,
    loading,
    error,
  };
}
