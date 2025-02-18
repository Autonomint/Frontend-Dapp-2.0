import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export interface SignedDataReturn {
  excessProfitCumulativeValue: number;
  signature: string;
  nonce: number;
  deadline: number;
}

async function signedDataForDcdsWithDrawDeposit(
  chainId: number
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/cds/signedDataForCDSWithdraw/${chainId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

const useGetDcdsWithdrawSignedData = () => {
  const { address, chainId } = useAccount();
  const {
    data: BorrowWithdrawSignedData,
    isPending: isPendingBorrowWithDrawSignedData,
    refetch: refetchBorrowWithDrawSignedData,
  } = useQuery({
    queryKey: ["APY"],
    queryFn: () => signedDataForDcdsWithDrawDeposit(chainId as number),
    select: (data) => data,
    enabled: !!address && !!chainId,
  });
  return {
    BorrowWithdrawSignedData,
    isPendingBorrowWithDrawSignedData,
    refetchBorrowWithDrawSignedData,
  };
};

export default useGetDcdsWithdrawSignedData;
