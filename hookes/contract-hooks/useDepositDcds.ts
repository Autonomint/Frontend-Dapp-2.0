import { cdsCoreABI } from "@/blockchain/abis/cdsCore";
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

  const handleDcdsDeposit = async (
    args: [
      {
        user: `0x${string}`;
        tokenAddresses: `0x${string}`[];
        tokenAmounts: bigint[];
        liquidate: Widen<boolean>;
        liquidationAmount: bigint;
        lockingPeriod: bigint;
        assetName: AssetName | undefined | string;
        verifyParams: Record<string, any>;
      },

    ],
    value: bigint | undefined,
    hedgeAsset: string
  ) => {
    const contract = hedgeAsset === "cbBTC" || hedgeAsset === "KRWQ" || hedgeAsset === "EURC" ? cdsCoreAddress : cdsAddress;

    const abi = hedgeAsset === "cbBTC" || hedgeAsset === "KRWQ" || hedgeAsset === "EURC" ? cdsCoreABI : cdsAbi;


    writeDcdsDeposit({
      abi: abi,
      address: contract[chainId as keyof typeof cdsAddress] as `0x${string}`,
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
