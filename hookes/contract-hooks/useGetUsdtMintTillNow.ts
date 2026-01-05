import { globalAbi } from "@/blockchain/abis/global";
import { globalAddress } from "@/blockchain/contracts";
import { AssetName } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

// Hook to get omnichain data from global contract
const useGetOmniChainData = () => {
  const { address, chainId } = useAccount();
  const {
    data: omniChainDataEth,
    isPending: isOmniChainDataPendingEth,
    error: omniChainDataErrorEth,
  } = useReadContract({
    abi: globalAbi,
    address: globalAddress[chainId as keyof typeof globalAddress],
    functionName: "getOmniChainData",
    query: { staleTime: 10 * 1000 },
    args: [AssetName.ETH],
    scopeKey: "getOmniChainData",
  });

  const {
    data: omniChainDataCbbtc,
    isPending: isOmniChainDataPendingCbbtc,
    error: omniChainDataErrorCbbtc,
  } = useReadContract({
    abi: globalAbi,
    address: globalAddress[chainId as keyof typeof globalAddress],
    functionName: "getOmniChainData",
    query: { staleTime: 10 * 1000 },
    args: [AssetName.cbBTC],
    scopeKey: "getOmniChainData",
  });

  const {
    data: omniChainDataKrwq,
    isPending: isOmniChainDataPendingKrwq,
    error: omniChainDataErrorKrwq,
  } = useReadContract({
    abi: globalAbi,
    address: globalAddress[chainId as keyof typeof globalAddress],
    functionName: "getOmniChainData",
    query: { staleTime: 10 * 1000 },
    args: [AssetName.KRWQ],
    scopeKey: "getOmniChainData",
  });



  return {
    omniChainDataEth: omniChainDataEth as Record<string, bigint>,
    isOmniChainDataPendingEth,
    omniChainDataErrorEth,
    omniChainDataCbbtc: omniChainDataCbbtc as Record<string, bigint>,
    isOmniChainDataPendingCbbtc,
    omniChainDataErrorCbbtc,
    omniChainDataKrwq: omniChainDataKrwq as Record<string, bigint>,
    isOmniChainDataPendingKrwq,
    omniChainDataErrorKrwq,
  };
};

export default useGetOmniChainData;
