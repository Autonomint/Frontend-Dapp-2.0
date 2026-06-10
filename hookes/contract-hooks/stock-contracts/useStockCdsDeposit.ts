import { stockCdsAddress } from "@/blockchain/contracts";
import { cdsStockOptionsABI } from "@/blockchain/abis/stock/cds";
import { useAccount, useWriteContract } from "wagmi";
import { StockAssetName } from "@/utils/constants";
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

interface StockCdsDepositUserParams {
  user: `0x${string}`;
  tokenAddresses: `0x${string}`[];
  tokenAmounts: bigint[];
  lockingPeriod: bigint;
  assetName: StockAssetName;
  verifyParams: StockCdsEIP712VerifyParams;
}

const useStockCdsDeposit = (mutation?: Record<string, any>) => {
  const { chainId, address } = useAccount();

  const {
    data: stockCdsDepositHash,
    isError: stockCdsDepositError,
    isPending: stockCdsDepositIsPending,
    writeContract: writeStockCdsDeposit,
    reset: resetStockCdsDeposit,
    error: stockCdsDepositErrorData,
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
              title: "CDS deposit confirmed!",
              message: "",
              linkText: txUrl ? "View on explorer" : undefined,
              linkUrl: txUrl,
              onClose: () => toast.dismiss(t),
            })
          );
        } catch {
          toast.custom((t) =>
            React.createElement(ToastNotificationError, {
              title: "CDS deposit failed. Please try again.",
              onClose: () => toast.dismiss(t),
            })
          );
        }
        mutation?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables: any, context: any) => {
        toast.custom((t) =>
          React.createElement(ToastNotificationError, {
            title: "CDS deposit failed. Please try again.",
            onClose: () => toast.dismiss(t),
          })
        );
        mutation?.onError?.(error, variables, context);
      },
    },
  });

  const handleStockCdsDeposit = async (
    params: StockCdsDepositUserParams,
    value?: bigint,
  ) => {
    const contractAddress =
      stockCdsAddress[chainId as keyof typeof stockCdsAddress];

    writeStockCdsDeposit({
      abi: cdsStockOptionsABI,
      address: contractAddress as `0x${string}`,
      functionName: "deposit",
      args: [params],
      value,
    });
  };

  return {
    stockCdsDepositHash,
    stockCdsDepositError,
    stockCdsDepositIsPending,
    stockCdsDepositErrorData,
    handleStockCdsDeposit,
    resetStockCdsDeposit,
  };
};

export default useStockCdsDeposit;