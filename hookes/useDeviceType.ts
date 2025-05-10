"use client";
import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";
/**
 * Custom hook to detect device type based on window width
 * @returns {"mobile" | "tablet" | "desktop"} Current device type
 * - mobile: width <= 768px
 * - tablet: 768px < width <= 1024px  
 * - desktop: width > 1024px
 */
const useDeviceType = (): DeviceType => {
  // State to track current device type, defaults to desktop
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    // Function to check window width and set appropriate device type
    const checkDeviceType = () => {
      const width = window.innerWidth;

      // Mobile devices: width <= 768px
      if (width <= 768) {
        setDeviceType("mobile");
      } 
      // Tablet devices: 768px < width <= 1024px
      else if (width > 768 && width <= 1024) {
        setDeviceType("tablet");
      }
      // Desktop devices: width > 1024px 
      else {
        setDeviceType("desktop");
      }
    };

    // Initial check when component mounts
    checkDeviceType();

    // Listen for window resize events to update device type
    window.addEventListener("resize", checkDeviceType);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []); // Empty dependency array since effect only needs to run once on mount

  return deviceType;
};

export default useDeviceType;

