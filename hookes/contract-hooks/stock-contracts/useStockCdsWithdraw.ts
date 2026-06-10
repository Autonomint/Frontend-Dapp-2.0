import { stockCdsAddress } from "@/blockchain/contracts";
import { cdsStockOptionsABI } from "@/blockchain/abis/stock/cds";
import { useAccount, useWriteContract } from "wagmi";
 import { toast } from "sonner";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { scanUrls } from "@/utils/urls";
import React from "react";

interface StockCdsEIP712VerifyParams {
  excessProfitCumulativeValue: bigint;
  ethPrice: bigint;
  odosAssembledData: `0x${string}`;
  expiredUSDAmount: bigint;
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
    writeContractAsync: writeStockCdsWithdrawAsync,
    reset: resetStockCdsWithdraw,
    error: stockCdsWithdrawErrorData,
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
              title: "CDS withdraw confirmed!",
              message: "",
              linkText: txUrl ? "View on explorer" : undefined,
              linkUrl: txUrl,
              onClose: () => toast.dismiss(t),
            })
          );
        } catch {
          toast.custom((t) =>
            React.createElement(ToastNotificationError, {
              title: "CDS withdraw failed. Please try again.",
              onClose: () => toast.dismiss(t),
            })
          );
        }
        mutation?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables: any, context: any) => {
        toast.custom((t) =>
          React.createElement(ToastNotificationError, {
            title: "CDS withdraw failed. Please try again.",
            onClose: () => toast.dismiss(t),
          })
        );
        mutation?.onError?.(error, variables, context);
      },
    },
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

  const handleStockCdsWithdrawAsync = async (
    params: StockCdsWithdrawUserParams,
    value?: bigint,
  ): Promise<`0x${string}` | undefined> => {
    const contractAddress =
      stockCdsAddress[chainId as keyof typeof stockCdsAddress];

    return writeStockCdsWithdrawAsync({
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
    handleStockCdsWithdrawAsync,
    resetStockCdsWithdraw,
  };
};

export default useStockCdsWithdraw;