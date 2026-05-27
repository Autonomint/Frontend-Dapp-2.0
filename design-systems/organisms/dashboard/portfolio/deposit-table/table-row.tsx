import { calculateRemainingDays } from "@/utils/helpers";
import { PositionData } from "@/utils/interface";
import { formatUnits } from "viem";

const DepositTableRow = ({
  position,
  tabPosition,
  idx,
  setSelectedPosition,
  setIsRebalanceDialogOpen,
  setIsWithdrawDialogOpen,
  isViewPositionOpen,
  setViewPosition,
  isLast,
  setRenewRepay,
  highlight = false,
  setStakePopUpOpen,
}: {
  highlight: boolean;
  isViewPositionOpen: boolean;
  setViewPosition: (isOpen: boolean) => void;
  isLast: boolean;
  setRenewRepay: (isOpen: boolean) => void;
  setIsRebalanceDialogOpen: (isOpen: boolean) => void;
  setIsWithdrawDialogOpen: (isOpen: boolean) => void;
  position: PositionData;
  tabPosition: "Borrowed" | "Deposited";
  idx: number;
  setSelectedPosition: (position: PositionData) => void;
  setStakePopUpOpen: (isOpen: boolean) => void;
}) => {
  // selecting position
  const handleRowClick = () => {
    setSelectedPosition(position);
  };

  const remainingDays = calculateRemainingDays(Number(position.validTill));
  const isExpired = remainingDays <= 0 || position.isExpired;

  return (
    <tr
      className={`border ${
        highlight
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
        {position.status === "LIQUIDATED"
          ? "Liquidated"
          : isExpired
            ? "Expired"
            : "Active"}
      </td>
      <td
        className={`px-5 py-4 2xl:py-6 ${
          tabPosition === "Borrowed" ? "block" : "none"
        } md:text-right  md:space-x-12`}
        style={{
          display: tabPosition === "Borrowed" ? "block" : "none",
        }}
      >
        <button
          onClick={() => {
            setRenewRepay(true);
            handleRowClick();
          }}
          className="font-bold cursor-pointer text-[20px] underline bg-transparent border-none"
        >
          Close Position
        </button>
      </td>

      <td
        className={`px-5 py-4 2xl:py-6 ${
          tabPosition === "Deposited" ? "block" : "none"
        } md:text-right  md:space-x-12`}
        style={{
          display: tabPosition === "Deposited" ? "block" : "none",
        }}
      >
        <span
          onClick={handleRowClick}
          className="font-bold cursor-pointer text-[20px] underline "
        >
          Withdraw
        </span>
        <span
          onClick={handleRowClick}
          className="font-bold cursor-pointer text-[20px] underline  "
        >
          Rebalance
        </span>
      </td>
    </tr>
  );
};

export default DepositTableRow;
