import { nvdaAddress } from "@/blockchain/contracts";
import { usdaStockOptionsABI } from "@/blockchain/abis/stock/usda";
import { useAccount, useWriteContract } from "wagmi";
import { toast } from "sonner";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { scanUrls } from "@/utils/urls";
import React from "react";

const useStockApproveNvda = (mutation?: Record<string, any>) => {
  const { chainId } = useAccount();
  const {
    data: stockNvdaApprovedHash,
    writeContract: stockNvdaApproveWrite,
    writeContractAsync: stockNvdaApproveWriteAsync,
    isPending: isPendingStockNvdaApprove,
    isSuccess: isSuccessStockNvdaApprove,
    reset: resetStockNvdaApprove,
    isError: stockNvdaApproveError,
    error: stockNvdaApproveErrorData,
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
              title: "NVDA approved successfully!",
              message: "",
              linkText: txUrl ? "View on explorer" : undefined,
              linkUrl: txUrl,
              onClose: () => toast.dismiss(t),
            })
          );
        } catch {
          toast.custom((t) =>
            React.createElement(ToastNotificationError, {
              title: "NVDA approval was rejected or failed. Please try again.",
              onClose: () => toast.dismiss(t),
            })
          );
        }
        mutation?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables: any, context: any) => {
        toast.custom((t) =>
          React.createElement(ToastNotificationError, {
            title: "NVDA approval was rejected or failed. Please try again.",
            onClose: () => toast.dismiss(t),
          })
        );
        mutation?.onError?.(error, variables, context);
      },
    },
  });

  const handleStockNvdaApprove = (args: [`0x${string}`, bigint]) => {
    stockNvdaApproveWrite({
      abi: usdaStockOptionsABI,
      address: nvdaAddress[chainId as keyof typeof nvdaAddress] as `0x${string}`,
      functionName: "approve",
      args,
    });
  };

  const stockNvdaApproveAsync = async (args: [`0x${string}`, bigint]) => {
    return await stockNvdaApproveWriteAsync({
      abi: usdaStockOptionsABI,
      address: nvdaAddress[chainId as keyof typeof nvdaAddress] as `0x${string}`,
      functionName: "approve",
      args,
    });
  };


  return {
    stockNvdaApproveWrite,
    stockNvdaApproveAsync,
    isPendingStockNvdaApprove,
    isSuccessStockNvdaApprove,
    stockNvdaApprovedHash,
    handleStockNvdaApprove,
    resetStockNvdaApprove,
    stockNvdaApproveError,
  };
};

export default useStockApproveNvda;
