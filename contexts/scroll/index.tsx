"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScrollContextType {
  isScroll: boolean;
  setIsScroll: (value: boolean) => void;
}

// Initialize context with default values
const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [isScroll, setIsScroll] = useState(false); // Initial state

  return (
    <ScrollContext.Provider value={{ isScroll, setIsScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use the ScrollContext
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
