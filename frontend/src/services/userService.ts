import { useAuth } from "@clerk/clerk-react";
import api from "./api";

export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  credits: number;
  songCount: number;
  createdAt: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const { getToken, isLoaded } = useAuth();

  console.log(getToken(), isLoaded);

  if (!isLoaded || !getToken) return;

  try {
    const token = await getToken();
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile Data: ", response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to initialize auth token:", err);
  }
};

export const addCredits = async (
  planId: string,
  credits: number,
  amount: number
): Promise<any> => {
  const response = await api.post("/process-payment", {
    paymentId: planId,
    amount,
    credits,
  });
  return response.data;
};

export const createOrder = async (
  amount: number
): Promise<string | undefined> => {
  const { getToken, isLoaded } = useAuth();

  if (!isLoaded || !getToken) return;

  const token = await getToken();
  const response = await api.post(
    "/create-order",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Create Order response: ", response.data);
  return response.data.order_id;
};

export const deductCredits = async (amount: number): Promise<any> => {
  const { getToken, isLoaded } = useAuth();

  if (!isLoaded || !getToken) return;

  const token = await getToken();
  const response = await api.post(
    "/deduct-credits",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getPurchaseHistory = async (
  page = 1,
  limit = 10
): Promise<any> => {
  const response = await api.get(`/purchases?page=${page}&limit=${limit}`);
  return response.data;
};
