"use client";
import { Button } from "@/design-systems/atoms/button";
import React from "react";
import Image from "next/image";
import arrowLeft from "@/app/assets/arrow-right-02 (1).png";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import useBorrowPause from "@/hookes/contract-hooks/useBorrowPause";
import useCdsPause from "@/hookes/contract-hooks/useCdsPause";
interface AppNavbarProps {
  tabOptions?: TabOption[];
  activeBack?: boolean;
}

interface TabOption {
  nameA: string;
  path: string;
  isActive: boolean;
  isFeatureActive?: boolean;
  InActiveHeading?: string;
  isComingSoon?: boolean;
}
const AppNavbar: React.FC<AppNavbarProps> = ({
  tabOptions = [],
  activeBack = true,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  // getting borrow puase data
  const { isFunctionPausedBorrow_Deposit } = useBorrowPause();
  // getting cds pause data
  const { isFunctionPausedCDS_Deposit } = useCdsPause();

  const navList =
    tabOptions?.length === 0
      ? [
          {
            nameA: "Mint USDA+",
            path: "/mintusdalist",
            isActive:
              pathname === "/mintusdalist" ||
              pathname === "/mintUSDaWithCollateral/ETH",
            isFeatureActive: !isFunctionPausedBorrow_Deposit,
            InActiveHeading: "Borrow is paused now",
            isComingSoon: false,
          },
          {
            nameA: "Earn With dCDS",
            path: "/dcds",
            isActive: pathname === "/dcds",
            isFeatureActive: !isFunctionPausedCDS_Deposit,
            InActiveHeading: "CDS Deposit is paused now",
            isComingSoon: false,
          },
          {
            nameA: "Dashboard",
            path: "/dashboard/portfolio",
            isActive:
              pathname === "/dashboard/leaderboard" ||
              pathname === "/dashboard/portfolio" ||
              pathname === "/dashboard/stats",
            isFeatureActive: true,
            InActiveHeading: "",
            isComingSoon: false,
          },
          {
            nameA: "Bridge",
            path: "/bridge",
            isActive: pathname === "/bridge",
            isFeatureActive: true,
            InActiveHeading: "",
          },
        ]
      : tabOptions;

  const activeTab = navList?.find((nav) => nav.isActive);

  return (
    <div className="flex">
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

      <div className="hidden lg:flex w-full border-b border-grayLight">
        {navList?.map(
          ({
            nameA,
            path,
            isActive,
            isFeatureActive,
            InActiveHeading,
            isComingSoon,
          }) => (
            <Link
              prefetch={true}
              href={isComingSoon ? "" : path}
              key={nameA}
              className={`flex-1 px-5  py-[8px] md:py-[13px] cursor-pointer text-2xl sm:text-[32px] font-medium border-r border-grayLight last:border-r-0   ${
                isActive && navList.length > 1
                  ? "bg-[#ABFFDE] dark:text-black"
                  : ""
              }`}
              // hover:cursor-pointer dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]
            >
              {nameA}{" "}
              {isComingSoon && (
                <span className="text-grayLight text-base">(Coming Soon)</span>
              )}
              <span className="text-[14px] text-grayLight">
                {!isFeatureActive && `(${InActiveHeading})`}
              </span>
            </Link>
          )
        )}
      </div>

      <div
        className="flex lg:hidden justify-start items-center  w-full px-5 py-2  text-2xl sm:text-[32px]  font-medium border-b border-grayLight"
        onClick={() => router.push(activeTab?.path || "/")}
      >
        {activeTab?.nameA || "Select Tab"}
      </div>
    </div>
  );
};

export default AppNavbar;
