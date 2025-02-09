"use client";

import Image from "next/image";
import React from "react";
import cryptoEth from "../assets/eth.png";
import { Button } from "@/components/ui/button";
import arrow from "../assets/arrow-right-02.png";
import { useRouter, useSearchParams } from "next/navigation";
import AppNavbar from "@/custom-components/AppNavbar";
import { motion } from "framer-motion";
import useDeviceType from "@/hookes/useDeviceType";
import Link from "next/link";
import useGetTvl from "@/hookes/contract-hooks/useGetLtv";

const listItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

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

//@ts-ignore
function ListItemMetric({ label, value, color }: Metric) {
  return (
    <div className="flex md:flex-col md:mt-3 lg:mt-0 justify-between w-full md:h-[80%]  text-left md:text-center items-start lg:items-center mt-4 ">
      <div className="text-grayLight font-normal text-lg w-[220px] md:w-auto">
        {label}
      </div>
      <div
        className="text-textBlack font-medium md:text-[32px] text-lg dark:text-white"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

function SingleListItemImage({
  src,
  stakedToken,
}: {
  src: string;
  stakedToken: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-2 lg:gap-14 min-w-[120px]">
      <Image
        src={src}
        className="w-[40px] h-[40px] lg:w-[58px] lg:h-[58px]"
        alt={stakedToken}
      />
      <div className="text-textBlack font-medium text-[28px] lg:text-[32px] dark:text-white">
        {stakedToken}
      </div>
    </div>
  );
}

function SingleListItem({
  item,
  indexVal,
}: {
  //@ts-ignore
  item: ListItem;
  indexVal: number;
}) {
  //@ts-ignore
  const metrics: Metric[] = [
    { label: "Borrow Rate", value: item.BorrowRate },
    {
      label: "LTV",
      value: item.ltv,
    },
    {
      label: "Downside Protection",
      value: item.DownsideProtectionGiven,
    },
  ];

  return (
    <div className="flex  lg:h-auto flex-col lg:flex-row w-full items-start border-b border-solid border-grayLight gap-6 relative">
      <motion.div
        className="p-6 w-full pb-0 lg:pb-6"
        initial="hidden"
        animate="visible"
        variants={listItemVariants}
      >
        <div className="flex lg:w-[75%]   flex-col lg:flex-row w-full">
          <SingleListItemImage src={item.tokenImage} stakedToken={item.token} />
          <div className="flex flex-grow flex-col md:flex-row w-full 2xl:max-w-full max-w-screen-md h-[120px] lg:h-[160px]">
            {metrics.map((metric, index) => (
              <div key={index} className="md:flex-1">
                <ListItemMetric {...metric} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <Link prefetch={true} href={`/mintUSDaWithCollateral/${item.token}`}>
            <Button className="absolute rounded-none md:right-0 md:h-full md:top-0 bottom-0 bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
              <Image src={arrow} width={42} height={42} alt="arrow" />
            </Button>
          </Link>
        </div>
      </motion.div>
      <Link
        className="w-full lg:hidden"
        prefetch={true}
        href={`/mintUSDaWithCollateral/${item.token}`}
      >
        <Button className="  rounded-none md:right-0 w-full h-full md:top-0 bottom-0 bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom">
          <Image src={arrow} width={42} height={42} alt="arrow" />
        </Button>
      </Link>
    </div>
  );
}

function MintUSDaList() {
  const { isTvlPending, tvlValue: ltv } = useGetTvl();

  // Calculate the downside protection amount
  const downsideProtection = ltv ? 100 - Number(ltv || 0) : 0;

  const list = [
    {
      token: "ETH",
      tokenImage: cryptoEth,
      BorrowRate: "5%",
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
    },
    {
      token: "wrETH",
      tokenImage: cryptoEth,
      BorrowRate: "5%",
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
    },
    {
      token: "eETH",
      tokenImage: cryptoEth,
      BorrowRate: "5%",
      DownsideProtectionGiven: `${downsideProtection}%`,
      ltv: `${ltv || 0}%`,
    },
  ];

  const deviceType = useDeviceType();
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

        <motion.div
          className="absolute right-0 top-0  h-full lg:max-w-[7%] border-x-0 border-y-0 border-b border-grayLight border-[1px]  hidden lg:flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={farmTextVariants}
        >
          <div className="transform rotate-90  text-textBlack text-[42px] font-medium min-w-[600px] flex justify-center dark:text-white">
            Farm Your Luck
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MintUSDaList;
