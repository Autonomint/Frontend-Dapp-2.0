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
interface SwitchChainPopupProps {}

const SwitchChainPopup = ({}: SwitchChainPopupProps) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const { switchChain, isPending } = useSwitchChain();
  const { chainId, isConnected } = useAccount();
  const pathname = usePathname();
  const [switchingChain, setSwitchingChain] = useState<number>();

  useEffect(() => {
    debugger;
    if (
      chainId &&
      !["/bridge", "/"].includes(pathname) &&
      ![11155420, 919].includes(chainId || 0) &&
      isConnected
    ) {
      setIsPopUpOpen(true);
    } else {
      setIsPopUpOpen(false);
    }
  }, [pathname, chainId]);

  return (
    <Dialog open={isPopUpOpen}>
      <DialogContent
        title="Terms & Privacy Policy"
        className="rounded-[10px] dark:border-[1px] dark:border-grayLight bg-white dark:bg-[#0D0D0D] p-6 gap-0"
      >
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
                  chainId: 11155420,
                });
                setSwitchingChain(11155420);
              }}
              variant={"shadowOutline"}
              className="p-5 cursor-pointer border-[1px]  gap-2 rounded-[10px] flex flex-col justify-center items-center w-[110px] h-[110px] !border-grayLight shadow-none hover:text-black dark:hover:text-white text-[#7A7A7A]"
            >
              <div>
                <Image src={opImage} alt="image op" width={50} height={50} />
              </div>
              {isPending && switchingChain === 11155420 ? (
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
                  chainId: 919,
                });

                setSwitchingChain(919);
              }}
              variant={"shadowOutline"}
              className="p-5 cursor-pointer border-[1px]  gap-2 rounded-[10px] flex flex-col justify-center items-center w-[110px] h-[110px] !border-grayLight shadow-none hover:text-black dark:hover:text-white text-[#7A7A7A]"
            >
              <div>
                <Image
                  src={modeImage}
                  alt="image mode"
                  width={50}
                  height={50}
                />
              </div>
              {isPending && switchingChain === 919 ? (
                <div className="h-[20px] mx-auto">
                  <Spinner />
                </div>
              ) : (
                <div className="text-[16px]">Mode</div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchChainPopup;
