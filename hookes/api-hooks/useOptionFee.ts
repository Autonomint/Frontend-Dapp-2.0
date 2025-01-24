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
  const { chainId } = useAccount();

  const {
    data,
    isPending: isOptionFeePending,
    isError: isOptionFeeError,
    refetch: refetchOptionFee,
  } = useQuery({
    queryKey: ["optionFee", chainId, collateralAmount, ethPrice, strikePercent], // Query key
    queryFn: () =>
      fetchOptionFees({
        chainId: chainId as number,
        collateralAmount,
        ethPrice,
        strikePercent,
      }), // Query function
    // Optional configurations
    enabled: !!chainId && !!collateralAmount && !!ethPrice, // Only run when values are provided
    refetchOnWindowFocus: false,
  });

  const optionFees = (data as number[])?.[1]
    ? (data as number[])?.[1] / 10 ** 6
    : 0;

  return {
    optionFees,
  };
};

export default useFetchOptionFees;
