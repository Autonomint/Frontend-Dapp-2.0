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

export function WithdrawModal({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) {
  const dcdsWidthDrawMetrics = [
    {
      heading: "Fee Gained",
      value: "$120",
    },
    {
      heading: "Deposited Time",
      value: "12 DEC • 2024 • 10:45 PM",
    },
    {
      heading: "ETH price at deposit",
      value: "$3,890",
    },
    {
      heading: "Lock In Period",
      value: "3 Months",
    },
    {
      heading: "Deposit-time APR & Current APR",
      value: "34%/67%",
    },
    {
      heading: "Days passed since Deposit",
      value: "35 Days",
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
            $1,290
          </span>
        </div>
        <div>
          {dcdsWidthDrawMetrics.map((dcdsWidthDrawMetricsObj) => {
            return (
              <div className="flex justify-between mb-6">
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
