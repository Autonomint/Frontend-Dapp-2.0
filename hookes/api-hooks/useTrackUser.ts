import { LOCAL_STORAGE_KEY } from "@/utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// type UserTrackingData = {
//   homePage?: {
//     count: number;
//     visited: boolean;
//     enterTimestamp: string;
//     exitTimestamp: string;
//   };
//   borrowPage?: {
//     asset: string;
//     count: number;
//     visited: boolean;
//     enterTimestamp: string;
//     exitTimestamp: string;
//   };
//   cdspage?: {
//     asset: string;
//     count: number;
//     visited: boolean;
//     enterTimestamp: string;
//     exitTimestamp: string;
//   };
//   portfolioPage?: {
//     count: number;
//     visited: boolean;
//     enterTimestamp: string;
//     exitTimestamp: string;
//   };
//   leaderboardPage?: {
//     count: number;
//     visited: boolean;
//     enterTimestamp: string;
//     exitTimestamp: string;
//   };
//   statsPage?: {
//     count: number;
//     visited: boolean;
//     enterTimestamp: string;
//     exitTimestamp: string;
//   };
//   farmyourLuckPage?: {
//     count: number;
//     visited: boolean;
//     enterTimestamp: string;
//     exitTimestamp: string;
//   };
//   address: string;
//   userId: string;
//   sessionId: string;
// };

const getUserTrackLocalStorageData = (): any | null => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to parse localStorage exit data:", e);
    return null;
  }
};

const setUserTrackLocalStorageData = (data: any): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to set localStorage exit data:", e);
  }
};

const sendUserTrackingData = (): void => {
  const data = getUserTrackLocalStorageData();
  if (!data) return;

  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/exit", JSON.stringify(payload));
  } else {
    fetch("/api/exit", {
      method: "POST",
      body: JSON.stringify(payload),
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Set tracking event on unload and route change start
export const useTrackUser = () => {
  const router = useRouter();

  const handleUnload = () => {
    sendUserTrackingData();
  };

  const handleRouteChangeStart = () => {
    sendUserTrackingData();
  };

  useEffect(() => {
    window.addEventListener("unload", handleUnload);
    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      window.removeEventListener("unload", handleUnload);
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);
};

// Return user tracking data and setter/getter function
export const useTrackUserData = () => {
  const [userTrackingData, setUserTrackingData] = useState<any>(null);

  useEffect(() => {
    // get user tracking data from local storage
    const data = getUserTrackLocalStorageData();
    if (data) {
      setUserTrackingData(data);
    }
  }, []);

  return {
    userTrackingData,
    setUserTrackLocalStorageData,
    getUserTrackLocalStorageData,
    sendUserTrackingData,
  };
};
