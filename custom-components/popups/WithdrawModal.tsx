import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useCalculateWithdrawAmount from "@/hookes/api-hooks/useCalculateBackendWithdraw";
import useGetAPY from "@/hookes/api-hooks/useGetAPY";
import { dcdsDepositDetails } from "@/hookes/api-hooks/useGetDcdsDetails";
import useInterestGain from "@/hookes/api-hooks/useInterateGain";
import useGetGlobalQuote from "@/hookes/contract-hooks/useGetGlobalQuote";
import useLastCumulativeRate from "@/hookes/contract-hooks/useGetLastCumulativeRate";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import useDcdsWithdraw from "@/hookes/contract-hooks/useDcdsWithdraw";
import { calculateTimeDifference } from "@/utils/helpers";
import { Options } from "@layerzerolabs/lz-v2-utilities";
import { useEffect, useRef, useState } from "react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import LoadingBox from "../LoadingBox";
import { toast } from "sonner";
import { Typography } from "@/components/ui/Typography";
import ToastNotification from "../toasts/ToastNotification";
import ToastNotificationError from "../toasts/ToastNotificationError";

export function DcdsWithdrawModal({
  position,
  isDialogOpen,
  setIsDialogOpen,
}: {
  position: dcdsDepositDetails;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) {
  const [spinner, setSpinner] = useState(false);

  // kept this inside because every row is going to have different state
  const depositDetails = [
    {
      headline: "USDa Deposited",
      value: "1200",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "USDT Deposited",
      value: "1200",
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
      headline: "Deposit Time",
      value: "10 mins ago",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Lock In Period",
      value: "30 days",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Days passed since Deposit",
      value: "0 days",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "APY till now",
      value: "5%",
      tooltip: true,
      tooltipText: "APY of the index",
    },
    {
      headline: "Yearly APY",
      value: "Yes",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Opted for liquidations",
      value: "Yes",
      tooltip: false,
      tooltipText: "",
    },
    {
      headline: "Liquidated Collateral Value",
      value: "Yes",
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
  const { address, chainId } = useAccount();
  const [dcdsFundWithdrawLoadingLocal, setDcdsFundWithdrawLoadingLocal] =
    useState<boolean>(false);
  const [withdrawMethodLoading, setWithdrawMethodLoading] =
    useState<boolean>(false);

  /**
   * Updates the deposit data based on the provided details.
   * If the details are available, it updates each value in the depositData array.
   * If the details are not available, it sets each value in the depositData array to '-'.
   */

  const { apy } = useGetAPY(position.index);

  const { calculateBackendWithdraw, withdrawdata } =
    useCalculateWithdrawAmount();

  function handleDepositData() {
    if (position && apy) {
      const updatedData = [...depositData];
      updatedData[0].value =
        position.depositedAmint == "undefined" ||
        position.depositedAmint == "NaN"
          ? "0"
          : position.depositedAmint;
      // Update depositedAmint value
      updatedData[1].value =
        position.depositedUsdt == "undefined" || position.depositedUsdt == "NaN"
          ? "0"
          : position.depositedUsdt;
      // Update depositedAmint value
      updatedData[2].value = `${Number(position.ethPriceAtDeposit) / 100}`;
      // Update ethPriceAtDeposit value
      updatedData[3].value = new Date(
        Number(position.depositedTime) * 1000
      ).toLocaleString();
      // Update depositedTime value and format time in 'DD/MM/YYYY'
      updatedData[4].value = `${(
        Number(position.lockingPeriod) / 86400000
      ).toFixed(0)} days`;
      // Update lockingPeriod value
      updatedData[5].value = calculateTimeDifference(
        position.depositedTime + "000"
      );
      // Update time difference value
      updatedData[6].value = `${Number(apy == undefined ? 0 : apy[5]).toFixed(
        2
      )}%`;
      // Update aprAtDeposit value
      updatedData[7].value = `${Number(apy == undefined ? 0 : apy[0]).toFixed(
        2
      )}%`;
      // Update optedForLiquidation value
      updatedData[8].value = position.optedForLiquidation ? "Yes" : "No";
      // Update optedForLiquidation value
      updatedData[9].value = `${Number(apy == undefined ? 0 : apy[3]).toFixed(
        2
      )} ETH (${Number(apy == undefined ? 0 : apy[4]).toFixed(2)}$)`;
      // Update optedForLiquidation value
      setDepositData(updatedData);
      // Update the depositData state with updatedData
      calculateBackendWithdraw?.({
        address: address as `0x${string}`,
        index: position.index,
        chainId: chainId as number,
        ethPrice: (Number(ethPrice ?? 0n) / 100).toFixed(2),
      });
    } else {
      const updatedData = [...depositData];
      // If details are not available, set each value in depositData to '-'
      updatedData.forEach((data) => {
        data.value = "-";
      });
      setDepositData(updatedData); // Update the depositData state with updatedData
    }
  }

  useEffect(() => {
    setSpinner(true);
    handleDepositData();
    setOpenConfirmNotice(true);
    setSpinner(false);
  }, [position, lastCumulativeRate, interestGained]);

  // Define the initial state for the options variable
  const options = Options.newOptions()
    .addExecutorLzReceiveOption(250000, 0)
    .toHex()
    .toString() as `0x${string}`;
  const { quoteValue: nativeFee, quoteError } = useGetGlobalQuote(options);

  const {
    dcdsFundWithdrawData,
    dcdsFundWithdrawError,
    handleDcdsFundWithdraw,
    isDcdsFundWithdrawPending,
    resetDcdsFundWithdraw,
  } = useDcdsWithdraw({
    onError: () => {
      setTimeout(() => {
        setDcdsFundWithdrawLoadingLocal(false);
      }, 1000);
      setWithdrawMethodLoading(false);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          onClose={() => toast.dismiss(t)}
        />
      ));
    },
  });

  const {
    data: cdsLogdataReceipt,
    isError: isCdserrorReceipt,
    isSuccess: isCdsSuccessReceipt,
  } = useWaitForTransactionReceipt({
    hash: dcdsFundWithdrawData, // The transaction hash to wait for
    confirmations: 2, // Number of confirmations required for success
  });

  console.log(isCdserrorReceipt, "isCdserrorReceipt");

  useEffect(() => {
    if (isCdsSuccessReceipt) {
      setWithdrawMethodLoading(false);
      toast.custom((t) => {
        const link =
          chainId === 84532
            ? `https://sepolia.basescan.org/tx/${cdsLogdataReceipt.transactionHash} `
            : `https://sepolia.etherscan.io/tx/${cdsLogdataReceipt.transactionHash}`;

        return (
          <ToastNotification
            title="Withdraw Successful"
            message=""
            linkText={
              chainId === 84532 ? "View On Basescan" : "View On Etherscan"
            }
            linkUrl={link}
            onClose={() => toast.dismiss(t)}
          />
        );
      });
    }
    if (isCdserrorReceipt) {
      setTimeout(() => {
        setDcdsFundWithdrawLoadingLocal(false);
      }, 1000);
      setWithdrawMethodLoading(false);
      toast.custom((t) => (
        <ToastNotificationError
          title="Transaction failed, Please try again"
          s
          onClose={() => toast.dismiss(t)}
        />
      ));
    }
  }, [cdsLogdataReceipt, isCdserrorReceipt]);

  const handleWithdrawFund = () => {
    setDcdsFundWithdrawLoadingLocal(true);
    if (nativeFee) {
      setWithdrawMethodLoading(true);
      handleDcdsFundWithdraw?.([BigInt(position.index)], nativeFee.nativeFee);
    }
  };
  console.log(dcdsFundWithdrawLoadingLocal, withdrawMethodLoading, ".");
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetDcdsFundWithdraw();
    setDcdsFundWithdrawLoadingLocal(false);
    setWithdrawMethodLoading(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[610px] bg-white dark:border-[1px] dark:border-grayLight  dark:bg-[#0D0D0D] ">
        <div
          style={{
            fontSize: "28px",
            fontWeight: "500",
          }}
        >
          Withdraw Fund
        </div>
        {/* <div className="flex justify-between mt-8 mb-6 text-textBlack">
          <span
            style={{
              fontSize: "28px",
              fontWeight: "500",
            }}
          >
            USDa Deposited
          </span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "500",
            }}
          >
            ${position.depositedAmount}
          </span>
        </div> */}
        <div className="h-[250px] overflow-auto no-scrollbar">
          {depositData.map((dcdsWidthDrawMetricsObj, idx) => {
            return (
              <div key={idx} className="flex justify-between mb-2">
                <span className="text-[18px] font-medium text-grayLight">
                  {" "}
                  {dcdsWidthDrawMetricsObj.headline}
                </span>
                <span className="text-[18px] dark:text-white font-medium text-textBlack">
                  {dcdsWidthDrawMetricsObj.value}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex w-full">
          <div className="flex-1 flex flex-col justify-start items-start  gap-  border border-solid border-grayLight py-2 px-4">
            <Label className="text-[18px] font-normal text-[#777777]">
              Price Gains
            </Label>
            <Label className="text-[24px] font-medium dark:text-white">
              {(
                Number(apy == undefined ? 0 : apy[1]) +
                Number(apy == undefined ? 0 : apy[2])
              ).toFixed(2)}
            </Label>
            <Label className="text-[14px] font-normal text-[#777777]">
              Option Fee + Liquidation Gains
            </Label>
            <Label className="text-[14px] font-medium dark:text-white">
              {Number(apy == undefined ? 0 : apy[1]).toFixed(2)}
            </Label>
          </div>
          <div className="flex-1 w-full flex flex-col justify-center items-start  gap-1 border border-solid border-grayLight py-2 px-4 font-medium">
            <Label className="text-[18px] font-normal text-[#777777]">
              Yields
            </Label>
            <Label className="text-[24px] font-medium dark:text-white">
              {`${Number(apy == undefined ? 0 : apy[5]).toFixed(2)}%`}
            </Label>
          </div>
        </div>
        <Typography className=" text-[16px] text-[#777777] ">
          Note: Your amount will be used to offer protection to borrowers &
          protocol in return for fixed yields
        </Typography>
        <div className="h-[86px]">
          {!dcdsFundWithdrawLoadingLocal && (
            <Button
              onClick={handleWithdrawFund}
              disabled={
                (position.status === "WITHDREW" ? true : false) ||
                Number(position.lockingPeriod) * 1000 > Date.now()
              }
              className="w-full  p-8 py-10 bg-black text-white text-[32px]"
            >
              {position.status == "DEPOSITED" ? "Withdraw" : "Withdrawn"}
            </Button>
          )}
          <LoadingBox
            isLoading={withdrawMethodLoading}
            isFailure={dcdsFundWithdrawError}
            isSuccess={Boolean(dcdsFundWithdrawData)}
            setSuccessLoading={() => setDcdsFundWithdrawLoadingLocal(false)}
            heading="Withdrawing Funds"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
