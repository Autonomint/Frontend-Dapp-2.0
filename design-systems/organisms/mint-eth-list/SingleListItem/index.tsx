import { Button } from "@/design-systems/atoms/button";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/app/assets/arrow-right-02.png";
import { motion } from "framer-motion";
import SingleListItemImage from "../SingleListItemImage";
import ListItemMetric from "../ListItemMetric";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Info, Link2Icon, SquareArrowOutUpRight } from "lucide-react";

const listItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

function SingleListItem({
  item,
  indexVal,
}: {
  //@ts-ignore
  item: ListItem;
  indexVal: number;
}) {
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
      value: (
        <div>
          <div className="flex items-center justify-between gap-2 text-lg">
            <p>Min Amount :</p>
            <p>{item.minAmount}</p>
          </div>
          <div className="flex items-center justify-between gap-2 text-lg">
            <p>Points :</p>
            <p>{item.pointsToBeGiven}</p>
          </div>
        </div>
      ),
      tooltipText: "Points to be given for depositing the token",
    },
    {
      label: "Strategies",
      value: (
        <div className="flex mb-4 items-center justify-center gap-2 text-lg">
          <a href={item.link} target="_blank">
            Open Link
          </a>

          <SquareArrowOutUpRight />
        </div>
      ),
      tooltipText: "Points to be given for depositing the token",
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
        <div className="flex lg:w-[85%]   flex-col lg:flex-row w-full">
          <SingleListItemImage src={item.tokenImage} stakedToken={item.token} />
          <div className="flex flex-grow flex-col md:flex-row w-full 2xl:max-w-full max-w-screen-md h-[120px] lg:h-[160px]">
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
