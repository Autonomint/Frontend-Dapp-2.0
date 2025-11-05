import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/design-systems/atoms/dialog";
import { Typography } from "@/design-systems/atoms/Typography";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import useGetTvl from "@/hookes/contract-hooks/useGetLtv";
import { AssetName } from "@/utils/constants";

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

  const { isTvlPending, tvlValue: ltv } = useGetTvl(AssetName.ETH);

  // Calculate the downside protection amount
  const downsideProtection = ltv?.LTV ? 100 - Number(ltv?.LTV || 0) : 0;
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className=" w-[98%] overflow-y-scroll h-[500px] lg:h-auto rounded-lg no-scrollbar lg:w-[750px] max-w-none  bg-white dark:bg-[#0D0D0D] md:p-8 gap-0">
        <DialogTitle className="text-2xl font-semibold "></DialogTitle>

        <div className="col-span-2  ">
          <div className="flex flex-col justify-start">
            <div className=" text-textBlack text-center text-[24px] md:text-3xl font-medium dark:text-white">
              How it works?
            </div>
            <div className="bg-[#FFE0E0] w-fit mx-auto xl:hidden text-center dark:bg-[#380000] mt-6  p-1 2xl:p-2">
              <Typography
                size="lg"
                className="text-[#FF0000] text-center dark:text-[#FF1A1A] !text-[14px] 2xl:!text-[18px] font-medium"
                variant="regular"
              >
                dCDS will be exposed to ETH volatility risks.
              </Typography>
            </div>
            <div className=" text-textBlack text-center  text-[16px] md:text-[20px] font-normal mt-4 dark:text-white">
              Deposit into dCDS to earn option premiums while offering downside
              protection of up to {downsideProtection}% on ETH or cbBTC. Profits
              and losses from ETH or cbBTC price changes are allocated across
              dCDS participants based on the ratio of total borrower collateral
              to dCDS pool funds.
            </div>
            <ol className="list-decimal list-outside pl-4 mt-8 text-grayLight">
              <li className="mb-3 text-[14px] md:text-lg">
                Deposit Any Token – Click ‘+’ to deposit stablecoins or tokens.
              </li>
              <li className="mb-3 text-[14px] md:text-lg">
                Set Lock Period – Choose how long your funds stay locked to
                provide collateral protection and earn option premiums.
              </li>
              <li className="mb-3 text-[14px] md:text-lg">
                Enable Liquidation Gains – Opt-in to let the protocol use your
                capital for liquidations and earn additional rewards.
              </li>
              <li className="mb-3 text-[14px] md:text-lg">
                Confirm Deposit – Click ‘Deposit’ to finalize your
                participation.
              </li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksPopUp;
