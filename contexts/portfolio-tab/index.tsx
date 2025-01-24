"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PortfolioTabContextType {
  portfolioTab: string;
  setPortfolioTab: (value: string) => void;
}

// Initialize context with default values
const PortfolioTabContext = createContext<PortfolioTabContextType | undefined>(
  undefined
);

export const PortfolioTabProvider = ({ children }: { children: ReactNode }) => {
  const [portfolioTab, setPortfolioTab] = useState(""); // Initial state as an empty string

  return (
    <PortfolioTabContext.Provider value={{ portfolioTab, setPortfolioTab }}>
      {children}
    </PortfolioTabContext.Provider>
  );
};

// Custom hook to use the PortfolioTabContext
export const usePortfolioTab = () => {
  const context = useContext(PortfolioTabContext);
  if (!context) {
    throw new Error(
      "usePortfolioTab must be used within a PortfolioTabProvider"
    );
  }
  return context;
};
