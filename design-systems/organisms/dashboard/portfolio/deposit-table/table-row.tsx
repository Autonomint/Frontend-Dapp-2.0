import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import displayNumberWithPrecision from "@/utils/helpers";
import { PositionData } from "@/utils/interface";
import { useEffect, useState } from "react";

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
      value: "0.00123",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "ETH Price at Deposit",
      value: "$1645.121",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Amint Amount minted",
      value: "1.234",
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
      value: "5%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Downside percentage at Deposit",
      value: "20%",
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
      value: "3%",
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

  const amountProtectedFunction = () => {
    if (ethPrice === undefined) return;
    if (parseFloat(ethPrice.toString()) > position.ethPrice) {
      setAmountProtected(0);
    } else if (parseFloat(ethPrice.toString()) < position.ethPrice) {
      const amountProt =
        parseFloat(position.depositedAmount) *
        (position.ethPrice - parseFloat(ethPrice.toString()));
      const amountProtPrecision = parseFloat(
        displayNumberWithPrecision((amountProt / 100).toFixed(2))
      );
      setAmountProtected(amountProtPrecision);
    } else if (parseFloat(ethPrice.toString()) <= 0.8 * position.ethPrice) {
      const amountProt =
        0.2 * parseFloat(position.depositedAmount) * position.ethPrice;
      const amountProtPrecision = parseFloat(
        displayNumberWithPrecision((amountProt / 100).toFixed(2))
      );
      setAmountProtected(amountProtPrecision);
    }
  };

  useEffect(() => {
    amountProtectedFunction();
  }, [position]);

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
      <td className="px-5 py-4 2xl:py-6">{position.depositedAmount}</td>
      <td className="px-5 py-4 2xl:py-6">
        ${Number(position.noOfAmintMinted).toFixed(2)}
      </td>
      <td className="px-5 py-4 2xl:py-6  ">
        {position.status == "DEPOSITED" ? `$${amountProtected}` : "-"}
      </td>
      <td className="px-5 py-4 2xl:py-6  ">
        {" "}
        {position.noOfAbondMinted === null
          ? "-"
          : `$${parseFloat(position.noOfAbondMinted).toFixed(4)}`}
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
          Repay/Renew
        </span>
        {/* <span
            onClick={() => {
              setViewPosition(true);
              handleRowClick();
            }}
            className="font-bold cursor-pointer text-[20px] underline   md:inline"
          >
            View
          </span> */}
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
