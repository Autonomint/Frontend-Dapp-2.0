import { borrowCoreAddress, borrowDepositCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
import { AssetName } from "@/utils/constants";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";

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
  hedgeDuration: bigint
  ethPrice: bigint | undefined
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
    error: depositErrorData
  } = useWriteContract({
    mutation: {
      ...mutation,
    },
  });

  console.log(depositErrorData, 'depositErrorData')

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
    hedgeDuration,
    ethPrice
  }: BorrowInputs) => {
    const contractAddress = assetName === 12 || assetName === 13 ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress] : borrowingContractAddress[chainId as keyof typeof borrowingContractAddress]
    const abi = assetName === 12 || assetName === 13 ? borowCoreABI : borrowingContractAbi
    writeContract?.({
      abi: abi,
      address: contractAddress as `0x${string}`,
      functionName: "depositTokens",
      args: [
        {
          user: address as `0x${string}`,
          ethPrice: assetName === 12 || assetName === 13 ? ethPrice : undefined,
          strikePercent,
          volatility,
          assetName,
          depositingAmount,
          expiredETHAmount,
          hedgeValidity: hedgeDuration
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
