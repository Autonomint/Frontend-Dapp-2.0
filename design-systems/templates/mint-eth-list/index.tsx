"use client";

import SingleListItem from "@/design-systems/organisms/mint-eth-list/SingleListItem";
import CoveredCallsNavbar from "@/design-systems/organisms/CoveredCallsNavbar";
import useGetSpotPrice from "@/hookes/api-hooks/useGetSpotPrice";
import { motion } from "framer-motion";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import { useMemo } from "react";
import { coveredCallAssets } from "@/utils/token-config";

function MintEthListTemplate({ action = "sell" }: { action?: string }) {
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
    isLoadingNVDA,
    isLoadingTSLA,
    isLoadingSMR,
    isLoadingPLTR,
    isLoadingCOIN,
    isLoadingMSTR,
    isLoadingAAPL,
  ]);

  return (
    <div className="min-h-[86vh] xl:h-auto">
      <div className="p-8 py-12 flex ">
        <div className="text-[62px]  font-medium w-[40%] leading-[72px]">
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
        <div className="flex flex-1 justify-end items-end">
          <div className="text-sm uppercase text-right w-[30%] leading-md">
            Markets open · <span className="text-grayLight">NYSE</span> 7{" "}
            <span className="text-grayLight">live tickers</span> · $200K{" "}
            <span className="text-grayLight">OPEN</span> Option chain pricing
            via Pyth & CBOE through Alpaca APIs
          </div>
        </div>
      </div>
      <CoveredCallsNavbar activeBack={false} action={action} />
      <div className="md:relative">
        <motion.div className="flex flex-col ">
          {formattedaBorrowAssetList.map((item, index) => (
            <SingleListItem key={index} item={item} action={action} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default WithPrivateRoute(MintEthListTemplate);
