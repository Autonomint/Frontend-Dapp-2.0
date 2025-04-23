import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";
import { BACKEND_API_URL } from "@/utils/urls";

const fetchWalletAddress = async (chainId?: number) => {
  const response = await axios.post(
    `${BACKEND_API_URL}/global/get-farm-your-luck-address`,
    {
      chainId,
    }
  );
  return response.data;
};

export const useFarmYourLuckWalletAddress = () => {
  const { chainId } = useAccount();

  return useQuery({
    queryKey: ["farmYourLuckWalletAddress", chainId],
    queryFn: () => fetchWalletAddress(chainId),
    enabled: Boolean(chainId),
  });
};
