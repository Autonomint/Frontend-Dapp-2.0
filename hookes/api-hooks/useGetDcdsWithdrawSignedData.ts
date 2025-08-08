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
  expiredETHAmount: number;
  pythUpdateSucceeded: boolean;
}
/**
 *
 * @param address * @param address
 * @returns
 * @param chainId
 * @param index
 * @returns
 */

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
async function signedDataForDcdsDeposit(
  address: `0x${string}` | undefined,
  chainId: number,
  index: number
): Promise<SignedDataReturn> {
  return fetch(`${BACKEND_API_URL}/cds/signedDataForCDSDeposit`, {
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
 * Function to fetch the borrow signed data
 * @param {string} address - The address of the user
 * @param {number} chainId - The chain id of the user
 */
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

/**
 * Custom hook to fetch the borrow signed data
 * @param {number} index - The index of the borrow
 * @returns {Object} Object containing:
 *   - BorrowWithdrawSignedData: The borrow signed data
 *   - isPendingBorrowWithDrawSignedData: The pending state of the borrow signed data
 */
const useGetDcdsWithdrawSignedData = (index?: number) => {
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
  const {
    data: cdsDepositSignedData,
    isPending: isPendingcdsDepositSignedData,
    mutateAsync: refetchcdsDepositSignedData,
  } = useMutation({
    mutationFn: () =>
      signedDataForDcdsDeposit(
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
    cdsDepositSignedData,
    isPendingcdsDepositSignedData,
    refetchcdsDepositSignedData,
  };
};

export default useGetDcdsWithdrawSignedData;
