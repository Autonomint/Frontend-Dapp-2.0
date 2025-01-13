import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import PriceGraph from "./assets/Chart.png";
import arrow from "./assets/arrow-right-02.png";
import { HoverWrapperProps } from "../interfaces";

function DCDSHoverElement() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/dcds");
      }}
      className="flex flex-col border-x border-y border-[1px]   border-grayLight overflow-y-hidden animateDCDS gap-8 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-8 relative"
    >
      <div className=" text-textBlack text-[38px] font-medium">
        $1,000 Invested would have become $3,000
      </div>
      <Image src={PriceGraph} alt="Price Graph" className="w-full" />
      <div className=" text-textBlack text-[38px] pb-12 font-medium">
        Get up to 200% APY
      </div>
      <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[108px] hover:bg-textBlack">
        Earn
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

{
  (" ");
}

const DcdsHoverWrapper: React.FC<HoverWrapperProps> = ({
  hoveredIndex,
  setHoveredIndex,
  setCurrentIndex,
  item,
}) => {
  const router = useRouter();
  return (
    <div
      className={`relative closeAnimateDCDS  bg-white cursor-pointer  ${
        hoveredIndex === 1
          ? "w-[60%]  !h-[550px]"
          : hoveredIndex === 0
          ? "w-[30%] !h-[550px]"
          : "w-[50%]"
      } h-[400px] ${
        hoveredIndex === null
          ? "border-x border-y-0  border-[1px]  border-grayLight"
          : hoveredIndex === 3
          ? " border-x border-y-0 border-[1px]  border-grayLight"
          : ""
      }`}
      onMouseEnter={() => {
        setHoveredIndex(1);
        setCurrentIndex(1);
      }}
      onMouseLeave={() => {
        setHoveredIndex(null);
        setCurrentIndex(null);
      }}
      style={{
        transition: "width 0.3s ease-in, height 0.3s ease-in",
      }}
    >
      <div className={" h-full flex flex-col justify-between"}>
        {hoveredIndex === 1 ? (
          <DCDSHoverElement />
        ) : (
          <div className={"p-4 h-full flex flex-col justify-between"}>
            <h3 className="font-medium text-[42px]  mb-2">{item.title}</h3>
            {item.subtitle && (
              <p className="text-gray-600 text-[32px]">{item.subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DcdsHoverWrapper;
