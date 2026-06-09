import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

/**
 * Fetches the total volume for stock options on a given chain
 * API returns a plain number, e.g. 831.52
 */
const fetchTotalVolume = async (chainId: number): Promise<number> => {
  const response = await fetch(`${BACKEND_API_URL}/stock-options/global/totalVolume/${chainId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch total volume for chain ${chainId}`);
  }
  return response.json();
};

/**
 * Custom hook to fetch the total stock options volume for the connected chain
 * Uses useAccount internally to get the current chainId
 * @returns {Object} An object containing:
 * - totalVolume: The total volume
 * - isLoading: Boolean indicating if the query is in progress
 * - error: Any error that occurred during the query
 * - isError: Boolean indicating if an error occurred
 * - refetch: Function to manually refetch the data
 */
const useGetStockOptionsTotalVolume = () => {
  const { chainId } = useAccount();

  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["stockOptionsTotalVolume", chainId],
    queryFn: () => fetchTotalVolume(chainId!),
    enabled: Boolean(chainId),
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  return {
    totalVolume: data,
    isLoading,
    error,
    isError,
    refetch,
  };
};

export default useGetStockOptionsTotalVolume;