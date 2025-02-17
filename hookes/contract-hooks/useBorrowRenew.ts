import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
import { AssetNames, MintAssets } from "@/utils/constants";
enum StrikePrice {
  // Define the enum values according to the IOptions.StrikePrice
  // Example:
  OPTION_ONE,
  OPTION_TWO,
  OPTION_THREE,
}

interface BorrowRenewInputs {
  index: number;
}

const useBorrowRenew = (mutation: any) => {
  const { chainId } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const {
    isPending: isRenewBorrowLoading,
    data: renewBorrowHash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract, // Function to initiate a write operation
    reset, // Function to reset the state of the hook
    isError: depositError, // Error state
  } = useWriteContract({
    mutation: {
      ...mutation,
    },
  });

  const renewBorrow = async ({ index }: BorrowRenewInputs) => {
    writeContract?.({
      abi: borrowingContractAbi,
      address:
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ],
      functionName: "renewOptions",
      args: [index],
    });
  };

  return {
    isRenewBorrowLoading,
    renewBorrowHash,
    renewBorrow,
    reset,
    depositError,
  };
};

export default useBorrowRenew;
