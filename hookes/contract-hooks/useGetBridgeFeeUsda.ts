import { usDaAbi } from "@/blockchain/abis/usda";
import { usDaAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const useGetBridgeFeeUsda = (transactionParams: any) => {
  const { chainId } = useAccount();
  // Get the native fee for the transaction
  const {
    data: nativeFee1,
    error: UsdaQuoteError,
    refetch: refetchnativeFee1,
  } = useReadContract({
    abi: usDaAbi,
    address: usDaAddress[chainId as keyof typeof usDaAddress],
    functionName: "quoteSend",
    args: [transactionParams as any, false],
  });

  return {
    nativeFee1: nativeFee1 as any,
    UsdaQuoteError,
    refetchnativeFee1: refetchnativeFee1,
  };
};

export { useGetBridgeFeeUsda };
