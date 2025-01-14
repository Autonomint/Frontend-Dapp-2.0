import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useReadContract, useWriteContract } from "wagmi";

const useGetUsdValue = () => {
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const { isPending: isUsdValuePending, data: usdValue } = useReadContract({
    abi: borrowingContractAbi,
    address: borrowingContractAddress[11155111],
    functionName: "getUSDValue",
  });

  return {
    isUsdValuePending,
    usdValue,
  };
};

export default useGetUsdValue;
