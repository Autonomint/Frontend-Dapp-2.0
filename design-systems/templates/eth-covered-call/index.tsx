"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/design-systems/atoms/button";
import cryptoEth from "@/app/assets/eth.png";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
import useStockApproveUsdc from "@/hookes/stock-contracts/useStockApproveUsdc";
import useStockDepositTokens from "@/hookes/stock-contracts/useStockDepositTokens";
import useStockCdsDeposit from "@/hookes/stock-contracts/useStockCdsDeposit";
import useGetStockSignedData from "@/hookes/stock-contracts/useGetStockSignedData";
import {
  stockBorrowDepositAddress,
  stockCdsAddress,
  stockUsdcAddress,
} from "@/blockchain/contracts";
import { tickerToStockAssetName } from "@/utils/constants";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/blockchain/WalletConfigs/iindex";

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
  const action =
    actionParam === "buy" || actionParam === "call"
      ? "buy"
      : actionParam === "sell" || actionParam === "put"
        ? "sell"
        : "sell";
  const isBuyMode = action === "buy";

  const [selectedTicker, setSelectedTicker] = useState(ticker);
  const [selectedAction, setSelectedAction] = useState(
    isBuyMode ? "Buy Call" : "Covered Call",
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<PriceOption | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [isTickerDropdownOpen, setIsTickerDropdownOpen] = useState(false);
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  const tickers = ["NVDA", "UETH", "BTC"];
  const actions = isBuyMode
    ? ["Buy Call"]
    : ["Cash secured put", "Covered Call"];

  useEffect(() => {
    setSelectedTicker(ticker);
    setSelectedAction(isBuyMode ? "Buy Call" : "Covered Call");
  }, [ticker, isBuyMode]);

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
      if (isBuyMode) {
        // Buy mode: User buys call option contract
        console.log("Buy Call:", {
          ticker: selectedTicker,
          inputValue: parsedAmount,
          strikePrice: selectedPriceData.strike,
          premium: selectedPriceData.premium,
          expiry: selectedDate,
          user: address,
        });

        // Calculate depositing amount = strike price * input value (in USDC decimals = 6)
        const depositingAmount = parseUnits(
          (selectedPriceData.strike * parsedAmount).toFixed(6),
          6,
        );

        // Get CDS contract address as spender for USDC approval
        const spenderAddress =
          stockCdsAddress[chainId as keyof typeof stockCdsAddress];

        // Step 1: Fire USDC approval (approve CDS contract to spend USDC)
        const approveHash = await stockUsdcApproveAsync([
          spenderAddress,
          depositingAmount,
        ]);

        await waitForTransactionReceipt(config, {
          hash: approveHash,
        });

        // Step 2: Calculate hedge validity
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

        // Step 3: Get stock asset name from ticker
        const stockAssetName = tickerToStockAssetName[selectedTicker];

        // Step 4: Fetch signed data from API
        if (stockAssetName !== undefined) {
          const signedData = await refetchStockSignedData({
            underlying: selectedTicker,
            hedgeDuration: Number(hedgeValidity),
          });

          if (signedData) {
            // Step 5: Call CDS deposit with signed data
            handleStockCdsDeposit({
              user: address,
              tokenAddresses: [
                stockUsdcAddress[chainId as keyof typeof stockUsdcAddress],
              ],
              tokenAmounts: [depositingAmount],
              lockingPeriod: hedgeValidity,
              assetName: stockAssetName,
              verifyParams: {
                excessProfitCumulativeValue: BigInt(0),
                ethPrice: BigInt(signedData.ethPrice),
                odosAssembledData: "0x" as `0x${string}`,
                deadline: BigInt(signedData.deadline),
                signature: signedData.signature,
              },
            });
          }
        }
      } else {
        // Sell mode: Covered Call or Cash Secured Put
        console.log("Sell -", selectedAction, ":", {
          ticker: selectedTicker,
          inputValue: parsedAmount,
          strikePrice: selectedPriceData.strike,
          premium: selectedPriceData.premium,
          expiry: selectedDate,
          user: address,
        });
        // Step 1: Calculate depositing amount = strike price * input value (in USDC decimals = 6)
        const depositingAmount = parseUnits(
          (selectedPriceData.strike * parsedAmount).toFixed(6),
          6,
        );

        // Get the spender address (stock borrow deposit contract)
        const spenderAddress =
          stockBorrowDepositAddress[
            chainId as keyof typeof stockBorrowDepositAddress
          ];

        // Step 1: Fire USDC approval - user confirms in wallet
        const approveHash = await stockUsdcApproveAsync([
          spenderAddress,
          depositingAmount,
        ]);

        await waitForTransactionReceipt(config, {
          hash: approveHash,
        });

        // Step 2: Calculate hedge validity (seconds between now and selected expiry)
        let hedgeValidity = BigInt(7776000); // Default ~90 days
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

        // Step 3: Get stock asset name from ticker
        const stockAssetName = tickerToStockAssetName[selectedTicker];

        // Step 4: Fetch signed data from API
        if (stockAssetName !== undefined) {
          const signedData = await refetchStockSignedData({
            underlying: selectedTicker,
            hedgeDuration: Number(hedgeValidity),
          });

          if (signedData) {
            // Step 5: Call depositTokens with signed data
            handleStockDepositTokens({
              user: address,
              assetName: stockAssetName,
              depositingAmount,
              hedgeValidity,
              verifyParams: {
                ethPrice: BigInt(signedData.ethPrice),
                strikePrice: BigInt(signedData.strikePrice),
                optionFees: BigInt(signedData.optionFees),
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Dropdowns */}
            <div className="flex items-center space-x-6">
              {/* UETH Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsTickerDropdownOpen(!isTickerDropdownOpen)}
                  className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-[8px]  dark:hover:bg-black/20"
                >
                  {(() => {
                    const logoUrl = getTickerLogo(selectedTicker);
                    return logoUrl ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 p-1 flex items-center justify-center">
                        <Image
                          src={logoUrl}
                          alt={`${selectedTicker} logo`}
                          width={24}
                          height={24}
                          className="object-contain"
                          unoptimized // For SVG files
                        />
                      </div>
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-blue-500"
                        style={{
                          backgroundColor: "#3b82f6",
                        }}
                      >
                        {selectedTicker.charAt(0)}
                      </div>
                    );
                  })()}
                  <span className="text-lg text-textBlack dark:text-white font-medium font-plex-grotesk">
                    {selectedTicker}
                  </span>

                  <ChevronDown
                    className={`w-6 h-6 text-grayLight transition-transform ${isTickerDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Ticker Dropdown Menu */}
                {isTickerDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-black border border-grayLight rounded-lg shadow-lg z-50">
                    {tickers.map((t) => {
                      const logoUrl = getTickerLogo(t);
                      return (
                        <button
                          key={t}
                          onClick={() => {
                            setSelectedTicker(t);
                            setIsTickerDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                        >
                          {logoUrl ? (
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 p-0.5 flex items-center justify-center">
                              <Image
                                src={logoUrl}
                                alt={`${t} logo`}
                                width={18}
                                height={18}
                                className="object-contain"
                                unoptimized // For SVG files
                              />
                            </div>
                          ) : (
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs bg-blue-500"
                              style={{
                                backgroundColor: "#3b82f6",
                              }}
                            >
                              {t.charAt(0)}
                            </div>
                          )}
                          <span>{t}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Covered Call Dropdown */}
              <div className="relative border-l border-grayLight pl-2">
                <button
                  onClick={() => setIsActionDropdownOpen(!isActionDropdownOpen)}
                  className="flex items-center space-x-2 cursor-pointer  pl-6 px-3 py-2 rounded-[8px] hover:bg-white/20 dark:hover:bg-black/20"
                >
                  <span className="text-lg text-textBlack dark:text-white font-plex-grotesk">
                    {selectedAction}
                  </span>

                  <ChevronDown
                    className={`w-6 h-6 text-grayLight transition-transform ${isActionDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Action Dropdown Menu */}
                {isActionDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-black border border-grayLight rounded-lg shadow-lg z-50">
                    {actions.map((a) => (
                      <button
                        key={a}
                        onClick={() => {
                          setSelectedAction(a);
                          setIsActionDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left transition-colors ${
                          selectedAction === a
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
              <div className="relative border-l border-grayLight pl-2">
                <button
                  onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                  className="flex items-center space-x-2 cursor-pointer  pl-6 px-3 py-2 rounded-[8px] hover:bg-white/20 dark:hover:bg-black/20"
                >
                  <span className="text-lg text-textBlack dark:text-white font-plex-grotesk">
                    {selectedDate}
                  </span>

                  <ChevronDown
                    className={`w-6 h-6 text-grayLight transition-transform ${isDateDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Date Dropdown Menu */}
                {isDateDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-black border border-grayLight rounded-lg shadow-lg z-50">
                    {dates.map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDate(d);
                          setIsDateDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Price and Cap */}
            <div className="flex items-center space-x-6 border-l border-r border-grayLight px-6">
              {/* Price */}
              <div className="flex items-center space-x-2">
                {priceLoading ? (
                  <Spinner size={20} color="gray" />
                ) : (
                  <span className="text-xl text-textBlack dark:text-white font-bold font-plex-grotesk">
                    {spotPrice ? `$${spotPrice.toFixed(2)}` : "$2,356.76"}
                  </span>
                )}
              </div>

              {/* Cap Progress */}
              {/* <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      className="stroke-grayLight"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      className="stroke-[#ABFFDE]"
                      strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 10 * 0.36} ${2 * Math.PI * 10}`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-textBlack dark:text-white">
                    36%
                  </span>
                </div>
                <span className="text-sm text-grayLight font-plex-grotesk">
                  of cap
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-[75%] mx-auto">
        <div className="flex-1 flex items-center justify-center mt-8 px-4">
          <div className="text-center">
            {/* Heading */}
            <div className="mb-14 px-8 py-6">
              <p className="text-xl text-grayLight dark:text-gray-400 font-plex-grotesk  mx-auto">
                Choose the price at which you are happy to sell {ticker} on May
                29th, 2026 (23 days)
              </p>
            </div>

            {/* Price List */}
            <div className="flex justify-center items-center space-x-8 flex-wrap">
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
                  <div key={item.strike} className="relative group mb-8">
                    {/* APR Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
                      <div
                        className={`bg-gradient-to-r ${item.color} text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-sm`}
                      >
                        APR {item.apr}
                      </div>
                    </div>

                    {/* Price Card */}
                    <button
                      onClick={() => handlePriceSelection(item)}
                      className={`relative px-6 py-2 rounded-xl border-2 transition-all duration-300 group hover:scale-105 backdrop-blur-sm ${
                        selectedPrice?.price === item.price
                          ? "border-blue-500 shadow-lg ring-2 ring-blue-200 dark:ring-blue-400"
                          : "border-gray-200 dark:border-gray-700 hover:shadow-xl"
                      } ${item.bg}`}
                    >
                      {/* Glow Effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                      />

                      {/* Price */}
                      <span className="relative text-lg font-bold text-textBlack dark:text-white font-plex-grotesk">
                        {item.price}
                      </span>

                      {/* Decorative Elements */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                      {/* Bottom Accent Line */}
                      <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${item.color} transition-all duration-300 group-hover:w-3/4`}
                      />
                    </button>
                  </div>
                ))
              )}
            </div>

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

                  {/* Plus/Minus Stack */}
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

                {/* Input */}
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      isBuyMode
                        ? "Enter contract amount here"
                        : getSelectedPriceData()
                          ? `Enter amount for ${getSelectedPriceData()?.price || "$0.00"} strike`
                          : "amount to deposit"
                    }
                    className={`w-full px-4 py-3 bg-transparent text-textBlack dark:text-white font-plex-grotesk focus:outline-none focus:border-none transition-all duration-200 ${
                      isBuyMode ? "pr-4" : "pr-16"
                    }`}
                  />
                  {/* Asset icon — sell only */}
                  {!isBuyMode && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      {(() => {
                        const solLogoUrl = getTickerLogo("SOL");
                        return solLogoUrl ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 p-1 flex items-center justify-center">
                            <Image
                              src={solLogoUrl}
                              alt="SOL logo"
                              width={24}
                              height={24}
                              className="object-contain"
                              unoptimized // For SVG files
                            />
                          </div>
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{
                              backgroundColor: "#9945ff", // Solana brand color
                            }}
                          >
                            S
                          </div>
                        );
                      })()}
                      <span className="text-sm font-medium text-textBlack dark:text-white font-plex-grotesk">
                        SOL
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {!isBuyMode && (
                <div className="text-xs text-grayLight dark:text-gray-400 text-left mt-2">
                  Available: 1.000 SOL
                </div>
              )}

              {getSelectedPriceData() && (
                <div className="mt-4 overflow-hidden border border-grayLight dark:border-grayLight rounded-[12px]">
                  <div className="text-lg  bg-[#abffde] overflow-hidden  text-black border-b border-grayLight dark:border-grayLight font-medium text-center p-4 ">
                    NOW
                  </div>
                  <div className="p-4 py-8">
                    {isBuyMode ? (
                      <div className="text-left text-4xl font-bold text-black dark:text-white">
                        $5.13{" "}
                        <span className="text-base text-grayLight dark:text-gray-400 font-normal">
                          upfront Premium
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="text-left text-4xl font-bold text-black dark:text-white">
                          {bidsLoading
                            ? "Loading..."
                            : getSelectedPriceData()?.apr || "0%"}{" "}
                          <span className="text-base text-grayLight dark:text-gray-400">
                            APR
                          </span>
                        </div>
                        <div className="text-sm text-left text-grayLight dark:text-gray-400">
                          {bidsLoading
                            ? "Loading..."
                            : `${getSelectedPriceData()?.premium?.toFixed(2) || "0.00"} USDC upfront`}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-lg text-black border border-grayLight dark:border-grayLight dark:text-white font-medium text-center p-4 ">
                    On {selectedDate || "Loading..."}
                  </div>

                  <div className="p-4 py-8 flex ">
                    <div className="w-1/2 border-r border-grayLight dark:border-grayLight ">
                      <p className="text-sm text-left text-grayLight dark:text-gray-400">
                        If {ticker} BELOW $
                        {getSelectedPriceData()?.price || "$0.00"}
                      </p>
                      <div className="mt-4 flex items-center space-x-2">
                        {(() => {
                          const logoUrl = getTickerLogo(ticker);
                          return logoUrl ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 p-1 flex items-center justify-center">
                              <Image
                                src={logoUrl}
                                alt={`${ticker} logo`}
                                width={24}
                                height={24}
                                className="object-contain"
                                unoptimized // For SVG files
                              />
                            </div>
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-blue-500"
                              style={{
                                backgroundColor: "#3b82f6",
                              }}
                            >
                              {ticker.charAt(0)}
                            </div>
                          );
                        })()}
                        <div className="text-lg font-medium dark:text-green-500 text-green-600">
                          Get 0.5 {ticker} back
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col items-end justify-center">
                      <p className="text-sm text-left text-grayLight dark:text-gray-400">
                        If {ticker} ABOVE $
                        {getSelectedPriceData()?.price || "$0.00"}
                      </p>
                      <div className="mt-4 flex items-center space-x-2">
                        <div className="text-lg  font-medium dark:text-green-500 text-green-600">
                          Receive{" "}
                          {(
                            (getSelectedPriceData()?.strike || 0) * 0.5
                          ).toFixed(2)}{" "}
                          USDT0
                        </div>
                        {(() => {
                          const logoUrl = getTickerLogo(ticker);
                          return logoUrl ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 p-1 flex items-center justify-center">
                              <Image
                                src={logoUrl}
                                alt={`${ticker} logo`}
                                width={24}
                                height={24}
                                className="object-contain"
                                unoptimized // For SVG files
                              />
                            </div>
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-blue-500"
                              style={{
                                backgroundColor: "#3b82f6",
                              }}
                            >
                              {ticker.charAt(0)}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="m-8 flex justify-center">
                <Button
                  type="submit"
                  onClick={handleDeposit}
                  disabled={
                    isDepositing ||
                    isPendingStockUsdcApprove ||
                    stockDepositIsPending
                  }
                  className={`
                bg-black dark:bg-custom-gradient-to-top py-6
                text-white  font-semibold text-[24px] w-1/2 h-full rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isDepositing ||
                  isPendingStockUsdcApprove ||
                  stockDepositIsPending
                    ? "Processing..."
                    : isBuyMode
                      ? "Buy Contract"
                      : "Earn upfront premium now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoveredCallTemplate;
