import { stockCdsAddress } from "@/blockchain/contracts";
import { cdsStockOptionsABI } from "@/blockchain/abis/stock/cds";
import { useAccount, useWriteContract } from "wagmi";
import { StockWithdrawType } from "./useStockCdsWithdraw";
import { toast } from "sonner";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { scanUrls } from "@/utils/urls";
import React from "react";

const useStockCdsWithdrawGains = (mutation?: Record<string, any>) => {
  const { chainId } = useAccount();

  const {
    data: stockCdsWithdrawGainsHash,
    isError: stockCdsWithdrawGainsError,
    isPending: stockCdsWithdrawGainsIsPending,
    writeContract: writeStockCdsWithdrawGains,
    writeContractAsync: writeStockCdsWithdrawGainsAsync,
    reset: resetStockCdsWithdrawGains,
    error: stockCdsWithdrawGainsErrorData,
  } = useWriteContract({
    mutation: {
      ...(mutation || {}),
      onSuccess: async (data: `0x${string}`, variables: any, context: any) => {
        try {
          await waitForTransactionReceipt(config, { hash: data });
          const explorerUrl = scanUrls[chainId as keyof typeof scanUrls];
          const txUrl = explorerUrl ? `${explorerUrl}tx/${data}` : undefined;
          toast.custom((t) =>
            React.createElement(ToastNotification, {
              title: "CDS withdraw gains confirmed!",
              message: "",
              linkText: txUrl ? "View on explorer" : undefined,
              linkUrl: txUrl,
              onClose: () => toast.dismiss(t),
            })
          );
        } catch {
          toast.custom((t) =>
            React.createElement(ToastNotificationError, {
              title: "CDS withdraw gains failed. Please try again.",
              onClose: () => toast.dismiss(t),
            })
          );
        }
        mutation?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables: any, context: any) => {
        toast.custom((t) =>
          React.createElement(ToastNotificationError, {
            title: "CDS withdraw gains failed. Please try again.",
            onClose: () => toast.dismiss(t),
          })
        );
        mutation?.onError?.(error, variables, context);
      },
    },
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

  const handleStockCdsWithdrawGainsAsync = async (
    index: bigint,
    withdrawType: StockWithdrawType,
    value?: bigint,
  ): Promise<`0x${string}` | undefined> => {
    const contractAddress =
      stockCdsAddress[chainId as keyof typeof stockCdsAddress];

    return writeStockCdsWithdrawGainsAsync({
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
    handleStockCdsWithdrawGainsAsync,
    resetStockCdsWithdrawGains,
  };
};

export default useStockCdsWithdrawGains;