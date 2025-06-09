import Image from "next/image";
import PriceComparison from "./PriceComparison";
import { Button } from "@/design-systems/atoms/button";
import arrow from "@/app/assets/arrow-right-02.png";
import LTVDark from "@/app/assets/LTV Details.svg";
import LTV from "@/app/assets/LTV-range-image.svg";
import { useRouter } from "next/navigation";
import AssetsAccepted from "./AssetsAccepted";
import cryptoEth from "@/app/assets/eth.png";
import WeETH from "@/app/assets/weETH-icoon.webp";
import WrsETH from "@/app/assets/WrsETH-icon.png";
import WsuperOETH from "@/app/assets/Wrapped_Super_OETH.webp";
interface FeeDetail {
  orgName: string;
  amount: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  textColor: string;
  borderColor: string;
}
function MintUSDAHoverElement({ feesList }: { feesList: FeeDetail[] }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/mintusdalist");
      }}
      className="flex flex-col animateMint border-x border-y border-[1px] overflow-y-hidden  border-grayLight gap-2 lg:gap-4 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top p-3 lg:p-6 relative"
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
      <div className=" hidden xl:block text-[20px] lg:text-[32px] text-textBlack font-medium dark:text-white bg-none">
        Fee Comparison{" "}
        <span className="lg:text-lg text-grayLight">
          (1-month option premium to hedge 1 ETH at current price)
        </span>
      </div>
      <div className="  xl:hidden text-[20px] lg:text-[32px] text-textBlack font-medium dark:text-white bg-none">
        Fee
      </div>
      <div className=" hidden xl:flex  lg:flex-wrap gap-2 sm:gap-3 lg:gap-3 lg:justify-start  2xl:gap-8 xl:ml-6  xl:mb-20 bg-none">
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
      <div className="  xl:hidden gap-6 2xl:gap-8 ml-4 lg:ml-6 mb-20 bg-none">
        <PriceComparison
          orgName={feesList[0].orgName}
          tag={""}
          amount={feesList[0].amount}
          tagColor={feesList[0].tagColor}
          textColor={feesList[0].textColor}
          tagBg={feesList[0].tagBg}
          borderColor={feesList[0].borderColor}
        />
      </div>
      <div className="flex  items-center justify-start gap-2">
        <p className="text-textBlack mt-2 text-left text-[18px] lg:text-[24px] 2xl:text-[24px] font-medium dark:text-white">
          Assets Accepted
        </p>
        <div className="flex relative mt-2 items-center justify-start ">
          <div className="flex absolute z-[10] left-0  w-[40px] h-[40px] flex-col items-center justify-center gap-2">
            <Image className="w-[40px]  h-[40px]" src={cryptoEth} alt="usdt" />
          </div>
          <div className="flex absolute z-[9] w-[40px] left-[20px] h-[40px] flex-col items-center justify-center gap-2">
            <Image className="w-[40px] h-[40px]" src={WeETH} alt="usdt" />
          </div>
          <div className="flex absolute w-[40px] z-[8] left-[45px] h-[40px] flex-col items-center justify-center gap-2">
            <Image className="w-[40px] h-[40px]" src={WrsETH} alt="usdt" />
          </div>
          <div className="flex absolute w-[40px] z-[7] left-[70px] h-[40px] flex-col items-center justify-center gap-2">
            <Image
              width={40}
              height={40}
              className="w-[40px] h-[40px]"
              src={WsuperOETH}
              alt="usdt"
            />
          </div>
        </div>
      </div>
      <Button className="absolute px-2 lg:px-6 bottom-0 left-0 w-full lg:mt-13 bg-textBlack text-white text-[20px] lg:text-[32px] flex justify-between  h-[60px] lg:h-[102px] hover:bg-textBlack dark:bg-home-btn-bg">
        Mint USDA+
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

export default MintUSDAHoverElement;
