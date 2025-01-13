import React, { useState } from "react";

const gradientMap: { [key: string]: string } = {
  Autonomint: "linear-gradient(to right, #FFFFFF, #CCFFEB)",
  Athermint: "linear-gradient(to right, #FFFFFF, #FFF7E0)",
  AthermintXYZ: "linear-gradient(to right, #FFFFFF, #FEE2E2)",
};

function PriceComparison({
  orgName,
  tag,
  amount,
  tagColor,
  textColor,
  tagBg,
  borderColor,
}: {
  orgName: string;
  tag: string;
  amount: string;
  tagColor: string;
  textColor: string;
  tagBg: string;
  borderColor: string;
}) {
  const gradientBackground = gradientMap[orgName] || "transparent";
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`flex relative ${isHover ? borderColor : ""} ${
        isHover && "priceCardBorderLeft "
      } group flex-col px-6 py-7 gap-4 flex-1 transition-all duration-300 ease-in-out`}
      style={{
        transition: "background 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        setIsHover(true);
        (e.currentTarget as HTMLElement).style.background = gradientBackground;
      }}
      onMouseLeave={(e) => {
        setIsHover(false);
        (e.currentTarget as HTMLElement).style.background = "none";
      }}
    >
      <div className="flex justify-between items-center">
        <span className=" text-[24px] group-hover:font-semibold text-textBlack">
          {orgName}
        </span>
        <span
          style={{
            backgroundColor: isHover ? tagColor : tagBg,
            color: isHover ? "white" : textColor,
            padding: "4px",
          }}
        >
          {tag}
        </span>
      </div>
      <div className="flex justify-between">
        <span
          style={{
            color: isHover ? tagColor : "black",
            fontSize: "24px",
          }}
          className={` text-textBlack text-[24px]`}
        >
          Fee
        </span>
        <span
          style={{
            color: isHover ? tagColor : "black",
            fontSize: "24px",
          }}
        >
          {amount}
        </span>
      </div>
    </div>
  );
}

export default PriceComparison;
