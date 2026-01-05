import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { AssetName, BorrowAssetsEnum } from "@/utils/constants";
import { useAccount, useReadContract } from "wagmi";

/**
 * React hook to retrieve and manage the last cumulative rate from the borrowing contract.
 *
 * @returns Object containing the last cumulative rate and loading/error state.
 */
const useLastCumulativeRate = (token: string) => {
  const { address, chainId } = useAccount();
  const tokenEnum = token === "cbBTC" ? [AssetName.cbBTC] : token === "krwq" ? [AssetName.KRWQ] : undefined;
  const abi = token === "cbBTC" || token === "krwq" ? borowCoreABI : borrowingContractAbi;
  const contract = token === "cbBTC" || token === "krwq" ? borrowCoreAddress : borrowingContractAddress;
  const { data: lastCumulativeRate, isPending: isLastCumulativeRatePending, error } =
    useReadContract({
      abi: abi,
      address:
        contract[
        chainId as keyof typeof borrowingContractAddress
        ] as `0x${string}`,
      functionName: "viewCurrentCr",
      args: tokenEnum,
      query: {
        enabled: !!address,
        staleTime: 10 * 1000,
      },
    });

  console.log(error, 'error')

  return { lastCumulativeRate, isLastCumulativeRatePending };
};

export default useLastCumulativeRate;
