"use client";

import AppNavbar from "@/design-systems/organisms/AppNavbar";
import SingleListItem from "@/design-systems/organisms/mint-eth-list/SingleListItem";
import useGetTvl from "@/hookes/contract-hooks/useGetLtv";
import useDeviceType from "@/hookes/useDeviceType";
import { motion } from "framer-motion";
import Link from "next/link";
import cryptoEth from "@/app/assets/eth.png";
import WeETH from "@/app/assets/weETH-icoon.webp";
import WrsETH from "@/app/assets/WrsETH-icon.png";
import WsuperOETH from "@/app/assets/Wrapped_Super_OETH.webp";
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import { useAccount, useReadContract } from "wagmi";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import { STRATEGY_LINK } from "@/utils/urls";
import { NetworkId } from "@/utils/constants";
import { useGetTokenReward } from "@/hookes/api-hooks/useGetTokenReward";
import { useFarmLuckDetails } from "@/hookes/api-hooks/useFarmyourLuckDetails";
import { calculateRemainingTimeDate } from "@/utils/helpers";
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
  const { isTvlPending, tvlValue: ltv } = useGetTvl();

  // Calculate the downside protection amount
  const downsideProtection = ltv ? 100 - Number(ltv || 0) : 0;

  // getting current APR value
  const { data: currentAPR } = useReadContract({
    abi: borrowingContractAbi,
    address:
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ],
    functionName: "getAPR",
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
      : calculateRemainingTimeDate(farmLuckDetails?.deadLine10xTimestamp || "")
          .minutes > 0
      ? 10
      : 0;

  // List of tokens with their respective data
  const list = [
    {
      token: "ETH",
      tokenImage: cryptoEth,
      BorrowRate: `${Number(currentAPR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
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
      token: "wrsETH",
      tokenImage: WrsETH,
      BorrowRate: `${Number(currentAPR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wrsETH borrow is paused now",
      pointsToBeGiven:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WrsETH"]?.pointsToBeGiven) ||
        0,
      minAmount:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WrsETH"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WrsETH"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["WrsETH"]?.assetBoosterValidity || 0,
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
      BorrowRate: `${Number(currentAPR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wrsETH borrow is paused now",
      pointsToBeGiven:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WeETH"]?.pointsToBeGiven,
      minAmount:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WeETH"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WeETH"]?.assetBooster + luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["WeETH"]?.assetBoosterValidity || 0,
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

  if (chainId == NetworkId.BaseSepolia) {
    list.push({
      token: "wsuperOETHb",
      tokenImage: WsuperOETH,
      BorrowRate: `${Number(currentAPR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wsuperOETHb borrow is paused now",
      pointsToBeGiven:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WSuperOethB"]?.pointsToBeGiven) ||
        0,
      minAmount:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WSuperOethB"]?.minAmount) ||
        0,
      link: STRATEGY_LINK,
      boaster:
        (tokenRewardDetailList &&
          tokenRewardDetailList?.["WSuperOethB"]?.assetBooster +
            luckBoaster) ||
        0,
      boasterTime:
        tokenRewardDetailList &&
        Math.max(
          tokenRewardDetailList?.["WSuperOethB"]?.assetBoosterValidity || 0,
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

  console.log(list, "list");

  // Custom hook to detect device type
  const deviceType = useDeviceType();

  // Show back button for mobile and tablet devices
  const showBack = deviceType === "mobile" || deviceType === "tablet";

  return (
    <div className="min-h-[86vh] xl:h-auto">
      <AppNavbar activeBack={showBack} />
      <div className="md:relative">
        <motion.div className="flex flex-col lg:max-w-[93%]">
          {list.map((item, index) => (
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
