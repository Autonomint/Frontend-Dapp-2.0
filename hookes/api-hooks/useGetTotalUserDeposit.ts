// To fetch depositor data (/cds/totalDeposits/:chainId/:address)
// Return depositor

import { NetworkId } from "@/utils/constants";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

async function getCDSDepositorData(
  chainId: string,
  address: `0x${string}` | undefined
): Promise<any> {
  return fetch(
    `${BACKEND_API_URL}/cds/totalDeposits/${chainId}/${address}`
  ).then((response) => response.json());
}

const useGetTotalUserDeposit = () => {
  const { address } = useAccount();
  // Use the useQuery hook to fetch the data
  const {
    data: ethSepoliaCDSData,
    error: ethSepoliaCDSDataError,
    isSuccess: ethSepoliaCDSDataFetched,
    refetch: refetchEthSepoliaCDSDepositorData,
  } = useQuery({
    queryKey: ["dCDSdepositorsData", NetworkId.EthereumSepolia, address],
    queryFn: () =>
      getCDSDepositorData(
        NetworkId.EthereumSepolia.toString(),
        address ? address : undefined
      ),
    staleTime: 5000,
    enabled: !!address,
  });

  const {
    data: baseSepoliaCDSData,
    error: baseSepoliaCDSDataError,
    isSuccess: baseSepoliaCDSDataFetched,
    refetch: refetchBaseSepoliaCDSDepositorData,
  } = useQuery({
    queryKey: ["dCDSdepositorsData", NetworkId.BaseSepolia, , address],
    queryFn: () =>
      getCDSDepositorData(
        NetworkId.BaseSepolia.toString(),
        address ? address : undefined
      ),
    staleTime: 5000,
    enabled: !!address,
  });

  console.log({ ethSepoliaCDSData, baseSepoliaCDSData }, ">");

  const totalUserDeposit =
    Number(ethSepoliaCDSData?.totalDepositedAmount || 0) +
    Number(baseSepoliaCDSData?.totalDepositedAmount || 0);

  return {
    totalUserDeposit,
    ethSepoliaCDSData,
    baseSepoliaCDSData,
  };
};
export default useGetTotalUserDeposit;
