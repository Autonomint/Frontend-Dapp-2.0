import { useQuery } from "@tanstack/react-query";
import { BACKEND_API_URL } from "@/utils/urls";
import { UseQueryOptions } from "@tanstack/react-query";

export interface StakingPointsResponse {
    // Define the response type based on your API response structure
    // For example:
    // address: string;
    // stakingPoints: number;
    // lastUpdated: string;
    [key: string]: any;
}

export const useGetStakingPoints = (
    address: string | undefined,
    options?: Omit<
        UseQueryOptions<StakingPointsResponse, Error>,
        'queryKey' | 'queryFn'
    >
) => {
    return useQuery<StakingPointsResponse, Error>({
        queryKey: ["staking-points", address],
        queryFn: async () => {
            if (!address) throw new Error("No address provided");

            const response = await fetch(
                `${BACKEND_API_URL}/points/stakingPoints/${address}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch staking points");
            }

            return response.json();
        },
        enabled: !!address,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        ...options,
    });
};
