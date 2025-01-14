"use client";
import React from "react";
import { WithdrawModal } from "../../custom-components/popups/WithdrawModal";
import Image from "next/image";
import tokenImage from "../assets/Vector (6).png";
import { Button } from "@/components/ui/button";
import add from "../assets/add-01.png";
import dcdsFrame from "../assets/Frame 350.png";
import dcdsDarkFrame from "../assets/Frame 350.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import AppNavbar from "@/custom-components/AppNavbar";
import { useTheme } from "next-themes";

function TokenTvlDetails() {
  return (
    <div className="bg-gradient-to-b from-[#E5F3FF] to-[#E5F3FF] p-8 flex justify-between border border-solid border-grayLight border-b-0 dark:bg-none">
      <div className="flex flex-col gap-8">
        <Image src={tokenImage} alt="token" width={32} height={32} />
        <span className="text-[24px] text-textBlack dark:text-white">USDc</span>
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-[18px] font-normal text-right text-grayLight dark:text-white">
          TVL
        </span>
        <span className="text-[24px] font-medium text-textBlack dark:text-white">
          $100,000,000
        </span>
      </div>
    </div>
  );
}

function AdditionalDCDSMetrics() {
  return (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium ofnt-plex-grotesk">
          APY
        </span>
        <span className="text-grayLight text-[18px] font-medium ofnt-plex-grotesk">
          --
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium ofnt-plex-grotesk">
          Depositing
        </span>
        <span className="text-grayLight text-[18px] font-medium ofnt-plex-grotesk">
          --
        </span>
      </div>
    </div>
  );
}

function SelectToken() {
  return (
    <div className="flex flex-col mt-4">
      <Label htmlFor="network" className=" text-grayLight text-lg font-medium">
        Select Token
      </Label>
      <Input
        className="rounded-none border border-grayLight font-medium"
        placeholder="Amount"
      />{" "}
      <div className="mt-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-between w-full h-17 px-3 border border-grayLight rounded-md text-textBlack  text-[24px] dark:text-white"
            >
              3 months
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-full border border-gray-200 rounded-md shadow-md"
          >
            <div className="flex flex-col"></div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function AddToken({
  tokenImage,
  tokenName,
}: {
  tokenImage: any;
  tokenName: string;
}) {
  return (
    <div className="border border-solid border-grayLight p-5 relative">
      <div className="flex flex-col gap-4">
        <Image src={tokenImage} alt="token" />
        <span className="text-[24px] text-textBlack dark:text-white">
          {tokenName}
        </span>
      </div>
      <Button className="bg-black absolute right-0 top-0 h-full dark:bg-custom-gradient-to-bottom">
        <Image src={add} alt="add" />
      </Button>
    </div>
  );
}
function page() {
  const { theme } = useTheme();
  const tokenList = [
    {
      tokenImage: tokenImage,
      tokenName: "USDc",
    },
    {
      tokenImage: tokenImage,
      tokenName: "USDc",
    },
    {
      tokenImage: tokenImage,
      tokenName: "USDc",
    },
    {
      tokenImage: tokenImage,
      tokenName: "USDc",
    },
  ];
  return (
    <div>
      <AppNavbar activeBack={false} />
      <div className="grid lg:grid-cols-4 grid-cols-1">
        <div className="col-span-1 flex flex-col p-5 gap-8 border border-t-0 border-grayLight border-solid">
          {tokenList.map((token, key) => {
            return (
              <AddToken
                key={key}
                tokenImage={token.tokenImage}
                tokenName={token.tokenName}
              />
            );
          })}
        </div>
        <div className="hidden lg:flex col-span-2  flex-col items-center justify-center relative">
          <Image src={dcdsFrame} alt="dcds" />
          <span className="absolute left-3 bottom-3 underline  text-textBlack font-medium dark:text-white">
            How it works?
          </span>
          <div className="mt-[12px] border border-solid">
            <span className=" text-[12px] bg-[#FFE0E0] text-[#FF0000] px-3 py-2">
              This fund will be exposed to liquidation risks
            </span>
          </div>
        </div>
        <div className="col-span-1 border border-solid border-grayLight  border-t-0 flex flex-col justify-between">
          <div className="p-5">
            <span className=" text-textBlack text-[24px] font-medium text-white">
              Deposit Funds
            </span>
            <SelectToken />
            <div className="py-4 flex">
              <span className="text-grayLight font-normal  text-[18px]">
                Opt for liquidity gains?
              </span>
            </div>
            <div className="p-3 bg-[#FFF0CA] text-[12px]  text-grayLight font-medium dark:text-[#D6A100] dark:bg-[#4F3800]">
              Note: Your amount will be used to offer protection to borrowers &
              protocol in return for fixed yields
            </div>
          </div>
          <div>
            <AdditionalDCDSMetrics />
            <Button className="bg-black text-white text-[24px]  min-h-20 w-full dark:bg-custom-gradient-to-bottom">
              Deposit
            </Button>
          </div>
        </div>
      </div>
      <TokenTvlDetails />
      <TokenTvlDetails />
      <TokenTvlDetails />
    </div>
  );
}

export default page;
