import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

// Convert value to number if it's a BigInt
const toNumber = (value: unknown): number => {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return Number(value);
};

export interface SignedDataReturn {
  volatility: number;
  odosAssembledData: string;
  oneInchSwapData: string;
  signature: string;
  nonce: number;
  deadline: number;
  usdtFromOdos: string;
  expiredETHAmount: bigint;
  plFromExpired: bigint;
  ethPrice: bigint;
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
  index: number,
  token: string,
  repayPercent: number | undefined = undefined
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/stock-options/borrows/signedDataForBorrowWithdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      chainId: chainId,
      index: index,
      collateralType: token,
      repayPercent: repayPercent !== undefined ? toNumber(repayPercent) : undefined
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
    mutationFn: (data: any) =>
      signedDataForBorrowWithDrawDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0,
        data.token,
        data.repayPercent
      ),
  });
  return {
    BorrowWithdrawSignedData,
    isPendingBorrowWithDrawSignedData,
    refetchBorrowWithDrawSignedData,
  };
};

export default useGetBorrowWithdrawSignedData;
