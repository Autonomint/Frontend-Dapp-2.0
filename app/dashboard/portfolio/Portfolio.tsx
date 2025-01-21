"use client";
import { SearchIcon } from "@/components/ui/SvgIcons";
import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/input";
import { RebalancePopup } from "@/custom-components/popups/Rebalance";
import { WithdrawFund } from "@/custom-components/popups/WithdrawFund";
import { WithdrawModal } from "@/custom-components/popups/WithdrawModal";
import useGetPositionList, {
  PositionData,
} from "@/hookes/api-hooks/useGetPositionList";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import displayNumberWithPrecision from "@/utils/helpers";
import { useEffect, useState } from "react";

const PositionTableRow = ({
  position,
  tabPosition,
  idx,
  setSelectedPosition,
  setIsRebalanceDialogOpen,
  setIsWithdrawDialogOpen,
  isViewPositionOpen,
  setViewPosition,
  isRenewRepayOpen,
  setRenewRepay,
}: {
  isViewPositionOpen: boolean;
  setViewPosition: (isOpen: boolean) => void;
  isRenewRepayOpen: boolean;
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
    <tr className="border border-solid border-grayLight">
      <td className="px-5 py-6">{idx}</td>
      <td className="px-5 py-6">{position.depositedAmount}</td>
      <td className="px-5 py-6">
        ${Number(position.noOfAmintMinted).toFixed(2)}
      </td>
      <td className="px-5 py-6 hidden md:table-cell">
        {position.status == "DEPOSITED" ? `$${amountProtected}` : "-"}
      </td>
      <td className="px-5 py-6 hidden md:table-cell">
        {" "}
        {position.noOfAbondMinted === null
          ? "-"
          : `$${parseFloat(position.noOfAbondMinted).toFixed(4)}`}
      </td>

      <td className="px-5 py-6 hidden md:table-cell">
        {position.status === "LIQUIDATED" ? "Yes" : "No"}
      </td>
      <td
        className={`px-5 py-6 ${
          tabPosition === "Borrowed" ? "block" : "none"
        } md:text-right md:table-cell md:space-x-12`}
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
          className="font-bold cursor-pointer text-[20px] underline  hidden md:inline"
        >
          View
        </span> */}
      </td>

      <td
        className={`px-5 py-6 ${
          tabPosition === "Deposited" ? "block" : "none"
        } md:text-right md:table-cell md:space-x-12`}
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

function PortolioTable({
  tabPosition,
  positionList,
  setSelectedPosition,
  setIsRebalanceDialogOpen,
  setIsWithdrawDialogOpen,
  isViewPositionOpen,
  setViewPosition,
  isRenewRepayOpen,
  setRenewRepay,
  positionListLoading,
}: {
  positionListLoading: boolean;
  isViewPositionOpen: boolean;
  setViewPosition: (isOpen: boolean) => void;
  isRenewRepayOpen: boolean;
  setRenewRepay: (isOpen: boolean) => void;
  setIsRebalanceDialogOpen: (isOpen: boolean) => void;
  setIsWithdrawDialogOpen: (isOpen: boolean) => void;
  tabPosition: "Borrowed" | "Deposited";
  positionList: PositionData[];
  setSelectedPosition: (position: PositionData) => void;
}) {
  return (
    <div className="overflow-x-auto min-h-[500px] max-h-[600px] no-scrollbar">
      <table className="table-auto w-full border-collapse text-[20px]">
        <thead className="text-left font-normal text-grayLight ">
          <tr>
            <th className="pl-5 font-normal py-5 w-1/5 lg:w-auto">ID</th>
            <th className="pl-5 font-normal w-4/5 lg:w-auto">ETH Deposited</th>
            <th className="pl-5 hidden md:table-cell font-normal">
              USDa Minted
            </th>
            <th className="pl-5 hidden md:table-cell font-normal">
              Amount Protected
            </th>
            <th className="pl-5 hidden md:table-cell font-normal">
              Abond Minted
            </th>
            <th className="pl-5 hidden md:table-cell font-normal">
              Liquidation
            </th>
            <th className="pr-5 font-normal lg:w-auto text-right">Action</th>
          </tr>
        </thead>
        <tbody className="font-normal ">
          {positionList.map((position: PositionData, key: number) => {
            return (
              <PositionTableRow
                key={key}
                idx={key + 1}
                position={position}
                tabPosition={tabPosition}
                setSelectedPosition={setSelectedPosition}
                setIsRebalanceDialogOpen={setIsRebalanceDialogOpen}
                setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
                isViewPositionOpen={isViewPositionOpen}
                setViewPosition={setViewPosition}
                isRenewRepayOpen={isRenewRepayOpen}
                setRenewRepay={setRenewRepay}
              />
            );
          })}
        </tbody>
      </table>
      {!positionListLoading && positionList.length === 0 ? (
        <div className="border-t flex justify-center  border-x-0 border-b-0 border border-grayLight">
          <Typography size="lg" variant="regular" className="mt-3">
            No Data Available
          </Typography>
        </div>
      ) : null}
      {positionListLoading ? (
        <div className="border-t flex justify-center  border-x-0 border-b-0 border border-grayLight">
          <Typography size="lg" variant="regular" className="mt-3">
            Loading...
          </Typography>
        </div>
      ) : null}
    </div>
  );
}

function PortfolioMetrics({
  subHeading,
  value,
}: {
  subHeading: string;
  value: string;
}) {
  return (
    <div className="flex-1 flex flex-col px-4  py-4 gap-2 border-grayLight border-r-0 border border-solid">
      <span className="text-textBlack md:text-[32px] text-[24px] font-medium dark:text-white">
        {value}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>
    </div>
  );
}

function Portfolio() {
  const [tabPosition, setTabPosition] = useState<"Borrowed" | "Deposited">(
    "Borrowed"
  );
  const [selectedPosition, setSelectedPosition] = useState<PositionData | null>(
    null
  );

  const [isViewPositionOpen, setViewPosition] = useState(false);
  const [isRenewRepayOpen, setRenewRepay] = useState(false);
  // will handle all this through redux later
  const [isRebalanceDialogOpen, setIsRebalanceDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const {
    positionList,
    positionListError,
    positionListRefetech,
    positionListLoading,
  } = useGetPositionList();
  console.log(positionList, "positionList");

  return (
    <div className="flex flex-col">
      <div className="grid md:grid-cols-4 grid-cols-2">
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Total Borrowed" value="$1,290" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Total Deposited" value="$2,320" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Fee Earned" value="$120" />
        </div>
        <div className="col-span-1">
          <PortfolioMetrics subHeading="Points" value="89,027" />
        </div>
      </div>
      <div className="flex mt-5">
        <div
          onClick={() => {
            setTabPosition("Borrowed");
          }}
          className={
            "lg:w-[24%] flex-1 lg:px-5 lg:py-3 p-3  md:text-[32px] text-[18px] font-medium border-grayLight border border-r-0 border-solid hover:cursor-pointer" +
            `${
              tabPosition == "Borrowed"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-bottom"
                : ""
            }`
          }
        >
          Borrowed Position
        </div>
        <div
          onClick={() => {
            setTabPosition("Deposited");
          }}
          className={
            "lg:w-[24%] flex-1  lg:px-5 lg:py-3 p-3   md:text-[32px] text-[18px] font-medium border border-r-0 border-grayLight border-solid hover:cursor-pointer" +
            `${
              tabPosition == "Deposited"
                ? " bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-bottom"
                : ""
            }`
          }
        >
          Deposited Position
        </div>
        <div className="lg:block w-[4%] hidden px-5 py-3  text-[32px] font-medium border-grayLight border  border-r-0 border-solid"></div>
        <div className="flex w-[48%]  px-5 py-3 flex-row items-center justify-start  text-[32px] font-medium border-grayLight border border-r-0 border-solid">
          <SearchIcon width={24} height={24} fontSize={24} />
          <Input
            className="border-0 md:!text-[32px] ml-2  p-0 !font-normal text-grayLight"
            placeholder="Search Transactions"
          />
        </div>
      </div>
      <PortolioTable
        positionListLoading={positionListLoading}
        setIsRebalanceDialogOpen={setIsRebalanceDialogOpen}
        setIsWithdrawDialogOpen={setIsWithdrawDialogOpen}
        setSelectedPosition={setSelectedPosition}
        positionList={positionList}
        tabPosition={tabPosition}
        isViewPositionOpen={isViewPositionOpen}
        setViewPosition={setViewPosition}
        isRenewRepayOpen={isRenewRepayOpen}
        setRenewRepay={setRenewRepay}
      />
      {/* <RebalancePopup
        isDialogOpen={false}
        setIsDialogOpen={() => setIsRebalanceDialogOpen(false)}
      /> */}
      <WithdrawModal
        position={(selectedPosition || []) as PositionData}
        isDialogOpen={isViewPositionOpen}
        setIsDialogOpen={() => setViewPosition(false)}
      />
      <WithdrawFund
        setSelectedPosition={setSelectedPosition}
        positionListRefetech={positionListRefetech}
        position={(selectedPosition || []) as PositionData}
        isDialogOpen={isRenewRepayOpen}
        setIsDialogOpen={() => setRenewRepay(false)}
      />
    </div>
  );
}

export default Portfolio;
