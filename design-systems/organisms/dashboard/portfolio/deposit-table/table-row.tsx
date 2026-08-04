import { BorrowStatus, PROFIT_CAP_MAP } from "@/utils/constants";
import { calculateRemainingDays, formatDate, getExpiryTimeLeft } from "@/utils/helpers";
import { PositionData } from "@/utils/interface";
import Spinner from "@/design-systems/atoms/Spinner";
import { formatUnits } from "viem";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/design-systems/atoms/tooltip";
import { Info } from "lucide-react";
import { calculatePnL, calculatePutPnL } from "@/utils/helpers";

const DepositTableRow = ({
  position,
  idx,
  setSelectedPosition,
  onClosePosition,
  isClosingPosition,
  spotPrice,
  isSpotPriceLoading,
  highlight = false,
}: {
  highlight: boolean;
  position: PositionData;
  idx: number;
  setSelectedPosition: (position: PositionData) => void;
  onClosePosition?: (position: PositionData) => void;
  isClosingPosition?: boolean;
  spotPrice?: number;
  isSpotPriceLoading?: boolean;
}) => {
  const handleClosePosition = () => {
    setSelectedPosition(position);
    if (onClosePosition) {
      onClosePosition(position);
    }
  };

  const remainingDays = calculateRemainingDays(Number(position.validTill));
  const isExpired = remainingDays <= 0 || position.isExpired;

  // Determine if this is a put position (LAB or any _PUT collateral type)
  const isPut =
    position.collateralType === "LAB" ||
    position.collateralType.endsWith("_PUT");

  // Calculate real-time PnL
  const currentPrice = spotPrice || 0;
  const strikePriceNum = Number(position.strikePrice);
  const depositedAmount = Number(position.depositedAmount);
  // Look up per-asset profit cap; undefined falls back to the 30 % default
  const profitCap = PROFIT_CAP_MAP[position.collateralType];
  const realTimePnL = isPut
    ? calculatePutPnL(currentPrice, strikePriceNum, depositedAmount, profitCap)
    : calculatePnL(currentPrice, strikePriceNum, depositedAmount, profitCap);
  const hasRealTimePrice = spotPrice !== undefined && spotPrice !== null && spotPrice > 0;

  /**
   * Formats a dollar value for display.
   * Sub-dollar values show 2–4 decimal places; larger values are rounded.
   */
  const formatPrice = (value: number): string => {
    const abs = Math.abs(value);
    if (abs === 0) return "0";
    if (abs < 0.01) return value.toFixed(2);
    if (abs < 1) return value.toFixed(2);
    return Math.round(value).toString();
  };

  return (
    <tr
      className={`border ${highlight
        ? "dark:bg-custom-gradient-to-top bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
        : ""
        } border-solid border-grayLight `}
    >
      <td className="px-5 py-4 2xl:py-6">{idx}</td>
      <td className="px-5 py-4 2xl:py-6">
        {position.collateralType}
      </td>
      <td className="px-5 py-4 2xl:py-6">
        {position.depositedAmount}
      </td>
      <td className="px-5 py-4 2xl:py-6">
        ${formatUnits(BigInt(position.strikePrice), 2)}
      </td>
      <td className="px-5 py-4 2xl:py-6">
        {hasRealTimePrice && !isSpotPriceLoading ? (
          <span className="flex items-center gap-1">
            ${formatPrice(currentPrice)}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </span>
        ) : isSpotPriceLoading ? (
          <Spinner size={16} />
        ) : (
          `$${formatUnits(BigInt(position.stockPrice), 2)}`
        )}
      </td>
      <td className="px-5 py-4 2xl:py-6">
        <div className="flex flex-col">
          <span className="font-medium text-black dark:text-white">
            {formatDate(position.validTill)}
          </span>
          {!isExpired ? (
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {getExpiryTimeLeft(position.validTill)} left
            </span>
          ) : (
            <span className="text-sm text-red-500 dark:text-red-400 mt-1">
              Expired
            </span>
          )}
        </div>
      </td>
      <td className="px-5 py-4 2xl:py-6">
        {position.status === BorrowStatus.LIQUIDATED
          ? "Liquidated"
          : position.status === BorrowStatus.WITHDREW
            ? "Withdrawn"
            : isExpired
              ? "Expired"
              : "Active"}
      </td>
      <td className="px-5 py-4 2xl:py-6">
        {isExpired ? (
          // For expired positions: use backend profit, show 0 if negative
          <span
            className={`font-medium ${Number(position.profit || 0) >= 0
              ? "text-green-600 dark:text-green-500"
              : "text-green-600 dark:text-green-500"
              }`}
          >
            +${formatPrice(Math.max(0, Number(position.profit || 0)))}
          </span>
        ) : isSpotPriceLoading ? (
          <Spinner size={16} />
        ) : hasRealTimePrice ? (
          <span
            className={`font-medium flex items-center gap-1 ${realTimePnL >= 0
              ? "text-green-600 dark:text-green-500"
              : "text-red-600 dark:text-red-500"
              }`}
          >
            {realTimePnL >= 0 ? "+" : ""}${formatPrice(realTimePnL)}
            {hasRealTimePrice && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </span>
        ) : (
          <span
            className={`font-medium ${Number(position.profit || 0) >= 0
              ? "text-green-600 dark:text-green-500"
              : "text-red-600 dark:text-red-500"
              }`}
          >
            {position.profit !== null && position.profit !== undefined
              ? `${Number(position.profit) >= 0 ? "+" : ""}$${formatPrice(Number(position.profit))}`
              : "-"}
          </span>
        )}
      </td>
      <td className="px-5 py-4 2xl:py-6 md:text-right md:space-x-12">
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={handleClosePosition}
            disabled={
              position.status === BorrowStatus.LIQUIDATED ||
              position.status === BorrowStatus.WITHDREW ||
              !isExpired ||
              isClosingPosition
            }
            className="font-bold cursor-pointer text-[20px] underline bg-transparent border-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {position.status === BorrowStatus.LIQUIDATED
              ? "Liquidated"
              : position.status === BorrowStatus.WITHDREW
                ? "Closed"
                : isClosingPosition
                  ? <Spinner size={20} color="currentColor" />
                  : "Close Position"}
          </button>
          {position.status !== BorrowStatus.LIQUIDATED && position.status !== BorrowStatus.WITHDREW && !isExpired && (
            <div className="flex items-center gap-1 text-[11px] text-grayLight">
              <span>Enabled on Expiry</span>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Info width={14} height={14} className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-black max-w-[280px] text-sm">
                  <p>After expiry, you will have 2 Hrs to close the position. If the position is not closed within 2 Hrs then the gains (if any) will be reverted and given back to 'Call Sellers'</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default DepositTableRow;