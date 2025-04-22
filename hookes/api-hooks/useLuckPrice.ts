import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount } from "wagmi";

interface LuckPriceResponse {
  price: number; // Adjust this type based on the actual API response structure
}

const fetchLuckPrice = async (chainId?: number): Promise<LuckPriceResponse> => {
  const response = await axios.post<LuckPriceResponse>(
    `${BACKEND_API_URL}/global/get-usd-amount-to-pay-for-luck`,
    {
      chainId,
    }
  );
  return response.data;
};

export const useLuckPrice = () => {
  const { chainId } = useAccount();
  return useQuery<LuckPriceResponse>({
    queryKey: ["luckPrice", chainId],
    queryFn: () => fetchLuckPrice(chainId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(chainId),
  });
};
