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
      <div className="flex flex-col 2xl:gap-4 gap-2 lg:gap-4 xl:gap-8">
        <div className=" text-textBlack text-[20px] lg:text-[32px] 2xl:text-[38px] font-medium dark:text-white">
          Earn high yields by offering dCDS protection
        </div>
        <Image
          src={PriceGraph}
          alt="Price Graph"
          className="2xl:w-[900px] w-[900px] md:w-[800px]  object-fit block dark:hidden"
        />
        <Image
          src={DCDSHover}
          alt="Price Graph"
          className="2xl:w-[900px] w-[900px] md:w-[800px]  object-fit hidden dark:block"
        />
        <div className="mt-4 text-textBlack text-[14px] sm:text-[18px] lg:text-[20px] 2xl:text-[24px]  font-medium dark:text-white flex items-center justify-between gap-8">
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
          <div className="flex  items-center justify-end gap-2">
            <p className="text-textBlack mt-2 text-left text-[14px] sm:text-[18px] lg:text-[20px] 2xl:text-[24px] font-medium dark:text-white">
              Assets Accepted
            </p>
            <div className="flex relative mt-2 items-center justify-start pr-28">
              <div className="flex absolute z-[10] left-0   w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] flex-col items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      className="w-full h-full"
                      src={getIconMapping(theme as string, "usda+")}
                      alt="usdt"
                      loading="eager"
                      priority
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                    <p>USDA+</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="flex absolute z-[9] w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] left-[15%] flex-col items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      className="w-full h-full"
                      src={getIconMapping(theme as string, "usdt")}
                      alt="usdt"
                      loading="eager"
                      priority
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                    <p>USDT</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex absolute w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] z-[8] left-[30%] flex-col items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      className="w-full h-full"
                      src={getIconMapping(theme as string, "aero")}
                      alt="usdt"
                      loading="eager"
                      priority
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                    <p>AERO</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex absolute w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] z-[7] left-[40%] flex-col items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      className="w-full h-full"
                      src={getIconMapping(theme as string, "op")}
                      alt="usdt"
                      loading="eager"
                      priority
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                    <p>OP</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="2xl:pb-12 pb-8"></div>
      <Button className="absolute lg:px-6 px-2 bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[24px]  lg:text-[32px] flex justify-between  h-[60px] md:h-[80px] xl:h-[102px] hover:bg-textBlack dark:gradient-to-bottom   dark:bg-home-btn-bg">
        Earn
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

export default DCDSHoverElement;
