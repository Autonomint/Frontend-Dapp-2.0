import ethereumIcon from "@/app/assets/ethereum-icon.svg";
import WalletIcon from "@/app/assets/wallet-01.svg";
import Popup from "@/components/ui/PopUp";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface WalletPopupProps {
  //   twitter: string; // Path to the twitter icon image
}

const WalletPopup: React.FC<WalletPopupProps> = ({}) => {
  return (
    <Button
      variant={"shadowOutline"}
      className="border-[#041A50] p-0 gap-0  h-fit "
    >
      <div className="py-[10px] px-4 bg-[#ABFFDE] ">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative flex items-center gap-0">
              <Image
                src={ethereumIcon}
                alt="ethereum icon"
                width={24}
                height={24}
              />
              <ChevronDownIcon className="w-4 h-4 " />
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-full border border-gray-200 rounded-md shadow-md"
          >
            <div className="flex flex-col"></div>
          </PopoverContent>
        </Popover>
      </div>
      <Popup
        title="Wallet Info"
        content={
          <div className="relative flex p-[10px] px-5  border-solid border-l-2 border-black flex-row items-center gap-3 ">
            <Image alt="wallet" width={24} height={24} src={WalletIcon} />
            <Typography size="body" className="">
              0x7y3...937j8
            </Typography>
          </div>
        }
        contentClass="!left-[unset] right-[-12px] top-[50px]"
      >
        <div className="flex mt-8 flex-row justify-between items-center">
          <Typography size="lg" className="" variant="regular">
            USDa Balance
          </Typography>
          <Typography size="lg" className="text-[#7A7A7A]" variant="regular">
            ETH Sepolia
          </Typography>
        </div>
        <div className="flex mt-3 flex-row justify-start items-center">
          <Typography variant="regular" size="subtitle">
            $18,290
          </Typography>
        </div>
        <Button
          variant={"default"}
          className="border-[#041A50] mt-8 h-fit text-[24px] font-normal  w-full p-[10px]"
        >
          Disconnect
        </Button>

        <div className="flex mt-8 flex-row justify-between items-center">
          <Typography
            size="lg"
            className="text-[#111111] underline-offset-2 underline"
            variant="regular"
          >
            View All Wallet Transactions
          </Typography>
          <Typography
            className="text-[#7A7A7A] underline-offset-2 underline"
            variant="regular"
          >
            Terms & Privacy Policy
          </Typography>
        </div>
      </Popup>
    </Button>
  );
};

export default WalletPopup;
