import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

/**
 * Retrieves the total gains for the past 30 days from the CDS API.
 *
 * @param {number} noOfDays - The number of days to calculate the gains for (defaults to 30).
 * @returns {Object} Object containing the data, error, and isLoading states.
 */
export const useCalculateGainCDS = (noOfDays = 30) => {
  const { chainId } = useAccount();
  const { data, error, isLoading } = useQuery({
    // The key for the query, which is used to cache the data.
    queryKey: ["calculate-gains-for-past-30Days", chainId, noOfDays],
    // The function to call when the query is executed.
    queryFn: async () => {
      // Make the API request and return the data.
      const { data } = await axios.get(
        // The URL to make the API request to.
        `${BACKEND_API_URL}/cds/calculate-gains-for-past-30Days/${chainId}/${noOfDays}`
      );
      return data;
    },
    enabled: !!chainId,
  });

  return {
    // The data from the API, or undefined if the query is loading or an error occurred.
    data,
    // The error that occurred while making the API request, or undefined if the query is loading or successful.
    error,
    // A boolean indicating whether the query is currently loading or not.
    isLoading,
  };
};
