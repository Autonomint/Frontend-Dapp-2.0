import { Button } from "@/design-systems/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
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
      <DialogContent className="max-w-[98%] sm:max-w-[610px] dark:bg-[#0D0D0D]  bg-white">
        <DialogTitle className="text-2xl font-semibold "></DialogTitle>

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
        <div className="flex flex-col w-full gap-4 ">
          <div className="flex justify-between">
            <span className="text-grayLight text-[20px]">USDa</span>
            <span className="text-textBlack text-[20px] dark:text-white">
              $500
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-grayLight text-[20px]">USDT</span>
            <span className="text-textBlack text-[20px] dark:text-white">
              $500
            </span>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-grayLight text-[20px]">Mode</span>
              <span className="text-textBlack text-[20px] dark:text-white">
                $500
              </span>
            </div>
            <div className="p-3 mt-2 bg-[#FFF0CA] text-[16px]  dark:bg-[#4F3800] dark:text-[#D6A100] text-grayLight font-normal">
              Will be converted to USDT at 30% price fall
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex  justify-between ">
            <div
              className="text-[20px]"
              style={{
                color: "#AFAFAF",
              }}
            >
              <span className="font-semibold text-[#7A7A7A]">OP</span> 70% of
              deposited price
            </div>
            <div className="text-textBlack text-[20px] dark:text-white">
              $1000
            </div>
          </div>
          <div className="p-3 mt-2 dark:bg-[#4F3800] dark:text-[#D6A100]   bg-[#FFF0CA] text-[16px]  text-grayLight font-normal">
            Will be converted to USDT at 30% price fall
          </div>
        </div>

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
                  // checked={toggleView === "repay"}
                  // onChange={() => setToggleView("repay")}
                  className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                  id="repay"
                />
                <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
            </div>
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-2 ms-3 text-[18px]  sm:text-xl md:text-[20px] font-medium text-textBlack  dark:text-white"
            >
              Mode Rebalance This
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
                  // onChange={() => setToggleView("renew")}
                  // checked={toggleView === "renew"}
                  className="peer h-4 w-4  md:h-6 md:w-6 cursor-pointer appearance-none rounded-full  border-[3px] md:border-[4px] dark:border-white  border-black dark:checked:border-white checked:border-black transition-all"
                  id="renew"
                />
                <span className="absolute dark:bg-white bg-black w-2 h-2 md:w-3 md:h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
            </div>
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-2 ms-3 text-[18px]  sm:text-xl md:text-[20px]  text-textBlack font-medium  dark:text-white "
            >
              Optimism Rebalance This
            </label>
          </div>
        </div>
        <div className="p-3 bg-[#ABFFDE] text-[16px]  text-textBlack font-normal">
          Dollar value increase from deposited price to $200
        </div>
        <div className="flex items-center justify-between">
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
          <div className="text-[20px] text-textBlack dark:text-white">$140</div>
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
