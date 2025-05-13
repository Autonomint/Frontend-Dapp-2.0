import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Info } from "lucide-react";

export default function DepositSummary({
  apy,
  depositing,
  points,
}: {
  apy: string;
  depositing: string;
  points: number;
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
          {`Points`}
          <Tooltip>
            <TooltipTrigger asChild>
              <Info width={16} height={16} className="ml-2" />
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-black">
              <p>1 Point per $1 deposit</p>
            </TooltipContent>
          </Tooltip>
        </span>

        <span className="text-black text-[16px] dark:text-white font-medium">
          {points}
        </span>
      </div>
    </div>
  );
}
