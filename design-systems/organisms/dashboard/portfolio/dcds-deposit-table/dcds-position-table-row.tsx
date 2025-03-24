import { formatTimestamp } from "@/utils/helpers";
import { dcdsDepositDetails } from "@/utils/interface";

const DcdsPositionTableRow = ({
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
}: {
  highlight: boolean;
  isViewPositionOpen: boolean;
  setViewPosition: (isOpen: boolean) => void;
  isLast: boolean;
  setRenewRepay: (isOpen: boolean) => void;
  setIsRebalanceDialogOpen: (isOpen: boolean) => void;
  setIsWithdrawDialogOpen: (isOpen: boolean) => void;
  position: dcdsDepositDetails;
  tabPosition: "Borrowed" | "Deposited";
  idx: number;
  setSelectedPosition: (position: dcdsDepositDetails) => void;
}) => {
  const handleRowClick = () => {
    setSelectedPosition(position);
    setIsWithdrawDialogOpen(true);
  };
  return (
    <tr
      className={`border ${
        highlight
          ? "dark:bg-custom-gradient-to-top bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
          : ""
      } border-solid border-grayLight `}
    >
      <td className="px-5 py-4 2xl:py-6 ">{position.index}</td>
      <td className="px-5 py-4 2xl:py-6 text-center sm:text-left">
        {/* {position.depositedAmint == "undefined" ? 0 : position.depositedAmint} /{" "}
        {position.depositedUsdt == "undefined" ? 0 : position.depositedUsdt} */}
        {position.totalDepositedAmount}
      </td>
      <td className="px-5 py-4 whitespace-nowrap 2xl:py-6 ">
        {formatTimestamp(Number(position.depositedTime))}
      </td>

      <td className="px-5 py-4 2xl:py-6 ">
        {(Number(position.lockingPeriod) / 86400000).toFixed(0)} days
      </td>

      <td className={`px-5 py-4 2xl:py-6  md:text-right md:space-x-12`}>
        <span
          onClick={handleRowClick}
          className="font-bold cursor-pointer text-[20px] underline "
        >
          Withdraw
        </span>
        {/* <span
            onClick={handleRowClick}
            className="font-bold cursor-pointer text-[20px] underline  "
          >
            Rebalance
          </span> */}
      </td>
    </tr>
  );
};

export default DcdsPositionTableRow;
