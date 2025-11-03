import { cdsCoreABI } from "@/blockchain/abis/cdsCoreDeposit";
import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAddress, cdsCoreAddress, cdsDepositCoreAddress } from "@/blockchain/contracts";
import { AssetName } from "@/utils/constants";

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
    error: dcdsDepositError,
  } = useWriteContract({
    mutation,
  });

  console.log(dcdsDepositError, 'dcdsDepositError')
  const handleDcdsDeposit = async (
    args: [
      {
        user: `0x${string}`;
        tokenAddresses: `0x${string}`[];
        tokenAmounts: bigint[];
        liquidate: Widen<boolean>;
        liquidationAmount: bigint;
        lockingPeriod: bigint;
        expiredETHAmount: bigint;
        assetName: AssetName | undefined | string;
      },
      bigint,
      `0x${string}`
    ],
    value: bigint | undefined,
    hedgeAsset: string
  ) => {
    debugger
    const constract = hedgeAsset === "cbBTC" ? cdsCoreAddress : cdsAddress;

    const abi = hedgeAsset === "cbBTC" ? cdsCoreABI : cdsAbi;

    writeDcdsDeposit({
      abi: abi,
      address: constract[chainId as keyof typeof cdsAddress] as `0x${string}`,
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
