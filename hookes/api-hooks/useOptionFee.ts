"use client";
import { OptionFeesRequest, OptionFeesResponse } from "./interface";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "wagmi/query";
import { parseUnits } from "viem";

// Define a function to fetch option fees with typed parameters
const fetchOptionFees = async ({
  chainId,
  collateralAmount,
  ethPrice,
  strikePercent,
}: OptionFeesRequest): Promise<OptionFeesResponse> => {
  const response = await fetch(
    `${BACKEND_API_URL}/borrows/optionFees/${chainId}/${parseUnits(
      collateralAmount.toString(),
      18
    )}/${ethPrice}/${strikePercent}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch option fees");
  }

  return response.json();
};

// Create a typed hook to fetch option fees
const useFetchOptionFees = (
  collateralAmount: number,
  ethPrice: number,
  strikePercent: number
) => {
  const { chainId, isConnected } = useAccount();

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
    ], // Query key
    queryFn: () =>
      fetchOptionFees({
        chainId: chainId as number,
        collateralAmount,
        ethPrice,
        strikePercent,
      }), // Query function
    // Optional configurations
    enabled: !!isConnected && !!chainId && !!collateralAmount && !!ethPrice, // Only run when values are provided
    refetchOnWindowFocus: true,
    retry: 1,
  });

  console.log(
    chainId,
    !!isConnected && !!chainId && !!collateralAmount && !!ethPrice,
    ">>"
  );

  const optionFees = (Fees as number[])?.[1]
    ? (Fees as number[])?.[1] / 10 ** 6
    : 0;

  return {
    optionFees,
    Fees,
    refetchOptionFee,
    isOptionFeeError,
    isOptionFeePending,
  };
};

export default useFetchOptionFees;
