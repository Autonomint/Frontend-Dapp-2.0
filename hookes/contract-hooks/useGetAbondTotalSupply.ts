import { abondAbi } from "@/blockchain/abis/abond";
import { abondAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const useGetTotalSupplyAbond = () => {
  const { chainId, address } = useAccount();
  const { data: totalSupplyAbond } = useReadContract({
    abi: abondAbi,
    address: abondAddress[chainId as keyof typeof abondAddress],
    functionName: "totalSupply",
  });

  return {
    totalSupplyAbond,
  };
};

export default useGetTotalSupplyAbond;
