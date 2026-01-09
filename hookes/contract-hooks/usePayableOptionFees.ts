import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowCoreAddress, borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useReadContract } from "wagmi";
import useGetBorrowWithdrawSignedData from "../api-hooks/useGetBorrowWithdrawSignedData";
import { useEffect } from "react";
import useGetBorrowRenewSignedData from "../api-hooks/useGetBorrowRenewSignedData";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";

const usePayableOptionFees = (index: any, token: string, hedgeDuration: number, ethPrice: number) => {
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
  const contract = token === "cbBTC" || token === "krwq" ? borrowCoreAddress : borrowingContractAddress;
  const abi = token === "cbBTC" || token === "krwq" ? borowCoreABI : borrowingContractAbi;

  const args = token === "cbBTC" || token === "krwq" ? [address as `0x${string}`, index, ethPrice, hedgeDuration, BorrowRenewSignedData?.volatility] : [address as `0x${string}`, index, hedgeDuration, BorrowRenewSignedData?.volatility];

  const {
    data: payableOptionFees,
    error: payableOptionFeesError,
    refetch: refetchPayableOptionFees,
  } = useReadContract({
    abi: abi,
    address:
      contract[
      chainId as keyof typeof contract
      ] as `0x${string}`,
    functionName: "getOptionFeesToPay",
    args: args,
  });

  return {
    payableOptionFees,
    payableOptionFeesError,
    refetchPayableOptionFees,
  };
};

export { usePayableOptionFees };
