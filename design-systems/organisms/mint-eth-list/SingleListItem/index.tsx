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

function SingleListItem({
  item,
  action = "sell",
  activeTab = 0,
}: {
  item: any;
  action?: string;
  activeTab?: number;
}) {
  // Determine asset capabilities (default to Call-only except for LAB which is Put-only)
  const hasCall = item.hasCall !== undefined ? item.hasCall : (item.ticker !== "LAB");
  const hasPut = item.hasPut !== undefined ? item.hasPut : (item.ticker === "LAB");

  // Determine button visibility based on tab filters
  const showCallButton = hasCall && (activeTab === 0 || activeTab === 1);
  const showPutButton = hasPut && (activeTab === 0 || activeTab === 2);

  const metrics = [
    {
      label: "Ticker",
      value: (
        <div className="flex items-center gap-3">
          {item.logo &&
            (typeof item.logo === "object" || item.logo.startsWith("http") || item.logo.startsWith("/") ? (
              // Real logo from URL, local path, or imported object
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 p-1 flex items-center justify-center">
                <Image
                  src={item.logo}
                  alt={`${item.ticker} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized={typeof item.logo === "string" && (item.logo.endsWith(".svg") || item.logo.includes(".svg"))}
                />
              </div>
            ) : (
              // Fallback colored circle with ticker initial
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${item.logo}`}
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
            ))}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl">{item.ticker}</span>
              {item.chipLabel && (
                <span className="font-['JetBrains_Mono',monospace] text-[10px] leading-none tracking-[0.12em] uppercase rounded-full bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-800/30 border border-emerald-200 dark:border-emerald-700 shadow-sm text-emerald-700 dark:text-emerald-300 font-semibold inline-flex items-center" style={{ padding: "5px 7px" }}>
                  {item.chipLabel}
                </span>
              )}
            </div>
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
            className={`text-base font-medium ${item.priceChange?.startsWith("+")
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
        <div className="flex flex-col">
          <span className="text-2xl font-bold">
            {item.openInterestValue || "$184K"}
          </span>
          <span className="text-base text-gray-500 font-medium">
            {item.openInterestContracts || "216 contracts"}
          </span>
        </div>
      ),
      tooltipText: "Current open interest value and contracts",
    },
  ];

  return (
    <div className="w-full border-b border-solid border-grayLight">
      <motion.div
        className="p-4 sm:p-6 lg:p-8 w-full"
        initial="hidden"
        animate="visible"
        variants={listItemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center w-full lg:w-[95%] 2xl:w-[85%] gap-4 md:gap-6">
          <div className="flex flex-1 flex-col md:flex-row md:items-center w-full md:gap-x-4 lg:gap-x-6">
            {metrics.map((metric, index) => (
              <div key={index} className="flex-1 min-w-0">
                <ListItemMetric {...metric} />
              </div>
            ))}
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {/* Call Option Slot */}
            <div className="w-full md:w-[130px] lg:w-[150px] flex justify-center">
              {showCallButton ? (
                <Link
                  prefetch={true}
                  href={`/earn?ticker=${item.ticker}&action=${action}&option=call`}
                  className="w-full"
                >
                  <Button
                    disabled={!item.isActive}
                    className="bg-black dark:bg-custom-gradient-to-top py-3 md:py-4 lg:py-5 text-white font-semibold text-sm md:text-[15px] rounded-md w-full"
                  >
                    {action === "buy" ? "Buy Call" : "Sell Call"}
                  </Button>
                </Link>
              ) : (
                <div className="hidden sm:block w-full" />
              )}
            </div>

            {/* Put Option Slot */}
            <div className="w-full md:w-[130px] lg:w-[150px] flex justify-center">
              {showPutButton ? (
                <Link
                  prefetch={true}
                  href={`/earn?ticker=${item.ticker}&action=${action}&option=put`}
                  className="w-full"
                >
                  <Button
                    disabled={!item.isActive}
                    className="bg-black dark:bg-custom-gradient-to-top py-3 md:py-4 lg:py-5 text-white font-semibold text-sm md:text-[15px] rounded-md w-full"
                  >
                    {action === "buy" ? "Buy Put" : "Sell Put"}
                  </Button>
                </Link>
              ) : (
                <div className="hidden sm:block w-full" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SingleListItem;
