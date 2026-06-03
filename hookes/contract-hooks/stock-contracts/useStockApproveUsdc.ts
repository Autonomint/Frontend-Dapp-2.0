import { stockUsdcAddress } from "@/blockchain/contracts";
import { usdaStockOptionsABI } from "@/blockchain/abis/stock/usda";
import { useAccount, useWriteContract } from "wagmi";
import { toast } from "sonner";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { scanUrls } from "@/utils/urls";
import React from "react";

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
              title: "USDC approved successfully!",
              message: "",
              linkText: txUrl ? "View on explorer" : undefined,
              linkUrl: txUrl,
              onClose: () => toast.dismiss(t),
            })
          );
        } catch {
          toast.custom((t) =>
            React.createElement(ToastNotificationError, {
              title: "USDC approval was rejected or failed. Please try again.",
              onClose: () => toast.dismiss(t),
            })
          );
        }
        mutation?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables: any, context: any) => {
        toast.custom((t) =>
          React.createElement(ToastNotificationError, {
            title: "USDC approval was rejected or failed. Please try again.",
            onClose: () => toast.dismiss(t),
          })
        );
        mutation?.onError?.(error, variables, context);
      },
    },
  });

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