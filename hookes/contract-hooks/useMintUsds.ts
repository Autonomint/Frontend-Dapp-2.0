import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
import { AssetNames } from "@/utils/constants";
enum StrikePrice {
  // Define the enum values according to the IOptions.StrikePrice
  // Example:
  OPTION_ONE,
  OPTION_TWO,
  OPTION_THREE,
}

interface BorrowInputs {
  strikePercent: number; // uint8 can be mapped to the enum
  strikePrice: bigint; // uint64 can be represented by bigint
  volatility: bigint; // uint256 can be represented by bigint
  depositingAmount: bigint; // uint256 can be represented by bigint
  value: bigint; // uint256 can be represented by bigint
  assetName: AssetNames;
  deadline: bigint;
  signature: string;
  nonce: bigint;
}

const useDepositTokens = (mutation: any) => {
  const { chainId } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const {
    isPending: isDepositsLoading,
    data: depositDatahash, // Data received from the `useBorrowingContractDepositTokens` hook
    writeContract, // Function to initiate a write operation
    reset, // Function to reset the state of the hook
    isError: depositError, // Error state
  } = useWriteContract({
    mutation: {
      ...mutation,
    },
  });

  const mintUSDa = async ({
    strikePercent,
    strikePrice,
    volatility,
    depositingAmount,
    value,
    assetName,
    deadline,
    signature,
    nonce,
  }: BorrowInputs) => {
    // Call the `writeContract` function to deposit tokens
    //   writeContract?.({
    //     abi: borrowingContractAbi,
    //     address:
    //       borrowingContractAddress[
    //         chainId as keyof typeof borrowingContractAddress
    //       ],
    //     functionName: "depositTokens",
    //     args: [strikePercent, strikePrice, volatility, depositingAmount],
    //     value,
    //   });
    // };
    writeContract?.({
      abi: borrowingContractAbi,
      address:
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ],
      functionName: "depositTokens",
      args: [
        { strikePercent, volatility, assetName, depositingAmount },
        nonce,
        value,
        deadline,
        signature,
      ],
    });
  };

  return {
    isDepositsLoading,
    depositDatahash,
    mintUSDa,
    reset,
    depositError,
  };
};

export default useDepositTokens;
