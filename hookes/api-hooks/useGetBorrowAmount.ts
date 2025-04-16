import { NetworkId } from "@/utils/constants";
import { formatNumber } from "@/utils/helpers";
import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const fetchDepositor = async (
  chainId: string,
  address: `0x${string}` | undefined
): Promise<any> => {
  if (!address) throw new Error("Address is undefined");
  const response = await fetch(
    `${BACKEND_API_URL}/borrows/totalDeposits/${chainId}/${address}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const useGetTotalBorrow = () => {
  const { address, chainId } = useAccount();
  // Use the useQuery hook to fetch the data
  const {
    data: ethSepoliaData,
    error: ethSepoliaDataError,
    isSuccess: ethSepoliaDataFetched,
    refetch: dataEthSepoliaReftech,
  } = useQuery({
    queryKey: ["depositor", NetworkId.BaseSepolia, chainId, address],
    queryFn: (): Promise<any> =>
      fetchDepositor(
        NetworkId.BaseSepolia.toString(),
        address ? address : undefined
      ),
    enabled: !!address,
  });

  const {
    data: baseSepoliaData,
    error: baseSepoliaDataError,
    isSuccess: baseSepoliaDataFetched,
    refetch: dataBaseSepoliaRefetch,
  } = useQuery({
    queryKey: ["depositor", NetworkId.Optimism, chainId, address],
    queryFn: (): Promise<any> =>
      fetchDepositor(
        NetworkId.Optimism.toString(),
        address ? address : undefined
      ),
    enabled: !!address,
  });

  const userTotalBorrowAmount = formatNumber(
    Number(ethSepoliaData?.totalUSDa || 0) +
      Number(baseSepoliaData?.totalUSDa || 0)
  );

  return { userTotalBorrowAmount, ethSepoliaData, baseSepoliaData };
};

export default useGetTotalBorrow;
