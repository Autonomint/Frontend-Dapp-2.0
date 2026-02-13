import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAccount } from "wagmi";




async function getStakingGain(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number,
  token: string
): Promise<{ premium: number; hedge: number }> {
  return fetch(`${BACKEND_API_URL}/borrows/getStakingRewards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
      collateralType: token,
    }),
  }).then((response) => response.json());
}


const useGetStakingGain = (index: number, token: string) => {


  const { address, chainId } = useAccount();
  const {
    data: stakingGain,
    isPending: isPendingStakingGain,
    refetch: refetchStakingGain,
  } = useQuery({
    queryKey: ["stakingGain", index],
    queryFn: () =>
      getStakingGain(
        address ? address : undefined,
        chainId as number,
        index || 0,
        token
      ),
  });

  useEffect(() => {
    refetchStakingGain()
  }, [index])

  return {
    stakingGain,
    isPendingStakingGain,
    refetchStakingGain,
  };
};

export default useGetStakingGain;
