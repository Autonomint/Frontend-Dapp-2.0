import React from "react";
import { Toaster } from "sonner";

function ToastNotificationPending() {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000, // Optional: customize duration
        }}
      />
    </div>
  );
}

export default ToastNotificationPending;
