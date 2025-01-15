import { globalAbi } from "@/blockchain/abis/global";
import { globalAddress } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

const useGetGlobalQuote = (options: any) => {
  const { address, chainId } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens

  const {
    isPending: isUsdValuePending,
    data: quoteValue,
    error: quoteError,
  } = useReadContract({
    abi: globalAbi,
    address: globalAddress[chainId as keyof typeof globalAddress],
    functionName: "quote",
    query: { enabled: !!address },
    args: [1, options, false],
  });

  return {
    isUsdValuePending,
    quoteValue,
    quoteError,
  };
};

export default useGetGlobalQuote;
