import { HoverCard } from "@/design-systems/atoms/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { EqualApproximately, Info } from "lucide-react";

export default function DepositSummary({
  apy,
  depositing,
  points,
  individualPoints,
}: {
  apy: string;
  depositing: string;
  points: number;
  individualPoints: { tokenName: string; points: number }[];
}) {
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-grayLight text-[16px] font-medium">APY</span>
        <span className="text-black w-[60%] 2xl:w-[80%] text-end dark:text-white text-[16px] font-medium">
          {apy}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight text-[16px] font-medium">
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
              <span className=" flex gap-1 items-center font-medium text-lg text-grayLight">
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
