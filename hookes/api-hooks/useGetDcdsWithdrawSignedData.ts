import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    mutateAsync: refetchBorrowWithDrawSignedData,
  } = useMutation({
    mutationFn: () =>
      signedDataForDcdsWithDrawDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0
      ),
  });

  const {
    data: BorrowWithdrawGainsSignedData,
    isPending: isPendingBorrowWithDrawGainsSignedData,
    mutateAsync: refetchBorrowWithDrawGainsSignedData,
  } = useMutation({
    mutationFn: () =>
      signedDataForDcdsWithGainsDrawDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0
      ),
  });

  return {
    BorrowWithdrawSignedData,
    isPendingBorrowWithDrawSignedData,
    refetchBorrowWithDrawSignedData,
    refetchBorrowWithDrawGainsSignedData,
  };
};

export default useGetDcdsWithdrawSignedData;
