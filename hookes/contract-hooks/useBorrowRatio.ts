import { borrowLibAbi } from "@/blockchain/abis/borrow-lib-abi";
import {
  borrowingContractAddress,
  borrowLibAddress,
} from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

/**
 * Custom hook to fetch the ratio value
 * @returns {Object} Object containing:
 *   - isRatioPending: boolean indicating if the ratio is being fetched
 *   - ratioValue: number representing the ratio value
 */
const useBorrowRatio = (
  amount: bigint,
  currentEthPrice: bigint,
  lastEthprice: bigint,
  firstBorrowDeposited: boolean,
  totalCollateralInETH: bigint,
  previousData: any
) => {
  const { address, chainId } = useAccount();
  const {
    isPending: isRatioPending,
    data: ratioValue,
    error: ratioError,
  } = useReadContract({
    abi: borrowLibAbi,
    address: borrowLibAddress[chainId as keyof typeof borrowLibAddress],
    functionName: "calculateRatio",
    args: [
      amount,
      currentEthPrice,
      lastEthprice,
      firstBorrowDeposited,
      totalCollateralInETH,
      previousData,
    ],
    query: { enabled: !!address },
  });
  console.log(
    {
      amount,
      currentEthPrice,
      lastEthprice,
      firstBorrowDeposited,
      totalCollateralInETH,
      previousData,
    },
    "calculateRatio",
    ratioValue,
    ratioError
  );

  return {
    isRatioPending,
    ratioValue,
    ratioError,
  };
};

export default useBorrowRatio;
