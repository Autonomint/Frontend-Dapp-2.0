import { useTheme } from "next-themes";
import React, { useState } from "react";
import cryptoEth from "@/app/assets/eth.png";
import WeETH from "@/app/assets/weETH-icoon.webp";
import WrsETH from "@/app/assets/WrsETH-icon.png";
import WsuperOETH from "@/app/assets/Wrapped_Super_OETH.webp";
import Image from "next/image";
const gradientMap: { [key: string]: string } = {
  Autonomint: "linear-gradient(to right, #FFFFFF, #CCFFEB)",
  Deribit: "linear-gradient(to right, #FFFFFF, #FFF7E0)",
  Hegic: "linear-gradient(to right, #FFFFFF, #FEE2E2)",
};

function AssetsAccepted() {
  const orgName = "Autonomint";
  const amount = `$${123.45}`;
  const tag = "Lowest Fee";
  const tagColor = "#05A552";
  const tagBg = "#05A552";
  const textColor = "white";
  const borderColor = "borderGreen";

  const gradientBackground = gradientMap[orgName] || "transparent";
  const [isHover, setIsHover] = useState(false);
  const { theme } = useTheme();
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  console.log(prefersDarkMode, theme, "theme");

  return (
    <div
      // xl:w-[60%]w-[40%] xl:flex-1
      className={`flex ml-4 relative ${isHover ? borderColor : ""} ${
        isHover && "priceCardBorderLeft "
      } group flex-col xl:px-4 2xl:px-6 lg:p-3 xl:py-4  gap-3 transition-all duration-300 ease-in-out 
      w-[400px]
      `}
      style={{
        backgroundImage: isHover
          ? theme == "dark"
            ? "linear-gradient(101.79deg, #0F2027 -0.5%, #203A43 50.34%, #2C5364 102.21%)"
            : theme == "light"
            ? gradientBackground
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
          Assets Accepted
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center gap-1">
          <Image
            className="w-[40px] h-[40px]"
            src={cryptoEth}
            alt="cryptoEth"
          />
          <span>ETH</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Image className="w-[40px] h-[40px]" src={WeETH} alt="WeETH" />
          <span>weETH</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Image className="w-[40px] h-[40px]" src={WrsETH} alt="WrsETH" />
          <span>wrsETH</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Image
            className="w-[40px] h-[40px]"
            src={WsuperOETH}
            alt="WsuperOETH"
          />
          <span>wsuperOETHb</span>
        </div>
      </div>
    </div>
  );
}

export default AssetsAccepted;
