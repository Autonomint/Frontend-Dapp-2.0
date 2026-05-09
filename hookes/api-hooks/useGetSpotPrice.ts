import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches the current spot price from the TWAP API for any symbol
 * API returns only the price as a number
 */
const fetchSpotPrice = async (symbol: string): Promise<number> => {
  const response = await fetch(`${BACKEND_API_URL}/twap/spot-price/?symbol=${symbol}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${symbol} price`);
  }
  return response.json();
};

/**
 * Custom hook to fetch spot price from the TWAP API for any symbol
 * @param symbol - The symbol to fetch price for (required)
 * @param enabled - Whether the query should be enabled (default: true)
 * @returns {Object} An object containing:
 * - price: The current price
 * - isLoading: Boolean indicating if the query is in progress
 * - error: Any error that occurred during the query
 * - isError: Boolean indicating if an error occurred
 * - refetch: Function to manually refetch the data
 */
const useGetSpotPrice = (symbol: string, enabled: boolean = true) => {
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["spotPrice", symbol],
    queryFn: () => fetchSpotPrice(symbol),
    enabled: Boolean(enabled && symbol),
    refetchInterval: 30000, // Refetch every 30 seconds for real-time pricing
  });

  return {
    price: data,
    isLoading,
    error,
    isError,
    refetch,
  };
};

export default useGetSpotPrice;
