import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

// Define the type for the response data
interface RewardResponse {
  totalLuck: number;
  fixed50Dollar: number;
  multiply5x: boolean;
  multiply10x: boolean;
  deadLine5xTimestamp: string;
  deadLine10xTimestamp: string;
}

// Define the function to fetch the reward data
const fetchReward = async (
  address?: string,
  chainId?: number
): Promise<RewardResponse> => {
  const response = await axios.get<RewardResponse>(
    `${BACKEND_API_URL}/borrows/reward/${address}/${chainId}`
  );
  return response.data;
};

// Hook to get farm your luck user details 
export const useFarmLuckDetails = (
  address?: `0x${string}`,
  chainId?: number
): UseQueryResult<RewardResponse, AxiosError> => {
  return useQuery<RewardResponse, AxiosError>({
    queryKey: ["useFarmLuckDetails", address],
    queryFn: () => fetchReward(address, chainId),
    enabled: !!address, // Ensure query only runs if address is provided
  });
};
