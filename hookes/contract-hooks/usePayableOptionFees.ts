import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const usePayableOptionFees = (index: any, token: string) => {
  const { chainId, address } = useAccount();
  // Get the native fee for the transaction
  const contract = token === "cbBTC" ? borrowCoreAddress : borrowingContractAddress;
  const {
    data: payableOptionFees,
    error: payableOptionFeesError,
    refetch: refetchPayableOptionFees,
  } = useReadContract({
    abi: borrowingContractAbi,
    address:
      contract[
      chainId as keyof typeof borrowingContractAddress
      ] as `0x${string}`,
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
