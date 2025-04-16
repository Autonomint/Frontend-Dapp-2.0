import { modeABI } from "@/blockchain/abis/mode";
import { usDaAbi } from "@/blockchain/abis/usda";
import {
  borrowAssetsAddress,
  borrowingContractAddress,
  usDaAddress,
} from "@/blockchain/contracts";
import { NetworkId } from "@/utils/constants";
import { useAccount, useWriteContract } from "wagmi";

const useApproveWrapEth = (
  mutation: any,
  tokenName: "wrsETH" | "weETH" | string
) => {
  const {
    isPending: wrapETHApproveLoading,
    isSuccess: wrapETHApproveSuccess,
    isError: wrapETHApproveError,
    writeContractAsync: wrapETHApproveAsync,
    reset: wrapETHApproveReset,
    data: wrapETHApproveHash,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();

  const abi = chainId === NetworkId.BaseSepolia ? modeABI : modeABI;
  const tokenContractAddress =
    borrowAssetsAddress[tokenName as keyof typeof borrowAssetsAddress][
      chainId || NetworkId.BaseSepolia
    ];

  const approveWrapETHDynamic = async (
    contractAddress: `0x${string}`,
    values: bigint
  ) => {
    wrapETHApproveAsync({
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
    wrapETHApproveLoading,
    wrapETHApproveSuccess,
    wrapETHApproveError,
    wrapETHApproveReset,
    wrapETHApproveHash,
    approveWrapETHDynamic,
  };
};

export default useApproveWrapEth;
