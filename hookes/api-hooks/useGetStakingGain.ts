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

async function getStakingRealisedReward(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number,
  token: string
): Promise<{ premium: number; hedge: number }> {
  return fetch(`${BACKEND_API_URL}/borrows/getRealisedStakingRewards`, {
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


const useGetStakingGain = (index: number, token: string, activeGain: boolean, activeReward: boolean) => {


  const { address, chainId } = useAccount();
  const {
    data: stakingGain,
    isPending: isPendingStakingGain,
    refetch: refetchStakingGain,
  } = useQuery({
    queryKey: ["stakingGain", index, activeGain],
    queryFn: () =>
      getStakingGain(
        address ? address : undefined,
        chainId as number,
        index || 0,
        token
      ),
    enabled: activeGain
  });

  const {
    data: stakingRealisedReward,
    isPending: isPendingStakingRealisedReward,
    refetch: refetchStakingRealisedReward,
  } = useQuery({
    queryKey: ["stakingRealisedReward", index, activeReward],
    queryFn: () =>
      getStakingRealisedReward(
        address ? address : undefined,
        chainId as number,
        index || 0,
        token
      ),
    enabled: activeReward
  });



  return {
    stakingGain,
    isPendingStakingGain,
    refetchStakingGain,
    stakingRealisedReward,
    isPendingStakingRealisedReward,
    refetchStakingRealisedReward,
  };
};

export default useGetStakingGain;
