import { Button } from "@/design-systems/atoms/button";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/utils/helpers";
import useDepositStakeTokens from "@/hookes/contract-hooks/useStakeBorrow";
import ToastNotificationError from "../toasts/ToastNotificationError";
import { toast } from "sonner";
import { PositionData } from "@/utils/interface";

type StakePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  mintedAmount?: number;
  position: PositionData;
};

export function StakePopup({
  isOpen,
  onClose,
  isLoading = false,
  mintedAmount = 0,
  position,
}: StakePopupProps) {
  const minAmount = (mintedAmount * 0.5).toFixed(2);
  const validationSchema = Yup.object({
    amount: Yup.string()
      .required("Amount is required")
      .test("is-valid-amount", "Please enter a valid amount", (value) => {
        if (!value) return false;
        const numValue = Number(value);
        return !isNaN(numValue) && numValue > 0;
      }),
  });

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
  } = useDepositStakeTokens({
    onError: () => {
      toast.custom((t) => {
        return (
          <ToastNotificationError
            title="Transaction failed, Please try again"
            onClose={() => toast.dismiss(t)}
          />
        );
      });
    },
  });

  const handleStake = (amount: string) => {
    // stakeTokens({
    //   user: "0x123",
    //   index: 0,
    //   stakingAmount: amount,
    //   verifyParams: {
    //     volatility: "0x123",
    //     ethPrice: "0x123",
    //     expiredETHAmount: "0x123",
    //     plFromExpired: "0x123",
    //     premiumCv: "0x123",
    //     hedgeCv: "0x123",
    //     optionFees: "0x123",
    //     odosAssembledData: "0x123",
    //     deadline: "0x123",
    //     signature: "0x123",
    //   },
    //   assetName: 12,
    // });
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[98%] sm:max-w-[425px] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Stake Your Tokens
            </h2>
            <p className="text-sm text-grayLight">You can unstake anytime</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                  <p className="text-sm text-red-500">{formik.errors.amount}</p>
                ) : (
                  <div />
                )}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Min. Amount - {minAmount} USDA+
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full py-6 text-xl font-medium"
              //   disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? "Processing..." : "Stake"}
            </Button>

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
