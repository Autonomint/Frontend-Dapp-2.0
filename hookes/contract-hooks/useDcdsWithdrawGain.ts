import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useDcdsWithdrawGain = (mutation: any) => {
  const {
    data: dcdsWithdrawGainData,
    isError: dcdsWithdrawGainError,
    isPending: isDcdsWithdrawGainPending,
    writeContract: dcdsFundWithdrawGain,
    writeContractAsync: dcdsFundWithdrawGainAsync,
    reset: resetDcdsWithdrawGain,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();

  const handleDcdsWithdrawGain = (args: any) => {
    dcdsFundWithdrawGain({
      abi: cdsAbi,
      address: cdsAddress[chainId as keyof typeof cdsAddress],
      functionName: "withdraw",
      args,
    });
  };
  return {
    dcdsWithdrawGainData,
    dcdsWithdrawGainError,
    isDcdsWithdrawGainPending,
    handleDcdsWithdrawGain,
    dcdsFundWithdrawGainAsync,
    resetDcdsWithdrawGain,
  };
};

export default useDcdsWithdrawGain;
