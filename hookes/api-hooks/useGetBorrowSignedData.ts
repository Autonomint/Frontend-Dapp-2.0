import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export interface SignedDataReturn {
  volatility: number;
  odosAssembledData: string;
  oneInchSwapData: string;
  signature: `0x${string}`;
  nonce: number;
  deadline: number;
  expiredETHAmount: bigint;
  plFromExpired: bigint;
  ethPrice: bigint
}

/**
 * Function to fetch the borrow signed data
 * @param {string} address - The address of the user
 * @param {number} chainId - The chain id of the user
 * @param {number} index - The index of the borrow
 * @returns {Promise<SignedDataReturn>} The borrow signed data
 */
async function signedDataForBorrowDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number,
  token: string
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/borrows/signedDataForBorrowDeposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
      collateralType: token,
    }),
  }).then((response) => response.json());
}

/**
 * Custom hook to fetch the borrow signed data
 * @param {number} index - The index of the borrow
 * @returns {Object} Object containing:
 *   - BorrowSignedData: The borrow signed data
 *   - isPendingBorrowSignedData: The pending state of the borrow signed data
 */
const useGetBorrowSignedData = (index?: number) => {

  const { address, chainId } = useAccount();
  const {
    data: BorrowSignedData,
    isPending: isPendingBorrowSignedData,
    mutateAsync: refetchBorrowSignedData,
  } = useMutation({
    mutationFn: (token: string) =>
      signedDataForBorrowDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0,
        token
      ),
  });
  return {
    BorrowSignedData,
    isPendingBorrowSignedData,
    refetchBorrowSignedData,
  };
};

export default useGetBorrowSignedData;
