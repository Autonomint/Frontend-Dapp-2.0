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
}: {
  subHeading: string;
  value: string;
  isLoading?: boolean;
  hasLiquidityLandPoints?: boolean;
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
