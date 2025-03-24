import {
  borrowAssetsAddress,
  borrowingContractAddress,
} from "@/blockchain/contracts";
import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import useGetBorrowWithdrawSignedData from "@/hookes/api-hooks/useGetBorrowWithdrawSignedData";
import useInterestGain from "@/hookes/api-hooks/useInterateGain";
import useApproveUsda from "@/hookes/contract-hooks/useApproveUsda";
import useCalculateInterest from "@/hookes/contract-hooks/useCalculateInterest";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useLastCumulativeRate from "@/hookes/contract-hooks/useGetLastCumulativeRate";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import { useWithdrawUsda } from "@/hookes/contract-hooks/useWithdrawUsda";
import { BorrowStatus } from "@/utils/constants";
import displayNumberWithPrecision, {
  calculateRemainingDays,
  getDownsideProtectionTillNow,
  isFifteenDaysCompleted,
} from "@/utils/helpers";
import { PositionData } from "@/utils/interface";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import LoadingBox from "../LoadingBox";
import PopupDropdown from "../PopupDropdown";
import ToastNotification from "../toasts/ToastNotification";
import ToastNotificationError from "../toasts/ToastNotificationError";
import { usePayableOptionFees } from "@/hookes/contract-hooks/usePayableOptionFees";
import useBorrowRenew from "@/hookes/contract-hooks/useBorrowRenew";
import { formatUnits } from "viem";
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
  console.log(interestGained, "interestGained");

  const totalAmintAmount = useRef<Number>(Number(0));
  const { usdValue: ethPrice } = useGetUsdValue(
    borrowAssetsAddress["ETH" as keyof typeof borrowAssetsAddress]
  );
  console.log(ethPrice, "ethPrice");

  const [amountProtected, setAmountProtected] = useState<number>(0);
  const [amountView, setAmountView] = useState(false);
  const [openConfirmNotice, setOpenConfirmNotice] = useState(false);
  const [repayLoading, setRepayLoading] = useState<boolean>(false);

  const { chainId } = useAccount();

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
      updatedData[0].value = `${Number(position.depositedAmount).toFixed(4)} ${
        position.collateralType
      }`;
      updatedData[1].value = `$${Number(position.ethPrice) / 100}`;
      updatedData[2].value = `${Number(position.noOfUSDaMinted).toFixed(
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
    .addExecutorLzReceiveOption(400000, 0)
    .toHex()
    .toString() as `0x${string}`;

  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(
    options,
    3,
    1
  );

  // const {
  //   calculateCumulativeRate,
  //   cumulativeRate,
  //   cumulativeReset,
  //   cumulativeRateLoading,
  //   cumulativeRateError,
  //   cumulativeRateSuccess,
  // } = useCalculateInterest({
  //   onError: () => {
  //     setIsLoadingCumulativeLocal(false);
  //     setIsApproveLoadingLocal(false);
  //     setWithdrawLoadingLocal(false);
  //     setTimeout(() => {
  //       setRepayLoading(false);
  //     }, 1000);
  //     toast.custom((t) => (
  //       <ToastNotificationError
  //         title="Transaction failed, Please try again"
  //         onClose={() => toast.dismiss(t)}
  //       />
  //     ));
  //   },
  // });

  // const {
  //   isLoading: ispendingCumulative,
  //   isSuccess: cumulativeRateReciptSuccess,
  //   data: culmulativeData,
  //   isFetching: isCumulativeFetching,
  //   isError: cumulativeRateErrorReceipt,
  // } = useWaitForTransactionReceipt({
  //   hash: (cumulativeRate
  //     ? cumulativeRate.toString()
  //     : undefined) as `0x${string}`, // Transaction hash to wait for
  //   confirmations: 1, // Number of confirmations required
  //   query: {
  //     enabled: cumulativeRateSuccess,
  //   },
  // });

  const {
    approveUsda,
    approveReset,
    usdaApproveHash,
    usdaApproveLoading,
    usdaApproveError,
    approveUsdaDynamic,
    usdaApproveSuccess,
  } = useApproveUsda({
    onError: () => {
      setIsLoadingCumulativeLocal(false);
      setIsApproveLoadingLocal(false);
      setWithdrawLoadingLocal(false);
      setRenewApproveLoading(false);
      setTimeout(() => {
        setRenewLoading(false);
        setRepayLoading(false);
      }, 1000);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  const {
    data: usdaHashData,
    isSuccess: usdaHashSucces,
    isError: usdaHashError,
    isLoading: usdaHashLoading,
  } = useWaitForTransactionReceipt({
    hash: usdaApproveHash,
    query: {
      enabled: !!usdaApproveHash,
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
      setIsLoadingCumulativeLocal(false);
      setIsApproveLoadingLocal(false);
      setWithdrawLoadingLocal(false);
      setTimeout(() => {
        setRepayLoading(false);
      }, 1000);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  const {
    isLoading: isLoadingWithdrawReceipt,
    isSuccess: isSuccessWithdrawReceipt,
    data: withdrawReceipt,
    isError: withdrawErrorReceipt,
    error: withdrawError,
  } = useWaitForTransactionReceipt({
    hash: (borrowWithdrawData || undefined) as `0x${string}`, // Transaction hash to wait for
    confirmations: 1, // Number of confirmations required
  });

  useEffect(() => {
    if (isSuccessWithdrawReceipt) {
      setSelectedPosition({ ...position, status: BorrowStatus.WITHDREW });
      toast.custom((t) => {
        const link =
          chainId === 84532
            ? `https://sepolia.basescan.org/tx/${withdrawReceipt.transactionHash} `
            : `https://sepolia.etherscan.io/tx/${withdrawReceipt.transactionHash}`;

        return (
          <ToastNotification
            title="Repay Successful"
            message=""
            linkText={
              chainId === 84532 ? "View On Basescan" : "View On Etherscan"
            }
            linkUrl={link}
            onClose={() => toast.dismiss(t)}
          />
        );
      });
      positionListRefetech();
      setWithdrawLoadingLocal(false);
      setTimeout(() => {
        setRepayLoading(false);
      }, 1000);
    } else if (withdrawErrorReceipt) {
      toast.custom((t) => (
        <ToastNotificationError
          title={
            String(
              (withdrawError?.cause as { shortMessage: string })
                .shortMessage as string
            ) || "Transaction failed, Please try again"
          }
          onClose={() => toast.dismiss(t)}
        />
      ));
      setIsLoadingCumulativeLocal(false);
      setIsApproveLoadingLocal(false);
      setWithdrawLoadingLocal(false);
      setTimeout(() => {
        setRepayLoading(false);
      }, 1000);
    }
  }, [isSuccessWithdrawReceipt, withdrawReceipt, withdrawErrorReceipt]);

  const handleRepay = async () => {
    debugger;
    setIsApproveLoadingLocal(true);
    setRepayLoading(true);
    setOpenConfirmNotice(false);
    // cumulativeReset?.();
    approveReset?.();
    borrowReset?.();
    if (position.status === "DEPOSITED") {
      approveUsda(lastCumulativeRate, position.normalizedAmount);
    }
  };

  // useEffect(() => {
  //   if (culmulativeData) {
  //     setIsLoadingCumulativeLocal(false);
  //     setTimeout(() => {
  //       setIsApproveLoadingLocal(true);
  //     }, 800);
  //     // Perform the amint approval after the cumulative rate is calculated
  //   }
  // }, [culmulativeData]);

  const [renewLoading, setRenewLoading] = useState<boolean>(false);
  const [renewApproveLoading, setRenewApproveLoading] =
    useState<boolean>(false);
  const [renewLoadingSM, setRenewLoadingSM] = useState<boolean>(false);

  const { refetchBorrowWithDrawSignedData } = useGetBorrowWithdrawSignedData(
    position.index
  );
  const {
    renewBorrow,
    isRenewBorrowLoading,
    renewBorrowHash,
    resetBorrowRenew,
    renewError: renewErrorSm,
  } = useBorrowRenew({});

  useEffect(() => {
    (async () => {
      if (usdaHashData && usdaHashSucces) {
        debugger;
        if (toggleView == "repay") {
          setIsApproveLoadingLocal(false);
          setTimeout(() => {
            setWithdrawLoadingLocal(true);
          }, 800);

          const borrowSignedData = await refetchBorrowWithDrawSignedData();

          withdrawUsda(
            position.index,
            nativeFee?.nativeFee || BigInt(0n),
            borrowSignedData.data?.odosAssembledData,
            borrowSignedData.data?.usdtFromOdos,
            BigInt(borrowSignedData.data?.nonce || 0),
            BigInt(borrowSignedData.data?.deadline || 0),
            (borrowSignedData.data?.signature || "") as `0x${string}`
          );
        }
        if (toggleView == "renew") {
          setRenewApproveLoading(false);
          setTimeout(() => {
            setRenewLoadingSM(true);
          }, 800);

          renewBorrow(
            BigInt(position.index),
            nativeFee?.nativeFee || BigInt(0n)
          );
        }
      } else if (usdaHashError) {
        toast.custom((t) => (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        ));
      }
    })();
  }, [usdaHashData]);

  const {
    isLoading: isLoadingRenewReceipt,
    isSuccess: isSuccessRenewReceipt,
    data: renewReceipt,
    isError: renewReceiptError,
    error: renewError,
  } = useWaitForTransactionReceipt({
    hash: (renewBorrowHash || undefined) as `0x${string}`, // Transaction hash to wait for
    confirmations: 1, // Number of confirmations required
  });

  useEffect(() => {
    if (isSuccessRenewReceipt) {
      const link =
        chainId === 84532
          ? `https://sepolia.basescan.org/tx/${renewReceipt.transactionHash} `
          : `https://sepolia.etherscan.io/tx/${renewReceipt.transactionHash}`;

      toast.custom((t) => (
        <ToastNotification
          title="Repay Successful"
          message=""
          linkText={
            chainId === 84532 ? "View On Basescan" : "View On Etherscan"
          }
          linkUrl={link}
          onClose={() => toast.dismiss(t)}
        />
      ));
    } else if (renewReceiptError) {
      setRenewLoading(false);
      setRenewApproveLoading(false);
      setRenewLoadingSM(false);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    }
  }, [renewReceipt, renewReceiptError, isSuccessRenewReceipt]);

  const handleCloseDialog = (value: boolean) => {
    approveReset?.();
    borrowReset?.();
    setIsLoadingCumulativeLocal(false);
    setIsApproveLoadingLocal(false);
    setWithdrawLoadingLocal(false);
    setIsDialogOpen(value);
  };

  const { payableOptionFees } = usePayableOptionFees(position.index);
  console.log(payableOptionFees, position.index, "payableOptionFees");

  const handleRenew = () => {
    debugger;
    setRenewLoading(true);
    setRenewApproveLoading(true);
    approveReset?.();
    resetBorrowRenew?.();
    approveUsdaDynamic(
      (payableOptionFees || 0) as bigint,
      borrowingContractAddress[
        chainId as keyof typeof borrowingContractAddress
      ] as `0x${string}`
    );
  };

  const downsideProtection =
    (ethPrice || 0) < (position?.ethPrice || 0)
      ? (
          Number(formatUnits(BigInt(position?.ethPrice || 0), 2)) *
            Number(position?.depositedAmount) -
          Number(formatUnits(BigInt(ethPrice), 2)) *
            Number(position?.depositedAmount)
        ).toFixed(2)
      : 0;

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className=" max-w-[98%] sm:max-w-[610px] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
          <div className="text-2xl font-semibold mb-4">Borrow Details</div>
          <div className="flex">
            <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="repay"
                >
                  <input
                    name="repay"
                    type="radio"
                    checked={toggleView === "repay"}
                    onChange={() => setToggleView("repay")}
                    className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                    id="repay"
                  />
                  <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
              </div>
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-2 ms-2 text-[20px]  sm:text-2xl md:text-[32px] font-medium text-textBlack  dark:text-white"
              >
                Repay
              </label>
            </div>

            <div className="flex flex-1 items-center ps-4 border border-gray-200 rounded-none dark:border-gray-700">
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="renew"
                >
                  <input
                    name="renew"
                    type="radio"
                    onChange={() => setToggleView("renew")}
                    checked={toggleView === "renew"}
                    className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                    id="renew"
                  />
                  <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
              </div>
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-2 ms-2 text-[20px]  sm:text-2xl md:text-[32px]  text-textBlack font-medium  dark:text-white "
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
                    <span className="text-grayLight text-[16px] md:text-[20px] font-medium">
                      {item.headline}
                    </span>
                    <span className="text-textBlack font-medium text-[16px]  dark:text-white md:text-[20px]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className=" h-[50px] md:h-[70px] mt-4 md:mt-6">
                {!repayLoading && (
                  <Button
                    disabled={position.status == BorrowStatus.WITHDREW}
                    onClick={handleRepay}
                    className="w-full py-6 md:p-8 bg-black text-white text-[18px] md:text-[24px]"
                  >
                    {repayLoading
                      ? "Loading..."
                      : position.status == BorrowStatus.DEPOSITED
                      ? `Repay amount ${position.noOfUSDaMinted} USDa`
                      : `Withdrawn ${position.depositedAmount} ETH`}
                  </Button>
                )}
                {/* <LoadingBox
                  isLoading={isLoadingCumulativeLocal}
                  isFailure={cumulativeRateError || cumulativeRateErrorReceipt}
                  isSuccess={cumulativeRateReciptSuccess}
                  setSuccessLoading={() => console.log()}
                  heading="Calculating Interest "
                  loadingCount="1/3"
                /> */}
                <LoadingBox
                  isLoading={isApproveLoadingLocal}
                  isFailure={usdaApproveError || usdaHashError}
                  isSuccess={usdaHashSucces}
                  setSuccessLoading={() => console.log()}
                  heading="Approving USDa "
                  loadingCount="1/2"
                />
                <LoadingBox
                  isLoading={withdrawLoadingLocal}
                  isFailure={borrowWithdrawError || withdrawErrorReceipt}
                  isSuccess={isSuccessWithdrawReceipt}
                  setSuccessLoading={() => console.log()}
                  heading="Withdrawing"
                  loadingCount="2/2"
                />
              </div>
            </>
          )}

          {toggleView === "renew" && (
            <>
              <div className="w-full mt-4 h-2 bg-gray-200 dark:bg-[#0D0D0D] rounded-none  flex overflow-hidden">
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
                {calculateRemainingDays(Number(position.validTill))} Days
                remaining till maturity
              </div>
              <div className="max-h-[250px] overflow-auto no-scrollbar">
                <div className="space-y-2 mt-4">
                  {[
                    {
                      heading: "ETH price at deposit",
                      value: `${depositData[1].value}`,
                    },
                    {
                      heading: "Current ETH price",
                      value: `$${formatUnits(BigInt(ethPrice), 2)}`,
                    },
                    {
                      heading: "Downside Protection till now",

                      value: "$" + downsideProtection,
                    },
                    {
                      heading: "Option Fees paid",
                      value: `$${Number(position?.optionFees).toFixed(2)}`,
                    },
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
                    { label: "Option Fees", value: `${payableOptionFees}` },
                    {
                      label: "Downside Protection",
                      value: `Up to $${(
                        (Number(position.depositedAmount) * 20) /
                        100
                      ).toFixed(2)} (20%)`,
                    },
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
              <div className=" h-[50px] md:h-[70px] mt-4 md:mt-6 ">
                {!renewLoading && (
                  <Button
                    disabled={
                      position.status == BorrowStatus.WITHDREW ||
                      isFifteenDaysCompleted(position.validTill)
                    }
                    onClick={handleRenew}
                    className="w-full  p-8 bg-black text-white text-[32px]"
                  >
                    Renew
                  </Button>
                )}

                <LoadingBox
                  isLoading={renewApproveLoading}
                  isFailure={usdaApproveError || usdaHashError}
                  isSuccess={usdaHashSucces}
                  setSuccessLoading={() => console.log()}
                  heading="Approving USDa"
                  loadingCount="1/2"
                />
                <LoadingBox
                  isLoading={renewLoadingSM}
                  isFailure={renewReceiptError || renewErrorSm}
                  isSuccess={isSuccessRenewReceipt}
                  setSuccessLoading={() => console.log()}
                  heading="Renewing"
                  loadingCount="2/2"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
