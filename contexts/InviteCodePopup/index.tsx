"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAccount } from "wagmi";

interface InviteCodePopupContextType {
  isInviteCodePopupOpen: boolean;
  setIsInviteCodePopupOpen: (value: boolean) => void;
}

// Initialize context with default values
const InviteCodePopupContext = createContext<
  InviteCodePopupContextType | undefined
>(undefined);

export const InviteCodePopupProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isInviteCodePopupOpen, setIsInviteCodePopupOpen] = useState(false); // Initial state
  const { isConnected, address } = useAccount();
  useEffect(() => {
    const value = localStorage.getItem("verified");
    if (value === "false" || value === null || !isConnected) {
      setIsInviteCodePopupOpen(true);
    } else {
      setIsInviteCodePopupOpen(false);
    }
  }, [isConnected && address]);
  return (
    <InviteCodePopupContext.Provider
      value={{ isInviteCodePopupOpen, setIsInviteCodePopupOpen }}
    >
      {children}
    </InviteCodePopupContext.Provider>
  );
};

// Custom hook to use the ScrollContext
export const useInviteCodePopup = () => {
  const context = useContext(InviteCodePopupContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
