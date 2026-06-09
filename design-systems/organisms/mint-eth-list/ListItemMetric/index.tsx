import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";

//@ts-ignore
function ListItemMetric({ label, value, color, tooltipText }: Metric) {
  return (
    <div className="flex md:flex-col justify-between items-center w-full h-full text-left md:text-left mt-0 gap-1 md:gap-2 py-1">
      <div className="text-grayLight font-normal text-xs sm:text-sm lg:text-base w-full min-w-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{label}</div>
          </TooltipTrigger>
          {tooltipText && (
            <TooltipContent className="bg-white dark:bg-black">
              <p>{tooltipText}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
      <div
        className="text-textBlack font-medium text-sm sm:text-base md:text-xl lg:text-2xl dark:text-white text-left w-full"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

export default ListItemMetric;
