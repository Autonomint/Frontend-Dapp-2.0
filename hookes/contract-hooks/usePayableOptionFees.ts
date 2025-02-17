import { usDaAbi } from "@/blockchain/abis/usda";
import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import { testusdtAbiAddress, usDaAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const usePayableOptionFees = (index: any) => {
  const { chainId } = useAccount();
  // Get the native fee for the transaction
  const {
    data: payableOptionFees,
    error: payableOptionFeesError,
    refetch: refetchPayableOptionFees,
  } = useReadContract({
    abi: testusdtAbiAbi,
    address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
    functionName: "getOptionFeesToPay",
    args: [index],
  });

  return {
    payableOptionFees,
    payableOptionFeesError,
    refetchPayableOptionFees,
  };
};

export { usePayableOptionFees };
