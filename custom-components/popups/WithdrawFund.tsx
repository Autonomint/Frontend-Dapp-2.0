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
import { use, useEffect, useRef, useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import PopupDropdown from "../PopupDropdown";
import CustomDropdown from "../CustomDropdown";
import { toast, Toaster } from "sonner";
import LoadingBox from "../LoadingBox";

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

  const { isLastCumulativeRatePending, lastCumulativeRate } =
    useLastCumulativeRate();
  const { interestGained } = useInterestGain(position.index);
  const totalAmintAmount = useRef<Number>(Number(0));
  const { usdValue: ethPrice } = useGetUsdValue();
  const [amountProtected, setAmountProtected] = useState<number>(0);
  const [amountView, setAmountView] = useState(false);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [repayLoading, setRepayLoading] = useState<boolean>(false);

  const [isLoadingCumulativeLocal, setIsLoadingCumulativeLocal] =
    useState<boolean>(false);
  const [isApproveLoadingLocal, setIsApproveLoadingLocal] =
    useState<boolean>(false);
  const [withdrawLoadingLocal, setWithdrawLoadingLocal] =
    useState<boolean>(false);
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
                Math.round(
                  position.normalizedAmount
                    ? Number(position.normalizedAmount) * 10 ** 6
                    : 0
                )
              ) * lastCumulativeRate
            ) / BigInt(10 ** 27);
      totalAmintAmount.current = Number(totalAmintAmnt);

      // If details are available, update each value in the depositData array
      const updatedData = [...depositData];
      updatedData[0].value = `${Number(position.depositedAmount).toFixed(
        2
      )} ETH`;
      updatedData[1].value = `${Number(position.ethPrice) / 100} ETH`;
      updatedData[2].value = `${Number(position.noOfAmintMinted).toFixed(
        2
      )} USDa`;
      updatedData[3].value = `$${(
        parseFloat(totalAmintAmnt.toString()) /
        10 ** 6
      ).toFixed(2)}`;
      updatedData[4].value = `${position.aprAtDeposit}%`;
      updatedData[5].value = new Date(
        position.depositedTime * 1000
      ).toLocaleString();
      updatedData[6].value = `${position.downsideProtectionPercentage}%`;
      updatedData[7].value = position.status === "LIQUIDATED" ? "Yes" : "No";
      updatedData[8].value =
        interestGained != undefined
          ? `$${Number(interestGained).toFixed(2)}`
          : "-";
      updatedData[9].value = position.noOfAbondMinted
        ? `$${position.noOfAbondMinted}`
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
    cumulativeRateError,
    cumulativeRateSuccess,
  } = useCalculateInterest({
    onError: () => {
      setTimeout(() => {
        setRepayLoading(false);
        setIsLoadingCumulativeLocal(false);
        setIsApproveLoadingLocal(false);
        setWithdrawLoadingLocal(false);
      }, 1000);
    },
  });

  const {
    isLoading: ispendingCumulative,
    isSuccess: cumulativeRateReciptSuccess,
    data: culmulativeData,
    isFetching: isCumulativeFetching,
  } = useWaitForTransactionReceipt({
    hash: (cumulativeRate || "0x") as `0x${string}`, // Transaction hash to wait for
    confirmations: 1, // Number of confirmations required
    query: {
      enabled: cumulativeRateSuccess,
    },
  });

  const {
    approveUsda,
    approveReset,
    amintApproveHash,
    amintApproveLoading,
    amintApproveError,
  } = useApproveUsda({
    onError: () => {
      setTimeout(() => {
        setRepayLoading(false);
        setIsLoadingCumulativeLocal(false);
        setIsApproveLoadingLocal(false);
        setWithdrawLoadingLocal(false);
      }, 1000);
    },
  });

  const {
    data: usdaHashData,
    isSuccess: usdaHashSucces,
    isError: usdaHashError,
    isLoading: usdaHashLoading,
  } = useWaitForTransactionReceipt({
    hash: amintApproveHash,
    query: {
      enabled: !!amintApproveHash,
    },
  });

  const {
    withdrawUsda,
    borrowReset,
    isPendingBorrowWithdraw,
    borrowWithdrawData,
    borrowWithdrawError,
  } = useWithdrawUsda({
    onError: () => {
      setTimeout(() => {
        setRepayLoading(false);
        setIsLoadingCumulativeLocal(false);
        setIsApproveLoadingLocal(false);
        setWithdrawLoadingLocal(false);
      }, 1000);
    },
  });

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
      toast.success("Withdraw Successful", {
        position: "top-right",
        className: "dark:bg-custom-gradient-to-top",
      });
      positionListRefetech();
      setWithdrawLoadingLocal(false);
      setTimeout(() => {
        setRepayLoading(false);
      }, 1000);
    }
  }, [isSuccessWithdrawReceipt, withdrawReceipt]);

  const handleRepay = async () => {
    setIsLoadingCumulativeLocal(true);
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
      setIsLoadingCumulativeLocal(false);
      setTimeout(() => {
        setIsApproveLoadingLocal(true);
      }, 800);
      // Perform the amint approval after the cumulative rate is calculated
      approveUsda(lastCumulativeRate, position.normalizedAmount);
    }
  }, [culmulativeData]);

  useEffect(() => {
    if (usdaHashData && usdaHashSucces) {
      setIsApproveLoadingLocal(false);
      setTimeout(() => {
        setWithdrawLoadingLocal(true);
      }, 800);
      withdrawUsda(position.index, nativeFee?.nativeFee || BigInt(0n));
    }
  }, [usdaHashData]);

  const handleCloseDialog = (value: boolean) => {
    cumulativeReset?.();
    approveReset?.();
    borrowReset?.();
    setIsLoadingCumulativeLocal(false);
    setIsApproveLoadingLocal(false);
    setWithdrawLoadingLocal(false);
    setIsDialogOpen(value);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[610px] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
          <div className="text-2xl font-semibold mb-4">Withdraw Fund</div>
          <div className="flex">
            <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
              <input
                id="bordered-radio-2"
                type="radio"
                checked={toggleView === "repay"}
                onChange={() => setToggleView("repay")}
                name="bordered-radio"
                className="w-6 h-6 text-white bg-gray-100 border-gray-300 focus:ring-white ring-white dark:focus:ring-white dark:ring-white dark:ring-offset-white dark:bg-white dark:border-white"
              />

              <label
                htmlFor="bordered-radio-1"
                className="w-full py-2 ms-2 text-[32px] font-medium text-grayLight dark:text-white"
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
                className="w-6 h-6 text-white bg-white border-3  border-gray-300 focus:ring-white dark:focus:ring-white dark:ring-offset-white dark:bg-white dark:border-white"
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-2 ms-2 text-[32px] font-medium text-grayLight dark:text-white"
              >
                Renew
              </label>
            </div>
          </div>

          {toggleView === "repay" && (
            <>
              <div className="space-y-3 mt-2  h-[350px] overflow-auto no-scrollbar">
                {depositData.map((item) => (
                  <div
                    key={item.headline}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span className="text-grayLight text-[20px] font-medium">
                      {item.headline}
                    </span>
                    <span className="text-textBlack  dark:text-white text-[20px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className=" h-[70px] mt-6">
                {!repayLoading && (
                  <Button
                    disabled={position.status == BorrowStatus.WITHDREW}
                    onClick={handleRepay}
                    className="w-full p-8 bg-black text-white text-[24px]"
                  >
                    {repayLoading
                      ? "Loading..."
                      : position.status == BorrowStatus.DEPOSITED
                      ? `Repay amount ${position.noOfAmintMinted} USDa`
                      : `Withdrawn ${position.depositedAmount} ETH`}
                  </Button>
                )}
                <LoadingBox
                  isLoading={isLoadingCumulativeLocal}
                  isFailure={cumulativeRateError}
                  isSuccess={cumulativeRateReciptSuccess}
                  setSuccessLoading={() => console.log()}
                  heading="Calculating Interest 1/3"
                />
                <LoadingBox
                  isLoading={isApproveLoadingLocal}
                  isFailure={amintApproveError}
                  isSuccess={usdaHashSucces}
                  setSuccessLoading={() => console.log()}
                  heading="Approving USDa 2/3"
                />
                <LoadingBox
                  isLoading={withdrawLoadingLocal}
                  isFailure={borrowWithdrawError}
                  isSuccess={isSuccessWithdrawReceipt}
                  setSuccessLoading={() => console.log()}
                  heading="Approving USDa 3/3"
                />
              </div>
            </>
          )}

          {toggleView === "renew" && (
            <>
              <div className="mb-4 mt-4">
                <PopupDropdown />
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-[#0D0D0D] rounded-none  flex overflow-hidden">
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
              <div className="flex mt-2 items-center gap-2 text-[24px] text-grayLight font-medium">
                <span className="block w-3 h-3 bg-[#05A552]"></span>
                20 Days remaining till maturity
              </div>
              <div className="max-h-[250px] overflow-auto no-scrollbar">
                <div className="space-y-2 mt-4">
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
                      <span className="text-grayLight text-[20px]">
                        {item.heading}
                      </span>
                      <span className="text-textBlack dark:text-white text-[20px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="font-semibold dark:text-white text-textBlack text-[28px]">
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
                      <span className="text-[20px] text-grayLight">
                        {item.label}
                      </span>
                      <span className="text-textBlack dark:text-white text-[20px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
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
