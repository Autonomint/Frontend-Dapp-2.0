import { borrowingContractAddress } from "@/blockchain/contracts";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const useGetUsdValue = () => {
  const { address, chainId } = useAccount();
  // Use the useWriteBorrowingContractDepositTokens hook to deposit tokens
  const { isPending: isUsdValuePending, data: usdValue } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getUSDValue",
  });

  return {
    isUsdValuePending,
    usdValue,
  };
};

export default useGetUsdValue;
