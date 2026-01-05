import { borrowingContractAbi } from "@/blockchain/abis/borrowing-sc-abi";
import { borrowingContractAddress } from "@/blockchain/contracts";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { BorrowStatus } from "@/utils/constants";
import displayNumberWithPrecision, {
  calculateRemainingDays,
} from "@/utils/helpers";
import { PositionData } from "@/utils/interface";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

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
}) => {
  const depositDetails = [
    {
      headline: "Eth Deposited",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "ETH Price at Deposit",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Amint Amount minted",
      value: "0",
      tooltip: true,
      tooltipText: "80% of the total deposited amount",
    },
    {
      headline: "Total Amount (Amint minted + Interest Amount returned)",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "APR at Deposit",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Downside percentage at Deposit",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Liquidated?",
      value: "No",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Interest rate gained",
      value: "0",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Abond Minted",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
  ];
  const [depositData, setDepositData] = useState(depositDetails);
  const [amountProtected, setAmountProtected] = useState(0);
  const { usdValue: ethPrice } = useGetUsdValue();
  const [openChart, setOpenChart] = useState(false);
  const { chainId, address } = useAccount();
  // calculating protect amount
  const amountProtectedFunction = () => {
    if (ethPrice === undefined) {
      setAmountProtected(0);
      return;
    }
    if (parseFloat(ethPrice.toString()) > position.ethPrice) {
      setAmountProtected(0);
    } else if (parseFloat(ethPrice.toString()) < position.ethPrice) {
      const amountProt =
        parseFloat(position.depositedAmount) *
        (position.ethPrice - parseFloat(ethPrice.toString()));
      const amountProtPrecision = parseFloat(
        displayNumberWithPrecision(
          (amountProt / 100).toFixed(position.collateralType === "krwq" ? 8 : 2)
        )
      );
      setAmountProtected(amountProtPrecision);
    }
  };

  // setting protected amount, setting 0 while unmount
  useEffect(() => {
    amountProtectedFunction();
    return () => {
      setAmountProtected(0);
    };
  }, [position, ethPrice]);

  // selecting position
  const handleRowClick = () => {
    setSelectedPosition(position);
  };
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
        {parseFloat(Number(position.depositedAmount).toFixed(4))}{" "}
        {position.collateralType}
      </td>
      <td className="px-5 py-4 2xl:py-6">
        ${Number(position.noOfUSDaMinted).toFixed(2)}
      </td>
      <td className="px-5 py-4 2xl:py-6  ">
        <div className="flex flex-col">
          {calculateRemainingDays(Number(position.validTill)) <= 0
            ? "-"
            : position.status == "DEPOSITED"
            ? `$${amountProtected}`
            : "-"}
          {Number(calculateRemainingDays(position.validTill) || 0) < 15 &&
            Number(calculateRemainingDays(position.validTill) || 0) > 0 &&
            position.status !== BorrowStatus.WITHDREW &&
            position.status !== BorrowStatus.LIQUIDATED && (
              <span className="text-grayLight text-lg">
                {Number(calculateRemainingDays(position.validTill) || 0)}{" "}
                <span className="text-grayLight text-[14px]">
                  Days left to renew
                </span>
              </span>
            )}
        </div>
      </td>
      <td className="px-5 py-4 2xl:py-6  ">
        {" "}
        {position.noOfAbondMinted === null
          ? "-"
          : `${parseFloat(position.noOfAbondMinted).toFixed(4)}`}
      </td>

      <td className="px-5 py-4 2xl:py-6  ">
        {position.status === "LIQUIDATED" ? "Yes" : "No"}
      </td>
      <td
        className={`px-5 py-4 2xl:py-6 ${
          tabPosition === "Borrowed" ? "block" : "none"
        } md:text-right  md:space-x-12`}
        style={{
          display: tabPosition === "Borrowed" ? "block" : "none",
        }}
      >
        <span
          onClick={() => {
            setRenewRepay(true);
            handleRowClick();
          }}
          className="font-bold cursor-pointer text-[20px] underline "
        >
          {position.status == BorrowStatus.WITHDREW
            ? "Repaid"
            : position.status == BorrowStatus.LIQUIDATED
            ? "Liquidated"
            : "Repay/Renew"}
        </span>
        {/* <spans
            onClick={() => {
              setViewPosition(true);
              handleRowClick();
            }}
            className="font-bold cursor-pointer text-[20px] underline   md:inline"
          >
            View
          </spans> */}
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
