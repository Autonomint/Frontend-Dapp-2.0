import { stockUsdcAddress } from "@/blockchain/contracts";
import { usdaStockOptionsABI } from "@/blockchain/abis/stock/usda";
import { useAccount, useWriteContract } from "wagmi";

const useStockApproveUsdc = (mutation?: Record<string, any>) => {
  const { chainId } = useAccount();
  const {
    data: stockUsdcApprovedHash,
    writeContract: stockUsdcApproveWrite,
    writeContractAsync: stockUsdcApproveWriteAsync,
    isPending: isPendingStockUsdcApprove,
    isSuccess: isSuccessStockUsdcApprove,
    reset: resetStockUsdcApprove,
    isError: stockUsdcApproveError,
    error: stockUsdcApproveErrorData,
  } = useWriteContract({ mutation: mutation || {} });

  const handleStockUsdcApprove = (args: [`0x${string}`, bigint]) => {
    stockUsdcApproveWrite({
      abi: usdaStockOptionsABI,
      address: stockUsdcAddress[chainId as keyof typeof stockUsdcAddress] as `0x${string}`,
      functionName: "approve",
      args,
    });
  };

  const stockUsdcApproveAsync = async (args: [`0x${string}`, bigint]) => {
    return await stockUsdcApproveWriteAsync({
      abi: usdaStockOptionsABI,
      address: stockUsdcAddress[chainId as keyof typeof stockUsdcAddress] as `0x${string}`,
      functionName: "approve",
      args,
    });
  };


  return {
    stockUsdcApproveWrite,
    stockUsdcApproveAsync,
    isPendingStockUsdcApprove,
    isSuccessStockUsdcApprove,
    stockUsdcApprovedHash,
    handleStockUsdcApprove,
    resetStockUsdcApprove,
    stockUsdcApproveError,
  };
};

export default useStockApproveUsdc;