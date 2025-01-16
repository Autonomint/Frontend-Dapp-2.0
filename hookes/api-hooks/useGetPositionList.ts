import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount, useChainId } from "wagmi";
import { useQuery } from "wagmi/query";
export interface PositionData {
  id: string;
  address: string;
  index: number;
  collateralType: string;
  depositedAmount: string;
  depositedTime: number;
  ethPrice: number;
  noOfAmintMinted: string;
  strikePrice: number;
  strikePricePercent: string;
  downsideProtectionPercentage: number;
  aprAtDeposit: number;
  optionFees: number;
  withdrawTime1: string;
  withdrawTime2: string;
  withdrawAmount1: string;
  withdrawAmount2: string;
  normalizedAmount: string;
  amountYetToWithdraw: string;
  noOfAbondMinted: string;
  status: "DEPOSITED" | "WITHDREW" | "LIQUIDATED";
}

/**
 * Retrieves deposits for a given address.
 * @param {`0x${string}` | undefined} address - The address to retrieve deposits for.
 * @return {Promise} A promise that resolves to the JSON response from the server.
 */
function getDeposits(address: `0x${string}` | undefined, chainId: Number) {
  return fetch(`${BACKEND_API_URL}/borrows/${chainId}/${address}`).then(
    (response) =>
      response
        .json()
        .then((data) => data.sort((a: any, b: any) => a.index - b.index))
  );
}

const useGetPositionList = () => {
  // Use the useQuery hook to fetch the data
  const { address } = useAccount();
  const chainId = useChainId();
  const {
    data: positionList,
    error: positionListError,
    refetch: positionListRefetech,
  } = useQuery({
    queryKey: ["deposits", chainId, address],
    queryFn: (): Promise<any> =>
      getDeposits(address ? address : undefined, chainId),
    enabled: !!address,
  });

  return {
    positionList: (positionList || []) as PositionData[],
    positionListError,
    positionListRefetech,
  };
};

export default useGetPositionList;
