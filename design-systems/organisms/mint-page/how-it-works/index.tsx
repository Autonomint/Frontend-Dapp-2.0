import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/design-systems/atoms/dialog";
import { Typography } from "@/design-systems/atoms/Typography";
import React from "react";

interface HowItWorks {
  //   twitter: string; // Path to the twitter icon image
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wrapperClassName?: string;
}

const HowItWorksBorrowPopUp: React.FC<HowItWorks> = ({
  wrapperClassName,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className=" w-[98%] overflow-y-scroll h-[500px] lg:h-auto rounded-lg no-scrollbar lg:w-[750px] max-w-none  bg-white dark:bg-[#0D0D0D] md:p-8 gap-0">
        <DialogTitle className="text-2xl font-semibold "></DialogTitle>

        <div className="col-span-2  ">
          <div className="flex flex-col justify-start">
            <div className=" text-textBlack text-center text-[24px] md:text-3xl font-medium dark:text-white">
              How it works?
            </div>
            <div className=" w-fit mx-auto    mt-6  p-1 2xl:p-2">
              <div className="flex flex-col justify-start">
                <ol className="list-decimal list-outside pl-4 mt-3 text-grayLight">
                  <li className="mb-2 text-lg">
                    Deposit ETH/LRTs as collateral and mint USDA+ (up to 80% of
                    collateral value).
                  </li>
                  <li className="mb-2 text-lg">
                    Get 20% downside price fall protection on collateral with 1
                    month expiry, with option to renew every month.
                  </li>
                  <li className="mb-2 text-lg">
                    Pay a closing option fee, ~60% lower than charged in any
                    derivative platform.
                  </li>
                  <li className="mb-2 text-lg">
                    Track and manage positions under ‘Borrowed Position’ in
                    Portfolio.
                  </li>
                  <li className=" text-lg">
                    Earn yield-bearing ABOND tokens when closing your position.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksBorrowPopUp;
