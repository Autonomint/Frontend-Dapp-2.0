"use client";
import Image from "next/image";
import { useEffect } from "react";
import tickerBg from "@/app/assets/ticker-bg.svg";

const Ticker = () => {
  // ticket bar animation
  useEffect(() => {
    // Inject keyframes for scrolling
    const style = document.createElement("style");
    style.innerHTML = `
          @keyframes scroll-left {
            0% { transform: translateX(70%); }
            100% { transform: translateX(-70%); }
          }
        `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Message list for scrolling ticker bar
  const message = [
    <a
      key="ticker-1"
      href="https://app.liquidity.land/project/autonomint"
      target="_blank"
      className=" dark:text-white text-white  text-[14px] lg:text-[16px]  font-plex-grotesk"
    >
      app.autonomint.com is now app.nondollar.life
    </a>,
    <a
      key="ticker-2"
      href="https://app.liquidity.land/project/autonomint"
      target="_blank"
      className=" dark:text-white text-white   text-[14px] lg:text-[16px]  font-plex-grotesk"
    >
      app.autonomint.com is now app.nondollar.life
    </a>,
    <a
      key="ticker-3"
      href="https://app.liquidity.land/project/autonomint"
      target="_blank"
      className=" dark:text-white text-white   text-[14px] lg:text-[16px]  font-plex-grotesk"
    >
      app.autonomint.com is now app.nondollar.life
    </a>,
    <a
      key="ticker-4"
      href="https://app.liquidity.land/project/autonomint"
      target="_blank"
      className=" dark:text-white text-white   text-[14px] lg:text-[16px]  font-plex-grotesk"
    >
      app.autonomint.com is now app.nondollar.life
    </a>,
    <a
      key="ticker-5"
      href="https://app.liquidity.land/project/autonomint"
      target="_blank"
      className=" dark:text-white text-white   text-[14px] lg:text-[16px]  font-plex-grotesk"
    >
      app.autonomint.com is now app.nondollar.life
    </a>,
    <a
      key="ticker-6"
      href="https://app.liquidity.land/project/autonomint"
      target="_blank"
      className=" dark:text-white text-white   text-[14px] lg:text-[16px]  font-plex-grotesk"
    >
      app.autonomint.com is now app.nondollar.life
    </a>,
  ];
  return (
    <div className=" relative overflow-hidden border-[1px] border-grayLight border-b border-t-0 h-[45px] flex items-center w-full bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-top">
      <Image
        src={tickerBg}
        alt="boat"
        className="w-full h-full object-cover"
        fill
      />
      <div
        className="flex w-full whitespace-nowrap animate-scroll-left"
        style={{
          animation: "scroll-left 40s linear infinite",
        }}
      >
        {message.map((item, index) => (
          <div className="flex items-center" key={index}>
            <span className="font-bold">{item}</span>
            <span className="text-lg font-bold px-8 mt-2 text-white dark:text-white">
              *
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
