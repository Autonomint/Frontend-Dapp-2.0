import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";
import { Info } from "lucide-react";

function MetricFields({
  label,
  value,
  color,
  isToolTip,
  toolTipText,
}: {
  label: string;
  value: string;
  color?: string;
  isToolTip: boolean;
  toolTipText: string;
}) {
  return (
    <div className="flex justify-between mb-3">
      <div className="flex gap-1 items-center ">
        <div className=" text-grayLight font-medium text-lg">{label}</div>{" "}
        {isToolTip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="">
                <Info className="stroke-grayLight w-[18px] h-[18px]" />
              </div>
            </TooltipTrigger>
            {isToolTip && (
              <TooltipContent className="bg-white text-black dark:text-white dark:bg-black">
                <p>{toolTipText}</p>
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </div>
      <div
        className="font-medium text-lg"
        style={{
          color: color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default MetricFields;
