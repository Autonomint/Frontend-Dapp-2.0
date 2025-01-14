import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { globalAbi } from "@/blockchain/abis/global";
import { globalAddress } from "@/utils/constants";

const useGetGlobalQuote = (options: any) => {
  const { address } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const {
    isPending: isUsdValuePending,
    data: quoteValue,
    error: quoteError,
  } = useReadContract({
    abi: globalAbi,
    address: "0xA687412e7De672a5F945B15Db24c50F91512A19C",
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
