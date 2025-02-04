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
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      {!isConnected ? (
        <Button
          onClick={handleBtnClick}
          variant={"shadowOutline"}
          className="  p-0 gap-0  shadow-outlined-none sm:shadow  h-fit dark:hover:bg-custom-gradient-to-top  hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]"
        >
          <div className="hidden lg:block ">
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
                  <DownArrowIcon className="w-4 h-4 dark:stroke-black stroke-black  " />
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
          <div className="relative flex p-[13px] px-5  border-solid lg:border-l-2 border-black  flex-row items-center gap-3 ">
            <WalletIcon className="w-4 h-4 dark:stroke-white stroke-black" />
            <Typography size="body" className="">
              {"Connect Wallet"}
            </Typography>
          </div>
        </Button>
      ) : (
        <>
          <Button
            variant={"shadowOutline"}
            className="border-[#041A50] hidden lg:flex p-0 gap-0 shadow-outlined-none lg:shadow-outlined   h-fit dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] "
          >
            <div className=" hidden lg:block">
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
                <div className="relative flex p-[13px] px-5  border-solid border-0 lg:border-l-2 border-black flex-row items-center gap-3 ">
                  <WalletIcon className="dark:stroke-white stroke-black" />
                  <Typography size="body" className="">
                    {isConnected
                      ? sortWalletAddress(address)
                      : "Connect Wallet"}
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

          {/* Mobile Button */}
          <Button
            variant={"shadowOutline"}
            className="border-[#041A50] lg:hidden  p-0 gap-0 shadow-outlined-none lg:shadow-outlined   h-fit dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] "
          >
            <div className="relative flex p-[13px] px-5  border-solid border-0 lg:border-l-2 border-black flex-row items-center gap-3 ">
              <Popover>
                <PopoverTrigger className="" asChild>
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
                        className=" fill-black "
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                    <DownArrowIcon className="w-2 h-2 stroke-black  " />
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
              <div onClick={() => setIsDialogOpen(true)}>
                <Typography size="body" className="">
                  {isConnected ? sortWalletAddress(address) : "Connect Wallet"}
                </Typography>
              </div>
            </div>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogContent className="w-[90%] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0">
              <div className="text-2xl  font-semibold mb-4">Wallet Info</div>

              <div className="flex mt-4 flex-row justify-between items-center">
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
                className="border-[#041A50] mt-8 h-fit text-[18px]  font-normal  w-full p-[10px]"
              >
                Disconnect
              </Button>

              <div className="flex-col flex mt-8 flex- justify-center gap-2 items-center">
                <a
                  href={`https://sepolia.${
                    chainId == NetworkId.EthereumSepolia
                      ? "etherscan.io"
                      : "basescan.org"
                  }/${address}`}
                >
                  <Typography
                    size="sm"
                    className="text-[#111111] dark:text-white underline-offset-2 underline"
                    variant="regular"
                  >
                    View All Wallet Transactions
                  </Typography>
                </a>
                <Typography
                  size="sm"
                  className="text-[#7A7A7A] underline-offset-2 underline"
                  variant="regular"
                >
                  Terms & Privacy Policy
                </Typography>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default WalletPopup;
