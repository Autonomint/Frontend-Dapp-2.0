import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-systems/atoms/tooltip";

//@ts-ignore
function ListItemMetric({ label, value, color, tooltipText }: Metric) {
  return (
    <div className="flex md:flex-col md:mt-3 lg:mt-0 justify-between w-full h-full   text-left md:text-center items-start lg:items-start mt-4 gap-4">
      <div className="text-grayLight font-normal text-lg w-[220px] md:w-auto ">
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
        className="text-textBlack font-medium md:text-2xl text-sm dark:text-white text-left"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

export default ListItemMetric;
