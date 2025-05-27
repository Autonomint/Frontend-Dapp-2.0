import { LOCAL_STORAGE_KEY } from "@/utils/constants";
import { BACKEND_API_URL } from "@/utils/urls";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    home: true,
    // Can add here additional data
  };

  fetch(`${BACKEND_API_URL}/global/user-tracking-data`, {
    method: "POST",
    body: JSON.stringify(payload),
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Set tracking event on unload and route change start
export const useTrackUser = () => {
  const router = useRouter();

  const handleUnload = () => {
    sendUserTrackingData();
  };

  const timeoutRefTabSwitch = useRef<NodeJS.Timeout | null>(null);

  // this useEffect will run the post request after 20 minutes of tab inactivity/switching to another tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Tab is inactive — start countdown
        timeoutRefTabSwitch.current = setTimeout(() => {
          sendUserTrackingData();
        }, 1000 * 60 * 20);
      } else {
        // Tab is active again — cancel countdown
        if (timeoutRefTabSwitch.current) {
          clearTimeout(timeoutRefTabSwitch.current);
          timeoutRefTabSwitch.current = null;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutRefTabSwitch.current) {
        clearTimeout(timeoutRefTabSwitch.current);
      }
    };
  }, []);

  const timeoutRefWindowSwitch = useRef<NodeJS.Timeout | null>(null);

  // this useEffect will run the post request after 20 minutes of window inactivity/switching to another window
  useEffect(() => {
    const handleBlur = () => {
      // User left the browser (switched app or minimized)
      timeoutRefWindowSwitch.current = setTimeout(() => {
        sendUserTrackingData();
      }, 1000 * 60 * 20);
    };

    const handleFocus = () => {
      // User came back to the browser
      if (timeoutRefWindowSwitch.current) {
        clearTimeout(timeoutRefWindowSwitch.current);
        timeoutRefWindowSwitch.current = null;
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      if (timeoutRefWindowSwitch.current) {
        clearTimeout(timeoutRefWindowSwitch.current);
        timeoutRefWindowSwitch.current = null;
      }
    };
  }, []);

  // // this useEffect will run the post request after 20 minutes of user inactivity
  // useEffect(() => {
  //   let timeout: NodeJS.Timeout;

  //   const resetTimer = () => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       sendUserTrackingData();
  //     }, 1000 * 60 * 20); // 20 minutes
  //   };

  //   ["mousemove", "keydown", "scroll"].forEach((event) =>
  //     window.addEventListener(event, resetTimer)
  //   );

  //   resetTimer(); // Initialize on mount

  //   return () => {
  //     clearTimeout(timeout);
  //     ["mousemove", "keydown", "scroll"].forEach((event) =>
  //       window.removeEventListener(event, resetTimer)
  //     );
  //   };
  // }, []);

  useEffect(() => {
    window.addEventListener("unload", handleUnload);
    // router.("routeChangeStart", handleRouteChangeStart);

    return () => {
      window.removeEventListener("unload", handleUnload);
      // router.events.off("routeChangeStart", handleRouteChangeStart);
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
