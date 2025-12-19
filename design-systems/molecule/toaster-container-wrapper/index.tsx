"use client";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const ToasterContainerWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server.
  }
  return (
    <div>
      <Toaster
        richColors
        position="top-right"
        className="dark:bg-custom-gradient-to-top"
           />
    </div>
  );
};

export default ToasterContainerWrapper;
