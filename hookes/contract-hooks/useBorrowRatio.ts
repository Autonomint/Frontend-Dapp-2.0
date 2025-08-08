import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import {
  borrowingContractAddress
} from "@/blockchain/contracts";
import { formatUnits } from "ethers";
import { useAccount, useReadContract } from "wagmi";

/**
 * Custom hook to fetch the ratio value
 * @returns {Object} Object containing:
 *   - isRatioPending: boolean indicating if the ratio is being fetched
 *   - ratioValue: number representing the ratio value
 */
const useBorrowRatio = (amount: bigint) => {
  const { address, chainId } = useAccount();
  const {
    isPending: isRatioPending,
    data: ratioValue,
    error: ratioError,
  } = useReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress[chainId as keyof typeof borrowingContractAddress],
    functionName: "viewCurrentRatio",
    args: [amount],
    query: { enabled: !!address },
  });
  

  return {
    isRatioPending,
    ratioValue,
    ratioError,
  };
};

export default useBorrowRatio;
