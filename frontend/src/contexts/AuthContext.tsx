import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import { API_BASE_URL, setAuthToken } from "@/services/api";

interface AuthContextType {
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType>({ isInitialized: false });

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, isLoaded } = useAuth();
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Add immediate token initialization
  useEffect(() => {
    const initAuth = async () => {
      if (!isLoaded || !getToken) return;

      try {
        const token = await getToken();
        if (token) {
          console.log("Initializing auth token");
          setAuthToken(token);
          setIsInitialized(true);
          await fetch(`${API_BASE_URL}/sync-user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "POST",
          })
            .then(() => console.log("Sync user: Success"))
            .catch((err) => console.log("Sync user: Failure ", err));
        }
      } catch (error) {
        console.error("Failed to initialize auth token:", error);
      }
    };

    initAuth();
  }, [isLoaded, getToken]);

  // Set up token refresh
  useEffect(() => {
    if (!isLoaded || !getToken) return;

    const updateToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          console.log("Refreshing auth token");
          setAuthToken(token);
        }
      } catch (error) {
        console.error("Failed to refresh auth token:", error);
      }
    };

    const intervalId = setInterval(updateToken, 4 * 60 * 1000); // Refresh every 4 minutes
    return () => clearInterval(intervalId);
  }, [isLoaded, getToken]);

  return (
    <AuthContext.Provider value={{ isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};
