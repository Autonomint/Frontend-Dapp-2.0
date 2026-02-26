import { testusdtAbiAbi } from "@/blockchain/abis/usdt";
import { testusdtAbiAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useKRWQApprove = (mutation: any) => {
  const { chainId } = useAccount();
  const {
    data: approvedHashKRWQ,
    writeContract: ApproveWrite,
    isPending: isPendingKRWQApprove,
    isSuccess: isSuccessKRWQApprove,
    reset: resetKRWQApprove,
    isError: KRWQApproveError,
    error: KRWQApproveErrorData,
  } = useWriteContract({ mutation });

  const handleKRWQApprove = (args: [`0x${string}`, bigint]) => {
    ApproveWrite({
      abi: testusdtAbiAbi,
      address: testusdtAbiAddress[chainId as keyof typeof testusdtAbiAddress],
      functionName: "approve",
      args,
    });
  };

  return {
    ApproveWrite,
    isPendingKRWQApprove,
    isSuccessKRWQApprove,
    approvedHashKRWQ,
    handleKRWQApprove,
    resetKRWQApprove,
    KRWQApproveError,
  };
};

export default useKRWQApprove;
