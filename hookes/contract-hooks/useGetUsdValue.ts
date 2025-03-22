import {
  borrowAssetsAddress,
  borrowingContractAddress,
} from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ValueOf } from "viem";

const useGetUsdValue = (assetAddress: ValueOf<typeof borrowAssetsAddress>) => {
  const { address, chainId } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const { isPending: isUsdValuePending, data: usdValue } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getUSDValue",
    // args: [assetAddress[919]],
    query: { enabled: !!address },
  });

  return {
    isUsdValuePending,
    usdValue: usdValue?.[0] || 0,
    assetPrice:
      Number(usdValue?.[0]) +
      (Number(usdValue?.[0]) * Number(usdValue?.[1])) / 1e20,
  };
};

export default useGetUsdValue;
