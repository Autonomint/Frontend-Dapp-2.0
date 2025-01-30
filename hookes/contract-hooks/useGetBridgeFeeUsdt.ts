import { usDaAbi } from "@/blockchain/abis/usda";
import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import { testusdtAbiAddress, usDaAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const useGetBridgeFeeUsdt = (transactionParams: any) => {
  const { chainId } = useAccount();
  // Get the native fee for the transaction
  const {
    data: nativeFee2,
    error: TUSDTQuoteError,
    refetch: refetchnativeFee2,
  } = useReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
    functionName: "quoteSend",
    args: [transactionParams as any, false],
  });

  return {
    nativeFee2,
    TUSDTQuoteError,
    refetchnativeFee2,
  };
};

export { useGetBridgeFeeUsdt };
