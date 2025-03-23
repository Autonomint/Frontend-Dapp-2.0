import { mpoABI } from "@/blockchain/abis/mpo";
import { mpoAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const useMasterPriceOracle = (tokenAddress: `0x${string}`) => {
  const { address, chainId } = useAccount();

  const {
    data: getOraclePrice,
    isPending: isLoadingOraclePrice,
    refetch: getOraclePriceRefetch,
  } = useReadContract({
    abi: mpoABI,
    address: mpoAddress[chainId as keyof typeof mpoAddress],
    functionName: "price",
    args: [tokenAddress],
    query: {
      enabled: !!tokenAddress,
      staleTime: 10 * 1000,
    },
  });

  return {
    getOraclePrice: (getOraclePrice || [0, 0]) as [number, number],
    isLoadingOraclePrice,
    getOraclePriceRefetch,
  };
};

export default useMasterPriceOracle;
