import { usDaAbi } from "@/blockchain/abis/usda";
import { usDaAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const useGetTotalSupplyUsda = () => {
  const { chainId, address } = useAccount();
  const { data: totalSupplyUsda } = useReadContract({
    abi: usDaAbi,
    address: usDaAddress[chainId as keyof typeof usDaAddress],
    functionName: "totalSupply",
  });

  return {
    totalSupplyUsda,
  };
};

export default useGetTotalSupplyUsda;
