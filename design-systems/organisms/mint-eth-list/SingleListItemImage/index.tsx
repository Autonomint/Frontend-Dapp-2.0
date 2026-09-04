import Image from "next/image";

function SingleListItemImage({
  src,
  stakedToken,
}: {
  src: string;
  stakedToken: string;
}) {
  return (
    <div className="flex sm:flex-col items-start  justify-start sm:justify-center gap-2 lg:gap-14 min-w-[197px]">
      <Image
        src={src}
        className={`w-[40px] h-[40px] lg:w-[58px] lg:h-[58px] ${
          stakedToken === "NVDA" ? "rounded-full object-cover" : ""
        }`}
        alt={stakedToken}
      />
      <div className="text-textBlack font-medium text-[28px] lg:text-[32px] dark:text-white">
        {stakedToken}
      </div>
    </div>
  );
}
export default SingleListItemImage;
