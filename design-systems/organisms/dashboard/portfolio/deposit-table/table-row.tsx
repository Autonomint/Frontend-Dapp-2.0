import { BorrowStatus } from "@/utils/constants";
import { calculateRemainingDays } from "@/utils/helpers";
import { PositionData } from "@/utils/interface";
import Spinner from "@/design-systems/atoms/Spinner";
import { formatUnits } from "viem";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/design-systems/atoms/tooltip";
import { Info } from "lucide-react";

const DepositTableRow = ({
  position,
  idx,
  setSelectedPosition,
  onClosePosition,
  isClosingPosition,
  highlight = false,
}: {
  highlight: boolean;
  position: PositionData;
  idx: number;
  setSelectedPosition: (position: PositionData) => void;
  onClosePosition?: (position: PositionData) => void;
  isClosingPosition?: boolean;
}) => {
  const handleClosePosition = () => {
    setSelectedPosition(position);
    if (onClosePosition) {
      onClosePosition(position);
    }
  };

  const remainingDays = calculateRemainingDays(Number(position.validTill));
  const isExpired = remainingDays <= 0 || position.isExpired;

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
        ${formatUnits(BigInt(position.stockPrice), 2)}
      </td>
      <td className="px-5 py-4 2xl:py-6">
        {isExpired ? "Expired" : `${remainingDays} days`}
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
        <span
          className={`font-medium ${Number(position.profit || 0) >= 0
              ? "text-green-600 dark:text-green-500"
              : "text-red-600 dark:text-red-500"
            }`}
        >
          {position.profit !== null && position.profit !== undefined
            ? `${Number(position.profit) >= 0 ? "+" : ""}$${Number(position.profit).toFixed(2)}`
            : "-"}
        </span>
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
                  <p>After expiry, you will have 2 days to close the position. If the position is not closed within 2 days then the gains (if any) will be reverted and given back to 'Call Sellers'</p>
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