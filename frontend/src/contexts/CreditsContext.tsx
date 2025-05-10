import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  getUserProfile,
  addCredits as addCreditsToUser,
  deductCredits as deductCreditsFromUser,
} from "@/services/userService";
import { toast } from "@/hooks/use-toast";

interface CreditsContextType {
  credits: number;
  setCredits: (credits: number) => void;
  addCredits: (amount: number) => Promise<boolean>;
  deductCredits: (amount: number) => Promise<boolean>;
  loading: boolean;
}

const CreditsContext = createContext<CreditsContextType | null>(null);

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
};

export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isSignedIn } = useUser();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load credits from API when user logs in
    const fetchCredits = async () => {
      if (isSignedIn && user) {
        try {
          const userProfile = await getUserProfile();
          console.log("User profile: ", userProfile);
          if (userProfile) {
            setCredits(userProfile.credits);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user credits:", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [isSignedIn, user]);

  const addCredits = async (amount: number): Promise<boolean> => {
    if (!isSignedIn || !user) return false;

    try {
      // In a real implementation, this would call the payment API
      const result = await addCreditsToUser("manual_add", amount, 0);

      if (result && result.newCreditBalance !== undefined) {
        setCredits(result.newCreditBalance);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding credits:", error);
      toast({
        title: "Failed to add credits",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    }
  };

  const deductCredits = async (amount: number): Promise<boolean> => {
    if (!isSignedIn || !user) return false;

    try {
      const result = await deductCreditsFromUser(amount);

      if (result && result.newCreditBalance !== undefined) {
        setCredits(result.newCreditBalance);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deducting credits:", error);
      toast({
        title: "Failed to deduct credits",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <CreditsContext.Provider
      value={{ credits, setCredits, addCredits, deductCredits, loading }}
    >
      {children}
    </CreditsContext.Provider>
  );
};
