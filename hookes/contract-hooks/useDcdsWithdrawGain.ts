
import { cdsCoreABI } from "@/blockchain/abis/cdsCore";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAbiEthereum } from "@/blockchain/abis/dcds-ethereum";
import { cdsAddress, cdsCoreAddress } from "@/blockchain/contracts";
import { NetworkId } from "@/utils/constants";
import { useAccount, useWriteContract } from "wagmi";

/**
 * React hook to handle withdraw gain for CDS positions.
 *
 * @param mutation - The mutation function to use for the withdraw gain.
 * @returns Object containing the withdraw gain data, error, pending state, and functions to handle the withdraw gain.
 */
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

  const handleDcdsWithdrawGain = (args: any, token: string) => {
    const contract = token === "cbBTC" || token === "krwq" || token === "EURC" ? cdsCoreAddress : cdsAddress;
    const abi = token === "cbBTC" || token === "krwq" || token === "EURC" || token === "HYPE" ? cdsCoreABI : cdsAbi;
    dcdsFundWithdrawGain({
      abi: chainId === NetworkId.Ethereum ? cdsAbiEthereum : abi,
      address: contract[chainId as keyof typeof contract] as `0x${string}`,
      functionName: "withdrawGains",
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
