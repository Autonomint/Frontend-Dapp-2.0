import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";

export interface OptionBid {
  symbol: string;
  expiry: string;
  optionType: string;
  strike: number;
  bid: number;
  ask: number;
  mid: number;
  lastTrade: number;
  nondollarPremium: number;
}

/**
 * Fetches the option bids from the TWAP API for a given underlying and expiry
 * API returns an array of option bid data
 */
const fetchOptionBids = async (underlying: string, expiry: string): Promise<OptionBid[]> => {
  const response = await fetch(`${BACKEND_API_URL}/stock-options/option-bids/?underlying=${underlying}&expiry=${expiry}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch option bids for ${underlying} ${expiry}`);
  }
  return response.json();
};

/**
 * Custom hook to fetch option bids from the TWAP API
 * @param underlying - The underlying symbol to fetch bids for (required)
 * @param expiry - The expiry date to fetch bids for (required)
 * @param enabled - Whether the query should be enabled (default: true)
 * @returns {Object} An object containing:
 * - bids: Array of option bid data
 * - isLoading: Boolean indicating if the query is in progress
 * - error: Any error that occurred during the query
 * - isError: Boolean indicating if an error occurred
 * - refetch: Function to manually refetch the data
 */
const useGetOptionBids = (underlying: string, expiry: string, enabled: boolean = true) => {
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["optionBids", underlying, expiry],
    queryFn: () => fetchOptionBids(underlying, expiry),
    enabled: Boolean(enabled && underlying && expiry),
  });

  return {
    bids: data || [],
    isLoading,
    error,
    isError,
    refetch,
  };
};

export default useGetOptionBids;
