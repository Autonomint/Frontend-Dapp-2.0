import React from "react";

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
}: {
  orgName: string;
  tag: string;
  amount: string;
  tagColor: string;
  textColor: string;
}) {
  const gradientBackground = gradientMap[orgName] || "transparent";

  return (
    <div
      className="flex flex-col p-6 flex-1 transition-all duration-300 ease-in-out"
      style={{
        paddingLeft: orgName === "Autonomint" ? "0" : "20px",
        transition: "background 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = gradientBackground;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "none";
      }}
    >
      <div className="flex justify-between items-center">
        <span className="font-plex-grotesk text-[24px] text-textBlack">
          {orgName}
        </span>
        <span
          style={{
            backgroundColor: tagColor,
            color: textColor,
            padding: "4px",
          }}
        >
          {tag}
        </span>
      </div>
      <div className="flex justify-between">
        <span className={`font-plex-grotesk text-textBlack text-[24px]`}>
          Fee
        </span>
        <span
          style={{
            color: tagColor || "black",
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
