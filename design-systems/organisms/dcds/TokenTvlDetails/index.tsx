import Image from "next/image";

function TokenTvlDetails({
  tokenName,
  tvl,
  icon,
}: {
  icon: any;
  tokenName: string;
  tvl: string;
}) {
  return (
    <div className="bg-gradient-to-b from-[#E5F3FF] to-[#E5F3FF] p-8 flex justify-between border border-solid border-grayLight border-b-0 dark:bg-none">
      <div className="flex flex-row lg:flex-col gap-8">
        <Image src={icon} alt="token" width={32} height={32} />
        <span className="text-[24px] text-textBlack dark:text-white">
          {tokenName}
        </span>
      </div>
      <div className="flex flex-row-reverse items-center lg:flex-col gap-8">
        <span className="text-[18px] font-normal text-right text-grayLight dark:text-white">
          TVL
        </span>
        <span className="text-[24px] font-medium text-textBlack dark:text-white">
          {tvl}
        </span>
      </div>
    </div>
  );
}

export default TokenTvlDetails;
