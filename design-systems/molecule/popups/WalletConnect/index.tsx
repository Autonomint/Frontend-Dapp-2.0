"use client";
import { Dialog, DialogContent } from "@/design-systems/atoms/dialog";
import { Typography } from "@/design-systems/atoms/Typography";
import Terms_Privacy from "@/design-systems/organisms/navbar/Terms_Privacy";
import { useEffect, useState } from "react";
import WalletConnectButton from "../../WalletConnectButton";
import Image from "next/image";
import opImage from "@/app/assets/op.svg";
import modeImage from "@/app/assets/mode.svg";
import { Button } from "@/design-systems/atoms/button";
import { useAccount, useSwitchChain } from "wagmi";
import Spinner from "@/design-systems/atoms/Spinner";
import { useParams, usePathname } from "next/navigation";
import { NetworkId } from "@/utils/constants";
import { BaseIcon } from "@/design-systems/atoms/SvgIcons";
import { useAppKit } from "@reown/appkit/react";
interface SwitchChainPopupProps {}

/**
 * SwitchChainPopup is a component that allows the user to switch the chain.
 * It is used to switch the chain.
 * It is used in the SwitchChainPopup component.
 *
 *
 */
const SwitchChainPopup = ({}: SwitchChainPopupProps) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const { switchChain, isPending } = useSwitchChain();
  const { chainId, isConnected, address } = useAccount();
  const pathname = usePathname();
  const [switchingChain, setSwitchingChain] = useState<number>();
  const { open, close } = useAppKit();

  // useEffect(() => {
  //   if (!isConnected) {
  //     open();
  //   } else {
  //     close();
  //   }
  // }, [isConnected, chainId, address]);

  useEffect(() => {
    // if the chainId is not undefined and the pathname is not "/bridge" or "/", then the user can set the isPopUpOpen to true
    if (
      (chainId &&
        !["/bridge", "/"].includes(pathname) &&
        ![NetworkId.Optimism, NetworkId.BaseSepolia].includes(chainId || 0) &&
        isConnected) ||
      !isConnected
    ) {
      setIsPopUpOpen(true);
    } else {
      setIsPopUpOpen(false);
    }
  }, [pathname, chainId, isConnected]);

  return (
    <Dialog open={isPopUpOpen}>
      <DialogContent
        title="Terms & Privacy Policy"
        className="rounded-[10px] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0 connect-wallet "
      >
        {chainId &&
          !["/bridge", "/"].includes(pathname) &&
          ![NetworkId.Optimism, NetworkId.BaseSepolia].includes(chainId || 0) &&
          isConnected && (
            <div>
              <Typography size="h4" className="">
                Switch Chain
              </Typography>
              <div className="flex flex-col justify-center py-10  w-[60%] rounded-lg overflow-hidden mx-auto ">
                <div className="text-[18px]  text-center ">Select Chain</div>

                <div className="flex gap-4 justify-center mt-4">
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      switchChain({
                        chainId: NetworkId.Optimism,
                      });
                      setSwitchingChain(NetworkId.Optimism);
                    }}
                    variant={"shadowOutline"}
                    className="p-5 cursor-pointer border-[1px]  gap-2 rounded-[10px] flex flex-col justify-center items-center w-[110px] h-[110px] !border-grayLight shadow-none hover:text-black dark:hover:text-white text-[#7A7A7A]"
                  >
                    <div>
                      <Image
                        src={opImage}
                        alt="image op"
                        width={50}
                        height={50}
                      />
                    </div>
                    {isPending && switchingChain === NetworkId.Optimism ? (
                      <div className="h-[20px] mx-auto">
                        <Spinner />
                      </div>
                    ) : (
                      <div className="text-[16px]">OP</div>
                    )}
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      switchChain({
                        chainId: NetworkId.BaseSepolia,
                      });

                      setSwitchingChain(NetworkId.BaseSepolia);
                    }}
                    variant={"shadowOutline"}
                    className="p-5 cursor-pointer border-[1px]  gap-2 rounded-[10px] flex flex-col justify-center items-center w-[110px] h-[110px] !border-grayLight shadow-none hover:text-black dark:hover:text-white text-[#7A7A7A]"
                  >
                    <div>
                      <BaseIcon
                        className=" stroke-black dark:stroke-white  "
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    {isPending && switchingChain === NetworkId.BaseSepolia ? (
                      <div className="h-[20px] mx-auto">
                        <Spinner />
                      </div>
                    ) : (
                      <div className="text-[16px]">Base</div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        {!isConnected && (
          <div>
            <Typography size="h4" className="text-center">
              Please Connect Your Wallet
            </Typography>
            <div className="flex flex-col justify-center py-10  w-[60%] rounded-lg overflow-hidden mx-auto ">
              {/* <div className="text-[18px]  text-center ">Select Chain</div> */}

              <div className="flex gap-4 justify-center mt-4">
                <Button
                  disabled={isPending}
                  onClick={() => {
                    open();
                  }}
                  variant={"shadowOutline"}
                  className="p-5 cursor-pointer border-[1px] text-lg gap-2 rounded-[10px] flex flex-col justify-center items-center  !border-grayLight shadow-none hover:text-black dark:hover:text-white text-black dark:text-white "
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SwitchChainPopup;
