"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/design-systems/atoms/button";
import cryptoEth from "@/app/assets/eth.png";
import usdcIcon from "@/app/assets/usdc.svg";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ArrowLeft, ExternalLink } from "lucide-react";
import useGetSpotPrice from "@/hookes/api-hooks/useGetSpotPrice";
import useGetExpiries from "@/hookes/api-hooks/useGetExpiries";
import useGetOptionBids from "@/hookes/api-hooks/useGetOptionBids";
import { coveredCallAssets } from "@/utils/token-config";
import Spinner from "@/design-systems/atoms/Spinner";
import { Label } from "@/design-systems/atoms/label";
import { useAccount } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "sonner";
import ToastNotification from "@/design-systems/molecule/toasts/ToastNotification";
import ToastNotificationError from "@/design-systems/molecule/toasts/ToastNotificationError";
import useStockApproveUsdc from "@/hookes/contract-hooks/stock-contracts/useStockApproveUsdc";
import useStockDepositTokens from "@/hookes/contract-hooks/stock-contracts/useStockDepositTokens";
import useStockCdsDeposit from "@/hookes/contract-hooks/stock-contracts/useStockCdsDeposit";
import useGetStockSignedData from "@/hookes/contract-hooks/stock-contracts/useGetStockSignedData";
import useGetCDSWithdrawSignedData from "@/hookes/contract-hooks/stock-contracts/useGetCDSWithdrawSignedData";
import useGetCdsDepositSignedData from "@/hookes/contract-hooks/stock-contracts/useGetCdsDepositSignedData";
import {
  stockBorrowDepositAddress,
  stockCdsAddress,
  stockCdsDepositAddress,
  stockUsdcAddress,
} from "@/blockchain/contracts";
import { tickerToStockAssetName } from "@/utils/constants";
import { formatDate, formatDateShort, getDaysRemaining } from "@/utils/helpers";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";
import { useRouter } from "next/navigation";

interface PriceOption {
  price: string;
  apr: string;
  strike: number;
  premium: number;
  color: string;
  bg: string;
}

interface CoveredCallProps {
  apr?: number;
  upfrontPremium?: number;
  expirationDate?: string;
  strikePrice?: number;
  ethAmount?: number;
  usdtoAmount?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CoveredCallTemplate = ({
  apr = 33.91,
  upfrontPremium = 25.02,
  expirationDate = "May_29",
  strikePrice = 2550,
  ethAmount = 0.5,
  usdtoAmount = 1275,
}: CoveredCallProps) => {
  const searchParams = useSearchParams();
  const ticker = searchParams.get("ticker") || "NVDA";
  const actionParam = searchParams.get("action");
  const option = searchParams.get("option") || "call";
  const action =
    actionParam === "buy" || actionParam === "call"
      ? "buy"
      : actionParam === "sell" || actionParam === "put"
        ? "sell"
        : "sell";
  const isBuyMode = action === "buy";
  const isPutOption = option === "put";

  const [selectedTicker, setSelectedTicker] = useState(ticker);
  const [selectedAction, setSelectedAction] = useState(
    isBuyMode ? (isPutOption ? "Buy Put" : "Buy Call") : (isPutOption ? "Sell Puts" : "Sell Calls"),
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<PriceOption | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [isTickerDropdownOpen, setIsTickerDropdownOpen] = useState(false);
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const router = useRouter();

  const tickers = ["NVDA"];
  const actions = isBuyMode
    ? [isPutOption ? "Buy Put" : "Buy Call"]
    : [isPutOption ? "Sell Puts" : "Sell Calls"];

  useEffect(() => {
    setSelectedTicker(ticker);
    setSelectedAction(isBuyMode ? (isPutOption ? "Buy Put" : "Buy Call") : (isPutOption ? "Sell Puts" : "Sell Calls"));
  }, [ticker, isBuyMode, isPutOption]);

  // Helper function to get logo URL for ticker
  const getTickerLogo = (ticker: string) => {
    const asset = coveredCallAssets.find((asset) => asset.ticker === ticker);
    return asset?.logo || null;
  };

  const { price: spotPrice, isLoading: priceLoading } =
    useGetSpotPrice(selectedTicker);
  const { expiries, isLoading: expiriesLoading } =
    useGetExpiries(selectedTicker);
  const { bids, isLoading: bidsLoading } = useGetOptionBids(
    selectedTicker,
    selectedDate,
    expiries.length > 0,
  );

  const dates = expiries;

  useEffect(() => {
    if (expiries.length > 0) {
      setSelectedDate(expiries[0]);
    }
  }, [expiries]);

  const priceOptions = bids.map((bid) => {
    // Calculate APR from premium and strike
    const apr = (bid.nondollarPremium / bid.strike) * 100;
    return {
      price: `$${bid.strike.toFixed(2)}`,
      apr: `${apr.toFixed(2)}%`,
      strike: bid.strike,
      premium: bid.nondollarPremium,
      color:
        apr > 30
          ? "from-red-500 to-red-600 border-red-500"
          : apr > 15
            ? "from-yellow-500 to-yellow-600 border-yellow-500"
            : "from-green-500 to-green-600 border-green-500",
      bg:
        apr > 30
          ? "bg-red-50 dark:bg-red-900/20"
          : apr > 15
            ? "bg-yellow-50 dark:bg-yellow-900/20"
            : "bg-green-50 dark:bg-green-900/20",
    };
  });

  const MAX_STRIKE_PRICE_OPTIONS = 6;
  const displayPriceOptions = priceOptions.slice(0, MAX_STRIKE_PRICE_OPTIONS);

  const handlePriceSelection = (priceOption: PriceOption) => {
    setSelectedPrice(priceOption);
  };

  const getSelectedPriceData = () => {
    if (selectedPrice) {
      return selectedPrice;
    }
    // Return first option if none selected
    return displayPriceOptions.length > 0 ? displayPriceOptions[0] : null;
  };

  // Lock end date: 60 days for puts, 30 days for calls
  const lockDays = isPutOption ? 60 : 30;
  const lockEndDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + lockDays);
    return formatDate(date.toISOString());
  }, [lockDays]);

  const { address, isConnected, chainId } = useAccount();

  const {
    isPendingStockUsdcApprove,
    handleStockUsdcApprove,
    stockUsdcApproveAsync,
  } = useStockApproveUsdc();

  const { stockDepositIsPending, handleStockDepositTokens } =
    useStockDepositTokens();

  const { stockSignedData, isPendingStockSignedData, refetchStockSignedData } =
    useGetStockSignedData();

  const {
    cdsDepositSignedData,
    isPendingCdsDepositSignedData,
    refetchCdsDepositSignedData,
  } = useGetCdsDepositSignedData();

  const { stockCdsDepositIsPending, handleStockCdsDeposit } =
    useStockCdsDeposit();

  const handleDeposit = async () => {
    // Validate wallet connection
    if (!isConnected || !address) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please connect your wallet first"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }

    // Parse and validate input amount
    const parsedAmount = parseFloat(inputValue);
    if (!inputValue || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please enter a valid amount"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }

    // Check if strike price is selected
    const selectedPriceData = getSelectedPriceData();
    if (!selectedPriceData) {
      toast.custom((t) => (
        <ToastNotificationError
          title="Please select a strike price first"
          onClose={() => toast.dismiss(t)}
        />
      ));
      return;
    }

    setIsDepositing(true);
    debugger;
    try {
      if (!isBuyMode) {
        // Sell mode: Covered Call or Cash Secured Put
        console.log("Sell -", selectedAction, ":", {
          ticker: selectedTicker,
          inputValue: parsedAmount,
          strikePrice: selectedPriceData.strike,
          premium: selectedPriceData.premium,
          expiry: selectedDate,
          user: address,
        });

        const depositingAmount = parseUnits(parsedAmount.toFixed(6), 6);

        const spenderAddress =
          stockCdsDepositAddress[chainId as keyof typeof stockCdsAddress];

        const approveHash = await stockUsdcApproveAsync([
          spenderAddress,
          depositingAmount,
        ]);

        await waitForTransactionReceipt(config, {
          hash: approveHash,
        });

        // let hedgeValidity = BigInt(7776000);
        // if (selectedDate) {
        //   const expiryTimestamp = Math.floor(
        //     new Date(selectedDate).getTime() / 1000,
        //   );
        //   const nowTimestamp = Math.floor(Date.now() / 1000);
        //   const diff = expiryTimestamp - nowTimestamp;
        //   if (diff > 0) {
        //     hedgeValidity = BigInt(diff);
        //   }
        // }

        const stockAssetName = tickerToStockAssetName[selectedTicker];

        if (stockAssetName !== undefined) {
          const signedData = await refetchCdsDepositSignedData({
            collateralType: selectedTicker,
            strikePrice: 0,
            optionFees: "0",
          });

          if (signedData) {
            handleStockCdsDeposit({
              user: address,
              tokenAddresses: [
                stockUsdcAddress[chainId as keyof typeof stockUsdcAddress],
              ],
              tokenAmounts: [depositingAmount],
              lockingPeriod: BigInt(isPutOption ? 5184000 : 2592000),
              assetName: stockAssetName,
              verifyParams: {
                excessProfitCumulativeValue: BigInt(
                  signedData.excessProfitCumulativeValue,
                ),
                ethPrice: BigInt(signedData.ethPrice),
                odosAssembledData: signedData.odosAssembledData,
                expiredUSDAmount: BigInt(signedData.expiredUSDAmount),
                deadline: BigInt(signedData.deadline),
                signature: signedData.signature,
              },
            });
          }
        }
      } else {
        console.log("Buy -", selectedAction, ":", {
          ticker: selectedTicker,
          inputValue: parsedAmount,
          strikePrice: selectedPriceData.strike,
          premium: selectedPriceData.premium,
          expiry: selectedDate,
          user: address,
        });
        const depositingAmount = parseUnits(
          (selectedPriceData.premium * parsedAmount).toFixed(6),
          6,
        );

        const spenderAddress =
          stockBorrowDepositAddress[
          chainId as keyof typeof stockBorrowDepositAddress
          ];

        const approveHash = await stockUsdcApproveAsync([
          spenderAddress,
          depositingAmount,
        ]);

        await waitForTransactionReceipt(config, {
          hash: approveHash,
        });

        let hedgeValidity = BigInt(7776000);
        if (selectedDate) {
          const expiryTimestamp = Math.floor(
            new Date(selectedDate).getTime() / 1000,
          );
          const nowTimestamp = Math.floor(Date.now() / 1000);
          const diff = expiryTimestamp - nowTimestamp;
          if (diff > 0) {
            hedgeValidity = BigInt(diff);
          }
        }
        // 10-minute expiry for testing
        // const hedgeValidity = BigInt(600);

        const stockAssetName = tickerToStockAssetName[selectedTicker];

        if (stockAssetName !== undefined) {
          const signedData = await refetchStockSignedData({
            collateralType: ticker,
            strikePrice: selectedPriceData.strike,
            optionFees: depositingAmount.toString(),
          });

          if (signedData) {
            handleStockDepositTokens({
              user: address,
              assetName: stockAssetName,
              depositingAmount: BigInt(parsedAmount),
              hedgeValidity,
              verifyParams: {
                ethPrice: BigInt(signedData.ethPrice),
                strikePrice: BigInt(signedData.strikePrice),
                optionFees: BigInt(signedData.optionFees),
                expiredUSDAmount: BigInt(signedData.expiredUSDAmount),
                deadline: BigInt(signedData.deadline),
                signature: signedData.signature,
              },
            });
          }
        }
      }
    } catch (error) {
      console.error("Deposit failed:", error);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed. Please try again."
          onClose={() => toast.dismiss(t)}
        />
      ));
    } finally {
      setIsDepositing(false);
    }
  };

  return (
    <div className="min-h-screen  dark:bg-[#0a0a0a] flex flex-col">
      {/* App Bar */}
      <div className="w-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top border-b border-grayLight">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center min-h-[3.5rem] sm:h-16">
            {/* Left Section - Dropdowns */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 lg:space-x-6 overflow-visible flex-1">
              {/* Back Arrow */}
              <button
                onClick={() => router.back()}
                className="flex items-center cursor-pointer px-1.5 sm:px-2 py-2 rounded-[8px] hover:bg-white/20 dark:hover:bg-black/20 transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-textBlack dark:text-white" />
              </button>
              {/* Ticker Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsTickerDropdownOpen(!isTickerDropdownOpen)}
                  className="flex items-center gap-1 sm:space-x-2 cursor-pointer px-2 sm:px-3 py-2 rounded-[8px] dark:hover:bg-black/20"
                >
                  {(() => {
                    const logoUrl = getTickerLogo(selectedTicker);
                    return logoUrl ? (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100 p-0.5 sm:p-1 flex items-center justify-center">
                        <Image
                          src={logoUrl}
                          alt={`${selectedTicker} logo`}
                          width={20}
                          height={20}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-sm bg-blue-500"
                        style={{
                          backgroundColor: "#3b82f6",
                        }}
                      >
                        {selectedTicker.charAt(0)}
                      </div>
                    );
                  })()}
                  <span className="text-sm sm:text-base lg:text-lg text-textBlack dark:text-white font-medium font-plex-grotesk whitespace-nowrap">
                    {selectedTicker}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-grayLight transition-transform flex-shrink-0 ${isTickerDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isTickerDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-44 sm:w-48 bg-white dark:bg-black border border-grayLight rounded-lg shadow-lg z-50">
                    {tickers.map((t) => {
                      const logoUrl = getTickerLogo(t);
                      return (
                        <button
                          key={t}
                          onClick={() => {
                            setSelectedTicker(t);
                            setIsTickerDropdownOpen(false);
                          }}
                          className="w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2 sm:space-x-3"
                        >
                          {logoUrl ? (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-gray-100 p-0.5 flex items-center justify-center">
                              <Image
                                src={logoUrl}
                                alt={`${t} logo`}
                                width={16}
                                height={16}
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-xs bg-blue-500"
                              style={{
                                backgroundColor: "#3b82f6",
                              }}
                            >
                              {t.charAt(0)}
                            </div>
                          )}
                          <span className="text-sm sm:text-base">{t}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Dropdown */}
              <div className="relative border-l border-grayLight pl-1 sm:pl-2 flex-shrink-0">
                <button
                  onClick={() => setIsActionDropdownOpen(!isActionDropdownOpen)}
                  className="flex items-center gap-1 sm:space-x-2 cursor-pointer pl-2 sm:pl-4 lg:pl-6 px-1.5 sm:px-3 py-2 rounded-[8px] hover:bg-white/20 dark:hover:bg-black/20"
                >
                  <span className="text-sm sm:text-base lg:text-lg text-textBlack dark:text-white font-plex-grotesk whitespace-nowrap">
                    {selectedAction}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-grayLight transition-transform flex-shrink-0 ${isActionDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isActionDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-40 sm:w-48 bg-white dark:bg-black border border-grayLight rounded-lg shadow-lg z-50">
                    {actions.map((a) => (
                      <button
                        key={a}
                        onClick={() => {
                          setSelectedAction(a);
                          setIsActionDropdownOpen(false);
                        }}
                        className={`w-full px-3 sm:px-4 py-2 text-left text-sm sm:text-base transition-colors ${selectedAction === a
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Dropdown */}
              {isBuyMode && (
                <div className="relative border-l border-grayLight pl-1 sm:pl-2 flex-shrink-0">
                  <button
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    className="flex items-center gap-1 sm:space-x-2 cursor-pointer pl-2 sm:pl-4 lg:pl-6 px-1.5 sm:px-3 py-2 rounded-[8px] hover:bg-white/20 dark:hover:bg-black/20"
                  >
                    <span className="text-sm sm:text-base lg:text-lg text-textBlack dark:text-white font-plex-grotesk whitespace-nowrap">
                      {selectedDate ? formatDateShort(selectedDate) : "Select date"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-grayLight transition-transform flex-shrink-0 ${isDateDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isDateDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-40 sm:w-48 bg-white dark:bg-black border border-grayLight rounded-lg shadow-lg z-50">
                      {dates.map((d) => (
                        <button
                          key={d}
                          onClick={() => {
                            setSelectedDate(d);
                            setIsDateDropdownOpen(false);
                          }}
                          className="w-full px-3 sm:px-4 py-2 text-left text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {formatDateShort(d)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Section - Price */}
            <div className="flex items-center border-l border-grayLight px-2 sm:px-4 lg:px-6 flex-shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                {priceLoading ? (
                  <Spinner size={16} color="gray" />
                ) : (
                  <span className="text-sm sm:text-base lg:text-xl text-textBlack dark:text-white font-bold font-plex-grotesk whitespace-nowrap">
                    {spotPrice ? `$${spotPrice.toFixed(2)}` : "$2,356.76"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[900px] mx-auto">
        <div className="flex-1 flex items-center justify-center mt-8 px-4 ">
          <div className="text-center w-full">
            {/* Heading - Buy mode */}
            {isBuyMode && (
              <div className="mb-14 px-8 py-6">
                <p className="text-xl text-grayLight dark:text-gray-400 font-plex-grotesk  mx-auto">
                  Choose the price at which you are happy to {isPutOption ? "Sell" : "buy"} {ticker} on {selectedDate ? formatDate(selectedDate) : "..."} ({selectedDate ? getDaysRemaining(selectedDate) : "..."} days)
                </p>
              </div>
            )}

            {/* Price List - Buy mode */}
            {isBuyMode && (
              <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
                {bidsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Spinner size={32} color="blue" />
                    <p className="mt-4 text-grayLight dark:text-gray-400 font-plex-grotesk">
                      Loading strike prices...
                    </p>
                  </div>
                ) : displayPriceOptions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-grayLight dark:text-gray-400 font-plex-grotesk">
                      No strike prices available
                    </p>
                  </div>
                ) : (
                  displayPriceOptions.map((item) => (
                    <div key={item.strike} className="relative group ">
                      <button
                        onClick={() => handlePriceSelection(item)}
                        className={`relative px-6 py-2 rounded-xl border-2 transition-all duration-300 group hover:scale-105 backdrop-blur-sm ${selectedPrice?.price === item.price
                          ? "border-blue-500 shadow-lg ring-2 ring-blue-200 dark:ring-blue-400"
                          : "border-gray-200 dark:border-gray-700 hover:shadow-xl"
                          } ${item.bg}`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                        />
                        <span className="relative text-lg font-bold text-textBlack dark:text-white font-plex-grotesk">
                          {item.price}
                        </span>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                        <div
                          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${item.color} transition-all duration-300 group-hover:w-3/4`}
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Sell Mode Heading - Pool Covered Calls */}
            {!isBuyMode && (
              <div className="mb-8 text-left">
                <div className="text-xs uppercase tracking-[0.22em] text-[#5fb88a] font-plex-grotesk mb-2 inline-flex items-center gap-2 before:content-[''] before:w-4 before:h-px before:bg-[#5fb88a]">
                  Pool · {isPutOption ? "Sell Puts" : "Sell Calls"}
                </div>
                <h1 className="text-[32px] sm:text-[38px] font-serif font-normal leading-[1.1] tracking-[-0.025em] text-textBlack dark:text-white max-w-[24ch]">
                  Deposit crypto, <em className="italic text-[#5fb88a] not-italic">earn premium</em> from {isPutOption ? "puts" : "calls"} written against the pool
                </h1>

              </div>
            )}

            {/* Config Grid - Sell mode only */}
            {!isBuyMode && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-6 text-left">
                {/* Field 1: Asset to write calls on */}
                <div className="bg-white dark:bg-[#161616] border-[0.5px] border-[#262626] rounded-[14px] p-4 focus-within:border-[#5fb88a] transition-colors">
                  <div className="font-plex-grotesk text-[9.5px] uppercase tracking-[0.18em] text-grayLight dark:text-gray-400 mb-2.5">
                    {isPutOption ? "Asset to write puts on" : "Asset to write calls on"}
                  </div>
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="flex items-center gap-2.5 text-lg font-medium text-textBlack dark:text-white">
                      <span className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[#1d4d2c] to-[#76b049] text-white flex items-center justify-center font-serif font-medium text-xs">
                        {selectedTicker.charAt(0)}
                      </span>
                      {selectedTicker}
                    </span>
                    <span className="text-grayLight dark:text-gray-400 text-[10px]">▼</span>
                  </div>
                  <div className="font-plex-grotesk text-[10.5px] text-grayLight dark:text-gray-400 mt-2.5 leading-relaxed">
                    Premium from all {selectedTicker} {isPutOption ? "put" : "call"} buyers flows to this pool.
                  </div>
                </div>

                {/* Field 2: Lock-in for premium accrual */}
                <div className="bg-white dark:bg-[#161616] border-[0.5px] border-[#262626] rounded-[14px] p-4 focus-within:border-[#5fb88a] transition-colors">

                  <div className="font-plex-grotesk text-[9.5px] uppercase tracking-[0.18em] text-grayLight dark:text-gray-400 mb-2.5">
                    Lock-in for premium accrual
                  </div>
                  <div className="flex items-center justify-between gap-2.5">
                    <span className="text-lg font-medium text-textBlack dark:text-white">
                      {lockDays} days
                    </span>
                    <span className="text-grayLight dark:text-gray-400 text-[10px]">▼</span>
                  </div>
                  <div className="font-plex-grotesk text-[10.5px] text-grayLight dark:text-gray-400 mt-2.5 leading-relaxed">
                    Your deposit is locked until <strong className="text-[#5fb88a] font-medium">{lockEndDate}</strong>. Every {isPutOption ? "put" : "call"} sold in this window earns you a share.
                  </div>
                </div>
              </div>
            )}

            {/* Input Section */}
            <div className="mt-8 w-full">
              {isBuyMode && (
                <Label className="mb-3 block text-left text-lg sm:text-xl font-semibold text-textBlack dark:text-white font-plex-grotesk">
                  Contract amount
                </Label>
              )}
              <div className="flex items-center border rounded-[8px] border-grayLight  bg-gray-50 dark:bg-transparent ">
                {/* Left Side Controls */}
                <div className="flex items-center h-full space-x-1">
                  {!isBuyMode && (
                    <button className="h-12 px-3 text-xs font-medium text-textBlack dark:text-white border-r border-grayLight hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      MAX
                    </button>
                  )}

                  <div className="flex h-full px-3 py-2 flex-col border-r border-grayLight">
                    <button
                      type="button"
                      className="w-4 h-4 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-grayLight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-4 h-4 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-grayLight"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      if (isBuyMode) {
                        const sanitized = rawValue.replace(/[.,]/g, '');
                        if (sanitized === '' || /^\d+$/.test(sanitized)) {
                          setInputValue(sanitized);
                        }
                      } else {
                        setInputValue(rawValue);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (isBuyMode && (e.key === '.' || e.key === ',')) {
                        e.preventDefault();
                      }
                    }}
                    onWheel={(e) => {
                      (e.target as HTMLInputElement).blur();
                    }}
                    placeholder={
                      isBuyMode
                        ? "Enter contract amount here"
                        : getSelectedPriceData()
                          ? `Enter amount for ${getSelectedPriceData()?.price || "$0.00"} strike`
                          : "amount to deposit"
                    }
                    className={`w-full px-4 py-3 bg-transparent text-textBlack dark:text-white font-plex-grotesk focus:outline-none focus:border-none transition-all duration-200 ${isBuyMode ? "pr-4" : "pr-16"
                      }`}
                  />
                  {!isBuyMode && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <Image
                        src={usdcIcon}
                        alt="USDC"
                        width={24}
                        height={24}
                        className="object-contain"
                        unoptimized
                      />
                      <span className="text-sm font-medium text-textBlack dark:text-white font-plex-grotesk">
                        USDC
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {!isBuyMode && (
                <div className="text-xs text-grayLight dark:text-gray-400 text-left mt-2">
                  Available: 1,000 USDC
                </div>
              )}

              {getSelectedPriceData() && (
                <div className="mt-4 overflow-hidden border border-grayLight dark:border-grayLight rounded-[12px]">
                  <div className="bg-[#97f0bc] text-[#051911] px-[22px] py-[11px] font-['JetBrains_Mono',monospace] text-[11px] font-semibold tracking-[0.18em] uppercase text-center border-b border-grayLight dark:border-grayLight">
                    {isBuyMode ? "NOW" : "Projected premium · proportional share"}
                  </div>

                  <div className="p-4 py-8">
                    {isBuyMode ? (
                      <>
                        <div className="text-left">
                          <div className="text-4xl font-bold text-black dark:text-white">
                            ${(selectedPrice?.premium)?.toFixed(2)}{" "}
                            <span className="text-base text-grayLight dark:text-gray-400 font-normal">
                              upfront Premium
                            </span>
                          </div>
                          <div className="text-sm text-grayLight dark:text-gray-400 mt-2 font-plex-grotesk">
                            Total Premium: ${((selectedPrice?.premium || 0) * (parseInt(inputValue || "0") || 0)).toFixed(2)} ({(selectedPrice?.premium || 0).toFixed(2)} × {parseInt(inputValue || "0") || 0} contracts)
                          </div>
                        </div>
                        {/* Explain box - Buy mode */}
                        <div className="bg-[#f0f4f3] dark:bg-[#161616] border border-grayLight dark:border-grayLight rounded-[10px] p-[14px_16px] mt-4 font-['JetBrains_Mono',monospace] text-[11.5px] leading-[1.6] text-grayLight dark:text-gray-400">
                          Your ITM payout is capped at 10% above the strike price. This cap is what makes the discounted premium possible and reflects the collateral committed by call sellers. The cap is however flexible and can be updated to 30% max as per the collateral committed by call sellers
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Premium hero section */}
                        <div className="flex justify-between items-start gap-[18px] mb-[22px]">
                          <div className="flex flex-col gap-[2px]">
                            <div className="font-['Fraunces',serif] text-[52px] font-medium tracking-[-0.035em] leading-none text-black dark:text-white">
                              ~${getSelectedPriceData()?.premium?.toFixed(2) || "0.00"}
                              <span className="text-[22px] text-grayLight dark:text-gray-400 ml-1 font-normal">
                                {" "}USDC
                              </span>
                            </div>
                            <div className="font-['JetBrains_Mono',monospace] text-[11px] text-grayLight dark:text-gray-400 mt-[6px]">
                              <strong className="font-medium text-black dark:text-white">
                                {bidsLoading ? "..." : "> 40%"} APR
                              </strong>{" "}
                              · {isPutOption ? "premium per 1 contract sold" : "based on last-30-day pool activity"}
                            </div>
                          </div>
                          <div className="flex flex-col gap-[6px] items-end">
                            {!isPutOption && (
                              <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.12em] uppercase text-grayLight dark:text-gray-400">
                                Your share <span className="font-medium text-black dark:text-white">12.4%</span>
                              </div>
                            )}
                            <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.12em] uppercase text-grayLight dark:text-gray-400">
                              Lock until <span className="font-medium text-black dark:text-white">{lockEndDate}</span>
                            </div>
                            <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.12em] uppercase text-grayLight dark:text-gray-400">
                              Paid in <span className="font-medium text-black dark:text-white">USDC</span>
                            </div>
                          </div>
                        </div>
                        {/* Explain box */}
                        <div className="bg-[#f0f4f3] dark:bg-[#161616] border border-grayLight dark:border-grayLight rounded-[10px] p-[14px_16px] font-['JetBrains_Mono',monospace] text-[11.5px] leading-[1.6] text-grayLight dark:text-gray-400">
                          {isPutOption ? (
                            <>
                              Premium comes from everyone buying {ticker} puts written against this pool, split{" "}
                              <span className="font-medium text-[#5fb88a]">proportionally</span> by each depositor's share.{" "}
                              <strong className="font-medium text-black dark:text-white">The more puts bought during your deposit period, the higher your payout.</strong>{" "}
                              The estimates above are based on past activity — actuals depend on real buy flow.
                            </>
                          ) : (
                            <>
                              Premium is paid by everyone buying {ticker} calls written against this pool, split{" "}
                              <span className="font-medium text-[#5fb88a]">proportionally</span> by each depositor's share.{" "}
                              <strong className="font-medium text-black dark:text-white">The more calls bought during your 30 days, the higher your premium.</strong>{" "}
                              Numbers above are estimates from past activity; actuals depend on real buy flow.
                            </>
                          )}
                        </div>
                      </>
                    )}

                  </div>
                  {isBuyMode && (
                    <>
                      <div className="text-sm sm:text-lg text-black border border-grayLight dark:border-grayLight dark:text-white font-medium text-center p-3 sm:p-4">
                        On {selectedDate ? formatDate(selectedDate) : "Loading..."}
                      </div>

                      <div className="p-3 sm:p-4 py-6 sm:py-8 flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-grayLight dark:border-grayLight pb-4 sm:pb-0 sm:pr-4">
                          <p className="text-xs sm:text-sm text-left text-grayLight dark:text-gray-400">
                            If {ticker} BELOW {" "}
                            {getSelectedPriceData()?.price || "$0.00"}
                          </p>
                          <div className="mt-3 sm:mt-4 flex items-center gap-1 sm:gap-2 flex-wrap">
                            {(() => {
                              const logoUrl = getTickerLogo(ticker);
                              return logoUrl ? (
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100 p-0.5 sm:p-1 flex items-center justify-center flex-shrink-0">
                                  <Image
                                    src={logoUrl}
                                    alt={`${ticker} logo`}
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-sm bg-blue-500 flex-shrink-0">
                                  {ticker.charAt(0)}
                                </div>
                              );
                            })()}
                            <div className="text-sm sm:text-lg font-medium dark:text-green-500 text-green-600">
                              {isPutOption ? "Received the downside below strike" : `Get 0 ${ticker} back`}
                            </div>
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-start sm:items-end justify-center pt-4 sm:pt-0 sm:pl-4">
                          <p className="text-xs sm:text-sm text-left text-grayLight dark:text-gray-400">
                            If {ticker} ABOVE {" "}
                            {getSelectedPriceData()?.price || "$0.00"}
                          </p>
                          <div className="mt-3 sm:mt-4 flex items-center gap-1 sm:gap-2 flex-wrap">
                            <div className="text-sm sm:text-lg font-medium dark:text-green-500 text-green-600">
                              {isPutOption ? "Get 0 USDC back" : "Receive the upside above strike"}
                            </div>
                            {isPutOption ? (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100 p-0.5 sm:p-1 flex items-center justify-center flex-shrink-0">
                                <Image
                                  src={usdcIcon}
                                  alt="USDC"
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                  unoptimized
                                />
                              </div>
                            ) : (() => {
                              const logoUrl = getTickerLogo(ticker);
                              return logoUrl ? (
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100 p-0.5 sm:p-1 flex items-center justify-center flex-shrink-0">
                                  <Image
                                    src={logoUrl}
                                    alt={`${ticker} logo`}
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                    unoptimized
                                  />
                                </div>
                              ) : (
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-sm bg-blue-500 flex-shrink-0">
                                  {ticker.charAt(0)}
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Loss Card - Sell mode only */}
              {!isBuyMode && (
                <div className="bg-white dark:bg-[#161616] border-[0.5px] border-[#262626] rounded-[14px] p-[22px_24px] mb-[28px] mt-4 text-left">

                  <div className="flex items-center gap-[10px] mb-[14px]">
                    <span className="w-[22px] h-[22px] rounded-full bg-[rgba(212,160,96,0.12)] border border-[rgba(212,160,96,0.3)] text-[#d4a060] inline-flex items-center justify-center font-['JetBrains_Mono',monospace] font-semibold text-[11px]">
                      !
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase text-[#d4a060] font-medium">
                      How losses work
                    </span>
                  </div>
                  <div className="font-['Inter_Tight',sans-serif] text-[14px] leading-[1.65] text-black dark:text-white mb-[18px]">
                    {isPutOption ? (
                      <>If a put sold by the pool expires <strong className="font-semibold text-black dark:text-white">in-the-money</strong> ({ticker} closes below the strike), the payout owed to the buyer is taken <em className="not-italic text-[#d4a060] font-medium">proportionally</em> from every depositor's collateral. Your downside is capped at the USDC you deposited.</>
                    ) : (
                      <>If any call sold by the pool expires <strong className="font-semibold text-black dark:text-white">in-the-money</strong> ({ticker} closes above the strike that was sold), the payout owed to the buyer is taken <em className="not-italic text-[#d4a060] font-medium">proportionally</em> from every depositor's collateral. Your downside is limited to the USDC you deposited.</>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-[12px] pt-[16px] border-t border-dashed border-[#e5e5e3] dark:border-[#1c2e2a]">

                    <div>
                      <div className="font-['JetBrains_Mono',monospace] text-[9.5px] tracking-[0.16em] uppercase text-grayLight dark:text-gray-400 mb-[4px]">
                        Your max exposure
                      </div>
                      <div className="font-['JetBrains_Mono',monospace] text-[13px] text-black dark:text-white font-medium text-[#d4a060]">
                        Up to {inputValue || "0"} USDC
                      </div>
                    </div>
                    <div>
                      <div className="font-['JetBrains_Mono',monospace] text-[9.5px] tracking-[0.16em] uppercase text-grayLight dark:text-gray-400 mb-[4px]">
                        Loss allocation
                      </div>
                      <div className="font-['JetBrains_Mono',monospace] text-[13px] text-black dark:text-white font-medium">
                        Proportional to share
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  onClick={handleDeposit}
                  disabled={
                    isDepositing ||
                    isPendingStockUsdcApprove ||
                    stockDepositIsPending ||
                    stockCdsDepositIsPending
                  }
                  className={`
                    bg-[#141414] border-[0.5px] border-[#262626] py-[18px]
                    text-white font-medium text-[16px] w-full rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-[#1a1a1a] transition-colors
                  `}
                >
                  {isDepositing ||
                    isPendingStockUsdcApprove ||
                    stockDepositIsPending ||
                    stockCdsDepositIsPending
                    ? "Processing..."
                    : isBuyMode
                      ? "Buy Contract"
                      : "Earn upfront premium now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTicker === "LAB" && (
        <>
        {/* ABOUT $LAB */}
        <div className="max-w-[900px] mx-auto px-4 mb-12 mt-[64px]">
          <div className="flex items-center gap-[10px] mb-[10px]">
            <div className="w-[4px] h-[16px] bg-[#7fecbe] rounded-[2px]" />
            <span className="text-[11px] tracking-[0.15em] text-[#7fecbe] font-['JetBrains_Mono',monospace] uppercase">
              ABOUT $LAB
            </span>
          </div>
          <div className="text-[22px] font-medium text-white mb-[4px]">
            The underlying
          </div>

          <div className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[20px_22px] mt-[24px]">
            <div className="text-[13px] text-[#b0b0b0] leading-[1.7] mb-[16px]">
              LAB is the native token of LabTrade, a launchpad protocol distributed through Legion presale. It trades on Binance USDT-M perp (LABUSDT) and spot. Total supply is 1B, with 31.25% currently circulating and the remainder subject to vesting per the team&apos;s schedule.
            </div>
            <div className="grid grid-cols-2 gap-[8px] mb-[16px]">
              <a
                href="https://www.coingecko.com/en/coins/lab"
                target="_blank"
                rel="noopener"
                className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[12px_14px] flex items-center justify-between text-[13px] text-white hover:border-[#262626] transition-colors"
              >
                <span>CoinGecko</span>
                <ExternalLink className="w-[14px] h-[14px] text-[#666666]" />
              </a>
              <a
                href="https://www.binance.com/en/futures/LABUSDT"
                target="_blank"
                rel="noopener"
                className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[12px_14px] flex items-center justify-between text-[13px] text-white hover:border-[#262626] transition-colors"
              >
                <span>Binance LABUSDT perp</span>
                <ExternalLink className="w-[14px] h-[14px] text-[#666666]" />
              </a>
              <a
                href="https://twitter.com/LABtrade_"
                target="_blank"
                rel="noopener"
                className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[12px_14px] flex items-center justify-between text-[13px] text-white hover:border-[#262626] transition-colors"
              >
                <span>@LABtrade_ on X</span>
                <ExternalLink className="w-[14px] h-[14px] text-[#666666]" />
              </a>
              <a
                href="https://tokenomist.ai/lab"
                target="_blank"
                rel="noopener"
                className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[12px_14px] flex items-center justify-between text-[13px] text-white hover:border-[#262626] transition-colors"
              >
                <span>Tokenomist unlock page</span>
                <ExternalLink className="w-[14px] h-[14px] text-[#666666]" />
              </a>
            </div>
            <div className="flex justify-between items-center mb-[6px]">
              <span className="text-[11px] tracking-[0.05em] text-[#888888] font-['JetBrains_Mono',monospace] uppercase">
                LAB TOKEN CONTRACT (BSC)
              </span>
            </div>
            <a
              href="https://bscscan.com/token/0x7ec43cf65f1663f820427c62a5780b8f2e25593a"
              target="_blank"
              rel="noopener"
              className="font-['JetBrains_Mono',monospace] text-[12px] text-[#ffb84d] break-all hover:underline"
            >
              0x7ec43cf65f1663f820427c62a5780b8f2e25593a
            </a>
          </div>
        </div>

        {/* CONTRACTS & SECURITY */}
        <div className="max-w-[900px] mx-auto px-4 mb-12">
          <div className="flex items-center gap-[10px] mb-[10px]">
            <div className="w-[4px] h-[16px] bg-[#7fecbe] rounded-[2px]" />
            <span className="text-[11px] tracking-[0.15em] text-[#7fecbe] font-['JetBrains_Mono',monospace] uppercase">
              CONTRACTS &amp; SECURITY
            </span>
          </div>
          <div className="text-[22px] font-medium text-white mb-[4px]">
            What&apos;s holding your USDC
          </div>

          <div className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[20px_22px] mt-[24px]">
            <div className="text-[13px] text-[#b0b0b0] leading-[1.7] mb-[16px]">
              Nondollar options are settled through smart contracts on Base. Below are the specific contracts governing this LAB put series and Nondollar&apos;s audit history.
            </div>

            <div className="flex flex-col gap-[8px] mb-[16px]">
              <div className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[14px_16px]">
                <div className="flex justify-between items-center mb-[6px]">
                  <span className="text-[11px] tracking-[0.05em] text-[#7fecbe] font-['JetBrains_Mono',monospace] uppercase font-medium">
                    LAB PUT OPTION BUYING CONTRACT (BASE)
                  </span>
                </div>
                <a
                  href="https://basescan.org/address/0xf8628C3755C803aD344332014dd67bE87b3F6AB7"
                  target="_blank"
                  rel="noopener"
                  className="font-['JetBrains_Mono',monospace] text-[12px] text-[#ffb84d] break-all hover:underline"
                >
                  0xf8628C3755C803aD344332014dd67bE87b3F6AB7
                </a>
              </div>

              <div className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[14px_16px]">
                <div className="flex justify-between items-center mb-[6px]">
                  <span className="text-[11px] tracking-[0.05em] text-[#888888] font-['JetBrains_Mono',monospace] uppercase">
                    LAB PUT OPTION SELLING CONTRACT (BASE)
                  </span>
                </div>
                <a
                  href="https://basescan.org/address/0x72277A105a742fcbbd7D4EFeEd080673747770bF"
                  target="_blank"
                  rel="noopener"
                  className="font-['JetBrains_Mono',monospace] text-[12px] text-[#ffb84d] break-all hover:underline"
                >
                  0x72277A105a742fcbbd7D4EFeEd080673747770bF
                </a>
              </div>

              <div className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[14px_16px]">
                <div className="flex justify-between items-center mb-[6px]">
                  <span className="text-[11px] tracking-[0.05em] text-[#888888] font-['JetBrains_Mono',monospace] uppercase">
                    LAB PRICE FEED SOURCE FOR SETTLEMENT
                  </span>
                </div>
                <a
                  href="https://www.binance.com/en/futures/LABUSDT"
                  target="_blank"
                  rel="noopener"
                  className="font-['JetBrains_Mono',monospace] text-[12px] text-[#ffb84d] break-all hover:underline"
                >
                  https://www.binance.com/en/futures/LABUSDT
                </a>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border-[0.5px] border-[#1f1f1f] rounded-[8px] p-[16px] mt-[12px]">
              <div className="text-[12px] text-[#888888] mb-[12px] font-medium font-['JetBrains_Mono',monospace] uppercase tracking-[0.05em]">
                Protocol track record
              </div>
              <div className="grid grid-cols-3 gap-[12px] mb-[14px]">
                <div>
                  <div className="font-['JetBrains_Mono',monospace] text-[18px] text-[#7fecbe] font-medium">$4M+</div>
                  <div className="text-[11px] text-[#666666] mt-[4px]">Cumulative TVL (dCDS)</div>
                </div>
                <div>
                  <div className="font-['JetBrains_Mono',monospace] text-[18px] text-[#7fecbe] font-medium">12 mo</div>
                  <div className="text-[11px] text-[#666666] mt-[4px]">Zero settlement failures</div>
                </div>
                <div>
                  <div className="font-['JetBrains_Mono',monospace] text-[18px] text-[#7fecbe] font-medium">350+</div>
                  <div className="text-[11px] text-[#666666] mt-[4px]">Sherlock auditors</div>
                </div>
              </div>
              <div className="text-[13px] text-[#b0b0b0] leading-[1.6]">
                Nondollar is built by the team behind dCDS, a Sherlock-audited hedging protocol that ran 12 months on Base and Optimism with zero settlement failures.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[12px] mt-[12px]">
            <a
              href="https://drive.google.com/file/d/1EldSDBjBAtWJjcQI70RxPYVyiQOSTaId/view"
              target="_blank"
              rel="noopener"
              className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[16px_18px] hover:border-[#888888] transition-colors block"
            >
              <div className="flex items-center justify-between mb-[6px]">
                <div className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.05em] uppercase text-[#7fecbe]">
                  SHERLOCK AUDIT
                </div>
                <ExternalLink className="w-[14px] h-[14px] text-[#666666] flex-shrink-0" />
              </div>
              <div className="text-[13px] text-white">Predecessor dCDS report</div>
            </a>
            <a
              href="[REPLACE: new audit URL or 'coming soon' page]"
              target="_blank"
              rel="noopener"
              className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[16px_18px] hover:border-[#888888] transition-colors block"
            >
              <div className="flex items-center justify-between mb-[6px]">
                <div className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.05em] uppercase text-[#ffb84d]">
                  V1 AUDIT STATUS
                </div>
                <ExternalLink className="w-[14px] h-[14px] text-[#666666] flex-shrink-0" />
              </div>
              <div className="text-[13px] text-[#7fecbe]">Completed</div>
            </a>
          </div>
        </div>

        {/* SOURCES */}
        <div className="max-w-[900px] mx-auto px-4 mb-12">
          <div className="flex items-center gap-[10px] mb-[10px]">
            <div className="w-[4px] h-[16px] bg-[#7fecbe] rounded-[2px]" />
            <span className="text-[11px] tracking-[0.15em] text-[#7fecbe] font-['JetBrains_Mono',monospace] uppercase">
              SOURCES
            </span>
          </div>
          <div className="text-[22px] font-medium text-white mb-[4px]">
            Do your own research
          </div>
          <div className="text-[14px] text-[#888888] mb-[24px]">
            Every claim on this page traces back to a public source. Verify them.
          </div>

          <div className="flex flex-col gap-[8px] mb-[24px]">
            <a
              href="https://alva.ai/u/aks-v/playbooks/lab-unlock-put-war-room"
              target="_blank"
              rel="noopener"
              className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[16px_20px] flex items-center justify-between hover:border-[#888888] transition-colors"
            >
              <div>
                <div className="text-[14px] text-white mb-[3px]">Alva LAB Short War Room</div>
                <div className="text-[11px] text-[#666666]">Live funding, OI, PnL calculator, KOL feed</div>
              </div>
              <ExternalLink className="w-[14px] h-[14px] text-[#666666] flex-shrink-0" />
            </a>
            <a
              href="https://tokenomist.ai/lab"
              target="_blank"
              rel="noopener"
              className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[16px_20px] flex items-center justify-between hover:border-[#888888] transition-colors"
            >
              <div>
                <div className="text-[14px] text-white mb-[3px]">Tokenomist LAB unlock page</div>
                <div className="text-[11px] text-[#666666]">Supply, allocation mix, event log</div>
              </div>
              <ExternalLink className="w-[14px] h-[14px] text-[#666666] flex-shrink-0" />
            </a>

          </div>

          <div className="bg-[#141414] border-[0.5px] border-[#262626] rounded-[12px] p-[16px_20px] font-['JetBrains_Mono',monospace] text-[11px] text-[#666666] leading-[1.8] mb-[32px]">
            This is not financial advice. Options carry risk of total premium loss. The Aug 14 unlock window is community-reported and not confirmed by Tokenomist or @LABtrade_ in a dated calendar. Do your own research. Nondollar makes no representation about the outcome of any catalyst event.
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default CoveredCallTemplate;