import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAbiEthereum } from "@/blockchain/abis/dcds-ethereum";
import { cdsAddress } from "@/blockchain/contracts";
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

  const handleDcdsWithdrawGain = (args: any) => {
    dcdsFundWithdrawGain({
      abi: chainId === NetworkId.Ethereum ? cdsAbiEthereum : cdsAbi,
      address: cdsAddress[chainId as keyof typeof cdsAddress],
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
