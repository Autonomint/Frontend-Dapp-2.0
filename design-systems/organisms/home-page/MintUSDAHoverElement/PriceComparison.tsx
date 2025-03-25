import { useTheme } from "next-themes";
import React, { useState } from "react";

const gradientMap: { [key: string]: string } = {
  Autonomint: "linear-gradient(to right, #FFFFFF, #CCFFEB)",
  Deribit: "linear-gradient(to right, #FFFFFF, #FFF7E0)",
  Hegic: "linear-gradient(to right, #FFFFFF, #FEE2E2)",
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
  const { theme } = useTheme();
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return (
    <div
      className={`flex relative ${isHover ? borderColor : ""} ${
        isHover && "priceCardBorderLeft "
      } group flex-col xl:px-4 2xl:px-6 lg:p-3 xl:py-7  gap-4  w-[40%] xl:w-[60%]  xl:flex-1 transition-all duration-300 ease-in-out`}
      style={{
        backgroundImage: isHover
          ? theme == "dark"
            ? "linear-gradient(101.79deg, #0F2027 -0.5%, #203A43 50.34%, #2C5364 102.21%)"
            : prefersDarkMode
            ? "linear-gradient(101.79deg, #0F2027 -0.5%, #203A43 50.34%, #2C5364 102.21%)"
            : gradientBackground
          : "none",
        transition: "background 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        setIsHover(true);
        (e.currentTarget as HTMLElement).style.backgroundImage =
          theme == "dark"
            ? "linear-gradient(135deg, #0F2027,#203A43,#2C5364)"
            : prefersDarkMode
            ? "linear-gradient(135deg, #0F2027,#203A43,#2C5364)"
            : gradientBackground;
      }}
      onMouseLeave={(e) => {
        setIsHover(false);
        (e.currentTarget as HTMLElement).style.background = "none";
      }}
    >
      <div className="flex justify-between items-center">
        <span className=" text-[14px] lg:text-[18px] 2xl:text-[24px] group-hover:font-semibold text-textBlack dark:text-white">
          {orgName}
        </span>
        {!!tag && (
          <span
            style={{
              backgroundColor: isHover ? tagColor : tagBg,
              color: isHover ? "white" : textColor,
            }}
            className="text-[14px] lg:text-[18px] 2xl:text-[24px] p-1 "
          >
            {tag}
          </span>
        )}
      </div>
      <div className="flex justify-between">
        <span
          style={{
            color: isHover
              ? theme == "dark"
                ? tagColor
                : tagColor
              : theme == "dark"
              ? "white"
              : prefersDarkMode
              ? "white"
              : "black",
          }}
          className={` text-textBlack  text-[14px] lg:text-[18px] 2xl:text-[24px]`}
        >
          Fee
        </span>
        <span
          style={{
            color:
              theme == "dark" && orgName == "AthermintXYZ"
                ? isHover
                  ? "#b42e2e"
                  : ""
                : isHover
                ? tagColor
                : theme == "dark"
                ? "white"
                : prefersDarkMode
                ? "dark"
                : "black",
          }}
          className={` text-[14px] lg:text-[18px] 2xl:text-[24px]`}
        >
          {amount}
        </span>
      </div>
    </div>
  );
}

export default PriceComparison;
