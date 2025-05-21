import { cdsAbi } from "@/blockchain/abis/dcds";
import { cdsAddress } from "@/blockchain/contracts";
import { AssetStatus } from "@/utils/constants";
import { Address } from "viem";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { number } from "yup";

const useTokenDetails = (tokenAddress: Address) => {
  const { chainId } = useAccount();
  // checking individual token pause state
  const { data: assetDetails, refetch: refetchCurrentData } = useReadContract({
    abi: cdsAbi,
    address: cdsAddress[chainId as keyof typeof cdsAddress],
    args: [tokenAddress],
    functionName: "getAssetDetails",
  }) as { data: Record<number, string | number>; refetch: () => void };

  // checking individual token pause state
  const isTokenDepositPaused = assetDetails?.[0] === AssetStatus.DEPOSIT_PAUSED;
  
  const isTokenWithdrawPaused =
    assetDetails?.[0] === AssetStatus.WITHDRAW_PAUSED;

  const isTokenDepositWithdrawPaused =
    assetDetails?.[0] === AssetStatus.BOTH_PAUSED;

  const isTokenDepositWithdrawUnpaused =
    assetDetails?.[0] === AssetStatus.BOTH_UNPAUSED;

  return {
    assetDetails,
    refetchCurrentData,
    isTokenDepositPaused,
    isTokenWithdrawPaused,
    isTokenDepositWithdrawPaused,
    isTokenDepositWithdrawUnpaused,
  };
};

export default useTokenDetails;
