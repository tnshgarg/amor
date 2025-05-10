import { useUser, useAuth } from "@clerk/clerk-react";

// Get the auth token from Clerk
// NOTE: This MUST be called from within a React component with useAuth hook
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const { getToken } = useAuth();
    if (!getToken) {
      console.error("getToken function is not available");
      return null;
    }

    const token = await getToken();
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const { isSignedIn } = useUser();
  return !!isSignedIn;
};

// Function to get user data from the API
// NOTE: This is a direct API call, consider using the API service instead
export const fetchUserProfile = async (): Promise<any> => {
  try {
    const { getToken } = useAuth();
    if (!getToken) {
      console.error("getToken function is not available");
      return null;
    }

    const token = await getToken();
    if (!token) {
      console.error("Failed to get auth token");
      return null;
    }

    const response = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
      }/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
