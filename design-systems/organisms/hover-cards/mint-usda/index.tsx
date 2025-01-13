import { Button } from "@/components/ui/button";
import PriceComparison from "@/custom-components/PriceComparison";
import Image from "next/image";
import { useRouter } from "next/router";
import arrow from "./assets/arrow-right-02.png";
import LTV from "./assets/LTV-range-image.svg";
import { HoverWrapperProps } from "../interfaces";

export function MintUSDAHoverElement() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/mintusdalist");
      }}
      className="flex flex-col animateMint border-x border-y border-[1px] overflow-y-hidden  border-grayLight gap-4 h-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] p-6 relative"
    >
      <div className=" tetx-textBlack text-[38px] font-medium">
        100% Synthetic LTV
      </div>
      <div>
        <Image src={LTV} alt="tvl" style={{ width: "100%" }} />
      </div>
      <div className="flex justify-between">
        <span className=" font-medium text-lg text-grayLight">
          80% Stablecoin
        </span>
        <span className=" font-medium text-lg text-grayLight">
          20% Downside Protection
        </span>
      </div>
      <div className="text-[32px] text-textBlack font-medium ">
        Fee Comparison
      </div>
      <div className="flex gap-8 ml-6 mb-20">
        {[
          {
            orgName: "Autonomint",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#05A552",
            tagBg: "#05A552",
            textColor: "white",
            borderColor: "borderGreen",
          },
          {
            orgName: "Athermint",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#D6A100",
            tagBg: "#FFF7E0",
            textColor: "#D6A100",
            borderColor: "borderYellow",
          },
          {
            orgName: "AthermintXYZ",
            amount: "$0.02",
            tag: "Lowest Fee",
            tagColor: "#AA0001",
            tagBg: "#FEE2E2",
            textColor: "#AA0001",
            borderColor: "borderRed",
          },
        ].map((feeCom) => {
          return (
            <PriceComparison
              orgName={feeCom.orgName}
              tag={feeCom.tag}
              amount={feeCom.amount}
              tagColor={feeCom.tagColor}
              textColor={feeCom.textColor}
              tagBg={feeCom.tagBg}
              borderColor={feeCom.borderColor}
            />
          );
        })}
      </div>
      <Button className="absolute bottom-0 left-0 w-full mt-13 bg-textBlack text-white text-[32px] flex justify-between h-[102px] hover:bg-textBlack">
        Mint USDa
        <Image src={arrow} width={42} height={42} alt="arrow" />
      </Button>
    </div>
  );
}

const MintUSDAHoverWrapper: React.FC<HoverWrapperProps> = ({
  hoveredIndex,
  setHoveredIndex,
  setCurrentIndex,
  item,
}) => {
  const router = useRouter();
  return (
    <div
      className={`relative  closeAnimateMint bg-white cursor-pointer  ${
        hoveredIndex === 0
          ? "w-[80%] !h-[550px]"
          : hoveredIndex === 1
          ? "w-[40%] !h-[550px]"
          : "w-[50%]"
      } h-[400px] ${
        hoveredIndex === null || hoveredIndex === 2
          ? " border-x border-y-0 border-[1px]  border-grayLight"
          : " border-b-0 border-r-0 border-[1px]  border-grayLight border-y-0"
      }`}
      onMouseEnter={() => {
        setHoveredIndex(0);
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
        {hoveredIndex === 0 ? (
          <MintUSDAHoverElement />
        ) : (
          <div className="h-full flex flex-col justify-between items-start  p-4">
            <h3 className="font-medium  text-[42px]  mb-2">{item.title}</h3>
            {item.subtitle && (
              <p className="text-[32px] text-gray-600">{item.subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MintUSDAHoverWrapper;
