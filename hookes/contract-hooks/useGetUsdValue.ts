import {
  borrowAssetsAddress,
  borrowingContractAddress,
  ethAddress,
} from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ValueOf, zeroAddress } from "viem";
import { NetworkId } from "@/utils/constants";

const useGetUsdValue = (assetAddress?: ValueOf<typeof borrowAssetsAddress>) => {
  const { address, chainId } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const { isPending: isUsdValuePending, data: usdValue } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getUSDValue",
    args: [
      assetAddress
        ? assetAddress[
            (chainId || NetworkId.BaseSepolia) as keyof typeof assetAddress
          ]
        : ethAddress[
            (chainId || NetworkId.BaseSepolia) as keyof typeof ethAddress
          ],
    ],
    query: { enabled: !!address && !!chainId },
  });

  console.log(usdValue, "usdValue");

  return {
    isUsdValuePending,
    usdValue: usdValue?.[1] || 0,
    assetPrice: Math.floor(
      (Number(usdValue?.[0]) * Number(usdValue?.[1])) / 1e18
    ),
    exchangeRate: Number(usdValue?.[0]),
  };
};

export default useGetUsdValue;
