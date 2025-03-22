"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "../page-loader";

const WithPrivateRoute = (WrappedComponent: any) => {
  const PrivateRoute = (props: any) => {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    useEffect(() => {
      // Check the 'verified' key from localStorage
      const verified = localStorage.getItem("verified");

      if (!verified || verified === "false") {
        // If not verified, redirect to a different page
        router.push("/"); // Or any other page you want to redirect to
      } else {
        setIsVerified(true);
      }
    }, [router]);

    // If not verified yet, return null or a loading spinner
    if (isVerified === null) {
      return <PageLoader />;
    }

    // If verified, render the component
    return <WrappedComponent {...props} />;
  };

  return PrivateRoute;
};

export default WithPrivateRoute;
