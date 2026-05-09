import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches the available expiries from the TWAP API for a given underlying
 * API returns an array of expiry dates
 */
const fetchExpiries = async (underlying: string): Promise<string[]> => {
  const response = await fetch(`${BACKEND_API_URL}/twap/expiries?underlying=${underlying}`);
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
const useGetExpiries = (underlying: string, enabled: boolean = true) => {
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["expiries", underlying],
    queryFn: () => fetchExpiries(underlying),
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
