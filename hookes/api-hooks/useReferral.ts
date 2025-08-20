import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BACKEND_API_URL } from "@/utils/urls";
import { postReferredCodeFromUrlData, ReferralResponse } from "./interface";

// Fetch referral code
async function fetchReferralCode(
  address: `0x${string}` | undefined
): Promise<string> {
  if (!address) return "";
  const response = await fetch(
    `${BACKEND_API_URL}/points/referral/${address}`,
    {
      method: "GET",
    }
  );
  return response.text();
}

export function useReferral(
  address: `0x${string}` | undefined
): ReferralResponse {
  const [isMounted, setIsMounted] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const searchParams = useSearchParams();
  
  // Extract referral code from URL
  const getReferralCodeFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('ref');
  };

  const {
    data: referralCode,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["referralcode", address],
    queryFn: () => fetchReferralCode(address),
    enabled: !!address,
  });

  // Generate referral code
  const generateReferral = async () => {
    if (!address) return;

    const res = await fetch(
      `${BACKEND_API_URL}/points/generate-referral-code/${address}`,
      { method: "POST" }
    );
    const data = await res.text();

    if (data) {
      refetch().then(() => setShowReferral(true));
    }
  };

  // Post referral code from URL when component mounts
  useEffect(() => {
    if (!address) return;
    
    const refCode = getReferralCodeFromUrl();
    if (refCode) {
      postReferredCodeFromUrl({
        address,
        referral: refCode
      });
    }
  }, [address]);

  const postReferredCodeFromUrl = async (data: postReferredCodeFromUrlData) => {
    try {
      const res = await fetch(`${BACKEND_API_URL}/points/referral`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit referral code');
      }
      
      return await res.json();
    } catch (error) {
      console.error('Error submitting referral code:', error);
      throw error;
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const referralLink = useMemo(() => {
    if (isMounted && referralCode) {
      return `${window.location.origin}?ref=${referralCode}`;
    }
    return "";
  }, [referralCode, isMounted]);

  return {
    code: showReferral ? referralCode || "" : "",
    referralLink,
    generateReferral,
    postReferredCodeFromUrl,
    getReferralCodeFromUrl,
    isLoading,
    isError,
  };
}
