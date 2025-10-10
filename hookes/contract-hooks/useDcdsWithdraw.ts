import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAbiEthereum } from "@/blockchain/abis/dcds-ethereum";
import { cdsAddress } from "@/blockchain/contracts";
import { NetworkId } from "@/utils/constants";
import { useAccount, useWriteContract } from "wagmi";

const useDcdsWithdraw = (mutation: any) => {
  const {
    data: dcdsFundWithdrawData,
    isError: dcdsFundWithdrawError,
    isPending: isDcdsFundWithdrawPending,
    writeContract: dcdsFundWithdraw,
    reset: resetDcdsFundWithdraw,
    error: dcdsFundWithdrawErrorDetails,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();
  console.log(dcdsFundWithdrawErrorDetails, 'dcdsFundWithdrawErrorDetails')
  const handleDcdsFundWithdraw = (args: any, value: any) => {
    dcdsFundWithdraw({
      abi: chainId === NetworkId.Ethereum ? cdsAbiEthereum : cdsAbi,
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
