import { BACKEND_API_URL } from "@/utils/urls";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export interface SignedDataReturn {
  volatility: number;
  odosAssembledData: string;
  oneInchSwapData: string;
  signature: `0x${string}`;
  nonce: number;
  deadline: number;
}

async function signedDataForBorrowDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/borrows/signedDataForBorrowDeposit`, {
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

const useGetBorrowSignedData = (index?: number) => {
  const { address, chainId } = useAccount();
  const {
    data: BorrowSignedData,
    isPending: isPendingBorrowSignedData,
    refetch: refetchBorrowSignedData,
  } = useQuery({
    queryKey: ["APY", index || 0],
    queryFn: () =>
      signedDataForBorrowDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0
      ),
    select: (data) => data,
    enabled: !!address && !!chainId,
  });
  return {
    BorrowSignedData,
    isPendingBorrowSignedData,
    refetchBorrowSignedData,
  };
};

export default useGetBorrowSignedData;
