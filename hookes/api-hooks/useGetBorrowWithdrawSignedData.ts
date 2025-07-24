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
  expiredETHAmount: bigint;
}

/**
 * Function to fetch the borrow signed data
 * * @param {string} address - The address of the user
 * @param {number} chainId - The chain id of the user
 * @param {number} index - The index of the borrow
 * @returns {Promise<SignedDataReturn>} The borrow signed data

 **/
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

/**
 * Custom hook to fetch the borrow signed data
 * @param {number} index - The index of the borrow
 * @returns {Object} Object containing:
 *   - BorrowWithdrawSignedData: The borrow signed data
 *   - isPendingBorrowWithDrawSignedData: The pending state of the borrow signed data
 */
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
