import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useDcdsWithdraw = (mutation: any) => {
  const {
    data: dcdsFundWithdrawData,
    isError: dcdsFundWithdrawError,
    isPending: isDcdsFundWithdrawPending,
    writeContract: dcdsFundWithdraw,
    reset: resetDcdsFundWithdraw,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();

  const handleDcdsFundWithdraw = (args: any, value: any) => {
    dcdsFundWithdraw({
      abi: cdsAbi,
      address: cdsAddress[chainId as keyof typeof cdsAddress],
      functionName: "withdraw",
      args,
      value,
    });
  };
  return {
    dcdsFundWithdrawData,
    dcdsFundWithdrawError,
    isDcdsFundWithdrawPending,
    handleDcdsFundWithdraw,
    resetDcdsFundWithdraw,
  };
};

export default useDcdsWithdraw;
