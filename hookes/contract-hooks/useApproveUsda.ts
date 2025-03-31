import { usDaAbi } from "@/blockchain/abis/usda";
import { borrowingContractAddress, usDaAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useApproveUsda = (mutation: any) => {
  const {
    isPending: usdaApproveLoading,
    isSuccess: usdaApproveSuccess,
    isError: usdaApproveError,
    writeContractAsync: usdaApproveAsync,
    reset: approveReset,
    data: usdaApproveHash,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();

  const approveUsda = async (repayAmount: bigint) => {
    usdaApproveAsync({
      abi: usDaAbi,
      address: usDaAddress[chainId as keyof typeof usDaAddress],
      functionName: "approve",
      args: [
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ] as `0x${string}`, // address of borrowing contract based on chainId

        repayAmount + 1000000n, // Total amint amount
      ],
    });
  };

  const approveUsdaDynamic = async (
    values: bigint,
    contractAddress: `0x${string}`
  ) => {
    usdaApproveAsync({
      abi: usDaAbi,
      address: usDaAddress[chainId as keyof typeof usDaAddress],
      functionName: "approve",
      args: [
        contractAddress, // address of borrowing contract based on chainId
        values,
      ],
    });
  };
  return {
    usdaApproveLoading,
    usdaApproveSuccess,
    usdaApproveError,
    approveUsda,
    approveReset,
    usdaApproveHash,
    approveUsdaDynamic,
  };
};

export default useApproveUsda;
