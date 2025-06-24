import Spinner from "@/design-systems/atoms/Spinner";
import { LiquidityLandIcon } from "@/design-systems/atoms/SvgIcons";

function PortfolioMetrics({
  subHeading,
  value,
  isLoading,
}: {
  subHeading: string;
  value: string;
  isLoading?: boolean;
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
            {subHeading === "Points (All Chain)" && (
              <div className="flex bg-gray-200 dark:bg-neutral-800 items-center w-fit gap-1 border-[1px] border-grayLight   rounded-[24px]">
                <span className="ml-[-2px]">
                  <LiquidityLandIcon />{" "}
                </span>
                <span className="text-black dark:text-white text-[14px] py-[3px] mr-2">
                  1.25x
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
