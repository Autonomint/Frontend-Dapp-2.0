import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useCalculateInterest = (mutation: any) => {
  const { chainId } = useAccount();
  const {
    isPending: cumulativeRateLoading,
    isError: cumulativeRateError,
    data: cumulativeRate,
    writeContractAsync: calculateCumulativeRateAsync,
    reset: cumulativeReset,
    isSuccess: cumulativeRateSuccess,
  } = useWriteContract({
    mutation,
  });

  const calculateCumulativeRate = async () => {
    try {
      calculateCumulativeRateAsync({
        abi: borrowingContractAbi,
        address:
          borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ],
        functionName: "calculateCumulativeRate",
      });
    } catch (error) {
      console.error("Error calculating cumulative rate:", error);
    }
  };

  return {
    cumulativeRateLoading,
    cumulativeRateError,
    cumulativeRate: cumulativeRate as bigint | undefined,
    calculateCumulativeRate,
    cumulativeReset,
    cumulativeRateSuccess,
  };
};

export default useCalculateInterest;
