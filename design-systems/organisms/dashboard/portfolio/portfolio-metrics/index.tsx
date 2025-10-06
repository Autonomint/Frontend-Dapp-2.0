import Spinner from "@/design-systems/atoms/Spinner";
import { LiquidityLandIcon } from "@/design-systems/atoms/SvgIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";

function PortfolioMetrics({
  subHeading,
  value,
  isLoading,
  hasLiquidityLandPoints,
  isOG,
}: {
  subHeading: string;
  value: string;
  isLoading?: boolean;
  hasLiquidityLandPoints?: boolean;
  isOG?: boolean;
}) {
  return (
    <div className="flex-1 flex flex-col px-4 h-full    py-4 gap-2 border-grayLight  border border-solid">
      <span className="text-textBlack 2xl:text-[32px] text-[24px] font-medium dark:text-white">
        {isLoading ? (
          <div className="2xl:h-[48px] h-[35px] ">
            <Spinner size={32} />
          </div>
        ) : (
          <div className="flex justify-start  gap-2 items-center">
            <div>{value}</div>
            {subHeading === "Points (All Chain)" && hasLiquidityLandPoints && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex relative  ml-4 items-center w-fit     ">
                    <span className="absolute left-[-20px] z-10 ">
                      <LiquidityLandIcon />
                    </span>
                    <span className="text-black dark:text-white rounded-[24px] pl-4 pr-2  text-[14px] border-[1px] border-grayLight border-l-0 py-[px] mr-2">
                      1.25x
                    </span>
                  </div>
                </TooltipTrigger>
                {
                  <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                    Liquidity Land Booster
                  </TooltipContent>
                }
              </Tooltip>
            )}
            {subHeading === "Points (All Chain)" && isOG && (
              <div className="flex relative  items-center w-fit   ml-[-px]  ">
                <span className="absolute  z-10 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ABFFDE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-star-icon lucide-circle-star"><path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" /><circle cx="12" cy="12" r="10" /></svg>
                </span>
                <span className="text-black dark:text-white rounded-[24px] pl-6 pr-2 py-[1px] text-[14px] border-[1px] border-grayLight mr-2">
                  OG
                </span>
              </div>
            )}
          </div>
        )}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>
    </div>
  );
}

export default PortfolioMetrics;
