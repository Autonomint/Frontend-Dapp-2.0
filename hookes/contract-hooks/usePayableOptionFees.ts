import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";
import useGetBorrowWithdrawSignedData from "../api-hooks/useGetBorrowWithdrawSignedData";
import { useEffect } from "react";
import useGetBorrowRenewSignedData from "../api-hooks/useGetBorrowRenewSignedData";

const usePayableOptionFees = (index: any, token: string, hedgeDuration: number,) => {
  const { chainId, address } = useAccount();
  const { BorrowRenewSignedData, fetchBorrowRenewSignedData } = useGetBorrowRenewSignedData(
    index
  );
  useEffect(() => {
    if (index && index > 0) {
      fetchBorrowRenewSignedData(token)
    }
  }, [token, fetchBorrowRenewSignedData])

  // Get the native fee for the transaction
  const contract = token === "cbBTC" ? borrowCoreAddress : borrowingContractAddress;

  const {
    data: payableOptionFees,
    error: payableOptionFeesError,
    refetch: refetchPayableOptionFees,
  } = useReadContract({
    abi: borrowingContractAbi,
    address:
      contract[
      chainId as keyof typeof contract
      ] as `0x${string}`,
    functionName: "getOptionFeesToPay",
    args: [address as `0x${string}`, index, hedgeDuration, BorrowRenewSignedData?.volatility],
  });

  return {
    payableOptionFees,
    payableOptionFeesError,
    refetchPayableOptionFees,
  };
};

export { usePayableOptionFees };
