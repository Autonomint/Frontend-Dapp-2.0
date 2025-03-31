import { borrowingContractAddress, cdsAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { cdsAbi } from "@/blockchain/abis/dcds";

const useGetTVL = (tokenAddress: `0x${string}`) => {
  const { address, chainId } = useAccount();
  const { isPending: isTVLPending, data: tvlValue } = useReadContract({
    abi: cdsAbi,
    address: cdsAddress[chainId as keyof typeof borrowingContractAddress],
    functionName: "tokenDepositedTillNow",
    args: [tokenAddress],
  });

  return {
    isTVLPending,
    tvlValue,
  };
};

export default useGetTVL;
