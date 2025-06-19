import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useWithdrawUsda = (mutation: any) => {
  const {
    isPending: isPendingBorrowWithdraw,
    writeContractAsync: borrowWithdrawAsync, // Function for borrowing withdrawal
    reset: borrowReset, // Function for resetting borrowing
    data: borrowWithdrawData, // Data for borrowing withdrawal
    isError: borrowWithdrawError, // Error state for borrowing withdrawal
  } = useWriteContract({
    mutation,
  });
  const { chainId, address } = useAccount();

  const withdrawUsda = async (
    index: number,
    nativeFee: bigint,
    odosAssembledData: any,
    nonce: bigint,
    deadline: bigint,
    signature: `0x${string}`
  ) => {
    try {
      borrowWithdrawAsync({
        abi: borrowingContractAbi,
        address:
          borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ],
        functionName: "withDraw",
        args: [
          address as `0x${string}`,
          BigInt(index),
          odosAssembledData,
          {
            nonce,
            deadline,
            signature,
          },
        ],
        value: nativeFee,
      });
    } catch (error) {}
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
