import Spinner from "@/design-systems/atoms/Spinner";

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
          value
        )}
      </span>
      <span className="text-grayLight md:text-lg text-[14px] ">
        {subHeading}
      </span>
    </div>
  );
}

export default PortfolioMetrics;
