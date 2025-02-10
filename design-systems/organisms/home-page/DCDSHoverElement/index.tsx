import Image from "next/image";
import PriceGraph from "@/app/assets/Chart.png";
import DCDSHover from "@/app/assets/Chart.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import arrow from "@/app/assets/arrow-right-02.png";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function DCDSHoverElement() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/dcds");
      }}
      className="flex flex-col border-x border-y border-[1px]   border-grayLight overflow-y-hidden animateDCDS 2xl:gap-8 gap-2 lg:gap-6 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-3 lg:p-8 relative  dark:bg-custom-gradient-to-top"
    >
      <div className=" text-textBlack text-[20px] lg:text-[32px] 2xl:text-[38px] font-medium dark:text-white">
        Earn high yields by offering dCDS protection
      </div>
      <Image
        src={PriceGraph}
        alt="Price Graph"
        className="2xl:w-[900px] w-[900px] object-fit block dark:hidden"
      />
      <Image
        src={DCDSHover}
        alt="Price Graph"
        className="2xl:w-[900px] w-[900px] object-fit hidden dark:block"
      />
      <div className=" text-textBlack text-[18px] lg:text-[32px] 2xl:text-[38px] 2xl:pb-12 pb-8 font-medium dark:text-white flex items-center gap-4">
        Get up to 200% APY
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IoMdInformationCircleOutline
                height={32}
                width={32}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Exposed to volatility risk</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button className="absolute lg:px-6 px-2 bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[24px]  lg:text-[32px] flex justify-between h-[60px] lg:h-[108px] hover:bg-textBlack dark:gradient-to-bottom   dark:bg-home-btn-bg">
        Earn
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

export default DCDSHoverElement;
