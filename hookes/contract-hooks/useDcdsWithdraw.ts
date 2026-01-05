import { cdsCoreABI } from "@/blockchain/abis/cdsCoreDeposit";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAbiEthereum } from "@/blockchain/abis/dcds-ethereum";
import { cdsAddress, cdsCoreAddress, cdsWithdrawCoreAddress } from "@/blockchain/contracts";
import { NetworkId } from "@/utils/constants";
import { useAccount, useWriteContract } from "wagmi";

const useDcdsWithdraw = (mutation: any) => {
  const {
    data: dcdsFundWithdrawData,
    isError: dcdsFundWithdrawError,
    isPending: isDcdsFundWithdrawPending,
    writeContract: dcdsFundWithdraw,
    reset: resetDcdsFundWithdraw,
    error: dcdsFundWithdrawErrorData,
  } = useWriteContract({
    mutation,
  });
  const { chainId } = useAccount();

  const handleDcdsFundWithdraw = (args: any, value: any, token: string) => {
    const contract = token === "cbBTC" || token === "krwq" ? cdsCoreAddress : cdsAddress;
    const abi = token === "cbBTC" || token === "krwq" ? cdsCoreABI : cdsAbi
    dcdsFundWithdraw({
      abi: abi,
      address: contract[chainId as keyof typeof contract] as `0x${string}`,
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
