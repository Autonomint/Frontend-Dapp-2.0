import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import {
  borrowingContractAddress
} from "@/blockchain/contracts";
import { formatUnits } from "ethers";
import { useAccount, useReadContract } from "wagmi";
import { BorrowAssetsEnum } from "@/utils/constants";

type BorrowAssetKey = keyof typeof BorrowAssetsEnum;

/**
 * Custom hook to fetch the ratio value
 * @returns {Object} Object containing:
 *   - isRatioPending: boolean indicating if the ratio is being fetched
 *   - ratioValue: number representing the ratio value
 */
const useBorrowRatio = (amount: bigint, currency: BorrowAssetKey) => {
  const { address, chainId } = useAccount();
  const abi = currency === "ETH" ? borrowingContractAbi : borowCoreABI
  const args = currency === "ETH" ? [amount] : [amount, BorrowAssetsEnum[currency]]
  const {
    isPending: isRatioPending,
    data: ratioValue,
    error: ratioError,
    refetch: refetchRatio,
  } = useReadContract({
    abi: abi,
    address: borrowingContractAddress[chainId as keyof typeof borrowingContractAddress],
    functionName: "viewCurrentRatio",
    args: args,
    query: { enabled: !!address },
  });

  return {
    isRatioPending,
    ratioValue: ratioValue as number,
    ratioError,
    refetchRatio
  };
};

export default useBorrowRatio;
