"use client";
import { Button } from "@/design-systems/atoms/button";
import React, { useState } from "react";
import Image from "next/image";
import arrowLeft from "@/app/assets/arrow-right-02 (1).png";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface CoveredCallsNavbarProps {
  activeBack?: boolean;
}

interface TabOption {
  nameA: string;
  index: number;
  isFeatureActive?: boolean;
  InActiveHeading?: string;
  isComingSoon?: boolean;
  hasLiveChip?: boolean;
}

const CoveredCallsNavbar: React.FC<CoveredCallsNavbarProps> = ({
  activeBack = true,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { theme } = useTheme();

  // Custom tab options for covered calls
  const navList = [
    {
      nameA: "Covered Calls",
      index: 0,
      isFeatureActive: true,
      InActiveHeading: "",
      isComingSoon: false,
      hasLiveChip: true,
    },
    {
      nameA: "Cash-Secured Puts",
      index: 1,
      isFeatureActive: false,
      InActiveHeading: "Coming Soon",
      isComingSoon: true,
    },
  ];

  return (
    <div className="flex  border border-grayLight rounded-lg">
      {activeBack && (
        <Button
          onClick={() => {
            router.back();
          }}
          className={
            "bg-black h-auto px-3  sm:px-8  p-[8px] md:py-[13px] hover:bg-black dark:bg-custom-gradient-to-top"
          }
        >
          <Image src={arrowLeft} width={42} height={42} alt="arrow" />
        </Button>
      )}

      <div className="hidden lg:flex w-full  border-grayLight last:border-r-0">
        <div className="flex">
          {navList?.map(
            ({
              nameA,
              index,
              isFeatureActive,
              InActiveHeading,
              isComingSoon,
              hasLiveChip,
            }) => (
              <button
                key={nameA}
                onClick={() => !isComingSoon && setActiveTab(index)}
                className={`px-5  py-[8px] md:py-[13px] cursor-pointer text-lg sm:text-xl font-medium border-r border-grayLight whitespace-nowrap ${
                  activeTab === index ? "bg-[#ABFFDE] dark:text-black" : ""
                } ${isComingSoon ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="flex items-center gap-2">
                  {nameA}
                  {isComingSoon && (
                    <span className="relative inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-900 dark:to-yellow-800 text-amber-800 dark:text-yellow-200 shadow-sm border border-amber-200 dark:border-yellow-700">
                      <span className="w-1 h-1 bg-amber-400 dark:bg-yellow-500 rounded-full mr-1 animate-pulse"></span>
                      Coming Soon
                    </span>
                  )}
                  {hasLiveChip && (
                    <span className="relative inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-900 dark:to-green-800 text-emerald-800 dark:text-green-200 shadow-sm border border-emerald-200 dark:border-green-700">
                      <span className="w-1 h-1 bg-emerald-400 dark:bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      10 LIVE
                    </span>
                  )}
                </span>
              </button>
            ),
          )}
        </div>
        <div className="flex-1"></div>
      </div>

      <div
        className="flex lg:hidden justify-start items-center  w-full px-5 py-2  text-lg sm:text-xl  font-medium border border-grayLight rounded-r-lg"
        onClick={() => router.push(navList[activeTab]?.nameA || "/")}
      >
        {navList[activeTab]?.nameA || "Select Tab"}
      </div>
    </div>
  );
};

export default CoveredCallsNavbar;
