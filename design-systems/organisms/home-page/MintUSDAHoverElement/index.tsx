import Image from "next/image";
import PriceComparison from "./PriceComparison";
import { Button } from "@/design-systems/atoms/button";
import arrow from "@/app/assets/arrow-right-02.png";
import LTVDark from "@/app/assets/LTV Details.svg";
import LTV from "@/app/assets/LTV-range-image.svg";
import { useRouter } from "next/navigation";

import cryptoEth from "@/app/assets/eth.png";
import WeETH from "@/app/assets/weETH-icoon.webp";
import WrsETH from "@/app/assets/WrsETH-icon.png";
import WsuperOETH from "@/app/assets/Wrapped_Super_OETH.webp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import YieldComparison from "./YieldComparison";
import { useAccount } from "wagmi";
import { NetworkId } from "@/utils/constants";
interface FeeDetail {
  orgName: string;
  amount: React.ReactNode;
  tag: string;
  tagColor: string;
  tagBg: string;
  textColor: string;
  borderColor: string;
}
function MintUSDAHoverElement({ feesList }: { feesList: FeeDetail[] }) {
  const router = useRouter();
  const { chainId } = useAccount();
  return (
    <div
      onClick={() => {
        router.push("/mintusdalist");
      }}
      className="flex flex-col animateMint border-x border-y border-[1px] overflow-y-hidden  border-grayLight gap-2 lg:gap-4 2xl:gap-2 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top p-3 lg:p-6 relative"
    >
      <div className="text-textBlack text-[28px] lg:text-[38px] font-medium dark:text-white bg-none">
        100% Synthetic LTV
      </div>
      <div>
        <Image
          className="hidden dark:block w-full"
          src={LTVDark}
          alt="dark-mode-image"
        />
        <Image
          className="block dark:hidden w-full"
          src={LTV}
          alt="light-mode-image"
        />
      </div>
      <div className="flex justify-between bg-none">
        <span className=" font-medium text-sm lg:text-lg text-grayLight bg-none">
          80% Stablecoin
        </span>
        <span className=" font-medium text-sm lg:text-lg text-grayLight bg-none">
          20% Downside Protection
        </span>
      </div>
      <div className="flex flex-row align-top xl:gap-20 gap-6 md:gap-12 sm:ml-4 lg:ml-0">
        <div>
          <div className="ml-2 text-[14px]  sm:text-[20px] lg:text-[24px] text-textBlack font-medium dark:text-white bg-none">
            Potential Yields per{" "}
            {chainId === NetworkId.Hyperliquid ? "HYPE" : "ETH"}{" "}
          </div>

          <YieldComparison />
        </div>
        <div>
          <div className="ml-2 text-[14px] sm:text-[20px] lg:text-[24px] text-textBlack font-medium dark:text-white bg-none">
            Hedging fees{" "}
            {chainId === NetworkId.Hyperliquid
              ? "HYPE per day"
              : "per ETH"}{" "}
          </div>

          <div className=" flex  lg:flex-wrap gap-2 sm:gap-3 lg:gap-3 lg:justify-start  2xl:gap-8 xl:ml-6   bg-none">
            {feesList.map((feeCom, idx) => {
              return (
                <PriceComparison
                  key={idx}
                  orgName={feeCom.orgName}
                  tag={feeCom.tag}
                  amount={feeCom.amount}
                  tagColor={feeCom.tagColor}
                  textColor={feeCom.textColor}
                  tagBg={feeCom.tagBg}
                  borderColor={feeCom.borderColor}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="  xl:hidden gap-6 2xl:gap-8 ml-4 lg:ml-6 mb-20 bg-none">
        <PriceComparison
          orgName={feesList[0].orgName}
          tag={""}
          amount={feesList[0].amount}
          tagColor={feesList[0].tagColor}
          textColor={feesList[0].textColor}
          tagBg={feesList[0].tagBg}
          borderColor={feesList[0].borderColor}
        />
      </div> */}
      <div className="flex w-full mt-[-10px] items-center justify-end gap-2 xl:mb-24 ">
        <p className="text-textBlack mt-2 text-left text-[14px] sm:text-[18px] lg:text-[20px] 2xl:text-[24px] font-medium dark:text-white">
          Assets Accepted
        </p>
        <div className="flex relative mt-2 items-center justify-start pr-20 sm:pr-16 md:pr-20 lg:pr-24 xl:pr-28 ">
          <div className="flex absolute z-[10] left-0 w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] flex-col items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  className="w-full h-full"
                  src={cryptoEth}
                  alt="usdt"
                  loading="eager"
                  priority
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                <p>ETH</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex absolute z-[9] w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] left-[13%] flex-col items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  className="w-full h-full"
                  src={WeETH}
                  alt="usdt"
                  loading="eager"
                  priority
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                <p>weETH</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex absolute w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] z-[8] left-[24%] flex-col items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  className="w-full h-full"
                  src={WrsETH}
                  alt="usdt"
                  loading="eager"
                  priority
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                <p>wrsETH</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex absolute w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] xl:w-[35px] xl:h-[35px] z-[7] left-[35%] flex-col items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  className="w-full h-full"
                  src={WsuperOETH}
                  alt="usdt"
                  loading="eager"
                  priority
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white border-grayLight rounded-[8px] text-black dark:bg-black dark:text-white">
                <p>wsuperOETHb</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <Button className="absolute px-2 lg:px-6 bottom-0 left-0 w-full lg:mt-13 bg-textBlack text-white text-[20px] lg:text-[32px] flex justify-between  h-[60px] md:h-[80px] xl:h-[102px] hover:bg-textBlack dark:bg-home-btn-bg">
        Mint USDA+
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

export default MintUSDAHoverElement;
