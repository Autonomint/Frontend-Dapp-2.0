import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { AssetName } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

/**
 * React hook to retrieve and manage the last cumulative rate from the borrowing contract.
 *
 * @returns Object containing the last cumulative rate and loading/error state.
 */
const useLastCumulativeRate = (token: string) => {
  const { address, chainId } = useAccount();
  const tokenEnum = token === "cbBTC" ? AssetName.cbBTC : undefined;
  const abi = token === "cbBTC" ? borowCoreABI : borrowingContractAbi;
  const contract = token === "cbBTC" ? borrowCoreAddress : borrowingContractAddress;
  const { data: lastCumulativeRate, isPending: isLastCumulativeRatePending } =
    useReadContract({
      abi: abi,
      address:
        contract[
        chainId as keyof typeof contract
        ] as `0x${string}`,
      functionName: "viewCurrentCr",
      args: [tokenEnum],
      query: {
        enabled: !!address,
        staleTime: 10 * 1000,
      },
    });

  return {
    lastCumulativeRate: lastCumulativeRate as number,
    isLastCumulativeRatePending,
  };
};

export default useLastCumulativeRate;
