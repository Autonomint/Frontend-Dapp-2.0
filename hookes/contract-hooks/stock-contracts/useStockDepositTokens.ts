import { stockBorrowDepositAddress, stockBorrowingAddress } from "@/blockchain/contracts";
import { borowCoreABI } from "@/blockchain/abis/borrow-core-abi";
import { useAccount, useWriteContract } from "wagmi";
import { StockAssetName } from "@/utils/constants";
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

interface StockBorrowDepositParams {
  user: `0x${string}`;
  assetName: StockAssetName;
  depositingAmount: bigint;
  hedgeValidity: bigint;
  verifyParams: StockEIP712VerifyParams;
}

const useStockDepositTokens = (mutation?: Record<string, any>) => {
  const { chainId, address } = useAccount();

  const {
    data: stockDepositHash,
    isError: stockDepositError,
    isPending: stockDepositIsPending,
    writeContract: writeStockDeposit,
    reset: resetStockDeposit,
    error: stockDepositErrorData,
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
              title: "Contract deposit confirmed!",
              message: "",
              linkText: txUrl ? "View on explorer" : undefined,
              linkUrl: txUrl,
              onClose: () => toast.dismiss(t),
            })
          );
        } catch {
          toast.custom((t) =>
            React.createElement(ToastNotificationError, {
              title: "Deposit transaction failed. Please try again.",
              onClose: () => toast.dismiss(t),
            })
          );
        }
        mutation?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables: any, context: any) => {
        toast.custom((t) =>
          React.createElement(ToastNotificationError, {
            title: "Deposit transaction failed. Please try again.",
            onClose: () => toast.dismiss(t),
          })
        );
        mutation?.onError?.(error, variables, context);
      },
    },
  });

  const handleStockDepositTokens = async (
    depositParam: StockBorrowDepositParams,
    value?: bigint,
  ) => {
    const contractAddress =
      stockBorrowingAddress[chainId as keyof typeof stockBorrowDepositAddress];

    writeStockDeposit({
      abi: borrowStockOptionsABI,
      address: contractAddress as `0x${string}`,
      functionName: "depositTokens",
      args: [depositParam],
      value,
    });
  };

  return {
    stockDepositHash,
    stockDepositError,
    stockDepositIsPending,
    stockDepositErrorData,
    handleStockDepositTokens,
    resetStockDeposit,
  };
};

export default useStockDepositTokens;