"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import arrowLeft from "../app/assets/arrow-right-02 (1).png";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
interface AppNavbarProps {
  tabOptions?: TabOption[];
  activeBack?: boolean;
}

interface TabOption {
  nameA: string;
  path: string;
  isActive: boolean;
}
const AppNavbar: React.FC<AppNavbarProps> = ({
  tabOptions = [],
  activeBack = true,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();

  const navList =
    tabOptions?.length === 0
      ? [
          {
            nameA: "Mint USDa",
            path: "/mintusdalist",
            isActive:
              pathname === "/mintusdalist" ||
              pathname === "/mintUSDaWithCollateral/ETH",
          },
          {
            nameA: "dCDS",
            path: "/dcds",
            isActive: pathname === "/dcds",
          },
          {
            nameA: "Bridge",
            path: "/bridge",
            isActive: pathname === "/bridge",
          },
          {
            nameA: "Dashboard",
            path: "/dashboard/portfolio",
            isActive:
              pathname === "/dashboard/leaderboard" ||
              pathname === "/dashboard/portfolio" ||
              pathname === "/dashboard/stats",
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
            "bg-black h-full px-8 py-[13px] hover:bg-black dark:bg-custom-gradient-to-top"
          }
        >
          <Image src={arrowLeft} width={42} height={42} alt="arrow" />
        </Button>
      )}

      <div className="hidden md:flex w-full border-b border-grayLight">
        {navList?.map(({ nameA, path, isActive }) => (
          <div
            key={nameA}
            className={`flex-1 px-5 py-2 cursor-pointer text-[32px] font-medium border-r border-grayLight last:border-r-0   ${
              isActive ? "bg-[#ABFFDE] dark:text-black" : ""
            }`}
            // hover:cursor-pointer dark:hover:bg-custom-gradient-to-top hover:bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]
            onClick={() => router.push(path)}
          >
            {nameA}
          </div>
        ))}
      </div>

      <div
        className="flex md:hidden  w-full px-5 py-2 text-[32px]  font-medium border-b border-grayLight"
        onClick={() => router.push(activeTab?.path || "/")}
      >
        {activeTab?.nameA || "Select Tab"}
      </div>
    </div>
  );
};

export default AppNavbar;
