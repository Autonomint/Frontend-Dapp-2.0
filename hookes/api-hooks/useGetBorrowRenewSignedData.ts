import { BACKEND_API_URL } from "@/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export interface SignedDataReturn {
  volatility: number; // eth volatility
  odosAssembledData: string; // odos assembled data for swapping
  expiredETHAmount: string;
  usdtFromOdos: string;
  oneInchSwapData: string; // one inch data to get sUSD
  signature: string; // signature from admin2
  nonce: number; // nonce of the contract
  deadline: number; // deadline for this signature
  ethPrice: number; // eth price
}

/**
 * Function to fetch the borrow signed data
 * * @param {string} address - The address of the user
 * @param {number} chainId - The chain id of the user
 * @param {number} index - The index of the borrow
 * @returns {Promise<SignedDataReturn>} The borrow signed data

 **/
async function signedDataForBorrowRenewDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number,
  token: string
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/stock-options/borrows/signedDataForBorrowRenew`, {
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
 *   - BorrowWithdrawSignedData: The borrow signed data
 *   - isPendingBorrowWithDrawSignedData: The pending state of the borrow signed data
 */
const useGetBorrowRenewSignedData = (index: number) => {
  const { address, chainId } = useAccount();
  const {
    data: BorrowRenewSignedData,
    isPending: isPendingBorrowRenewSignedData,
    mutateAsync: fetchBorrowRenewSignedData,
  } = useMutation({
    mutationFn: (token: string) =>
      signedDataForBorrowRenewDeposit(
        address ? address : undefined,
        chainId as number,
        index || 0,
        token
      ),
  });
  return {
    BorrowRenewSignedData,
    isPendingBorrowRenewSignedData,
    fetchBorrowRenewSignedData,
  };
};

export default useGetBorrowRenewSignedData;
