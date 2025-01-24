import { BACKEND_API_URL } from "@/utils/urls";
import { useAccount, useChainId } from "wagmi";
import { useQuery } from "wagmi/query";
export interface dcdsDepositDetails {
  id: string;
  address: string;
  collateralType: string;
  chainId: number;
  index: number;
  depositedAmint: string;
  depositedUsdt: string;
  totalDepositedAmount: string;
  depositedTime: string;
  ethPriceAtDeposit: string;
  aprAtDeposit: string;
  lockingPeriod: string;
  ethPriceAtWithdraw: string | null;
  initialLiquidationAmount: string;
  liquidationAmount: string;
  liquidationIndex: string | null;
  optedForLiquidation: boolean;
  depositVal: string;
  withdrawTime: string | null;
  withdrawAmount: string | null;
  withdrawEthAmount: string | null;
  withdrawWeEthAmount: string | null;
  withdrawRsEthAmount: string | null;
  fees: string | null;
  status: string;
}

export interface dcdsDetailsResponse {
  id: string;
  address: string;
  chainId: number;
  totalIndex: number;
  totalDepositedAmint: string;
  totalDepositedUsdt: string;
  totalDepositedAmount: string;
  totalFees: string | null;
  totalFeesWithdrawn: string | null;
  points: string | null;
  totalYields: string | null;
  deposits: dcdsDepositDetails[];
}

/**
 * Retrieves deposits for a given address.
 * @param {`0x${string}` | undefined} address - The address to retrieve deposits for.
 * @return {Promise} A promise that resolves to the JSON response from the server.
 */
function getDeposits(address: `0x${string}` | undefined, chainId: Number) {
  return fetch(
    `${BACKEND_API_URL}/cds/totalDeposits/${chainId}/${address}`
  ).then((response) => response.json());
}

const useGetDcdsDepositList = () => {
  // Use the useQuery hook to fetch the data
  const { address } = useAccount();
  const chainId = useChainId();
  const {
    data: dcdsPositionList,
    error: dcdsPositionListError,
    refetch: dcdsPositionListRefetech,
    isLoading: dcdsPositionListLoading,
  } = useQuery({
    queryKey: ["dcdsDepositsDetails", chainId, address],
    queryFn: (): Promise<any> =>
      getDeposits(address ? address : undefined, chainId),
    enabled: !!address,
  });

  return {
    dcdsPositionList: (dcdsPositionList || []) as dcdsDetailsResponse,
    dcdsPositionListError,
    dcdsPositionListRefetech,
    dcdsPositionListLoading,
  };
};

export default useGetDcdsDepositList;
