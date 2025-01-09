import React from "react";
import { WithdrawModal } from "../../customComponents/popups/WithdrawModal";
import Image from "next/image";
import tokenImage from "../assets/Vector (6).png";
import { Button } from "@/components/ui/button";
import add from "../assets/add-01.png";
import dcdsFrame from "../assets/Frame 350.png";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import AppNavbar from "@/customComponents/AppNavbar";

function TokenTvlDetails() {
  return (
    <div className="bg-gradient-to-b from-[#E5F3FF] to-[#E5F3FF] p-8 flex justify-between border border-solid border-grayLight border-b-0">
      <div className="flex flex-col gap-8">
        <Image src={tokenImage} alt="token" width={32} height={32} />
        <span className="text-[24px] text-textBlack">USDc</span>
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-[18px] font-normal text-right text-grayLight">
          TVL
        </span>
        <span className="text-[24px] font-medium text-textBlack">
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
        className="rounded-none border border-GrayLight font-medium"
        placeholder="Amount"
      />{" "}
      <div className="mt-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-between w-full h-17 px-3 border border-grayLight-1 rounded-md text-textBlack  text-[24px]"
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
        <span className="text-[24px] text-textBlack">{tokenName}</span>
      </div>
      <Button className="bg-black absolute right-0 top-0 h-full">
        <Image src={add} alt="add" />
      </Button>
    </div>
  );
}
function page() {
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
      <AppNavbar />
      <div className="grid lg:grid-cols-4 grid-cols-1">
        <div className="col-span-1 flex flex-col p-5 gap-8 border border-solid">
          {tokenList.map((token) => {
            return (
              <AddToken
                tokenImage={token.tokenImage}
                tokenName={token.tokenName}
              />
            );
          })}
        </div>
        <div className="hidden lg:flex col-span-2  flex-col items-center justify-center border border-solid relative">
          <Image src={dcdsFrame} alt="dcds" />
          <span className="absolute left-3 bottom-3 underline  text-textBlack font-medium">
            How it works?
          </span>
          <div className="mt-[12px] border border-solid">
            <span className=" text-[12px] bg-[#FFE0E0] text-[#FF0000] px-3 py-2">
              This fund will be exposed to liquidation risks
            </span>
          </div>
        </div>
        <div className="col-span-1 border border-solid flex flex-col justify-between">
          <div className="p-5">
            <span className=" text-textBlack text-[24px] font-medium">
              Deposit Funds
            </span>
            <SelectToken />
            <div className="py-4 flex">
              <span className="text-grayLight font-normal  text-[18px]">
                Opt for liquidity gains?
              </span>
            </div>
            <div className="p-3 bg-[#FFF0CA] text-[12px]  text-grayLight font-medium">
              Note: Your amount will be used to offer protection to borrowers &
              protocol in return for fixed yields
            </div>
          </div>
          <div>
            <AdditionalDCDSMetrics />
            <Button className="bg-black text-white text-[24px]  min-h-20 w-full">
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
