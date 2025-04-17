import { modeABI } from "@/blockchain/abis/mode";
import { usDaAbi } from "@/blockchain/abis/usda";
import {
  borrowingContractAddress,
  nativeTokenAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { NetworkId } from "@/utils/constants";
import { useAccount, useWriteContract } from "wagmi";

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

  // const approvenativeToken = async (
  //   lastCumulativeRate: bigint | undefined,
  //   normalizedAmount: string
  // ) => {
  //   nativeTokenApproveAsync({
  //     abi: nativeTokenAbi,
  //     address: nativeTokenAddress[chainId as keyof typeof nativeTokenAddress],
  //     functionName: "approve",
  //     args: [
  //       borrowingContractAddress[
  //         chainId as keyof typeof borrowingContractAddress
  //       ] as `0x${string}`, // address of borrowing contract based on chainId

  //       BigInt(
  //         BigInt(
  //           parseInt(normalizedAmount)
  //             ? Number(parseInt(normalizedAmount)) * 10 ** 6
  //             : 0
  //         ) * BigInt(lastCumulativeRate ?? 0n)
  //       ) /
  //         BigInt(10 ** 27) +
  //         1000000n, // Total usda amount
  //     ],
  //   });
  // };

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
