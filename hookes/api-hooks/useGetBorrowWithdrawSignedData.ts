import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export interface SignedDataReturn {
  volatility: number;
  odosAssembledData: string;
  oneInchSwapData: string;
  signature: string;
  nonce: number;
  deadline: number;
  usdtFromOdos: string;
}

async function signedDataForBorrowWithDrawDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/borrows/signedDataForBorrowWithdraw`, {
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

const useGetBorrowWithdrawSignedData = (index: number) => {
  const { address, chainId } = useAccount();
  const {
    data: BorrowWithdrawSignedData,
    isPending: isPendingBorrowWithDrawSignedData,
    mutateAsync: refetchBorrowWithDrawSignedData,
  } = useMutation({
    mutationFn: () =>
      signedDataForBorrowWithDrawDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0
      ),
  });
  return {
    BorrowWithdrawSignedData,
    isPendingBorrowWithDrawSignedData,
    refetchBorrowWithDrawSignedData,
  };
};

export default useGetBorrowWithdrawSignedData;
