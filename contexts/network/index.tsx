"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the context value
interface NetworkContextType {
  network: string | null;
  changeNetwork: (newNetwork: string) => void;
}

// Create the context with an initial value of undefined
const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

// Custom hook to use the NetworkContext
export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};

// Provider component props
interface NetworkProviderProps {
  children: ReactNode;
}

// Provider component
export const NetworkProvider: React.FC<NetworkProviderProps> = ({
  children,
}) => {
  const [network, setNetwork] = useState<string | null>(null);

  const changeNetwork = (newNetwork: string) => {
    setNetwork(newNetwork);
  };

  return (
    <NetworkContext.Provider value={{ network, changeNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};
