export function StatsMetrics({
  value,
  metricVal,
  className,
}: {
  value: string;
  metricVal: string;
  className?: string;
}) {
  return (
    <div className="flex w-1/2 lg:flex-1 flex-col  gap-3">
      <span className="text-[24px] font-medium text-textBlack dark:text-white">
        {value}
      </span>
      <span className="text-[14px] font-normal text-grayLight">
        {metricVal}
      </span>
    </div>
  );
}
