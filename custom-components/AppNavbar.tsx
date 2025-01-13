"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import arrowLeft from "../app/assets/arrow-right-02 (1).png";
import { usePathname, useRouter } from "next/navigation";
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

  const navList =
    tabOptions?.length === 0
      ? [
          {
            nameA: "Mint USDa",
            path: "/mintusdalist",
            isActive:
              pathname === "/mintusdalist" ||
              pathname === "/mintUSDaWithCollateral",
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
            router.push("/");
          }}
          className="bg-black h-full px-8 py-[18px] hover:bg-black"
        >
          <Image src={arrowLeft} width={42} height={42} alt="arrow" />
        </Button>
      )}

      <div className="hidden md:flex w-full border-b border-grayLight">
        {navList?.map(({ nameA, path, isActive }) => (
          <div
            key={nameA}
            className={`flex-1 px-5 py-3 text-[32px] font-medium border-r border-grayLight last:border-r-0 hover:cursor-pointer ${
              isActive ? "bg-[#ABFFDE]" : ""
            }`}
            onClick={() => router.push(path)}
          >
            {nameA}
          </div>
        ))}
      </div>

      <div
        className="flex md:hidden  w-full px-5 py-3 text-[32px]  font-medium border-b border-grayLight"
        onClick={() => router.push(activeTab?.path || "/")}
      >
        {activeTab?.nameA || "Select Tab"}
      </div>
    </div>
  );
};

export default AppNavbar;
