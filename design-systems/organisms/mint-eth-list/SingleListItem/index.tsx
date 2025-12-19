import arrow from "@/app/assets/arrow-right-02.png";
import { Button } from "@/design-systems/atoms/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ListItemMetric from "../ListItemMetric";
import SingleListItemImage from "../SingleListItemImage";

import { calculateRemainingTimeDate, toLocalISOString } from "@/utils/helpers";

const listItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

function SingleListItem({ item }: { item: any }) {
  const metrics = [
    {
      label: "Borrow Rate",
      value: item.BorrowRate,
      tooltipText:
        "The current yearly interest rate charged on stablecoin USDA+ loan",
    },
    {
      label: "LTV",
      value: item.ltv,
      tooltipText: "USDA+ borrowing limit per unit of collateral",
    },
    {
      label: "Downside Protection",
      value: item.DownsideProtectionGiven,
      tooltipText:
        "Current %age of price fall protection provided on collaterals",
    },
    {
      label: "Point",
      value:
        item.token === "KRWQ" ? (
          <div className="flex items-center justify-center flex-row-reverse md:flex-col  gap-2 md:gap-1 text-lg">
            Coming Soon
          </div>
        ) : (
          <div className="flex items-center justify-center flex-row-reverse md:flex-col  gap-2 md:gap-1">
            {!!item.boaster &&
              calculateRemainingTimeDate(
                toLocalISOString(new Date(item.boasterTime * 1000))
              ).minutes > 0 &&
              item.boaster > 1 && (
                <div className="badge mt-1 pulsate w-fit  text-nowrap text-[14px] flex justify-center items-center rounded-full border-[2px] border-green-500 font-bold text-green-600 dark:text-green-400 bg-[#22c55e96] px-1 py-[2px]">
                  {item.boaster}x Points
                </div>
              )}
            <div className="flex items-baseline justify-center  text-nowrap flex-row gap-1">
              <p>{item.pointsToBeGiven}</p>
              <div className="text-base">{`per ${item.minAmount} ${
                item.token === "cbBTC" ? "cbBTC" : "ETH"
              }`}</div>
            </div>
          </div>
        ),
      tooltipText: "Points to be given for depositing the token",
    },
    {
      label: "Yield",
      value:
        item.token === "KRWQ" ? (
          <div className="flex flex-col mb-2 items-center cursor-pointer justify-center gap-2 text-lg">
            <p className="text-[14px] sm:hidden block">Upto 16.17%/m</p>
            <div className="flex items-center text-[14px] lg:text-lg gap-2">
              <p className="text-lg">Coming Soon</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mb-2 items-center cursor-pointer justify-center gap-2 text-lg">
            <p className="text-[14px] sm:block hidden">
              Max upto 16.17% per month
            </p>
            <p className="text-[14px] sm:hidden block">Upto 16.17%/m</p>
            <div className="flex items-center text-[14px] lg:text-lg gap-2">
              <Link href={item.link}>
                <p>Strategies</p>
              </Link>

              <SquareArrowOutUpRight />
            </div>
          </div>
        ),
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
        <div className="flex lg:w-[95%] 2xl:w-[85%]   flex-col lg:flex-row w-full">
          <SingleListItemImage src={item.tokenImage} stakedToken={item.token} />
          <div className="flex flex-grow flex-col md:flex-row w-full 2xl:max-w-full max-w-screen-2xl h-[211px] lg:h-[160px]">
            {metrics.map((metric, index) => (
              <div key={index} className="md:flex-1 h-full">
                <ListItemMetric {...metric} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block ">
          {item.isActive ? (
            <Link
              prefetch={true}
              href={`/mintUSDaWithCollateral/${item.token}`}
              className="absolute  rounded-none md:right-0 md:h-full md:top-0 bottom-0"
            >
              <Button
                disabled={!item.isActive}
                className=" h-full bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom"
              >
                <Image src={arrow} width={42} height={42} alt="arrow" />
              </Button>
            </Link>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute  rounded-none md:right-0 md:h-full md:top-0 bottom-0">
                  <Button
                    disabled={!item.isActive}
                    className=" h-full bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom"
                  >
                    <Image src={arrow} width={42} height={42} alt="arrow" />
                  </Button>
                </div>
              </TooltipTrigger>
              {!item.isActive && (
                <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                  <p>{item.InActiveHeading}</p>
                </TooltipContent>
              )}
            </Tooltip>
          )}
        </div>
      </motion.div>

      {item.isActive ? (
        <Link
          className="w-full lg:hidden"
          prefetch={true}
          href={`/mintUSDaWithCollateral/${item.token}`}
        >
          <Button
            disabled={!item.isActive}
            className="  rounded-none md:right-0 disabled:cursor-not-allowed w-full h-full md:top-0 bottom-0 bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom"
          >
            <Image src={arrow} width={42} height={42} alt="arrow" />
          </Button>
        </Link>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!item.isActive}
              className=" lg:hidden  rounded-none md:right-0 disabled:cursor-not-allowed w-full h-full md:top-0 bottom-0 bg-textBlack hover:bg-textBlack dark:bg-custom-gradient-to-bottom"
            >
              <Image src={arrow} width={42} height={42} alt="arrow" />
            </Button>
          </TooltipTrigger>
          {!item.isActive && (
            <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
              <p>{item.InActiveHeading}</p>
            </TooltipContent>
          )}
        </Tooltip>
      )}
    </div>
  );
}

export default SingleListItem;
