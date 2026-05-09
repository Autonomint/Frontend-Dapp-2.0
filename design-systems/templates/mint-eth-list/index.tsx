"use client";

import AppNavbar from "@/design-systems/organisms/AppNavbar";
import SingleListItem from "@/design-systems/organisms/mint-eth-list/SingleListItem";
import CoveredCallsNavbar from "@/design-systems/organisms/CoveredCallsNavbar";
import useGetTvl from "@/hookes/contract-hooks/useGetLtv";
import useDeviceType from "@/hookes/useDeviceType";
import { motion } from "framer-motion";
import Link from "next/link";
import cryptoEth from "@/app/assets/eth.png";
import cbBTC from "@/app/assets/cbbtc.webp";
import WeETH from "@/app/assets/weETH-icoon.webp";
import KRWQ from "@/app/assets/krwq-logo.svg";
import WrsETH from "@/app/assets/WrsETH-icon.png";
import WsuperOETH from "@/app/assets/Wrapped_Super_OETH.webp";
import EURC from "@/app/assets/euro-coin-2.png";
import HYPELogo from "@/app/assets/hyperliquid-logo.png";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import { useAccount, useReadContract } from "wagmi";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import { STRATEGY_LINK } from "@/utils/urls";
import { AssetName, BorrowData, NetworkId } from "@/utils/constants";
import { useGetTokenReward } from "@/hookes/api-hooks/useGetTokenReward";
import { useFarmLuckDetails } from "@/hookes/api-hooks/useFarmyourLuckDetails";
import { calculateRemainingTimeDate } from "@/utils/helpers";
import { useMemo } from "react";
import { StaticImageData } from "next/image";
import { coveredCallAssets } from "@/utils/token-config";

interface TokenListItem {
  ticker: string;
  name: string;
  type: string;
  maxApr: number;
  minApr: number;
  multipliers: string[];
  isActive: boolean;
}
// Farm text animation variants
const farmTextVariants = {
  hidden: { opacity: 0, y: 100, x: -100, rotate: -90 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0, //
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function MintEthListTemplate() {
  const { chainId, address } = useAccount();
  // Custom hook to fetch the LTV value
  const { tvlValue: ltvETH } = useGetTvl(AssetName.ETH);
  const { tvlValue: ltvWeETH } = useGetTvl(AssetName.WeETH);
  const { tvlValue: ltvWrsETH } = useGetTvl(AssetName.WrsETH);
  const { tvlValue: ltvCbBTC } = useGetTvl(AssetName.cbBTC);
  const { tvlValue: ltvWsuperOETH } = useGetTvl(AssetName.WSUPER_OETH);
  const { tvlValue: ltvKRWQ } = useGetTvl(AssetName.KRWQ);
  const { tvlValue: ltvEURC } = useGetTvl(AssetName.EURC);
  const { tvlValue: ltvHYPE } = useGetTvl(AssetName.HYPE);

  // Calculate the downside protection amount
  const downsideProtectionEth = ltvETH?.LTV
    ? 100 - Number(ltvETH?.LTV || 0)
    : 0;
  const downsideProtectionWeETH = ltvWeETH?.LTV
    ? 100 - Number(ltvETH?.LTV || 0)
    : 0;
  const downsideProtectionWrsETH = ltvWrsETH?.LTV
    ? 100 - Number(ltvETH?.LTV || 0)
    : 0;
  const downsideProtectionCbBTC = ltvCbBTC?.LTV
    ? 100 - Number(ltvETH?.LTV || 0)
    : 0;
  const downsideProtectionWsuperOETH = ltvWsuperOETH?.LTV
    ? 100 - Number(ltvETH?.LTV || 0)
    : 0;
  const downsideProtectionKRWQ = ltvKRWQ?.LTV
    ? 100 - Number(ltvETH?.LTV || 0)
    : 0;
  const downsideProtectionEURC = ltvEURC?.LTV
    ? 100 - Number(ltvETH?.LTV || 0)
    : 0;
  const downsideProtectionHYPE = ltvHYPE?.LTV
    ? 100 - Number(ltvHYPE?.LTV || 0)
    : 0;

  // getting current APR value
  const { data: borrowData } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    args: [BorrowData.ratePerSec],
    functionName: "getBorrowData",
  });

  // Custom hook to check the pause state of borrow functions
  const { isFunctionPausedBorrow_Deposit } = useBorrowPause();

  // hook for getting the farm your luck data (current reward data) from the backend api
  const {
    data: farmLuckDetails,
    isLoading: isFarmLuckLoading,
    refetch: refetchFarmLuckDetails,
  } = useFarmLuckDetails(address, chainId);

  const { tokenRewardDetailList } = useGetTokenReward();

  // boaster from farm your luck
  const luckBoaster =
    calculateRemainingTimeDate(farmLuckDetails?.deadLine5xTimestamp || "")
      .minutes > 0 &&
    calculateRemainingTimeDate(farmLuckDetails?.deadLine10xTimestamp || "")
      .minutes > 0
      ? 10
      : calculateRemainingTimeDate(farmLuckDetails?.deadLine5xTimestamp || "")
            .minutes > 0
        ? 5
        : calculateRemainingTimeDate(
              farmLuckDetails?.deadLine10xTimestamp || "",
            ).minutes > 0
          ? 10
          : 0;

  // List of covered call assets
  const list: TokenListItem[] = coveredCallAssets.map((asset) => ({
    ...asset,
    isActive: true, // All covered call assets are active
  }));

  const formattedaBorrowAssetList = useMemo(() => {
    return list;
  }, [list]);

  // Custom hook to detect device type
  const deviceType = useDeviceType();

  // Show back button for mobile and tablet devices
  const showBack = deviceType === "mobile" || deviceType === "tablet";

  return (
    <div className="min-h-[86vh] xl:h-auto">
      <div className="p-8 py-12 flex ">
        <div className="text-[62px]  font-medium w-[40%] leading-[72px]">
          Sell options on the stocks{" "}
          <span className="text-[#abffde] italic">moving markets.</span>
        </div>
        <div className="flex flex-1 justify-end items-end">
          <div className="text-sm uppercase text-right w-[30%] leading-md">
            Markets open · <span className="text-grayLight">NYSE</span> 10{" "}
            <span className="text-grayLight">live tickers</span> · $847K{" "}
            <span className="text-grayLight">open interest</span> Spot prices
            via Pyth & Chainlink
          </div>
        </div>
      </div>
      {/* <AppNavbar activeBack={showBack} /> */}
      <CoveredCallsNavbar activeBack={false} />
      <div className="md:relative">
        <motion.div className="flex flex-col ">
          {formattedaBorrowAssetList.map((item, index) => (
            <SingleListItem key={index} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default WithPrivateRoute(MintEthListTemplate);
