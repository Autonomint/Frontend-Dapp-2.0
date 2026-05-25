import { stockCdsAddress } from "@/blockchain/contracts";
import { cdsStockOptionsABI } from "@/blockchain/abis/stock/cds";
import { useAccount, useWriteContract } from "wagmi";
import { StockWithdrawType } from "./useStockCdsWithdraw";

const useStockCdsWithdrawGains = (mutation?: Record<string, any>) => {
  const { chainId } = useAccount();

  const {
    data: stockCdsWithdrawGainsHash,
    isError: stockCdsWithdrawGainsError,
    isPending: stockCdsWithdrawGainsIsPending,
    writeContract: writeStockCdsWithdrawGains,
    reset: resetStockCdsWithdrawGains,
    error: stockCdsWithdrawGainsErrorData,
  } = useWriteContract({
    mutation: mutation || {},
  });

  const handleStockCdsWithdrawGains = async (
    index: bigint,
    withdrawType: StockWithdrawType,
    value?: bigint,
  ) => {
    const contractAddress =
      stockCdsAddress[chainId as keyof typeof stockCdsAddress];

    writeStockCdsWithdrawGains({
      abi: cdsStockOptionsABI,
      address: contractAddress as `0x${string}`,
      functionName: "withdrawGains",
      args: [index, withdrawType],
      value,
    });
  };

  return {
    stockCdsWithdrawGainsHash,
    stockCdsWithdrawGainsError,
    stockCdsWithdrawGainsIsPending,
    stockCdsWithdrawGainsErrorData,
    handleStockCdsWithdrawGains,
    resetStockCdsWithdrawGains,
  };
};

export default useStockCdsWithdrawGains;