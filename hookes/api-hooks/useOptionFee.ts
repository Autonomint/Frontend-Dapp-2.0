"use client";

import { OptionFeesRequest, OptionFeesResponse } from "./interface";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "wagmi/query";
import { formatUnits, parseUnits } from "viem";

/**
 * Fetches option fees from the backend API using provided parameters.
 *
 * @param chainId - The chain/network ID (e.g., Ethereum, Base, etc.).
 * @param collateralAmount - Amount of collateral (ETH) to be used.
 * @param ethPrice - Current ETH price in USD.
 * @param strikePercent - Desired strike percent for the option.
 *
 * @returns A Promise that resolves to the OptionFeesResponse.
 */
const fetchOptionFees = async ({
  chainId,
  collateralAmount,
  ethPrice,
  strikePercent,
  token,
  hedgeDuration
}: OptionFeesRequest): Promise<OptionFeesResponse> => {
  // Construct the URL using the backend base URL and query parameters
  const response = await fetch(
    `${BACKEND_API_URL}/borrows/optionFees/${chainId}/${token}/${parseUnits(
      collateralAmount.toString(),
      18 // Convert collateral amount to 18 decimal units (wei)
    )}/${ethPrice}/${strikePercent}/${hedgeDuration}`
  );

  // Throw an error if the response is not OK
  if (!response.ok) {
    throw new Error("Failed to fetch option fees");
  }

  // Parse and return the JSON response
  return response.json();
};

/**
 * React hook to retrieve and manage option fees from backend.
 *
 * @param collateralAmount - Amount of ETH collateral for borrowing.
 * @param ethPrice - Current ETH price.
 * @param strikePercent - The strike percentage selected by user.
 *
 * @returns Object containing option fees, raw data, loading/error state, and refetch function.
 */
const useFetchOptionFees = (
  collateralAmount: number,
  ethPrice: number,
  strikePercent: number,
  token: string,
  hedgeDuration: number = 30
) => {
  const { chainId, isConnected } = useAccount(); // Get user's connected chain and status

  // Use wagmi's useQuery to fetch option fees with caching, refetching, etc.
  const {
    data: Fees,
    isPending: isOptionFeePending,
    isError: isOptionFeeError,
    refetch: refetchOptionFee,
  } = useQuery({
    queryKey: [
      "optionFeeAPI",
      chainId,
      collateralAmount,
      ethPrice,
      strikePercent,
      hedgeDuration
    ], // Unique key for caching/refetching
    queryFn: () =>
      fetchOptionFees({
        chainId: chainId as number,
        collateralAmount,
        ethPrice,
        strikePercent,
        token,
        hedgeDuration
      }), // Function to fetch option fees
    enabled:
      !!isConnected && !!chainId && !!collateralAmount && strikePercent > 0 && hedgeDuration > 0, // Enable query only if connected and inputs are valid
    refetchOnWindowFocus: true, // Refetch when the window regains focus
    retry: 0, // Retry once on failure
  });

  // Convert fee from micro-units (1e6) to readable format; fallback to 0
  const optionFees = (Fees as number[])?.[1]
    ? formatUnits(BigInt((Fees as number[])?.[1]), 6)
    : 0;

  return {
    optionFees, // Human-readable fee value
    Fees, // Raw fee data
    refetchOptionFee, // Manual refetch function
    isOptionFeeError, // Error flag
    isOptionFeePending, // Loading flag
  };
};

export default useFetchOptionFees;
