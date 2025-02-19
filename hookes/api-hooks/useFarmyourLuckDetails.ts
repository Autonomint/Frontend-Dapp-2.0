import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

// Define the type for the response data
interface RewardResponse {
  totalLuck: number;
  TotalReward: number;
}

// Define the function to fetch the reward data
const fetchReward = async (address?: string): Promise<RewardResponse> => {
  const response = await axios.get<RewardResponse>(
    `${BACKEND_API_URL}/borrows/reward/${address}`
  );
  return response.data;
};

// Create the useQuery hook to fetch reward data
export const useFarmLuckDetails = (
  address?: `0x${string}`
): UseQueryResult<RewardResponse, AxiosError> => {
  return useQuery<RewardResponse, AxiosError>({
    queryKey: ["reward", address],
    queryFn: () => fetchReward(address),
    enabled: !!address, // Ensure query only runs if address is provided
  });
};
