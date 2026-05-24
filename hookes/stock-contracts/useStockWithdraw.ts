import { stockBorrowWithdrawAddress } from "@/blockchain/contracts";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { useAccount, useWriteContract } from "wagmi";

interface StockEIP712VerifyParams {
  ethPrice: bigint;
  strikePrice: bigint;
  optionFees: bigint;
  deadline: bigint;
  signature: `0x${string}`;
}

interface StockBorrowWithdrawParams {
  user: `0x${string}`;
  index: bigint;
  verifyParams: StockEIP712VerifyParams;
}

const useStockWithdraw = (mutation?: Record<string, any>) => {
  const { chainId } = useAccount();

  const {
    data: stockWithdrawHash,
    isError: stockWithdrawError,
    isPending: stockWithdrawIsPending,
    writeContract: writeStockWithdraw,
    reset: resetStockWithdraw,
    error: stockWithdrawErrorData,
  } = useWriteContract({
    mutation: mutation || {},
  });

  const handleStockWithdraw = async (
    params: StockBorrowWithdrawParams,
    value?: bigint,
  ) => {
    const contractAddress =
      stockBorrowWithdrawAddress[chainId as keyof typeof stockBorrowWithdrawAddress];

    writeStockWithdraw({
      abi: borowCoreABI,
      address: contractAddress as `0x${string}`,
      functionName: "withDraw",
      args: [params],
      value,
    });
  };

  return {
    stockWithdrawHash,
    stockWithdrawError,
    stockWithdrawIsPending,
    stockWithdrawErrorData,
    handleStockWithdraw,
    resetStockWithdraw,
  };
};

export default useStockWithdraw;