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
            refetchInterval: 8000,
          },
          mutations: {
            onError(error: any) {
              // toast.custom(
              //   (t: any) => {
              //     return (
              //       <div>
              //         <CustomToast
              //           key={2}
              //           props={{
              //             t: toastId.current,
              //             toastMainColor: "#B43939",
              //             headline: `Uhh Ohh! ${error.name}`,
              //             toastClosebuttonHoverColor: "#e66d6d",
              //             toastClosebuttonColor: "#C25757",
              //             type: "error",
              //           }}
              //         />
              //       </div>
              //     );
              //   },
              //   { duration: 5000 }
              // );
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
