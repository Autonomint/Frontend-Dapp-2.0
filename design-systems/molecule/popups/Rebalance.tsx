import { Button } from "@/design-systems/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/design-systems/atoms/dialog";
import { Label } from "@/design-systems/atoms/label";
import { RadioGroup, RadioGroupItem } from "@/design-systems/atoms/radio-group";

export function RebalancePopup({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[700px] bg-white">
        <div
          style={{
            fontSize: "28px",
            fontWeight: "500",
          }}
        >
          Rebalance
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "500",
          }}
        >
          Current Token Deposited
        </div>
        <div className="flex flex-col w-full gap-6 ">
          <div className="flex justify-between">
            <span className="text-grayLight text-[20px]">USDa</span>
            <span className="text-textBlack text-[20px]">$500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-grayLight text-[20px]">USDT</span>
            <span className="text-textBlack text-[20px]">$500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-grayLight text-[20px]">Mode</span>
            <span className="text-textBlack text-[20px]">$500</span>
          </div>
        </div>
        <div className="p-3 bg-[#FFF0CA] text-[16px]  text-grayLight font-normal">
          Will be converted to USDT at 30% price fall
        </div>
        <div className="flex justify-between bg-[#AFAFAF]">
          <div
            className="text-[20px]"
            style={{
              color: "#AFAFAF",
            }}
          >
            70% of deposited price
          </div>
          <div className="text-textBlack text-[20px]">$1000</div>
        </div>
        <div className="p-3 bg-[#FFF0CA] text-[16px]  text-grayLight font-normal">
          Will be converted to USDT at 30% price fall
        </div>
        <RadioGroup defaultValue="moreRebalance" className="flex gap-0">
          <div className="flex items-center gap-4 border border-solid border-grayLight p-3">
            <RadioGroupItem value="moreRebalance" id="r2" />
            <Label htmlFor="r2" className="text-[18px]">
              Mode Rebalance This
            </Label>
          </div>
          <div className="flex items-center gap-4 border border-solid border-grayLight p-3">
            <RadioGroupItem value="optimismRebalace" id="r3" />
            <Label htmlFor="r3" className="text-[18px]">
              Optimism Rebalance This
            </Label>
          </div>
        </RadioGroup>
        <div className="p-3 bg-[#ABFFDE] text-[16px]  text-textBlack font-normal">
          Will be converted to USDT at 30% price fall
        </div>
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-grayLight text-[20px] ">
              Add 70% of increase to dCDS
            </span>
            <span
              style={{
                color: "#AFAFAF",
              }}
            >
              ($140 will be on converted to USDT on 30% price decrease)
            </span>
          </div>
          <div className="text-[20px] text-textBlack">$140</div>
        </div>
        <Button
          className="bg-textBlack text-white p-8"
          style={{
            fontSize: "30px",
          }}
        >
          Rebalance
        </Button>
      </DialogContent>
    </Dialog>
  );
}
