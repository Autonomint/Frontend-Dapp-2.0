import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
import { AssetName } from "@/utils/constants";

interface BorrowInputs {
  strikePercent: bigint; // uint8 can be mapped to the enum
  // strikePrice: bigint; // uint64 can be represented by bigint
  volatility: bigint; // uint256 can be represented by bigint
  depositingAmount: bigint; // uint256 can be represented by bigint
  value: bigint | undefined; // uint256 can be represented by bigint
  assetName: AssetName;
  expiredETHAmount: bigint;
  deadline: bigint;
  signature: `0x${string}`;
  nonce: bigint;
}

const useDepositTokens = (mutation: any) => {
  const { chainId, address } = useAccount();
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
    volatility,
    depositingAmount,
    value,
    assetName,
    deadline,
    signature,
    expiredETHAmount,
    nonce,
  }: BorrowInputs) => {
    writeContract?.({
      abi: borrowingContractAbi,
      address:
        borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
        ],
      functionName: "depositTokens",
      args: [
        {
          user: address as `0x${string}`,
          strikePercent,
          volatility,
          assetName,
          depositingAmount,
          expiredETHAmount,
        },
        {
          nonce,
          deadline,
          signature,
        },
      ],
      value,
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
