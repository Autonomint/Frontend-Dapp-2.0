import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PositionData } from "@/hookes/api-hooks/useGetPositionList";
import useInterestGain from "@/hookes/api-hooks/useInterateGain";
import useLastCumulativeRate from "@/hookes/contract-hooks/useGetLastCumulativeRate";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";
import displayNumberWithPrecision, {
  daysFromTimestamp,
  formatTimestamp,
} from "@/utils/helpers";
import { useEffect, useRef, useState } from "react";

export function WithdrawModal({
  position,
  isDialogOpen,
  setIsDialogOpen,
}: {
  position: PositionData;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) {
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

  const dcdsWidthDrawMetrics = [
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

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[700px] bg-white ">
        <div
          style={{
            fontSize: "28px",
            fontWeight: "500",
          }}
        >
          Withdraw Fund
        </div>
        <div className="flex justify-between mt-8 mb-6 text-textBlack">
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
        </div>
        <div>
          {dcdsWidthDrawMetrics.map((dcdsWidthDrawMetricsObj, idx) => {
            return (
              <div key={idx} className="flex justify-between mb-6">
                <span className="text-[18px] font-medium text-grayLight">
                  {" "}
                  {dcdsWidthDrawMetricsObj.heading}
                </span>
                <span className="text-[18px] font-medium text-textBlack">
                  {dcdsWidthDrawMetricsObj.value}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex w-full">
          <div className="flex-1 w-full items-center gap-4 border border-solid border-grayLight p-3 font-medium">
            <Label htmlFor="r2" className="text-[18px]">
              45%
            </Label>
          </div>
          <div className="flex-1 items-center gap-4 border border-solid border-grayLight p-3">
            <Label htmlFor="r3" className="text-[18px]">
              +$100
            </Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
