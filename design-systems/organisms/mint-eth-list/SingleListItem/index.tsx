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
      label: "Ticker",
      value: (
        <div className="flex items-center gap-3">
          {item.logo && (
            <div
              className={`w-12 h-12  rounded-full flex items-center justify-center text-white font-bold text-sm ${item.logo}`}
              style={{
                backgroundColor: item.logo.includes("green")
                  ? "#10b981"
                  : item.logo.includes("red")
                    ? "#ef4444"
                    : item.logo.includes("yellow")
                      ? "#eab308"
                      : item.logo.includes("blue")
                        ? "#3b82f6"
                        : item.logo.includes("orange")
                          ? "#f97316"
                          : item.logo.includes("purple")
                            ? "#a855f7"
                            : item.logo.includes("indigo")
                              ? "#6366f1"
                              : item.logo.includes("gray")
                                ? "#1f2937"
                                : "#6b7280",
              }}
            >
              {item.ticker.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-bold text-2xl">{item.ticker}</span>
            <span className="text-md text-gray-600 dark:text-gray-400">
              {item.name}
            </span>
          </div>
        </div>
      ),
      tooltipText: "Asset ticker symbol",
    },
    {
      label: "Spot",
      value: (
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            ${item.spotPrice || "2,550.00"}
          </span>
          <span
            className={`text-base font-medium ${
              item.priceChange?.startsWith("+")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {item.priceChange || "0.00%"}
          </span>
        </div>
      ),
      tooltipText: "Current spot price",
    },
    {
      label: "Open interest",
      value: (
        <span className="text-2xl font-bold">
          {item.openInterest || "5.2%"}
        </span>
      ),
      tooltipText: "Current interest rate",
    },
  ];

  return (
    <div className="flex  lg:h-auto flex-col lg:flex-row w-full items-start border-b border-solid border-grayLight gap-6 relative">
      <motion.div
        className="p-8 w-full pb-2 lg:pb-10"
        initial="hidden"
        animate="visible"
        variants={listItemVariants}
      >
        <div className="flex lg:w-[95%] 2xl:w-[85%]   flex-col lg:flex-row w-full px-4 lg:px-6">
          <div className="flex flex-grow flex-col md:flex-row w-full 2xl:max-w-full max-w-screen-2xl h-auto lg:h-28">
            {metrics.map((metric, index) => (
              <div key={index} className="md:flex-1 px-2">
                <ListItemMetric {...metric} />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:block">
          <div className="absolute rounded-none md:right-0  md:top-0 bottom-0 flex flex-col justify-center items-center gap-1 p-2 w-32">
            <Link
              prefetch={true}
              href={`/earn?ticker=${item.ticker}&action=call`}
              className=""
            >
              <Button
                disabled={!item.isActive}
                className={`
                                bg-black dark:bg-custom-gradient-to-top py-6 px-6
                                text-white  font-semibold text-[16px] rounded-md `}
              >
                Sell Call
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SingleListItem;
