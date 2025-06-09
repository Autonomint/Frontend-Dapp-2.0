import Image from "next/image";
import PriceGraph from "@/app/assets/Chart.png";
import DCDSHover from "@/app/assets/Chart.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import arrow from "@/app/assets/arrow-right-02.png";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Button } from "@/design-systems/atoms/button";
import { useRouter } from "next/navigation";
import { getIconMapping } from "@/utils/token-config";
import { useTheme } from "next-themes";

function DCDSHoverElement() {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <div
      onClick={() => {
        router.push("/dcds");
      }}
      className="flex flex-col border-x border-y border-[1px]   border-grayLight overflow-y-hidden animateDCDS  h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-3 lg:p-8 relative  dark:bg-custom-gradient-to-top"
    >
      <div className="flex flex-col 2xl:gap-4 gap-2 lg:gap-6">
        <div className=" text-textBlack text-[20px] lg:text-[32px] 2xl:text-[38px] font-medium dark:text-white">
          Earn high yields by offering dCDS protection
        </div>
        <Image
          src={PriceGraph}
          alt="Price Graph"
          className="2xl:w-[900px] w-[900px]  object-fit block dark:hidden"
        />
        <Image
          src={DCDSHover}
          alt="Price Graph"
          className="2xl:w-[900px] w-[900px]  object-fit hidden dark:block"
        />
        <div className="mt-4 text-textBlack text-[18px] lg:text-[24px] 2xl:text-[24px]  font-medium dark:text-white flex items-center justify-start gap-8">
          <div className="flex h-full mt-2 items-center justify-start gap-2">
            Get up to 200% APY
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <IoMdInformationCircleOutline
                    height={32}
                    width={32}
                    className="cursor-pointer mb-1"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-black dark:bg-black dark:text-white">
                  <p>Exposed to ETH volatility risk</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex  items-center justify-start gap-2">
            <p className="text-textBlack mt-2 text-left text-[18px] lg:text-[24px] 2xl:text-[24px] font-medium dark:text-white">
              Assets Accepted
            </p>
            <div className="flex relative mt-2 items-center justify-start ">
              <div className="flex absolute z-[10] left-0  w-[40px] h-[40px] flex-col items-center justify-center gap-2">
                <Image
                  className="w-[40px]  h-[40px]"
                  src={getIconMapping(theme as string, "usda")}
                  alt="usdt"
                />
              </div>
              <div className="flex absolute z-[9] w-[40px] left-[20px] h-[40px] flex-col items-center justify-center gap-2">
                <Image
                  className="w-[40px] h-[40px]"
                  src={getIconMapping(theme as string, "usdt")}
                  alt="usdt"
                />
              </div>
              <div className="flex absolute w-[40px] z-[8] left-[45px] h-[40px] flex-col items-center justify-center gap-2">
                <Image
                  className="w-[40px] h-[40px]"
                  src={getIconMapping(theme as string, "aero")}
                  alt="usdt"
                />
              </div>
              <div className="flex absolute w-[40px] z-[7] left-[70px] h-[40px] flex-col items-center justify-center gap-2">
                <Image
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px]"
                  src={getIconMapping(theme as string, "op")}
                  alt="usdt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="2xl:pb-12 pb-8"></div>
      <Button className="absolute lg:px-6 px-2 bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[24px]  lg:text-[32px] flex justify-between h-[60px] lg:h-[108px] hover:bg-textBlack dark:gradient-to-bottom   dark:bg-home-btn-bg">
        Earn
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

export default DCDSHoverElement;
