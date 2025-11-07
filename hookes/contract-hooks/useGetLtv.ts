import { borrowCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract } from "wagmi";
import { AssetName, BorrowData } from "@/utils/constants";

/**
 * Custom hook to fetch the LTV (Loan-to-Value) value 
 * @returns {Object} Object containing:
 *   - isTvlPending: boolean indicating if the TVL is being fetched
 *   - tvlValue: number representing the TVL value
 */
const useGetLtv = (tokenEnum: number) => {
  const { address, chainId } = useAccount();
  const contract = (tokenEnum) === 12 ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress] : borrowingContractAddress[chainId as keyof typeof borrowingContractAddress]
  const { isPending: isTvlPending, data: tvlValue } = useReadContract({
    abi: borrowingContractAbi,
    address: contract as `0x${string}`,
    args: [tokenEnum],
    functionName: "getAssetDetails",
    query: { enabled: !!address },
  });

  return {
    isTvlPending,
    tvlValue: tvlValue as { LTV: number, APR: number },
  };
};

const useGetLtvALL = (tokenEnum: number) => {
  const { address, chainId } = useAccount();
  const contract = (tokenEnum) === 12 ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress] : borrowingContractAddress[chainId as keyof typeof borrowingContractAddress]

  const { isPending: isTvlPending, data: tvlValue } = useReadContract({
    abi: borrowingContractAbi,
    address: contract as `0x${string}`,
    args: [tokenEnum],
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

