"use client";

import SingleListItem from "@/design-systems/organisms/mint-eth-list/SingleListItem";
import CoveredCallsNavbar from "@/design-systems/organisms/CoveredCallsNavbar";
import useGetSpotPrice from "@/hookes/api-hooks/useGetSpotPrice";
import { motion } from "framer-motion";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import { useMemo, useState } from "react";
import { coveredCallAssets } from "@/utils/token-config";

function MintEthListTemplate({ action = "sell" }: { action?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  // Custom hooks to fetch real-time spot prices for covered call assets
  const { price: spotPriceNVDA, isLoading: isLoadingNVDA } =
    useGetSpotPrice("NVDA");
  const { price: spotPriceTSLA, isLoading: isLoadingTSLA } =
    useGetSpotPrice("TSLA");
  const { price: spotPriceSMR, isLoading: isLoadingSMR } =
    useGetSpotPrice("SMR");
  const { price: spotPricePLTR, isLoading: isLoadingPLTR } =
    useGetSpotPrice("PLTR");
  const { price: spotPriceCOIN, isLoading: isLoadingCOIN } =
    useGetSpotPrice("COIN");
  const { price: spotPriceMSTR, isLoading: isLoadingMSTR } =
    useGetSpotPrice("MSTR");
  const { price: spotPriceAAPL, isLoading: isLoadingAAPL } =
    useGetSpotPrice("AAPL");
  const { price: spotPriceLAB, isLoading: isLoadingLAB } =
    useGetSpotPrice("LAB");
  // Custom hooks to fetch real-time spot prices for newly added assets (ETH, BTC, LIT)
  const { price: spotPriceETH, isLoading: isLoadingETH } =
    useGetSpotPrice("ETH", true, activeTab === 2 ? "put" : "call");
  const { price: spotPriceBTC, isLoading: isLoadingBTC } =
    useGetSpotPrice("BTC", true, activeTab === 2 ? "put" : "call");
  const { price: spotPriceLIT, isLoading: isLoadingLIT } =
    useGetSpotPrice("LIT", true, "call");

  // List of covered call assets
  const list = coveredCallAssets.map((asset) => ({
    ...asset,
    isActive: true,
  }));

  const formattedaBorrowAssetList = useMemo(() => {
    return list.map((asset: any) => {
      let realTimePrice: number | null | undefined = undefined;
      let isLoading = false;

      // Get real-time price based on ticker
      switch (asset.ticker) {
        case "NVDA":
          realTimePrice = spotPriceNVDA;
          isLoading = isLoadingNVDA;
          break;
        case "TSLA":
          realTimePrice = spotPriceTSLA;
          isLoading = isLoadingTSLA;
          break;
        case "SMR":
          realTimePrice = spotPriceSMR;
          isLoading = isLoadingSMR;
          break;
        case "PLTR":
          realTimePrice = spotPricePLTR;
          isLoading = isLoadingPLTR;
          break;
        case "COIN":
          realTimePrice = spotPriceCOIN;
          isLoading = isLoadingCOIN;
          break;
        case "MSTR":
          realTimePrice = spotPriceMSTR;
          isLoading = isLoadingMSTR;
          break;
        case "AAPL":
          realTimePrice = spotPriceAAPL;
          isLoading = isLoadingAAPL;
          break;
        case "LAB":
          realTimePrice = spotPriceLAB;
          isLoading = isLoadingLAB;
          break;
        case "ETH":
          realTimePrice = spotPriceETH;
          isLoading = isLoadingETH;
          break;
        case "BTC":
          realTimePrice = spotPriceBTC;
          isLoading = isLoadingBTC;
          break;
        case "LIT":
          realTimePrice = spotPriceLIT;
          isLoading = isLoadingLIT;
          break;
        default:
          break;
      }

      return {
        ...asset,
        spotPrice: isLoading
          ? "Loading..."
          : typeof realTimePrice === "number" && realTimePrice >= 0
            ? `${realTimePrice.toFixed(2)}`
            : asset?.spotPrice || "0.00", // Fallback to static price or default
      };
    });
  }, [
    list,
    spotPriceNVDA,
    spotPriceTSLA,
    spotPriceSMR,
    spotPricePLTR,
    spotPriceCOIN,
    spotPriceMSTR,
    spotPriceAAPL,
    spotPriceLAB,
    spotPriceETH,
    spotPriceBTC,
    spotPriceLIT,
    isLoadingNVDA,
    isLoadingTSLA,
    isLoadingSMR,
    isLoadingPLTR,
    isLoadingCOIN,
    isLoadingMSTR,
    isLoadingAAPL,
    isLoadingLAB,
    isLoadingETH,
    isLoadingBTC,
    isLoadingLIT,
  ]);

  // Dynamically filter the rendered list items based on active tab and asset capabilities (hasCall/hasPut)
  const itemsToRender = useMemo(() => {
    return formattedaBorrowAssetList.filter((asset) => {
      if (activeTab === 0) return true; // All
      if (activeTab === 1) return asset.hasCall; // Calls
      if (activeTab === 2) return asset.hasPut; // Puts
      return true;
    });
  }, [formattedaBorrowAssetList, activeTab]);

  return (
    <div className="min-h-[86vh] xl:h-auto">
      <div className="px-4 sm:px-6 md:px-8 py-6 md:py-12 flex flex-col md:flex-row md:items-center">
        <div className="text-[44px] sm:text-[52px] md:text-[48px] lg:text-[56px] xl:text-[62px] font-medium w-full md:w-[55%] lg:w-[48%] xl:w-[42%] leading-[1.1] md:leading-[72px] mb-4 md:mb-0">
          {action === "buy" ? (
            <>
              Buy options{" "}
              <span className="text-[#abffde] italic">at a discount.</span>
            </>
          ) : (
            <>
              Sell options on the stocks{" "}
              <span className="text-[#abffde] italic">moving markets.</span>
            </>
          )}
        </div>
        <div className="flex flex-1 justify-start md:justify-end items-start md:items-end">
          <div className="text-xs sm:text-sm uppercase text-left md:text-right w-full md:w-[45%] lg:w-[35%] leading-relaxed">
            Markets open · <span className="text-grayLight">NYSE</span> 11{" "}
            <span className="text-grayLight">live tickers</span> · $200K{" "}
            <span className="text-grayLight">OPEN</span> Option chain pricing
            via Pyth & CBOE through Alpaca APIs
          </div>
        </div>
      </div>
      <CoveredCallsNavbar activeBack={false} action={action} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="md:relative">
        <motion.div className="flex flex-col">
          {itemsToRender.map((item, index) => (
            <SingleListItem key={`${item.ticker}-${index}`} item={item} action={action} activeTab={activeTab} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default WithPrivateRoute(MintEthListTemplate);