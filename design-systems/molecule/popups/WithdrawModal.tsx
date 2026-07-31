import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Typography } from "@/design-systems/atoms/Typography";
import { formatTimestamp, formatNumber, calculateTimeDifference, calculatePercentage, toPositiveDecimalString } from "@/utils/helpers";
import { dcdsDepositDetails } from "@/utils/interface";
import { Info, CornerDownRight } from "lucide-react";
import { formatUnits } from "viem";
import useGetCDSWithdrawSignedData from "@/hookes/contract-hooks/stock-contracts/useGetCDSWithdrawSignedData";
import useStockCdsWithdraw, { StockWithdrawType } from "@/hookes/contract-hooks/stock-contracts/useStockCdsWithdraw";
import useStockCdsWithdrawGains from "@/hookes/contract-hooks/stock-contracts/useStockCdsWithdrawGains";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";
import LoadingBox from "../LoadingBox";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import ToastNotificationError from "../toasts/ToastNotificationError";
import { Label } from "@/design-systems/atoms/label";
import { hideYieldsAddressAndIndex } from "@/utils/constants";
import useGetAPY from "@/hookes/api-hooks/useGetAPY";

export function DcdsWithdrawModal({
  position,
  isDialogOpen,
  setIsDialogOpen,
  dcdsPositionListRefetch,
}: {
  position: dcdsDepositDetails | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  dcdsPositionListRefetch: () => void;
}) {
  const { address, chainId } = useAccount();
  const [step, setStep] = useState<"idle" | "withdrawing" | "gains">("idle");
  const [isGainsCompleted, setIsGainsCompleted] = useState(false);

  // Fetch signed data for withdraw
  const { cdsWithdrawSignedData, isPendingCDSWithdrawSignedData, refetchCDSWithdrawSignedData } = useGetCDSWithdrawSignedData(position?.index);

  // Step 1: withdraw (close position)
  const {
    stockCdsWithdrawHash,
    stockCdsWithdrawError,
    stockCdsWithdrawIsPending,
    handleStockCdsWithdraw,
    handleStockCdsWithdrawAsync,
    resetStockCdsWithdraw,
  } = useStockCdsWithdraw();

  // Wait for Step 1 tx receipt
  const {
    isSuccess: isWithdrawSuccess,
    isError: isWithdrawError,
  } = useWaitForTransactionReceipt({
    hash: stockCdsWithdrawHash,
    confirmations: 2,
  });

  // Step 2: withdrawGains
  const {
    handleStockCdsWithdrawGains,
    handleStockCdsWithdrawGainsAsync,
    resetStockCdsWithdrawGains,
  } = useStockCdsWithdrawGains();


  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setStep("idle");
    setIsGainsCompleted(false);
    resetStockCdsWithdraw();
    resetStockCdsWithdrawGains();
  }, [setIsDialogOpen, resetStockCdsWithdraw, resetStockCdsWithdrawGains]);

  // Handle errors - only reset state, toast is handled in hooks
  useEffect(() => {
    if (isWithdrawError || stockCdsWithdrawError) {
      setStep("idle");
      resetStockCdsWithdraw();
    }
  }, [isWithdrawError, stockCdsWithdrawError, resetStockCdsWithdraw]);

  // Dedicated function to handle withdrawGains with loading state and inline tx wait
  const handleWithdrawGains = useCallback(async () => {
    if (!position) return;
    try {
      setStep("gains");
      const gainsHash = await handleStockCdsWithdrawGainsAsync(
        BigInt(position.index),
        StockWithdrawType.FULL_WITHDRAW,
      );
      if (!gainsHash) {
        toast.custom((t) => (
          <ToastNotificationError
            title="Withdraw gains transaction failed"
            onClose={() => toast.dismiss(t)}
          />
        ));
        setStep("idle");
        return;
      }
      await waitForTransactionReceipt(config, { hash: gainsHash, confirmations: 2 });
      setIsGainsCompleted(true);
      dcdsPositionListRefetch();
      handleCloseDialog();
    } catch (error) {
      console.error("Withdraw gains error:", error);
      // Toast is handled in the hook's onError - only reset state here
      setStep("idle");
      resetStockCdsWithdrawGains();
      dcdsPositionListRefetch();
    }
  }, [position, handleStockCdsWithdrawGainsAsync, dcdsPositionListRefetch, handleCloseDialog]);

  const handleWithdrawFund = async () => {
    if (!position || !address) return;
    try {
      // If position is already withdrawn, only call withdrawGains
      if (position.status === "WITHDREW") {
        handleWithdrawGains();
        return;
      }

      setStep("withdrawing");
      // Fetch signed data
      const signedData = await refetchCDSWithdrawSignedData({
        collateralType: position.collateralType,
        strikePrice: 0,
        optionFees: "0",
      });

      if (!signedData) {
        toast.custom((t) => (
          <ToastNotificationError
            title="Failed to get signed data"
            onClose={() => toast.dismiss(t)}
          />
        ));
        setStep("idle");
        return;
      }

      // Call withdraw (Step 1) using writeContractAsync to get the tx hash
      const withdrawHash = await handleStockCdsWithdrawAsync({
        user: address,
        index: BigInt(position.index),
        withdrawType: StockWithdrawType.FULL_WITHDRAW,
        verifyParams: {
          excessProfitCumulativeValue: BigInt(signedData.excessProfitCumulativeValue),
          ethPrice: BigInt(signedData.ethPrice),
          odosAssembledData: signedData.odosAssembledData,
          expiredUSDAmount: BigInt(signedData.expiredUSDAmount),
          deadline: BigInt(signedData.deadline),
          signature: signedData.signature,
        },
      });

      if (!withdrawHash) {
        toast.custom((t) => (
          <ToastNotificationError
            title="Withdraw transaction failed"
            onClose={() => toast.dismiss(t)}
          />
        ));
        setStep("idle");
        return;
      }

      // Wait for Step 1 tx to be confirmed (2 confirmations)
      await waitForTransactionReceipt(config, { hash: withdrawHash, confirmations: 2 });

      // Step 1 confirmed, now trigger Step 2 (withdrawGains) via the dedicated function
      handleWithdrawGains();
    } catch (error) {
      console.error("Withdraw error:", error);
      // Toast is handled in the hook's onError - only reset state here
      setStep("idle");
      dcdsPositionListRefetch();
    }
  };

  // Get live APY data from API
  const { apy, isLoadingAPY } = useGetAPY(
    position?.index || 0,
    position?.collateralType || "",
  );

  // Calculate yields for the yield card
  const optionFee = Number(
    apy == undefined
      ? 0
      : position?.status !== "DEPOSITED"
        ? position?.apys?.amountAccured || 0
        : apy[1] || 0,
  ).toFixed(4);

  const fixedYields = `${Number(
    apy == undefined
      ? 0
      : position?.status !== "DEPOSITED"
        ? position?.apys?.currentTimeAPYTillNow || 0
        : apy[5] || 0,
  ).toFixed(2)}%`;

  const priceGains = hideYieldsAddressAndIndex.some(
    (item: { address: string; index: number[]; chainId: number }) =>
      item.address.toLowerCase() === address?.toLowerCase() &&
      item.index.includes(Number(position?.index)) &&
      item.chainId === chainId,
  )
    ? "NaN"
    : toPositiveDecimalString(
      Number(
        apy == undefined
          ? 0
          : position?.status !== "DEPOSITED"
            ? Number(position?.apys?.priceChangePL) < 0
              ? position?.apys?.priceChangePL
              : position?.apys?.priceChangePL || 0
            : apy[2] < 0
              ? apy[2]
              : apy[2] || 0,
      ).toFixed(4),
    );

  const divideValue = position?.collateralType == "ETH_CALL" ? Number(position?.depositedAmounts?.eth) : Number(position?.totalDepositedAmount)

  const variableYields = toPositiveDecimalString(
    Number(
      apy == undefined
        ? 0
        : position?.status !== "DEPOSITED"
          ? (Number(
            isNaN(position?.apys?.priceChangePL || 0)
              ? 0
              : position?.apys?.priceChangePL || 0,
          ) /
            Number(
              isNaN(Number(divideValue))
                ? 0
                : divideValue,
            )) *
          100
          : (Number(isNaN(apy[2]) ? 0 : apy[2]) /
            Number(
              isNaN(Number(divideValue))
                ? 0
                : divideValue,
            )) *
          100,
    ).toFixed(2),
  );

  const variableYieldsCheck = isNaN(Number(variableYields))
    ? 0.0
    : Number(variableYields);

  if (!position) return null;

  const interfaceBasedDetails = [
    {
      headline: "Total Deposited Amount",
      value: position.totalDepositedAmount
        ? `$${formatNumber(Number(position.totalDepositedAmount))}`
        : "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "USDC Deposited",
      value: position.depositedAmounts?.usdc
        ? `${formatNumber(Number(position.depositedAmounts.usdc))} ($${(
          Number(position.depositedAmounts.usdc) *
          Number(position.usdcPriceAtDeposit || 1)
        ).toFixed(2)})`
        : "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: `${position.collateralType || "Asset"} Price at Deposit`,
      value: position.stockPriceAtDeposit
        ? `$${formatUnits(BigInt(position.stockPriceAtDeposit), 2)}`
        : "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Deposit Time",
      value: position.depositedTime
        ? formatTimestamp(Number(position.depositedTime))
        : "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Lock In Period",
      value: position.lockingPeriod
        ? `${Math.ceil(Number(position.lockingPeriod) / 86400)} days`
        : "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Days Passed Since Deposit",
      value: position.depositedTime
        ? calculateTimeDifference(position.depositedTime + "000")
        : "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Status",
      value:
        position.status === "WITHDREW_GAINS"
          ? "Withdrawn"
          : position.status === "LIQUIDATED"
            ? "Liquidated"
            : "Active",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Yields till now",
      value: `${Number(
        apy == undefined
          ? 0
          : position?.status !== "DEPOSITED"
            ? position?.apys?.currentTimeAPYTillNow || 0
            : apy[5] || 0,
      ).toFixed(2)}%`,
      tooltip: true,
      tooltipText: "These yields are highly fluctuating based on annualized estimates derived from irregular option fees returns",
    },
    {
      headline: "Yearly APY",
      value: `${Number(
        apy == undefined
          ? 0
          : position?.status !== "DEPOSITED"
            ? position?.apys?.APY || 0
            : apy[0] || 0,
      ).toFixed(2)}%`,
      tooltip: true,
      tooltipText: "Annualized percentage yield based on current returns",
    },
  ];

  if (position.status === "LIQUIDATED" && position.liquidatedAmount) {
    interfaceBasedDetails.push({
      headline: "Liquidated Amount",
      value: `$${Number(position.liquidatedAmount).toFixed(2)}`,
      tooltip: true,
      tooltipText: "Your position was liquidated. You can withdraw this amount.",
    });
  }

  const isProcessing = step !== "idle";
  const isPopupLoading = isLoadingAPY;
  console.log("position", position);
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-[98%] sm:max-w-[610px] bg-white dark:border-[1px] dark:border-grayLight dark:bg-[#0D0D0D]">
        <div className="text-2xl font-semibold mb-2 dark:text-white text-textBlack">
          Deposit Details
        </div>
        {!isPopupLoading ? (
          <div>
            <div className="h-[275px] overflow-auto no-scrollbar">
              {interfaceBasedDetails
                .filter((item) => {
                  if (
                    ["Total Deposited Amount", "USDC Deposited"].includes(
                      item.headline,
                    ) &&
                    (item.value === "$0" || item.value === "0" || item.value === "-")
                  ) {
                    return false;
                  }
                  return true;
                })
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="flex w-full justify-between items-center mb-3"
                  >
                    <span className="text-[16px] md:text-[18px] flex items-center font-medium text-grayLight">
                      {item.headline}
                      {item.tooltip && (
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Info width={18} height={18} className="ml-2" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-white dark:bg-black">
                            <p>{item.tooltipText}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </span>
                    <span className="text-[16px] md:text-[18px] dark:text-white font-medium text-textBlack">
                      {item.value}
                    </span>
                  </div>
                ))}
            </div>

            {/* Yield Card - Option Fee / Fixed Yields | Price Gains / Variable Yields */}
            <div className="flex w-full mt-4 border-solid border-[1px] justify-between border-gray-200 rounded-[12px] bg-gray-100 dark:border-[rgb(51,51,51)] dark:bg-[#121212] flex-col sm:flex-row">
              {/* Left Column: Option Fee + Fixed Yields */}
              <div className="flex-1 relative flex flex-col justify-start items-start gap- border-r-0 py-2 px-4">
                <div className="flex flex-col w-full items-start justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <Label className="text-[22px] font-bold md:text-[26px] text-green-600 dark:text-green-500">
                      ${optionFee}
                    </Label>
                  </div>
                  <div className="flex gap-1">
                    <Label className="text-[14px] font-normal text-[#777777]">
                      Option Fee
                    </Label>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info width={18} height={18} className="ml-2" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white dark:bg-black w-[300px]">
                        <p>
                          These are option fee yields paid by USDA+ borrowers
                          for acting as a risk underwriter and essentially
                          providing price hedge to borrowers.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex w-full relative items-center justify-between">
                  <CornerDownRight className="absolute left-0 top-[-1px] stroke-black dark:stroke-white" />
                  <div className="flex gap-1 ml-8">
                    <Label className="text-[14px] font-normal text-[#777777]">
                      Fixed Yields
                    </Label>
                  </div>
                  <Label className="text-[18px] md:text-[20px] font-medium dark:text-white">
                    {fixedYields}
                  </Label>
                </div>
              </div>

              {/* Right Column: Price Gains + Variable Yields */}
              <div className="flex-1 w-full flex flex-col justify-center items-start gap-1 py-2 px-4 font-medium">
                <div className="flex flex-col w-full items-start justify-between">
                  <Label className="text-[22px] md:text-[26px] font-medium dark:text-white">
                    {position.collateralType == "ETH_CALL" ? "" : "$"}{priceGains} {position.collateralType == "ETH_CALL" ? " ETH" : ""}
                  </Label>
                  <div className="flex">
                    <Label className="text-[14px] font-normal text-[#777777]">
                      Price Gains
                    </Label>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info width={18} height={18} className="ml-2" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white dark:bg-black w-[300px]">
                        <p>
                          These are 3% {position?.collateralType || "ETH"} price gains taken
                          from each USDA+ borrower if {position?.collateralType || "ETH"} rises after they
                          mint.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex w-full relative items-center justify-between">
                  <CornerDownRight className="absolute left-0 top-[-1px] stroke-black dark:stroke-white" />
                  <Label className="text-[14px] font-normal text-[#777777] ml-8">
                    Variable Yields
                  </Label>
                  <Label className="text-[18px] md:text-[20px] font-medium dark:text-white">
                    {variableYieldsCheck}%
                  </Label>
                </div>
              </div>
            </div>

            <Typography
              variant="regular"
              className="text-[14px] my-3 text-[#777777]"
            >
              Note: Your amount will be used to offer protection to borrowers & protocol in return for fixed yields
            </Typography>

            {!isProcessing && (
              <Button
                onClick={handleWithdrawFund}
                disabled={
                  isPendingCDSWithdrawSignedData ||
                  position.status === "WITHDREW_GAINS"
                }
                className="w-full p-5 py-6 md:p-8 md:py-10 bg-black text-white text-[24px] md:text-[32px]"
              >
                {position.status === "WITHDREW_GAINS"
                  ? "Withdrawn"
                  : position.status === "WITHDREW"
                    ? "Withdraw Gains"
                    : "Close Position"}
              </Button>
            )}

            {isProcessing && position.status === "WITHDREW" && (
              <div className="h-[50px] overflow-hidden md:h-[86px]">
                <LoadingBox
                  isLoading={step === "gains"}
                  isFailure={false}
                  isSuccess={isGainsCompleted}
                  setSuccessLoading={() => {
                    setStep("idle");
                  }}
                  heading="Withdrawing Gains"
                  loadingCount="1/1"
                />
              </div>
            )}

            {isProcessing && position.status !== "WITHDREW" && (

              <div className="h-[50px] overflow-hidden md:h-[86px]">
                <LoadingBox
                  isLoading={step === "withdrawing"}
                  isFailure={false}
                  isSuccess={isWithdrawSuccess}
                  setSuccessLoading={() => { }}
                  heading="Closing Position"
                  loadingCount="1/2"
                />
                <LoadingBox
                  isLoading={step === "gains"}
                  isFailure={false}
                  isSuccess={isGainsCompleted}
                  setSuccessLoading={() => {

                  }}
                  heading="Withdrawing Gains"
                  loadingCount="2/2"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="h-[560px] flex justify-center items-center">
            <span className="text-grayLight">Loading...</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
