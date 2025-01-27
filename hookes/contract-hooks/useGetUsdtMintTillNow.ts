import { globalAbi } from "@/blockchain/abis/global";
import { globalAddress } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

const useGetOmniChainData = () => {
  const { address, chainId } = useAccount();
  const {
    data: omniChainData,
    isPending: isOmniChainDataPending,
    error: omniChainDataError,
  } = useReadContract({
    abi: globalAbi,
    address: globalAddress[chainId as keyof typeof globalAddress],
    functionName: "getOmniChainData",
    query: { staleTime: 10 * 1000 },
    scopeKey: "getOmniChainData",
  });

  return {
    omniChainData,
    isOmniChainDataPending,
    omniChainDataError,
  };
};

export default useGetOmniChainData;
