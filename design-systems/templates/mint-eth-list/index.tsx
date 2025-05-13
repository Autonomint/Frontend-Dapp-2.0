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
import useCheckWalletConnection from "@/hookes/useCheckWalletConnection";
import WithPrivateRoute from "@/design-systems/molecule/PrivateRouteWrapper";
import { useAccount, useReadContract } from "wagmi";
import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import { usePoint } from "@/hookes/api-hooks/usePoint";
import { STRATEGY_LINK } from "@/utils/urls";
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
    functionName: "APR",
  });

  // Custom hook to check the pause state of borrow functions
  const { isFunctionPausedBorrow_Deposit } = useBorrowPause();

  const { ethPoints, isLoading, error } = usePoint();

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
      pointsToBeGiven: ethPoints?.pointsToBeGiven,
      minAmount: ethPoints?.minAmount,
      link: STRATEGY_LINK,
    },
    {
      token: "wrsETH",
      tokenImage: WrsETH,
      BorrowRate: `${Number(currentAPR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wrsETH borrow is paused now",
      pointsToBeGiven: ethPoints?.pointsToBeGiven,
      minAmount: ethPoints?.minAmount,
      link: STRATEGY_LINK,
    },
    {
      token: "weETH",
      tokenImage: WeETH,
      BorrowRate: `${Number(currentAPR || 0) / 10}%`,
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
      isActive: !isFunctionPausedBorrow_Deposit,
      InActiveHeading: "wrsETH borrow is paused now",
      pointsToBeGiven: ethPoints?.pointsToBeGiven,
      minAmount: ethPoints?.minAmount,
      link: STRATEGY_LINK,
    },
  ];

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
            <SingleListItem key={index} item={item} indexVal={index} />
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
