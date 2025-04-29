"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useRef, useState } from "react";
export default function QueryProvider({ children }: PropsWithChildren) {
  const toastId = useRef<number | string>("");
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // refetchInterval: 8000,
          },
          mutations: {
            onError(error: any) {},
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
