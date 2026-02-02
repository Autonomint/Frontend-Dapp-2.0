import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import { testusdtAbiAddress, usdcAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useUsdtApprove = (mutation: any) => {
  const { chainId } = useAccount();
  const {
    data: usdtApprovedHash,
    writeContract: usdtApproveWrite,
    isPending: isPendingUsdtApprove,
    isSuccess: isSuccessUsdtApprove,
    reset: resetUsdtApprove,
    isError: usdtApproveError,
    error: usdtApproveErrorData,
  } = useWriteContract({ mutation });

  const handleUsdtApprove = (args: [`0x${string}`, bigint]) => {
    usdtApproveWrite({
      abi: testusdtAbiAbi,
      address: usdcAddress[chainId as keyof typeof testusdtAbiAddress],
      functionName: "approve",
      args,
    });
  };

  return {
    usdtApproveWrite,
    isPendingUsdtApprove,
    isSuccessUsdtApprove,
    usdtApprovedHash,
    handleUsdtApprove,
    resetUsdtApprove,
    usdtApproveError,
  };
};

export default useUsdtApprove;
