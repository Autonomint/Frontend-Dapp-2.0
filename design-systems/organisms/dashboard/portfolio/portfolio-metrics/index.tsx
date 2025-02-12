function PortfolioMetrics({
  subHeading,
  value,
}: {
  subHeading: string;
  value: string;
}) {
  return (
    <div className="flex-1 flex flex-col px-4  py-4 gap-2 border-grayLight  border border-solid">
      <span className="text-textBlack 2xl:text-[32px] text-[24px] font-medium dark:text-white">
        {value}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>
    </div>
  );
}

export default PortfolioMetrics;
