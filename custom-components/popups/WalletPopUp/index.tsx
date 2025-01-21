"use client";
import ethereumIcon from "@/app/assets/ethereum-icon.svg";

import { usDaAddress } from "@/blockchain/contracts";
import Popup from "@/components/ui/PopUp";
import {
  BaseIcon,
  DownArrowIcon,
  EthereumIcon,
  OptimismIcon,
  WalletIcon,
} from "@/components/ui/SvgIcons";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NetworkId } from "@/utils/constants";
import { sortWalletAddress } from "@/utils/helpers";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect,
} from "@reown/appkit/react";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useBalance, useSwitchChain } from "wagmi";

interface WalletPopupProps {
  //   twitter: string; // Path to the twitter icon image
}

const WalletPopup: React.FC<WalletPopupProps> = ({}) => {
  const { open, close } = useAppKit();
  const { address, isConnected, caipAddress, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { switchChain } = useSwitchChain();

  const { data, isError, isLoading } = useBalance({
    address: usDaAddress ? (address as `0x${string}`) : undefined,
    token: usDaAddress
      ? usDaAddress[chainId as keyof typeof usDaAddress]
      : undefined,
  });
  const handleBtnClick = () => {
    if (!isConnected) open();
  };
  console.log(chainId, chainId == NetworkId.EthereumSepolia, "chainId");

  return (
    <div>
      {!isConnected ? (
        <Button
          onClick={handleBtnClick}
          variant={"shadowOutline"}
          className=" p-0 gap-0  h-fit dark:hover:bg-custom-gradient-to-top  hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
        >
          <div className=" ">
            <Popover>
              <PopoverTrigger className="py-[14px] px-4 bg-[#ABFFDE]" asChild>
                <div className="relative flex items-center gap-1">
                  {chainId == NetworkId.EthereumSepolia ? (
                    <EthereumIcon
                      className=" stroke-black  "
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : chainId == NetworkId.BaseSepolia ? (
                    <BaseIcon
                      className=" stroke-black  "
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    <OptimismIcon
                      className=" fill-black  "
                      style={{ width: "20px", height: "20px" }}
                    />
                  )}
                  <DownArrowIcon className="w-4 h-4 dark:stroke-black  " />
                </div>
              </PopoverTrigger>
              <PopoverContent className="!w-[200px] border bg-white  border-gray-200 absolute p-4 rounded-md shadow-md">
                <div className="flex flex-row gap-1">
                  <EthereumIcon className="w-4 h-4 dark:fill-white fill-black" />
                  <Typography className="">Ethereum</Typography>
                  <DownArrowIcon className="w-4 h-4 dark:text-black" />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative flex p-[10px] px-5  border-solid border-l-2 border-black  flex-row items-center gap-3 ">
            <WalletIcon className="w-4 h-4 dark:stroke-white stroke-black" />
            <Typography size="body" className="">
              {"Connect Wallet"}
            </Typography>
          </div>
        </Button>
      ) : (
        <Button
          variant={"shadowOutline"}
          className="border-[#041A50] p-0 gap-0  h-fit dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] "
        >
          <div className=" ">
            <Popover>
              <PopoverTrigger className="py-[14px] px-4 bg-[#ABFFDE]" asChild>
                <div className="relative flex items-center gap-2">
                  {chainId == NetworkId.EthereumSepolia ? (
                    <EthereumIcon
                      className=" stroke-black  "
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : chainId == NetworkId.BaseSepolia ? (
                    <BaseIcon
                      className=" stroke-black  "
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    <OptimismIcon
                      className=" fill-black "
                      style={{ width: "20px", height: "20px" }}
                    />
                  )}
                  <DownArrowIcon className="w-4 h-4 stroke-black  " />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                className="w-full border mr-12  mt-3 bg-white border-gray-200 rounded-md shadow-md dark:bg-[#0D0D0D]"
              >
                <div className=" flex flex-col gap-4">
                  <div
                    onClick={() =>
                      switchChain({
                        chainId: 11155111,
                      })
                    }
                    className="flex cursor-pointer flex-row gap-2 justify-start items-center"
                  >
                    <EthereumIcon
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                      className="fill-black dark:fill-white"
                    />
                    <Typography className="text-[24px] dark:text-white font-medium">
                      Ethereum{" "}
                    </Typography>{" "}
                    {chainId == NetworkId.EthereumSepolia ? (
                      <Check width={18} height={18} />
                    ) : null}
                  </div>
                  <div
                    onClick={() =>
                      switchChain({
                        chainId: 84532,
                      })
                    }
                    className="flex cursor-pointer flex-row gap-2 justify-start items-center"
                  >
                    <BaseIcon
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                      className="fill-black dark:fill-white"
                    />
                    <Typography className="text-[24px] font-medium">
                      Base{" "}
                    </Typography>
                    {chainId == NetworkId.BaseSepolia && (
                      <Check width={18} height={18} />
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Popup
            title="Wallet Info"
            content={
              <div className="relative flex p-[13px] px-5  border-solid border-l-2 border-black flex-row items-center gap-3 ">
                <WalletIcon className="dark:stroke-white stroke-black" />
                <Typography size="body" className="">
                  {isConnected ? sortWalletAddress(address) : "Connect Wallet"}
                </Typography>
              </div>
            }
            contentClass="!left-[unset] right-[-12px] top-[50px] dark:bg-[#0D0D0D]"
          >
            <div className="flex mt-8 flex-row justify-between items-center">
              <Typography size="lg" className="" variant="regular">
                USDa Balance
              </Typography>
              <Typography
                size="lg"
                className="text-[#7A7A7A]"
                variant="regular"
              >
                {chainId === NetworkId.EthereumSepolia
                  ? "ETH Sepolia"
                  : "Base Sepolia"}
              </Typography>
            </div>
            <div className="flex mt-3 flex-row justify-start items-center">
              <Typography variant="regular" size="subtitle">
                ${data?.formatted.slice(0, 8)}
              </Typography>
            </div>
            <Button
              onClick={() => disconnect()}
              variant={"default"}
              className="border-[#041A50] mt-8 h-fit text-[24px] font-normal  w-full p-[10px]"
            >
              Disconnect
            </Button>

            <div className="flex mt-8 flex-row justify-between items-center">
              <a
                href={`https://sepolia.${
                  chainId == NetworkId.EthereumSepolia
                    ? "etherscan.io"
                    : "basescan.org"
                }/${address}`}
              >
                <Typography
                  size="lg"
                  className="text-[#111111] dark:text-white underline-offset-2 underline"
                  variant="regular"
                >
                  View All Wallet Transactions
                </Typography>
              </a>
              <Typography
                size="lg"
                className="text-[#7A7A7A] underline-offset-2 underline"
                variant="regular"
              >
                Terms & Privacy Policy
              </Typography>
            </div>
          </Popup>
        </Button>
      )}
    </div>
  );
};

export default WalletPopup;
