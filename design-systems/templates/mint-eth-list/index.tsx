"use client";

import AppNavbar from "@/design-systems/organisms/AppNavbar";
import SingleListItem from "@/design-systems/organisms/mint-eth-list/SingleListItem";
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
  console.log(ltvWsuperOETH, "downsideProtectionWsuperOETH");
  // getting current APR value
  const { data: currentAPR } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    args: [BorrowData.APR],
    functionName: "getBorrowData",
  });

  // Custom hook to check the pause state of borrow functions
  const { isFunctionPausedBorrow_Deposit } = useBorrowPause();
  console.log(isFunctionPausedBorrow_Deposit, "isFunctionPausedBorrow_Deposit");

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
      : calculateRemainingTimeDate(farmLuckDetails?.deadLine10xTimestamp || "")
          .minutes > 0
      ? 10
      : 0;

  // List of tokens with their respective data
  const list = [
    {
      token: "ETH",
      tokenImage: cryptoEth,
      BorrowRate: `${Number(ltvETH?.APR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtectionEth}%`,
      ltv: `${ltvETH?.LTV || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "ETH borrow is paused now",
      pointsToBeGiven:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["ETH"]?.pointsToBeGiven) ||
        0,
      minAmount:
        (tokenRewardDetailList && tokenRewardDetailList?.["ETH"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["ETH"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["ETH"]?.assetBoosterValidity || 0,
          farmLuckDetails?.deadLine5xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine5xTimestamp).getTime() / 1000
            : 0,
          farmLuckDetails?.deadLine10xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine10xTimestamp).getTime() / 1000
            : 0
        ),
    },

    {
      token: "weETH",
      tokenImage: WeETH,
      BorrowRate: `${Number(ltvWeETH?.APR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtectionWeETH}%`,
      ltv: `${ltvWeETH?.LTV || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wrsETH borrow is paused now",
      pointsToBeGiven:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["weETH"]?.pointsToBeGiven,
      minAmount:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["weETH"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["weETH"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["weETH"]?.assetBoosterValidity || 0,
          farmLuckDetails?.deadLine5xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine5xTimestamp).getTime() / 1000
            : 0,
          farmLuckDetails?.deadLine10xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine10xTimestamp).getTime() / 1000
            : 0
        ),
    },
  ];

  if (chainId !== NetworkId.Ethereum) {
    list.push({
      token: "wrsETH",
      tokenImage: WrsETH,
      BorrowRate: `${Number(ltvWrsETH?.APR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtectionWrsETH}%`,
      ltv: `${ltvWrsETH?.LTV || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wrsETH borrow is paused now",
      pointsToBeGiven:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["wrsETH"]?.pointsToBeGiven) ||
        0,
      minAmount:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["wrsETH"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["wrsETH"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["wrsETH"]?.assetBoosterValidity || 0,
          farmLuckDetails?.deadLine5xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine5xTimestamp).getTime() / 1000
            : 0,
          farmLuckDetails?.deadLine10xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine10xTimestamp).getTime() / 1000
            : 0
        ),
    });
  }

  if (chainId == NetworkId.BaseSepolia) {
    list.push({
      token: "cbBTC",
      tokenImage: cbBTC,
      BorrowRate: `${Number(ltvCbBTC?.APR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtectionCbBTC}%`,
      ltv: `${ltvCbBTC?.LTV || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "cbBTC borrow is paused now",
      pointsToBeGiven:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["cbBTC"]?.pointsToBeGiven) ||
        0,
      minAmount:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["cbBTC"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["cbBTC"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["cbBTC"]?.assetBoosterValidity || 0,
          farmLuckDetails?.deadLine5xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine5xTimestamp).getTime() / 1000
            : 0,
          farmLuckDetails?.deadLine10xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine10xTimestamp).getTime() / 1000
            : 0
        ),
    });
    list.push({
      token: "wsuperOETHb",
      tokenImage: WsuperOETH,
      BorrowRate: `${Number(ltvWsuperOETH?.APR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtectionWsuperOETH}%`,
      ltv: `${ltvWsuperOETH?.LTV || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wsuperOETHb borrow is paused now",
      pointsToBeGiven:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["wsuperOETHb"]?.pointsToBeGiven) ||
        0,
      minAmount:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["wsuperOETHb"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["wsuperOETHb"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["wsuperOETHb"]?.assetBoosterValidity || 0,
          farmLuckDetails?.deadLine5xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine5xTimestamp).getTime() / 1000
            : 0,
          farmLuckDetails?.deadLine10xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine10xTimestamp).getTime() / 1000
            : 0
        ),
    });

    list.push({
      token: "KRWQ",
      tokenImage: KRWQ,
      BorrowRate: `${Number(ltvKRWQ?.APR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtectionKRWQ}%`,
      ltv: `${ltvKRWQ?.LTV || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "KRWQ borrow is paused now",
      pointsToBeGiven:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["krwq"]?.pointsToBeGiven) ||
        0,
      minAmount:
        (tokenRewardDetailList && tokenRewardDetailList?.["krwq"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["krwq"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["krwq"]?.assetBoosterValidity || 0,
          farmLuckDetails?.deadLine5xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine5xTimestamp).getTime() / 1000
            : 0,
          farmLuckDetails?.deadLine10xTimestamp
            ? // convert date to timestamp
              new Date(farmLuckDetails.deadLine10xTimestamp).getTime() / 1000
            : 0
        ),
    });
  }

  const formattedaBorrowAssetList = useMemo(() => {
    if (list.length === 0) return [];
    const formattedList = [];
    if (list[0]) formattedList.push(list[0]);
    if (list[3]) formattedList.push(list[3]);
    if (list[5]) formattedList.push(list[5]);
    if (list[1]) formattedList.push(list[1]);
    if (list[2]) formattedList.push(list[2]);
    if (list[4]) formattedList.push(list[4]);
    return formattedList;
  }, [list]);

  // Custom hook to detect device type
  const deviceType = useDeviceType();

  // Show back button for mobile and tablet devices
  const showBack = deviceType === "mobile" || deviceType === "tablet";

  return (
    <div className="min-h-[86vh] xl:h-auto">
      <AppNavbar activeBack={showBack} />
      <div className="md:relative">
        <motion.div className="flex flex-col lg:max-w-[93%]">
          {formattedaBorrowAssetList.map((item, index) => (
            <SingleListItem key={index} item={item} />
          ))}
        </motion.div>
        <Link prefetch={true} href="/farmyourluck" className="">
          <motion.div
            className="absolute dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] right-0 top-0  h-full lg:max-w-[7%] border-x-0 border-y-0 border-b border-grayLight border-[1px]  hidden lg:flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={farmTextVariants}
          >
            <div className="transform rotate-90  text-textBlack text-[42px] font-medium min-w-[600px] flex justify-center dark:text-white">
              Farm Your Luck
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default WithPrivateRoute(MintEthListTemplate);
