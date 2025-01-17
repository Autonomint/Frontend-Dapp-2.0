"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Spinner from "../assets/Spinner@1x-1.0s-200px-200px (2).svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HiOutlineExternalLink } from "react-icons/hi";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import AppNavbar from "@/custom-components/AppNavbar";
import { useTheme } from "next-themes";
import tokenImage from "../assets/Vector (6).png";
import add from "../assets/add-01.png";
import minus from "../assets/minus-sign.png";
import dcdsFrame from "../assets/Frame 350.png";
import dcdsDark from "../assets/Frame 350 (1).svg";
import centerImage1 from "../assets/Vector (1).svg";
import centerImage2 from "../assets/cryptocurrency-color_usdt.svg";
import { toast, Toaster } from "sonner";
import ToastNotification from "@/custom-components/toasts/ToastNotification";

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
        <span className="text-grayLight text-[18px] font-medium">APY</span>
        <span className="text-grayLight text-[18px] font-medium">--</span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium">
          Depositing
        </span>
        <span className="text-grayLight text-[18px] font-medium">--</span>
      </div>
    </div>
  );
}

function SelectToken() {
  return (
    <div className="flex flex-col mt-4">
      <Label htmlFor="network" className="text-grayLight text-lg font-medium">
        Select Token
      </Label>
      <Input
        className="rounded-none border border-grayLight font-medium"
        placeholder="Amount"
      />
      <div className="mt-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex justify-between w-full h-17 px-3 border border-grayLight rounded-md text-textBlack text-[24px] dark:text-white"
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
  setSelectedTokens,
  selectedTokens,
}: {
  tokenImage: any;
  tokenName: string;
  setSelectedTokens: React.Dispatch<
    React.SetStateAction<{ tokenImage: any; tokenName: string }[]>
  >;
  selectedTokens: { tokenImage: any; tokenName: string }[];
}) {
  const isSelected = selectedTokens.some(
    (token) => token.tokenName === tokenName
  );

  const toggleToken = () => {
    setSelectedTokens((prev) => {
      if (isSelected) {
        return prev.filter((token) => token.tokenName !== tokenName);
      } else {
        return [...prev, { tokenImage, tokenName }];
      }
    });
  };

  return (
    <div className="border border-solid border-grayLight p-5 relative">
      <div className="flex flex-col gap-4">
        <Image src={tokenImage} alt="token" width={30} height={30} />
        <span className="text-[24px] text-textBlack dark:text-white">
          {tokenName}
        </span>
      </div>
      <Button
        onClick={toggleToken}
        className="bg-black absolute right-0 top-0 h-full dark:bg-custom-gradient-to-bottom"
      >
        {isSelected ? (
          <Image src={minus} alt="minus" />
        ) : (
          <Image src={add} alt="add" />
        )}
      </Button>
    </div>
  );
}

function page() {
  const { theme } = useTheme();
  const showToastViewOnEtherscan = () => {
    toast.custom(
      (t) => (
        <ToastNotification
          title="Transaction successful"
          message="New Deposit has been created"
          linkText="View on Etherscan"
          linkUrl="https://etherscan.io"
          onClose={() => toast.dismiss(t)}
        />
      ),
      {
        position: "top-right",
        duration: 3000,
      }
    );
  };

  const showToastError = () => {
    toast.custom(
      (t) => (
        <ToastNotification
          title="Transaction failed"
          message="Please try again"
          linkText=""
          linkUrl=""
          onClose={() => toast.dismiss(t)}
          className="bg-[#AA0001]"
        />
      ),
      {
        position: "top-right",
        duration: 3000,
      }
    );
  };

  const showNormal = () => {
    const customLoaderId = toast.loading(
      <div className="flex justify-between items-center w-full">
        <span style={{ marginLeft: "8px" }}>Transaction #1</span>
        <Image src={Spinner} alt="token" width={30} height={30} />
      </div>,
      {
        position: "top-right",
        duration: Infinity,
      }
    );

    const promise = new Promise((resolve, reject) =>
      setTimeout(() => resolve({ name: "Transaction #1" }), 2000)
    );

    promise
      .then((data: any) => {
        toast.dismiss(customLoaderId);
        toast.success(`${data.name}`, {
          position: "top-right",
          className: "dark:bg-custom-gradient-to-top",
        });
      })
      .catch(() => {
        toast.dismiss(customLoaderId);
        toast.error("An error occurred!", {
          position: "top-right",
        });
      });
  };

  const [selectedTokens, setSelectedTokens] = React.useState<
    { tokenImage: any; tokenName: string }[]
  >([]);

  const tokenList = [
    {
      tokenImage: centerImage1,
      tokenName: "USDc",
    },
    {
      tokenImage: centerImage2,
      tokenName: "USDa",
    },
    {
      tokenImage: centerImage1,
      tokenName: "USDT",
    },
    {
      tokenImage: centerImage2,
      tokenName: "USDe",
    },
  ];

  return (
    <div>
      <AppNavbar activeBack={false} />
      <div className="grid lg:grid-cols-4 grid-cols-1">
        <div className="col-span-1 flex flex-col p-5 gap-8 border border-t-0 border-grayLight border-solid">
          {tokenList.map((token, key) => (
            <AddToken
              key={key}
              tokenImage={token.tokenImage}
              tokenName={token.tokenName}
              setSelectedTokens={setSelectedTokens}
              selectedTokens={selectedTokens}
            />
          ))}
        </div>
        <div className="hidden lg:flex col-span-2 flex-col items-center justify-center relative">
          <div className="relative">
            <Image
              className="hidden dark:block w-full"
              src={dcdsDark}
              alt="dark-mode-image"
            />
            <Image
              className="block dark:hidden w-full"
              src={dcdsFrame}
              alt="light-mode-image"
            />

            {selectedTokens.length > 0 && (
              <div className="w-[200px] h-[200px] bg-gradient-to-b dark:bg-custom-gradient-to-top from-[#E5F3FF] to-[#FFFDE4] absolute rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {selectedTokens.slice(0, 2).map((token, index) => {
                  const totalTokens = selectedTokens.length;

                  const xOffset =
                    totalTokens === 1 ? 0 : index === 0 ? -26 : 26;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center absolute"
                      style={{
                        transform: `translate(${xOffset}px, -20px)`,
                        zIndex: totalTokens - index,
                      }}
                    >
                      <Image
                        src={token?.tokenImage}
                        alt={token?.tokenName}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  );
                })}

                <span className="text-[28px] font-medium mt-1 absolute bottom-6">
                  {selectedTokens[0].tokenName}
                  {selectedTokens.length > 1 &&
                    ` +${selectedTokens.length - 1}`}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 border border-solid border-grayLight border-t-0 flex flex-col justify-between">
          <div className="p-5">
            <span className="text-textBlack text-[24px] font-medium dark:text-white">
              Deposit Funds
            </span>
            <SelectToken />
            <div className="py-4 flex">
              <span className="text-grayLight font-normal text-[18px]">
                Opt for liquidity gains?
              </span>
            </div>
            <div className="p-3 bg-[#FFF0CA] text-[12px] text-grayLight font-medium dark:text-[#D6A100] dark:bg-[#4F3800]">
              Note: Your amount will be used to offer protection to borrowers &
              protocol in return for fixed yields.
            </div>
          </div>
          <div>
            <Toaster richColors />
            <AdditionalDCDSMetrics />
            <Button
              onClick={() => {
                //showToastViewOnEtherscan();
                //showToastError();
                showNormal();
              }}
              className="bg-black text-white text-[24px] min-h-20 w-full dark:bg-custom-gradient-to-bottom cursor-pointer"
            >
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
