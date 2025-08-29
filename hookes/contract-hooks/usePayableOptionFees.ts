import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const usePayableOptionFees = (index: any) => {
  const { chainId, address } = useAccount();
  // Get the native fee for the transaction
  const {
    data: payableOptionFees,
    error: payableOptionFeesError,
    refetch: refetchPayableOptionFees,
  } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
      chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getOptionFeesToPay",
    args: [address as `0x${string}`, index],
  });

  return {
    payableOptionFees,
    payableOptionFeesError,
    refetchPayableOptionFees,
  };
};

export { usePayableOptionFees };
