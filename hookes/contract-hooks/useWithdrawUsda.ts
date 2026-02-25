import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowCoreAddress, borrowingContractAddress, borrowWithdrawCoreAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useWithdrawUsda = (mutation: any) => {
  const {
    isPending: isPendingBorrowWithdraw,
    writeContractAsync: borrowWithdrawAsync, // Function for borrowing withdrawal
    reset: borrowReset, // Function for resetting borrowing
    data: borrowWithdrawData, // Data for borrowing withdrawal
    isError: borrowWithdrawError, // Error state for borrowing withdrawal
    error: error
  } = useWriteContract({
    mutation,
  });
  const { chainId, address } = useAccount();

  const withdrawUsda = async (
    index: number,
    amount: bigint,
    nativeFee: bigint | undefined,
    usdtFromOdos: any,
    token: string,
    verifyParams: any,
  ) => {
    const contract = token === "cbBTC" || token === "krwq" || token === "EURC" ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress] : borrowingContractAddress[chainId as keyof typeof borrowingContractAddress]
    const abi = token === "cbBTC" || token === "krwq" || token === "EURC" ? borowCoreABI : borrowingContractAbi
    try {
      borrowWithdrawAsync({
        abi: abi,
        address: contract as `0x${string}`,
        functionName: "withDraw",
        args: [
          {
            user: address as `0x${string}`,
            index: BigInt(index),
            repayAmount: amount,
            usdtFromOdos,
            verifyParams
          },

        ],
        value: nativeFee,
      });
    } catch (error) { }
  };

  return {
    isPendingBorrowWithdraw,
    borrowWithdrawData,
    withdrawUsda,
    borrowReset,
    borrowWithdrawError,
  };
};

export { useWithdrawUsda };
