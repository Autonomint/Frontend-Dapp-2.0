import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useState } from "react";
import { useAccount } from "wagmi";

interface HowItWorks {
  //   twitter: string; // Path to the twitter icon image
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wrapperClassName?: string;
}

const HowItWorksPopUp: React.FC<HowItWorks> = ({
  wrapperClassName,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={wrapperClassName}>
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="w-[750px] max-w-none  bg-white dark:bg-[#0D0D0D] md:p-8 gap-0">
          <div className="col-span-2  ">
            <div className="flex flex-col justify-start">
              <div className=" text-textBlack text-center text-3xl font-medium dark:text-white">
                How it works?
              </div>
              <div className=" text-textBlack text-center text-[20px] font-normal mt-8 dark:text-white">
                Deposit in dCDS to earn option fees while hedging up to 20% of
                ETH downside. Gains and losses from ETH price movements are
                distributed based on collateral to dCDS funds ratio
              </div>
              <ol className="list-decimal list-outside pl-4 mt-8 text-grayLight">
                <li className="mb-3 text-lg">
                  Deposit Any Token – Click ‘+’ to deposit stablecoins or
                  tokens. Some limits apply—for example, if you deposit $100 in
                  USDa, you can add $20 in USDT.
                </li>
                <li className="mb-3 text-lg">
                  Set Lock Period – Choose how long your funds stay locked to
                  provide collateral protection.
                </li>
                <li className="mb-3 text-lg">
                  Enable Liquidation Gains – Opt-in to let the protocol use your
                  capital for liquidations and earn additional rewards.
                </li>
                <li className="mb-3 text-lg">
                  Confirm Deposit – Click ‘Deposit’ to finalize your
                  participation.
                </li>
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HowItWorksPopUp;
