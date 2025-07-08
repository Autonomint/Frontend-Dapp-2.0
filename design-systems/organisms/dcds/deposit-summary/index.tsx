import { HoverCard } from "@/design-systems/atoms/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { EqualApproximately, Info } from "lucide-react";

export default function DepositSummary({
  calculateGainCDS,
  apy,
  depositing,
  points,
  individualPoints,
}: {
  calculateGainCDS: {
    optionsFeesCrDiff: number;
    priceChangeCvDiff: number;
  };
  apy: string;
  depositing: string;
  points: number;
  individualPoints: { tokenName: string; points: number }[];
}) {
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-grayLight 2xl:text-[16px] text-[14px] font-medium">
          APY
        </span>
        <span className="text-black w-[70%] 2xl:w-[80%] text-end dark:text-white text-[16px] whitespace-nowrap font-medium">
          {apy}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight 2xl:text-[16px] text-[14px] font-medium flex gap-1 justify-start items-center">
          Option fee yields (Last 1 month){" "}
          <Tooltip>
            <TooltipTrigger>
              <Info
                id="points-breakdown"
                className="stroke-grayLight w-[18px] h-[18px]"
              />
            </TooltipTrigger>
            <TooltipContent className=" dark:text-white dark:bg-black w-[400px]">
              <p>
                These are rolling 1-month yields earned from option fees paid by
                USDA+ minters. Option fees accrue as users hedge their ETH, so
                they may fluctuate and grow as new borrowers enter or existing
                ones renew their hedges.
              </p>
            </TooltipContent>
          </Tooltip>
        </span>
        <span className="text-black w-[20%] 2xl:w-[20%] text-end dark:text-white text-[16px] whitespace-nowrap font-medium">
          {((calculateGainCDS?.optionsFeesCrDiff || 0) * 100).toFixed(2)}%
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight 2xl:text-[16px] text-[14px] font-medium flex gap-1 justify-start items-center">
          Price change P/L (Last 1 month)
          <Tooltip>
            <TooltipTrigger>
              <Info
                id="points-breakdown"
                className="stroke-grayLight w-[18px] h-[18px]"
              />
            </TooltipTrigger>
            <TooltipContent className=" dark:text-white dark:bg-black w-[400px]">
              <p>
                By participating in dCDS, you are taking a long exposure to ETH
                so your returns are dependent on ETH price movement. If ETH
                rises after your entry, you&apos;ll earn a share of a 3% cut
                from each borrower&apos;s ETH gains. If ETH falls, your deposit
                reflects that loss. Larger dCDS pools help reduce these
                fluctuations.
              </p>
            </TooltipContent>
          </Tooltip>
        </span>
        <span className="text-black w-[20%] 2xl:w-[20%] text-end dark:text-white text-[16px] whitespace-nowrap font-medium">
          {((calculateGainCDS?.priceChangeCvDiff || 0) * 100).toFixed(2)}%
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-grayLight 2xl:text-[16px] text-[14px] font-medium">
          Depositing
        </span>
        <span className="text-black text-[16px] dark:text-white font-medium">
          {depositing}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-grayLight text-[16px] flex items-center  font-medium">
          <HoverCard
            disabled={individualPoints.length === 0}
            title={
              <span className=" flex gap-1 items-center font-medium 2xl:text-[16px] text-[14px] text-grayLight">
                Points
                <Info
                  id="points-breakdown"
                  className="stroke-grayLight w-[18px] h-[18px]"
                />
              </span>
            }
          >
            <div>
              <div className=" p-3 bg-[#ABFFDE] border-b-[1px] border-grayLight font-medium text-lg text-black">
                Points Breakdown
              </div>
              <div className="flex p-3 mt-2 flex-col gap-2">
                {individualPoints.map((point) => (
                  <div key={point.tokenName} className="flex justify-between">
                    <span className="font-medium text-grayLight">
                      {point.tokenName}
                    </span>
                    <span className="font-medium text-black dark:text-white">
                      {Math.round(point.points)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </HoverCard>
        </span>

        <span className="text-black flex items-center gap-1 text-[16px] dark:text-white font-medium">
          <EqualApproximately className="stroke-black dark:stroke-white w-[18px] h-[18px]" />{" "}
          {Math.round(points)}
        </span>
      </div>
    </div>
  );
}
