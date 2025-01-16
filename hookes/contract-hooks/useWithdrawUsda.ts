import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import { useAccount, useWriteContract } from "wagmi";

const useWithdrawUsda = () => {
  const {
    isPending: borrowWithdrawisLoadingone,
    writeContractAsync: borrowWithdrawAsync, // Function for borrowing withdrawal
    reset: borrowReset, // Function for resetting borrowing
    data: borrowWithdrawData, // Data for borrowing withdrawal
  } = useWriteContract({});
  const { chainId, address } = useAccount();

  const withdrawUsda = async (index: number, nativeFee: bigint) => {
    try {
      borrowWithdrawAsync({
        abi: borrowingContractAbi,
        address:
          borrowingContractAddress[
            chainId as keyof typeof borrowingContractAddress
          ],
        functionName: "withDraw",
        args: [address as `0x${string}`, BigInt(index)],
        value: nativeFee,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    borrowWithdrawisLoadingone,
    borrowWithdrawData,
    withdrawUsda,
    borrowReset,
  };
};

export { useWithdrawUsda };
