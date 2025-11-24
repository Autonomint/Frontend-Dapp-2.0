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
  } = useWriteContract({
    mutation,
  });
  const { chainId, address } = useAccount();

  const withdrawUsda = async (
    index: number,
    nativeFee: bigint | undefined,
    odosAssembledData: any,
    nonce: bigint,
    deadline: bigint,
    signature: `0x${string}`,
    expiredETHAmount: bigint,
    plFromExpired: bigint,
    token: string,
  ) => {
    const contract = token === "cbBTC" ? borrowCoreAddress[chainId as keyof typeof borrowCoreAddress] : borrowingContractAddress[chainId as keyof typeof borrowingContractAddress]

    try {
      borrowWithdrawAsync({
        abi: borrowingContractAbi,
        address: contract as `0x${string}`,
        functionName: "withDraw",
        args: [
          address as `0x${string}`,
          BigInt(index),
          odosAssembledData,
          expiredETHAmount,
          plFromExpired,
          {
            deadline,
            signature,
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
