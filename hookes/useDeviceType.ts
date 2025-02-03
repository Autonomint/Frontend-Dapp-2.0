"use client";
import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setDeviceType("mobile");
      } else if (width > 768 && width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Initial check
    checkDeviceType();

    // Listen for resize events
    window.addEventListener("resize", checkDeviceType);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
