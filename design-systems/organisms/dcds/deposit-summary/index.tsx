export default function DepositSummary({
  apy,
  depositing,
}: {
  apy: string;
  depositing: string;
}) {
  return (
    <div className=" flex flex-col gap-3">
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium">APY</span>
        <span className="text-black w-[60%] 2xl:w-[80%] text-end dark:text-white text-[18px] font-medium">
          {apy}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-grayLight text-[18px] font-medium">
          Depositing
        </span>
        <span className="text-black text-[18px] dark:text-white font-medium">
          {depositing}
        </span>
      </div>
    </div>
  );
}
