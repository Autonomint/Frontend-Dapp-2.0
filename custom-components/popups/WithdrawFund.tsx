import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PositionData } from "@/hookes/api-hooks/useGetPositionList";
import useInterestGain from "@/hookes/api-hooks/useInterateGain";
import useApproveUsda from "@/hookes/contract-hooks/useApproveUsda";
import useCalculateInterest from "@/hookes/contract-hooks/useCalculateInterest";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useLastCumulativeRate from "@/hookes/contract-hooks/useGetLastCumulativeRate";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { useWithdrawUsda } from "@/hookes/contract-hooks/useWithdrawUsda";
import { BorrowStatus } from "@/utils/constants";
import displayNumberWithPrecision, {
  daysFromTimestamp,
  formatTimestamp,
} from "@/utils/helpers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useEffect, useRef, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import PopupDropdown from "../PopupDropdown";
import CustomDropdown from "../CustomDropdown";

export function WithdrawFund({
  position,
  isDialogOpen,
  setIsDialogOpen,
  positionListRefetech,
  setSelectedPosition,
}: {
  positionListRefetech: () => void;
  position: PositionData;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  setSelectedPosition: (position: PositionData) => void;
}) {
  const [toggleView, setToggleView] = useState("repay");

  const [spinner, setSpinner] = useState(false);

  const depositDetails = [
    {
      headline: "ETH Deposited",
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
      headline: "USDa Amount Minted",
      value: "1.234",
      tooltip: true,
      tooltipText: "80% of the total deposited amount",
    },
    {
      headline: "Total Amount (USDa minted + Interest)",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Deposit Time APR",
      value: "5%",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Deposited Time",
      value: "-",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Downside Percentage At Deposit",
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
      headline: "Interest Rate Gained",
      value: "-",
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
  console.log(depositData, "depositData");

  const { isLastCumulativeRatePending, lastCumulativeRate } =
    useLastCumulativeRate();
  const { interestGained } = useInterestGain(position.index);
  const totalAmintAmount = useRef<Number>(Number(0));
  const { usdValue: ethPrice } = useGetUsdValue();
  const [amountProtected, setAmountProtected] = useState<number>(0);
  const [amountView, setAmountView] = useState(false);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [repayLoading, setRepayLoading] = useState<boolean>(false);

  /**
   * Updates the deposit data based on the provided details.
   * If the details are available, it updates each value in the depositData array.
   * If the details are not available, it sets each value in the depositData array to '-'.
   */

  function handleDepositData() {
    // Calculate the totalAmintAmnt
    if (position && lastCumulativeRate) {
      const totalAmintAmnt =
        lastCumulativeRate === undefined
          ? BigInt(Number(position.normalizedAmount) * 10 ** 6)
          : BigInt(
              BigInt(
                parseInt(position.normalizedAmount)
                  ? Number(parseInt(position.normalizedAmount)) * 10 ** 6
                  : 0
              ) * lastCumulativeRate
            ) / BigInt(10 ** 27);
      console.log(lastCumulativeRate, totalAmintAmnt);

      totalAmintAmount.current = Number(totalAmintAmnt);

      // If details are available, update each value in the depositData array
      const updatedData = [...depositData];
      updatedData[0].value =
        position.depositedAmount +
        ` (${(
          (Number(position.depositedAmount) * Number(position.ethPrice)) /
          100
        ).toFixed(2)} $) `;
      updatedData[1].value = `${Number(position.ethPrice) / 100}`;
      updatedData[2].value = Number(position.noOfAmintMinted).toFixed(2);
      updatedData[3].value = (
        parseFloat(totalAmintAmnt.toString()) /
        10 ** 6
      ).toFixed(2);
      updatedData[4].value = `${position.aprAtDeposit}%`;
      updatedData[5].value = new Date(
        position.depositedTime * 1000
      ).toLocaleString();
      updatedData[6].value = `${position.downsideProtectionPercentage}%`;
      updatedData[7].value = position.status === "LIQUIDATED" ? "Yes" : "No";
      updatedData[8].value =
        interestGained != undefined ? Number(interestGained).toFixed(2) : "-";
      updatedData[9].value = position.noOfAbondMinted
        ? position.noOfAbondMinted
        : "-";
      setDepositData(updatedData);
    } else {
      // If details are not available, set each value in the depositData array to '-'
      const updatedData = [...depositData];
      updatedData[0].value = "-";
      updatedData[1].value = "-";
      updatedData[2].value = "-";
      updatedData[3].value = "-";
      updatedData[4].value = "-";
      updatedData[5].value = "-";
      updatedData[6].value = "-";
      updatedData[7].value = "-";
      updatedData[8].value = "-";
      setDepositData(updatedData);
    }
  }

  const handleAmountProtected = () => {
    //check if we have current ethPrice available or not
    if (ethPrice) {
      console.log(ethPrice, position.ethPrice);
      //if current ethPrice > deposited time ethPrice
      if (parseFloat(ethPrice.toString()) > position.ethPrice) {
        setAmountProtected(0);
      }
      //if current ethPrice < depositedethPrice
      else if (parseFloat(ethPrice.toString()) < position.ethPrice) {
        const amountProt =
          parseFloat(position.depositedAmount) *
          (position.ethPrice - parseFloat(ethPrice.toString()));
        const amountProtPrecision = parseFloat(
          displayNumberWithPrecision((amountProt / 100).toFixed(2))
        );
        setAmountProtected(amountProtPrecision);
      }
      //if current ethprice < 0.8 of depositedethPrice
      else if (parseFloat(ethPrice.toString()) <= 0.8 * position.ethPrice) {
        //
        const amountProt =
          0.2 * parseFloat(position.depositedAmount) * position.ethPrice;
        const amountProtPrecision = parseFloat(
          displayNumberWithPrecision((amountProt / 100).toFixed(2))
        );
        setAmountProtected(amountProtPrecision);
      }
      setAmountView(!amountView);
    } else {
      setAmountView(!amountView);
      setAmountProtected(0);
    }
  };

  useEffect(() => {
    setSpinner(true);
    handleDepositData();
    handleAmountProtected();
    setOpenConfirmNotice(true);
    setSpinner(false);
  }, [position, lastCumulativeRate, interestGained]);

  const borrowedMetrics = [
    {
      heading: "Fee Gained",
      value: "-",
    },
    {
      heading: "Deposited Time",
      value: position.depositedTime
        ? formatTimestamp(position.depositedTime)
        : "-",
    },
    {
      heading: "ETH price at deposit",
      value: `$${depositData[1].value}`,
    },
    {
      heading: "Lock In Period",
      value: "-",
    },
    {
      heading: "Deposit-time APR & Current APR",
      value: `${depositData[4].value}/-`,
    },
    {
      heading: "Days passed since Deposit",
      value: `${daysFromTimestamp(position.depositedTime)} Days`,
    },
  ];

  // Create the options for the contract
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(250000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options);

  const {
    calculateCumulativeRate,
    cumulativeRate,
    cumulativeReset,
    cumulativeRateLoading,
  } = useCalculateInterest();
  const {
    isLoading: ispendingCumulative,
    isSuccess: cumulativeRateSuccess,
    data: culmulativeData,
  } = useWaitForTransactionReceipt({
    hash: (cumulativeRate || "0x") as `0x${string}`, // Transaction hash to wait for
    confirmations: 1, // Number of confirmations required
  });

  const { approveUsda, approveReset, amintApproveHash, amintApproveLoading } =
    useApproveUsda();

  const {
    data: usdaHashData,
    isSuccess: usdaHashSucces,
    isError: usdaHashError,
    isLoading: usdaHashLoading,
  } = useWaitForTransactionReceipt({
    hash: amintApproveHash,
  });

  const {
    withdrawUsda,
    borrowReset,
    isPendingBorrowWithdraw,
    borrowWithdrawData,
  } = useWithdrawUsda();

  const {
    isLoading: isLoadingWithdrawReceipt,
    isSuccess: isSuccessWithdrawReceipt,
    data: withdrawReceipt,
  } = useWaitForTransactionReceipt({
    hash: (borrowWithdrawData || "0x") as `0x${string}`, // Transaction hash to wait for
    confirmations: 1, // Number of confirmations required
  });

  useEffect(() => {
    if (isSuccessWithdrawReceipt) {
      setSelectedPosition({ ...position, status: BorrowStatus.WITHDREW });
      positionListRefetech();
      setRepayLoading(false);
    }
  }, [isSuccessWithdrawReceipt, withdrawReceipt]);

  const handleRepay = async () => {
    setRepayLoading(true);
    setOpenConfirmNotice(false);
    cumulativeReset?.();
    approveReset?.();
    borrowReset?.();
    if (position.status === "DEPOSITED") {
      calculateCumulativeRate?.();
    }
  };

  useEffect(() => {
    if (culmulativeData) {
      // Perform the amint approval after the cumulative rate is calculated
      approveUsda(lastCumulativeRate, position.normalizedAmount);
    }
  }, [culmulativeData]);

  useEffect(() => {
    if (usdaHashData && usdaHashSucces) {
      withdrawUsda(position.index, nativeFee?.nativeFee || BigInt(0n));
    }
  }, [usdaHashData]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[660px] bg-white p-6 gap-0">
          <div className="text-2xl font-semibold mb-4">Withdraw Fund</div>

          {/* 
        <div className="flex mb-6">
          <label
            className={`w-full flex items-center justify-center py-2 border rounded-l-md cursor-pointer ${
              toggleView === "renew"
                ? "bg-gray-200 border-black"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="toggle"
              value="renew"
              checked={toggleView === "renew"}
              onChange={() => setToggleView("renew")}
              className="hidden"
            />
            <span className="text-lg font-medium">Renew</span>
          </label>

          <label
            className={`w-full flex items-center justify-center py-2 border rounded-r-md cursor-pointer ${
              toggleView === "repay"
                ? "bg-gray-200 border-black"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="toggle"
              value="repay"
              checked={toggleView === "repay"}
              onChange={() => setToggleView("repay")}
              className="hidden"
            />
            <span className="text-lg font-medium">Repay</span>
          </label>
        </div> */}
          <div className="flex">
            <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
              <input
                id="bordered-radio-2"
                type="radio"
                checked={toggleView === "repay"}
                onChange={() => setToggleView("repay")}
                name="bordered-radio"
                className="w-6 h-6 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 appearance-none rounded-full checked:bg-black checked:bg-black"
              />
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-4 ms-2 text-[32px] font-medium text-grayLight dark:text-textBlack"
              >
                Repay
              </label>
            </div>

            <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
              <input
                id="bordered-radio-2"
                type="radio"
                onChange={() => setToggleView("renew")}
                checked={toggleView === "renew"}
                name="bordered-radio"
                className="w-6 h-6 bg-gray-100 border-gray-300 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 appearance-none rounded-full checked:bg-black checked:border-black"
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ms-2 text-[32px] font-medium text-grayLight dark:text-textBlack"
              >
                Renew
              </label>
            </div>
          </div>

          {toggleView === "repay" && (
            <>
              <div className="flex justify-between text-[32px] font-medium mb-3">
                <span>USDa Borrowed</span>
                <span>${Number(position.noOfAmintMinted).toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                {depositDetails.map((item) => (
                  <div
                    key={item.headline}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span className="text-grayLight text-[24px]">
                      {item.headline}
                    </span>
                    <span className="text-textBlack text-[24px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                disabled={position.status == BorrowStatus.WITHDREW}
                onClick={handleRepay}
                className="w-full mt-6 p-8 bg-black text-white text-[32px]"
              >
                {repayLoading
                  ? "Loading..."
                  : position.status == BorrowStatus.DEPOSITED
                  ? "Repay"
                  : "Withdraw"}
              </Button>
            </>
          )}

          {toggleView === "renew" && (
            <>
              <div className="mb-4">
                <PopupDropdown />
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-none mt-3 flex overflow-hidden">
                {[
                  {
                    label: "Deposit",
                    value: 5,
                    color: "linear-gradient(to right,#478BFF,#00FA96)",
                  },
                  {
                    label: "Option Fee",
                    value: 0.7,
                    color: "linear-gradient(to right,#05A552,#05A552)",
                  },
                ].map((metric, index, arr) => {
                  const total = arr.reduce((acc, item) => acc + item.value, 0);
                  const percentage = (metric.value / total) * 100;

                  return (
                    <div
                      key={index}
                      style={{
                        width: `${percentage}%`,
                        backgroundImage: metric.color,
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex items-center gap-2 text-[24px] text-grayLight font-medium">
                <span className="block w-3 h-3 bg-[#05A552]"></span>
                20 Days remaining till maturity
              </div>
              <div className="space-y-4">
                {[
                  { heading: "ETH price at deposit", value: "$3,890" },
                  { heading: "Current ETH price", value: "$3,000" },
                  {
                    heading: "Downside Protection till now",
                    value: "$90 (10%)",
                  },
                  { heading: "Option Fees paid", value: "$19" },
                ].map((item) => (
                  <div
                    key={item.heading}
                    className="flex justify-between font-medium"
                  >
                    <span className="text-grayLight text-[24px]">
                      {item.heading}
                    </span>
                    <span className="text-textBlack text-[24px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                <div className="font-semibold text-textBlack text-[32px]">
                  For Renewed
                </div>

                {[
                  { label: "Time Period", value: "30 days" },
                  { label: "Option Fees", value: "$19" },
                  { label: "Downside Protection", value: "Up to $180 (20%)" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between font-medium "
                  >
                    <span className="text-[24px] text-grayLight">
                      {item.label}
                    </span>
                    <span className="text-textBlack text-[24px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6 p-8 bg-black text-white text-[32px]">
                Pay
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
