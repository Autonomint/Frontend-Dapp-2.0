import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/utils/helpers";
import useDepositStakeTokens from "@/hookes/contract-hooks/useStakeBorrow";
import ToastNotificationError from "../toasts/ToastNotificationError";
import { toast } from "sonner";
import { PositionData } from "@/utils/interface";
import { useAccount } from "wagmi";
import { posix } from "node:path";
import useGetBorrowSignedData from "@/hookes/api-hooks/useGetBorrowSignedData";
import useApproveUsda from "@/hookes/contract-hooks/useApproveUsda";
import {
  borrowAssetsAddress,
  borrowCoreAddress,
  borrowDepositCoreAddress,
} from "@/blockchain/contracts";
import { parseUnits } from "ethers";
import { BorrowStatus } from "@/utils/constants";
import useGetStakingGain from "@/hookes/api-hooks/useGetStakingGain";
import { Label } from "@/design-systems/atoms/label";
import { getIconMapping } from "@/utils/token-config";
import Image from "next/image";
import useFetchOptionFees from "@/hookes/api-hooks/useOptionFee";
import useGetUsdValue from "@/hookes/contract-hooks/useGetUsdValue";

type StakePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  mintedAmount?: number;
  position: any;
  refetchData?: () => void;
};

export function StakePopup({
  isOpen,
  onClose,
  isLoading = false,
  mintedAmount = 0,
  position,
  refetchData,
}: StakePopupProps) {
  const { address, chainId } = useAccount();
  const minAmount = (Number(position.noOfUSDaMinted) * 0.5).toFixed(2);
  const minDepositAmount = Number(position.noOfUSDaMinted) * 0.5;
  const validationSchema = Yup.object({
    amount: Yup.string()
      .required("Amount is required")
      .test("is-valid-amount", "Please enter a valid amount", (value) => {
        if (!value) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue > 0;
      })
      .test(
        "min-amount",
        `Amount must be at least 50% of your deposited amount`,
        function (value) {
          if (!value) return false;
          const numValue = Number(value);
          return numValue >= minDepositAmount;
        },
      ),
  });

  const token =
    position?.collateralType === "cbBTC"
      ? "cbBTC"
      : position?.collateralType === "krwq"
        ? "krwq"
        : position?.collateralType === "EURC"
          ? "EURC"
          : "ETH";

  const { stakingGain } = useGetStakingGain(
    position?.index,
    token,
    isOpen,
    false,
  );

  const {
    approveReset,
    approveUsdaDynamic,
    approveUsda,
    usdaApproveLoading,
    usdaApproveErrorData,
  } = useApproveUsda({});

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleStake(values.amount);
    },
  });

  const {
    stakeTokens,
    unstakeTokens,
    resetStake,
    depositStakeError,
    isWithdrawStakeLoading,
    withdrawStakeDataHash,
    withdrawStakeError,
    isWithdrawUnStakeLoading,
    withdrawUnStakeDatahash,
    withdrawUnStakeError,
  } = useDepositStakeTokens(
    {
      onError: (data: any) => {
        toast.custom((t) => {
          return (
            <ToastNotificationError
              title="Transaction failed, Please try again"
              onClose={() => toast.dismiss(t)}
            />
          );
        });
      },
    },
    popUpresetter,
  );

  // Custom hook to fetch the borrow signed data
  const { refetchBorrowSignedData } = useGetBorrowSignedData();

  const handleStake = async (amount: string) => {
    try {
      // fetch the borrow signed data
      const borrowSignedData = await refetchBorrowSignedData({
        token:
          position.collateralType === "KRWQ" ? "krwq" : position.collateralType,
        duration: position.hedgeValidity,
      });
      if (position.status === "STAKED") {
        unstakeTokens({
          user: address as `0x${string}`,
          index: position.index,
          verifyParams: borrowSignedData as any,
          assetName: 12,
        });
      } else {
        await approveUsdaDynamic(
          parseUnits(String(amount || 0), 6),
          borrowDepositCoreAddress[
          chainId as keyof typeof borrowDepositCoreAddress
          ] as `0x${string}`,
        );

        await stakeTokens({
          user: address as `0x${string}`,
          index: position.index,
          stakingAmount: parseUnits(String(amount || 0), 6),
          verifyParams: borrowSignedData as any,
          assetName: 12,
        });
      }
    } catch (error) { }
  };

  function popUpresetter() {
    // onClose();
    resetStake();
    formik.resetForm();
    refetchData?.();
  }

  const value1 = Number(stakingGain?.hedge || 0);

  const value2 =
    (Number(position.depositedAmount || 0) * Number(position.ethPrice)) /
    (position.collateralType == "EURC" ? 1e6 : 1e8);

  const finalValue = (value1 / value2) * 100;

  // Custom hook to fetch the Price of the selected asset
  const {
    isUsdValuePending,
    usdValue: ethPrice,
    assetPrice,
    exchangeRate,
    unformattedValue,
  } = useGetUsdValue(
    borrowAssetsAddress[
    position.collateralType?.toLocaleLowerCase() === "krwq"
      ? "ETH"
      : (position.collateralType as keyof typeof borrowAssetsAddress)
    ],
    position.collateralType?.toLocaleLowerCase() === "krwq",
    position.collateralType?.toLocaleLowerCase() === "eurc",
  );

  //getting option fees for selected amount
  const { optionFees, refetchOptionFee, Fees } = useFetchOptionFees(
    String(1),
    (position.collateralType === "krwq"
      ? parseUnits(String(assetPrice), 8)
      : position.collateralType === "EURC"
        ? parseUnits(String(assetPrice), 6)
        : assetPrice || 0) as number,
    0.15,
    position.collateralType === "cbBTC"
      ? "BTC"
      : position.collateralType === "krwq"
        ? "krwq"
        : position.collateralType === "EURC"
          ? "EURC"
          : "ETH",
    Number(1),
  );

  const priceFormatted =
    Number(position.ethPrice) / (position.collateralType == "EURC" ? 1e6 : 1e8);

  const premiumPercentage = (
    (Number(optionFees) / priceFormatted) *
    100
  ).toFixed(2);

  console.log(
    position.collateralType,
    optionFees,
    Number(stakingGain?.premium),
    Number(position.ethPrice),
    Number(position.ethPrice) / (position.collateralType == "EURC" ? 1e6 : 1e8),
    ((Number(optionFees) / priceFormatted) * 100).toFixed(2),
    "check",
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[98%] sm:max-w-[425px] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl flex gap-1 justify-start items-center font-semibold text-gray-900 dark:text-white">
              Stake Your Tokens{" "}
              <span>
                <Image
                  width={26}
                  height={26}
                  alt="image"
                  src={getIconMapping("dark", position.collateralType)}
                />
              </span>
            </h2>
            <p className="text-sm text-grayLight">You can unstake anytime</p>
          </div>

          {position.status === BorrowStatus.STAKED && (
            <div>
              <div className="w-full flex items-center justify-between px-4">
                <div className="flex flex-col  items-start">
                  <p className="text-2xl font-bold text-center text-grayLight"></p>
                  <Label className=" text-[22px] font-bold  md:text-[26px] text-green-600 dark:text-green-500  ">
                    ${Number(stakingGain?.hedge || 0).toFixed(4)}{" "}
                  </Label>

                  <Label className="text-[14px] font-normal text-[#777777]">
                    Hedge Earnings
                  </Label>
                  <Label className="text-[14px] font-normal text-[#777777]">
                    Yield Till Now - {finalValue.toFixed(2)}%
                  </Label>
                </div>
                <div className="flex flex-col  items-center">
                  <p className="text-2xl font-bold text-center text-grayLight"></p>
                  <Label className=" text-[22px] font-bold  md:text-[26px] text-black dark:text-white  ">
                    ${Number(stakingGain?.premium || 0).toFixed(4)}
                  </Label>

                  <Label className="text-[14px] font-normal text-[#777777]">
                    Premium Paid
                  </Label>
                  <Label className="text-[14px] font-normal text-[#777777]">
                    (To Hedge {position.collateralType} Price)
                  </Label>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {position.status != BorrowStatus.STAKED && (
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="0.0"
                    className={cn(
                      "w-full p-3 text-base bg-transparent border border-gray-200 dark:border-grayLight rounded-md",
                      "focus:outline-none focus:ring-0 focus:border-gray-400 dark:focus:border-gray-300 text-gray-900 dark:text-white",
                      formik.touched.amount && formik.errors.amount
                        ? "border-red-500 dark:border-red-500"
                        : "hover:border-gray-300 dark:hover:border-gray-400",
                    )}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  {formik.touched.amount && formik.errors.amount ? (
                    <p className="text-sm text-red-500">
                      {formik.errors.amount}
                    </p>
                  ) : (
                    <div />
                  )}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Min. Amount - {minAmount} USDA+
                  </div>
                </div>
              </div>
            )}

            {position.status == BorrowStatus.STAKED ? (
              <Button
                onClick={() => handleStake("0")}
                variant="default"
                className="w-full py-6 text-xl font-medium"
              //   disabled={isLoading || !formik.isValid || !formik.dirty}
              >
                {isLoading ||
                  isWithdrawUnStakeLoading ||
                  isWithdrawStakeLoading ||
                  usdaApproveLoading
                  ? usdaApproveLoading
                    ? "Approving..."
                    : isWithdrawStakeLoading
                      ? "Staking..."
                      : "Unstaking..."
                  : position.status == BorrowStatus.STAKED
                    ? "Unstake"
                    : "Stake"}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                className="w-full py-6 text-xl font-medium"
              //   disabled={isLoading || !formik.isValid || !formik.dirty}
              >
                {isLoading ||
                  isWithdrawUnStakeLoading ||
                  isWithdrawStakeLoading ||
                  usdaApproveLoading
                  ? usdaApproveLoading
                    ? "Approving..."
                    : isWithdrawStakeLoading
                      ? "Staking..."
                      : "Unstaking..."
                  : "Stake"}
              </Button>
            )}
            {position.status === BorrowStatus.STAKED && position.stakedTime && (
              <div className="text-sm flex justify-between items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <div>
                  <span className="font-medium">Staking Date:</span>{" "}
                  {new Date(
                    Number(position.stakedTime) * 1000,
                  ).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Daily Premium:</span>{" "}
                  {premiumPercentage}%
                </div>
              </div>
            )}
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p>
                Daily hedge earnings follow{" "}
                {position.collateralType?.toUpperCase()} price movement — if it
                drops, the loss is hedged and added as earnings; if it rises,
                you keep the gain.
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <p>
                Note - Staking runs in 3-month periods. At the end of each
                period, funds are automatically unstaked and rewards stop. To
                keep earning, you&apos;ll need to unstake, repay USDA+, then
                mint and stake again.
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
