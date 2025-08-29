import { globalAbi } from "@/blockchain/abis/global";
import { globalAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const useGetGlobalQuote = (options: any, todoFlag: number, secondFlag = 0) => {
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
    args: [todoFlag, secondFlag, options, false],
  });

  return {
    isUsdValuePending: isUsdValuePending as boolean,
    quoteValue: quoteValue as { nativeFee: bigint },
    quoteError: quoteError as Error | undefined,
  };
};

export default useGetGlobalQuote;
