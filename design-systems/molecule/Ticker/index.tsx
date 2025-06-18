"use client";
import Image from "next/image";
import { useEffect } from "react";
import tickerBg from "@/app/assets/ticker-bg.svg";

const Ticker = () => {
  // ticket bar animation
  // useEffect(() => {
  //   // Inject keyframes for scrolling
  //   const style = document.createElement("style");
  //   style.innerHTML = `
  //         @keyframes scroll-left {
  //           0% { transform: translateX(70%); }
  //           100% { transform: translateX(-70%); }
  //         }
  //       `;
  //   document.head.appendChild(style);
  //   return () => {
  //     document.head.removeChild(style);
  //   };
  // }, []);

  // Message list for scrolling ticker bar
  const message = [
    <div className=" dark:text-white text-white  text-[14px] lg:text-[16px]  font-plex-grotesk">
      App is currently updating and will be live in few minutes.
    </div>,
  ];
  return (
    <div className=" relative overflow-hidden border-[1px] border-grayLight border-b border-t-0 h-[45px] flex items-center w-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top">
      <Image
        src={tickerBg}
        alt="boat"
        className="w-full h-full object-cover"
        fill
      />
      <div className="h-full text-center absolute top-1/2 left-1/2 mt-2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full dark:text-white text-white  text-[14px] lg:text-[16px]  font-plex-grotesk">
        App is currently updating and will be live in few minutes.
      </div>
    </div>
  );
};

export default Ticker;
