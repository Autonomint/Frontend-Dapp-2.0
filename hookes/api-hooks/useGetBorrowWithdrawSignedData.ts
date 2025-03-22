import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
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
    method: "GET",
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
    refetch: refetchBorrowWithDrawSignedData,
  } = useQuery({
    queryKey: ["APY", index || 0],
    queryFn: () =>
      signedDataForBorrowWithDrawDeposit(
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
  };
};

export default useGetBorrowWithdrawSignedData;
