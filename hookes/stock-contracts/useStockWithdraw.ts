import { stockBorrowingAddress, stockBorrowWithdrawAddress } from "@/blockchain/contracts";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { useAccount, useWriteContract } from "wagmi";
import { borrowStockOptionsABI } from "@/blockchain/abis/stock/borrow";
import { toast } from "sonner";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { scanUrls } from "@/utils/urls";
import React from "react";

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
    mutation: {
      ...(mutation || {}),
      onSuccess: async (data: `0x${string}`, variables: any, context: any) => {
        try {
          await waitForTransactionReceipt(config, { hash: data });
          const explorerUrl = scanUrls[chainId as keyof typeof scanUrls];
          const txUrl = explorerUrl ? `${explorerUrl}tx/${data}` : undefined;
          toast.custom((t) =>
            React.createElement(ToastNotification, {
              title: "Stock withdraw confirmed!",
              message: "",
              linkText: txUrl ? "View on explorer" : undefined,
              linkUrl: txUrl,
              onClose: () => toast.dismiss(t),
            })
          );
        } catch {
          toast.custom((t) =>
            React.createElement(ToastNotificationError, {
              title: "Stock withdraw failed. Please try again.",
              onClose: () => toast.dismiss(t),
            })
          );
        }
        mutation?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables: any, context: any) => {
        toast.custom((t) =>
          React.createElement(ToastNotificationError, {
            title: "Stock withdraw failed. Please try again.",
            onClose: () => toast.dismiss(t),
          })
        );
        mutation?.onError?.(error, variables, context);
      },
    },
  });

  const handleStockWithdraw = async (
    params: StockBorrowWithdrawParams,
    value?: bigint,
  ) => {
    const contractAddress =
      stockBorrowingAddress[chainId as keyof typeof stockBorrowWithdrawAddress];

    writeStockWithdraw({
      abi: borrowStockOptionsABI,
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