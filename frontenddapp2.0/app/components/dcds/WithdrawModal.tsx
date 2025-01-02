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

export function WithdrawModal() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-white font-plex-grotesk">
        <div className="text-[30px] font-medium text-textBlack">
          Withdraw Fund
        </div>
        <div className="flex justify-between mt-8 mb-6 text-textBlack">
          <span className="text-[30px] font-medium ">USDa Deposited</span>
          <span className="text-[30px] font-medium">$1,290</span>
        </div>
        <div>
          {dcdsWidthDrawMetrics.map((dcdsWidthDrawMetricsObj) => {
            return (
              <div className="flex justify-between mb-8">
                <span className="text-[24px] font-medium text-grayLight font-plex-grotesk">
                  {" "}
                  {dcdsWidthDrawMetricsObj.heading}
                </span>
                <span className="text-[24px] font-medium text-textBlack font-plex-grotesk">
                  {dcdsWidthDrawMetricsObj.value}
                </span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
