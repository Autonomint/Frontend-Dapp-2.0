import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";

const useLastCumulativeRate = () => {
  const { address, chainId } = useAccount();

  const { data: lastCumulativeRate, isPending: isLastCumulativeRatePending } =
    useReadContract({
      abi: borrowingContractAbi,
      address:
        borrowingContractAddress[
          chainId as keyof typeof borrowingContractAddress
        ],
      functionName: "viewCurrentCr",
      query: {
        enabled: !!address,
        staleTime: 10 * 1000,
      },
    });

  return { lastCumulativeRate, isLastCumulativeRatePending };
};

export default useLastCumulativeRate;
