import { borrowCoreAddress, borrowDepositCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useWriteContract } from "wagmi";
import { AssetName } from "@/utils/constants";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";

interface BorrowInputs {
  depositingAmount: bigint; // uint256 can be represented by bigint
  value: bigint | undefined; // uint256 can be represented by bigint
  assetName: AssetName;
  hedgeDuration: bigint
  ethPrice: bigint | undefined
  verifyParams: Record<any, any>
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
    depositingAmount,
    value,
    assetName,
    hedgeDuration,
    ethPrice,
    verifyParams
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
          assetName,
          depositingAmount,
          hedgeValidity: hedgeDuration,
          ethPrice: assetName === 12 || assetName === 13 ? ethPrice : undefined,
          verifyParams
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
