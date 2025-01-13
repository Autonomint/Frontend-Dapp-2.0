import { useQuery } from "@tanstack/react-query";
import { OptionFeesRequest, OptionFeesResponse } from "./interface";

// Define a function to fetch option fees with typed parameters
const fetchOptionFees = async ({
  chainId,
  collateralAmount,
  ethPrice,
  strikePercent,
  BACKEND_API_URL,
}: OptionFeesRequest): Promise<OptionFeesResponse> => {
  const response = await fetch(
    `${BACKEND_API_URL}/borrows/optionFees/${chainId}/${collateralAmount}/${ethPrice}/${strikePercent}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch option fees");
  }

  return response.json();
};

// Create a typed hook to fetch option fees
const useFetchOptionFees = (
  chainId: number,
  collateralAmount: number,
  ethPrice: number,
  strikePercent: number,
  BACKEND_API_URL: string
) => {
  return useQuery<OptionFeesResponse, Error>({
    queryKey: [
      "optionFees",
      chainId,
      collateralAmount,
      ethPrice,
      strikePercent,
    ], // Query key
    queryFn: () =>
      fetchOptionFees({
        chainId,
        collateralAmount,
        ethPrice,
        strikePercent,
        BACKEND_API_URL,
      }), // Query function
    // Optional configurations
    enabled: !!chainId && !!collateralAmount && !!ethPrice && !!strikePercent, // Only run when values are provided
    refetchOnWindowFocus: false,
  });
};

export default useFetchOptionFees;
