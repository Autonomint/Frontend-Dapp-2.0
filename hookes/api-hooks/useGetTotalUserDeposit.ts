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

// @desc get total user deposit in base and eth sepolia
// @returns {totalUserDeposit: number, ethSepoliaCDSData: any, baseSepoliaCDSData: any}
const useGetTotalUserDeposit = () => {
  const { address, chainId } = useAccount();
  // Use the useQuery hook to fetch the data
  const {
    data: ethSepoliaCDSData,
    error: ethSepoliaCDSDataError,
    isSuccess: ethSepoliaCDSDataFetched,
    refetch: refetchEthSepoliaCDSDepositorData,
  } = useQuery({
    queryKey: ["dCDSdepositorsData", address],
    queryFn: () =>
      getCDSDepositorData(
        NetworkId.Ethereum.toString(),
        address ? address : undefined
      ),
    retry: 1,
    staleTime: 5000,
    enabled: !!address,
  });

  const {
    data: baseSepoliaCDSData,
    error: baseSepoliaCDSDataError,
    isSuccess: baseSepoliaCDSDataFetched,
    refetch: refetchBaseSepoliaCDSDepositorData,
  } = useQuery({
    queryKey: ["dCDSdepositorsUserData", address],
    queryFn: () =>
      getCDSDepositorData(
        NetworkId.BaseSepolia.toString(),
        address ? address : undefined
      ),
    staleTime: 5000,
    retry: 1,
    enabled: !!address,
  });
  const {
    data: opSepoliaCDSData,
    error: opSepoliaCDSDataError,
    isSuccess: opSepoliaCDSDataFetched,
    refetch: refetchOpSepoliaCDSDepositorData,
  } = useQuery({
    queryKey: ["dCDSdepositorsUserDataOP", address],
    queryFn: () =>
      getCDSDepositorData(
        NetworkId.Optimism.toString(),
        address ? address : undefined
      ),
    staleTime: 5000,
    retry: 1,
    enabled: !!address,
  });


  // sum both base and eth sepolia data
  const totalUserDeposit =
    (!isNaN(Number(ethSepoliaCDSData?.totalDepositedAmount)) ? Number(ethSepoliaCDSData?.totalDepositedAmount) : 0) +
    (!isNaN(Number(opSepoliaCDSData?.totalDepositedAmount)) ? Number(opSepoliaCDSData?.totalDepositedAmount) : 0) +
    (!isNaN(Number(baseSepoliaCDSData?.totalDepositedAmount)) ? Number(baseSepoliaCDSData?.totalDepositedAmount) : 0);

  return {
    totalUserDeposit: isNaN(totalUserDeposit) ? 0 : totalUserDeposit,
    ethSepoliaCDSData,
    baseSepoliaCDSData,
  };
};
export default useGetTotalUserDeposit;
