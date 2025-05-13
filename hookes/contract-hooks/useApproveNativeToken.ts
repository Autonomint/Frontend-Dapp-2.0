import { modeABI } from "@/blockchain/abis/mode";
import { usDaAbi } from "@/blockchain/abis/usda";
import {
  borrowingContractAddress,
  nativeTokenAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { NetworkId } from "@/utils/constants";
import { useAccount, useWriteContract } from "wagmi";

/**
 * This hook is used to approve the native token for a specific contract.
 * It uses the `useWriteContract` hook from `wagmi` to interact with the smart contract.
 *
 * @param mutation - The mutation object containing options for the write contract operation.
 * @returns An object containing various states and functions related to the approval process.
 */
const useApproveNativeToken = (mutation: any) => {
  const {
    isPending: nativeTokenApproveLoading,
    isSuccess: nativeTokenApproveSuccess,
    isError: nativeTokenApproveError,
    writeContractAsync: nativeTokenApproveAsync,
    reset: nativeTokenApproveReset,
    data: nativeTokenApproveHash,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();

  const abi = chainId === NetworkId.BaseSepolia ? modeABI : modeABI;
  const tokenContractAddress =
    nativeTokenAddress[chainId as keyof typeof nativeTokenAddress];

  const approveNativeTokenDynamic = async (
    contractAddress: `0x${string}`,
    values: bigint
  ) => {
    nativeTokenApproveAsync({
      abi: abi,
      address: tokenContractAddress,
      functionName: "approve",
      args: [
        contractAddress, // address of borrowing contract based on chainId
        values,
      ],
    });
  };
  return {
    nativeTokenApproveLoading,
    nativeTokenApproveSuccess,
    nativeTokenApproveError,
    nativeTokenApproveReset,
    nativeTokenApproveHash,
    approveNativeTokenDynamic,
  };
};

export default useApproveNativeToken;
