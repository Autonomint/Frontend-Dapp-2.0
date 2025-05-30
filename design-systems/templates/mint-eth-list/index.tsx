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
  const { chainId } = useAccount();
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
  console.log(isFunctionPausedBorrow_Deposit, "isFunctionPausedBorrow_Deposit");



  const { tokenRewardDetailList } = useGetTokenReward();

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
        tokenRewardDetailList &&
        tokenRewardDetailList?.["ETH"]?.pointsToBeGiven,
      minAmount:
        tokenRewardDetailList && tokenRewardDetailList?.["ETH"]?.minAmount,
      link: STRATEGY_LINK,
      boaster:
        tokenRewardDetailList && tokenRewardDetailList?.["ETH"]?.defaultBooster,
      boasterTime:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["ETH"]?.boosterValidity,
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
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WrsETH"]?.pointsToBeGiven,
      minAmount:
        tokenRewardDetailList && tokenRewardDetailList?.["WrsETH"]?.minAmount,
      link: STRATEGY_LINK,
      boaster:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WrsETH"]?.defaultBooster,
      boasterTime:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WrsETH"]?.boosterValidity,
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
        tokenRewardDetailList && tokenRewardDetailList?.["WeETH"]?.minAmount,
      link: STRATEGY_LINK,
      boaster:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WeETH"]?.defaultBooster,
      boasterTime:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WeETH"]?.boosterValidity,
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
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WSuperOethB"]?.pointsToBeGiven,
      minAmount:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WSuperOethB"]?.minAmount,
      link: STRATEGY_LINK,
      boaster:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WSuperOethB"]?.defaultBooster,
      boasterTime:
        tokenRewardDetailList &&
        tokenRewardDetailList?.["WSuperOethB"]?.boosterValidity,
    });
  }

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
