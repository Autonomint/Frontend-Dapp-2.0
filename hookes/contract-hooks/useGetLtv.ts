import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract } from "wagmi";
import { AssetName, BorrowData } from "@/utils/constants";

/**
 * Custom hook to fetch the LTV (Loan-to-Value) value 
 * @returns {Object} Object containing:
 *   - isTvlPending: boolean indicating if the TVL is being fetched
 *   - tvlValue: number representing the TVL value
 */
const useGetLtv = () => {
  const { address, chainId } = useAccount();
  const { isPending: isTvlPending, data: tvlValue } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
      chainId as keyof typeof borrowingContractAddress
      ],
    args: [AssetName.ETH],
    functionName: "getAssetDetails",
    query: { enabled: !!address },
  }) as any;

  return {
    isTvlPending,
    tvlValue: tvlValue?.LTV,
    APR: tvlValue?.APR,
  };
};

export default useGetLtv;
