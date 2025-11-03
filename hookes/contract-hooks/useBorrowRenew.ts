import { borrowCoreAddress, borrowingContractAddress, borrowWithdrawCoreAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
enum StrikePrice {
  // Define the enum values according to the IOptions.StrikePrice
  // Example:
  OPTION_ONE,
  OPTION_TWO,
  OPTION_THREE,
}

const useBorrowRenew = (mutation: any) => {
  const { chainId } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const {
    isPending: isRenewBorrowLoading,
    data: renewBorrowHash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract, // Function to initiate a write operation
    reset: resetBorrowRenew, // Function to reset the state of the hook
    isError: renewError, // Error state
  } = useWriteContract({
    mutation: {
      ...mutation,
    },
  });

  const renewBorrow = async (index: bigint, nativeFee: bigint | undefined, token: string) => {
    const contract = token === "cbBTC" ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress] : [chainId as keyof typeof borrowingContractAddress]
    writeContract?.({
      abi: borrowingContractAbi,
      address: contract as `0x${string}`,
      functionName: "renewOptions",
      args: [index],
      value: nativeFee,
    });
  };

  return {
    isRenewBorrowLoading,
    renewBorrowHash,
    renewBorrow,
    resetBorrowRenew,
    renewError,
  };
};

export default useBorrowRenew;
