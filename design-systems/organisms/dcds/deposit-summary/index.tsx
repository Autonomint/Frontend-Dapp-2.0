export default function DepositSummary({
  apy,
  depositing,
  usdaPoints,
  usdtPoints,
  minUsdaDeposit,
  minUsdtDeposit,
}: {
  apy: string;
  depositing: string;
  usdaPoints: number;
  usdtPoints: number;
  minUsdaDeposit: number;
  minUsdtDeposit: number;
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
        <span className="text-grayLight text-[16px] font-medium">
          {`${minUsdaDeposit} Min USDA+ Deposit`}
        </span>
        <span className="text-black text-[16px] dark:text-white font-medium">
          {usdaPoints} Points
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-grayLight text-[16px] font-medium">
          {`${minUsdtDeposit} Min USDT Deposit`}
        </span>
        <span className="text-black text-[16px] dark:text-white font-medium">
          {usdtPoints} Points
        </span>
      </div>
    </div>
  );
}
