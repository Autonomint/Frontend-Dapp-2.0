import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export interface SignedDataReturn {
  excessProfitCumulativeValue: number;
  signature: string;
  nonce: number;
  deadline: number;
  odosAssembledData: string;
  usdtFromOdos: string;
}

async function signedDataForDcdsWithDrawDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/cds/signedDataForCDSWithdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
    }),
  }).then((response) => response.json());
}

async function signedDataForDcdsWithGainsDrawDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/cds/signedDataForCDSWithdrawGains`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
    }),
  }).then((response) => response.json());
}

const useGetDcdsWithdrawSignedData = (index: number) => {
  const { address, chainId } = useAccount();
  const {
    data: BorrowWithdrawSignedData,
    isPending: isPendingBorrowWithDrawSignedData,
    refetch: refetchBorrowWithDrawSignedData,
  } = useQuery({
    queryKey: ["useGetDcdsWithdrawSignedData"],
    queryFn: () =>
      signedDataForDcdsWithDrawDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0
      ),
    select: (data) => data,
    enabled: !!address && !!chainId,
  });

  const {
    data: BorrowWithdrawGainsSignedData,
    isPending: isPendingBorrowWithDrawGainsSignedData,
    refetch: refetchBorrowWithDrawGainsSignedData,
  } = useQuery({
    queryKey: ["useGetDcdsWithdrawSignedData"],
    queryFn: () =>
      signedDataForDcdsWithGainsDrawDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0
      ),
    select: (data) => data,
    enabled: !!address && !!chainId,
  });

  return {
    BorrowWithdrawSignedData,
    isPendingBorrowWithDrawSignedData,
    refetchBorrowWithDrawSignedData,
    refetchBorrowWithDrawGainsSignedData,
  };
};

export default useGetDcdsWithdrawSignedData;
