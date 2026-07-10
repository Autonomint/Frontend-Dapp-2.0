import { BACKEND_API_URL } from "@/utils/urls";
import { getApiAssetName } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches the available expiries from the TWAP API for a given underlying
 * API returns an array of expiry dates
 */
const fetchExpiries = async (underlying: string, optionType?: "call" | "put"): Promise<string[]> => {
  // Translate display ticker to the API's StockAssetName enum key, using optionType for crypto assets
  const apiAssetName = getApiAssetName(underlying, optionType);
  const response = await fetch(`${BACKEND_API_URL}/stock-options/expiries?underlying=${apiAssetName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch expiries for ${underlying}`);
  }
  return response.json();
};

/**
 * Custom hook to fetch available expiries from the TWAP API
 * @param underlying - The underlying symbol to fetch expiries for (required)
 * @param enabled - Whether the query should be enabled (default: true)
 * @returns {Object} An object containing:
 * - expiries: Array of expiry dates
 * - isLoading: Boolean indicating if the query is in progress
 * - error: Any error that occurred during the query
 * - isError: Boolean indicating if an error occurred
 * - refetch: Function to manually refetch the data
 */
const useGetExpiries = (underlying: string, enabled: boolean = true, optionType?: "call" | "put") => {
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["expiries", underlying, optionType],
    queryFn: () => fetchExpiries(underlying, optionType),
    enabled: Boolean(enabled && underlying),
  });

  return {
    expiries: data || [],
    isLoading,
    error,
    isError,
    refetch,
  };
};

export default useGetExpiries;
