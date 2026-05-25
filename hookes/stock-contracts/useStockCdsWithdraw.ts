import { stockCdsAddress } from "@/blockchain/contracts";
import { cdsStockOptionsABI } from "@/blockchain/abis/stock/cds";
import { useAccount, useWriteContract } from "wagmi";

interface StockCdsEIP712VerifyParams {
  excessProfitCumulativeValue: bigint;
  ethPrice: bigint;
  odosAssembledData: `0x${string}`;
  deadline: bigint;
  signature: `0x${string}`;
}

export enum StockWithdrawType {
  FULL_WITHDRAW,
  WITHDRAW_YIELDS,
}

interface StockCdsWithdrawUserParams {
  user: `0x${string}`;
  index: bigint;
  withdrawType: StockWithdrawType;
  verifyParams: StockCdsEIP712VerifyParams;
}

const useStockCdsWithdraw = (mutation?: Record<string, any>) => {
  const { chainId } = useAccount();

  const {
    data: stockCdsWithdrawHash,
    isError: stockCdsWithdrawError,
    isPending: stockCdsWithdrawIsPending,
    writeContract: writeStockCdsWithdraw,
    reset: resetStockCdsWithdraw,
    error: stockCdsWithdrawErrorData,
  } = useWriteContract({
    mutation: mutation || {},
  });

  const handleStockCdsWithdraw = async (
    params: StockCdsWithdrawUserParams,
    value?: bigint,
  ) => {
    const contractAddress =
      stockCdsAddress[chainId as keyof typeof stockCdsAddress];

    writeStockCdsWithdraw({
      abi: cdsStockOptionsABI,
      address: contractAddress as `0x${string}`,
      functionName: "withdraw",
      args: [params],
      value,
    });
  };

  return {
    stockCdsWithdrawHash,
    stockCdsWithdrawError,
    stockCdsWithdrawIsPending,
    stockCdsWithdrawErrorData,
    handleStockCdsWithdraw,
    resetStockCdsWithdraw,
  };
};

export default useStockCdsWithdraw;