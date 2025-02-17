import Image from "next/image";

function SingleListItemImage({
  src,
  stakedToken,
}: {
  src: string;
  stakedToken: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center gap-2 lg:gap-14 min-w-[120px]">
      <Image
        src={src}
        className="w-[40px] h-[40px] lg:w-[58px] lg:h-[58px]"
        alt={stakedToken}
      />
      <div className="text-textBlack font-medium text-[28px] lg:text-[32px] dark:text-white">
        {stakedToken}
      </div>
    </div>
  );
}
export default SingleListItemImage;
