import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useWriteContract } from "wagmi";
enum StrikePrice {
  // Define the enum values according to the IOptions.StrikePrice
  // Example:
  OPTION_ONE,
  OPTION_TWO,
  OPTION_THREE,
}

interface FunctionInputs {
  strikePercent: StrikePrice; // uint8 can be mapped to the enum
  strikePrice: bigint; // uint64 can be represented by bigint
  volatility: bigint; // uint256 can be represented by bigint
  depositingAmount: bigint; // uint256 can be represented by bigint
  value: bigint; // uint256 can be represented by bigint
}

const useDepositTokens = () => {
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const {
    isPending: isDepositsLoading,
    data: depositDatahash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract, // Function to initiate a write operation
    reset, // Function to reset the state of the hook
  } = useWriteContract({
    mutation: {
      onSuccess: (data) => {
        // Show custom toast
      },
      onError: (error: any) => {},
    },
  });

  const mintUSDa = async ({
    strikePercent,
    strikePrice,
    volatility,
    depositingAmount,
    value,
  }: FunctionInputs) => {
    // Call the `writeContract` function to deposit tokens
    writeContract?.({
      abi: borrowingContractAbi,
      address: borrowingContractAddress[11155111],
      functionName: "depositTokens",
      args: [strikePercent, strikePrice, volatility, depositingAmount],
      value,
    });
  };

  return {
    isDepositsLoading,
    depositDatahash,
    mintUSDa,
    reset,
  };
};

export default useDepositTokens;
