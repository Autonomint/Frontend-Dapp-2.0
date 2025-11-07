function PortfolioMetrics({
  subHeading,
  value,
  hoverContent,
}: {
  subHeading: string;
  value: string | React.ReactNode;
  hoverContent?: React.ReactNode;
}) {
  return (
    <div className="flex-1 group h-full flex flex-col relative p-5 gap-4 border justify-between border-grayLight">
      <span className="text-textBlack text-[24px] 2xl:text-[32px] font-medium dark:text-white">
        {value}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>

      {hoverContent && (
        <div className=" hidden group-hover:block top-[60px] left-0   z-[10] absolute overflow-hidden dark:bg-[#171B21] rounded-[12px]  w-[350px] shadow-md  bg-white  border-[1px] border-grayLight  transition duration-500 ease-in-out  ">
          {hoverContent}
        </div>
      )}
    </div>
  );
}

export default PortfolioMetrics;
