"use client";

import Image from "next/image";
import React from "react";
import cryptoEth from "../assets/eth.png";
import { Button } from "@/components/ui/button";
import arrow from "../assets/arrow-right-02.png";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <div className="flex md:flex-col justify-between w-full md:h-full text-left md:text-center items-start md:items-center mt-4 md:mt-0">
      <div className="text-grayLight font-normal text-lg w-[150px] md:w-auto">
        {label}
      </div>
      <div
        className="text-textBlack font-medium md:text-[32px] text-lg"
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
    <div className="flex flex-col items-start justify-center gap-14 min-w-[120px]">
      <Image src={src} width={58} height={58} alt={stakedToken} />
      <div className="text-textBlack font-medium text-[32px]">
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
      label: "Downside Protection Given",
      value: item.DownsideProtectionGiven,
    },
  ];

  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col md:flex-row w-full items-start p-6 border-b border-solid border-grayLight gap-6 relative"
      style={{ borderTopWidth: indexVal === 0 ? 1 : 0 }}
      initial="hidden"
      animate="visible"
      variants={listItemVariants}
    >
      <div className="flex lg:w-1/2 flex-col md:flex-row w-full">
        <SingleListItemImage src={item.tokenImage} stakedToken={item.token} />
        <div className="flex flex-grow flex-col md:flex-row w-full max-w-screen-md h-[160px]">
          {metrics.map((metric, index) => (
            <div key={index} className="md:flex-1">
              <ListItemMetric {...metric} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Button
          onClick={() => router.push("/mintUSDaWithCollateral")}
          className="absolute rounded-none md:right-0 md:h-full md:top-0 bottom-0 bg-textBlack hover:bg-textBlack"
        >
          <Image src={arrow} width={42} height={42} alt="arrow" />
        </Button>
        <Button
          onClick={() => router.push("/mintUSDaWithCollateral")}
          className="absolute rounded-none bottom-0 w-full left-0 md:hidden bg-textBlack hover:bg-textBlack h-15 font-bold text-[#FFFFFF] text-[32px]"
        >
          <Image src={arrow} width={42} height={42} alt="arrow" />
        </Button>
      </div>
    </motion.div>
  );
}

function MintUSDaList() {
  //@ts-ignore
  const list: ListItem[] = [
    {
      token: "ETH",
      tokenImage: cryptoEth,
      BorrowRate: "22.36%",
      DownsideProtectionGiven: "32.67%",
    },
    {
      token: "wrETH",
      tokenImage: cryptoEth,
      BorrowRate: "22.36%",
      DownsideProtectionGiven: "32.67%",
    },
    {
      token: "eETH",
      tokenImage: cryptoEth,
      BorrowRate: "22.36%",
      DownsideProtectionGiven: "32.67%",
    },
    {
      token: "eETH",
      tokenImage: cryptoEth,
      BorrowRate: "22.36%",
      DownsideProtectionGiven: "32.67%",
    },
  ];

  return (
    <div className="md:relative">
      <motion.div className="flex flex-col gap-0 lg:max-w-[90%]">
        {list.map((item, index) => (
          <SingleListItem key={index} item={item} indexVal={index} />
        ))}
      </motion.div>

      <motion.div
        className="absolute right-0 top-0  h-full lg:max-w-[10%] hidden lg:flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={farmTextVariants}
      >
        <div className="transform rotate-90 text-textBlack text-[42px] font-medium min-w-[600px] flex justify-center">
          Farm Your Luck
        </div>
      </motion.div>
    </div>
  );
}

export default MintUSDaList;
