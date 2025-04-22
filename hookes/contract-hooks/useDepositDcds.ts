import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAddress } from "@/blockchain/contracts";
import { Widen } from "viem";
import { useAccount, useWriteContract } from "wagmi";

const useDcdsDeposit = (mutation: Record<string, any>) => {
  const { chainId } = useAccount();
  const {
    data: dcdsDepositHash,
    isError: dcdsDepositeError,
    isPending: dcdsDepositIsPending,
    writeContract: writeDcdsDeposit,
    reset: resetDcdsDeposit,
  } = useWriteContract({
    mutation,
  });

  const handleDcdsDeposit = async (
    args: [`0x${string}`[], bigint[], Widen<boolean>, bigint, bigint],
    value: bigint
  ) => {
    writeDcdsDeposit({
      abi: cdsAbi,
      address: cdsAddress[chainId as keyof typeof cdsAddress],
      functionName: "deposit",
      args,
      value,
    });
  };

  return {
    dcdsDepositHash,
    dcdsDepositeError,
    dcdsDepositIsPending,
    handleDcdsDeposit,
  };
};
export default useDcdsDeposit;
