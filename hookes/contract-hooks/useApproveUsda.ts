import { usDaAbi } from "@/blockchain/abis/usda";
import { borrowingContractAddress, usDaAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useApproveUsda = () => {
  const {
    isPending: amintApproveLoading,
    isSuccess: amintApproveSuccess,
    isError: amintApproveError,
    writeContractAsync: amintApproveAsync,
    reset: approveReset,
    data: amintApproveHash,
  } = useWriteContract({
    mutation: {},
  });
  const { chainId } = useAccount();

  const approveUsda = async (
    lastCumulativeRate: bigint | undefined,
    normalizedAmount: string
  ) => {
    debugger;
    amintApproveAsync({
      abi: usDaAbi,
      address: usDaAddress[chainId as keyof typeof usDaAddress],
      functionName: "approve",
      args: [
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ] as `0x${string}`, // address of borrowing contract based on chainId
        BigInt(
          BigInt(normalizedAmount ? Number(normalizedAmount) * 10 ** 6 : 0) *
            BigInt(lastCumulativeRate ?? 0n)
        ) /
          BigInt(10 ** 27) +
          1000000n, // Total amint amount
      ],
    });
  };
  return {
    amintApproveLoading,
    amintApproveSuccess,
    amintApproveError,
    approveUsda,
    approveReset,
    amintApproveHash,
  };
};

export default useApproveUsda;
