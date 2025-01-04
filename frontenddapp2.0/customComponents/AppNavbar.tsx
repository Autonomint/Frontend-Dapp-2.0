"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import arrowLeft from "../app/assets/arrow-right-02 (1).png";
import { usePathname, useRouter } from "next/navigation";

function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navList = [
    {
      name: "Mint USDa",
      path: "/mintusdalist",
      isActive:
        pathname === "/mintusdalist" || pathname === "/mintUSDaWithCollateral",
    },
    {
      name: "dCDS",
      path: "/dcds",
      isActive: pathname === "/dcds",
    },
    {
      name: "Bridge",
      path: "/bridge",
      isActive: pathname === "/bridge",
    },
    {
      name: "Dashboard",
      path: "/dashboard/portfolio",
      isActive:
        pathname === "/dashboard/leaderboard" ||
        pathname === "/dashboard/portfolio" ||
        pathname === "/dashboard/stats",
    },
  ];

  const activeTab = navList.find((nav) => nav.isActive);

  return (
    <div className="flex">
      <Button
        onClick={() => {
          router.back();
        }}
        className="bg-black h-full px-8 py-3 hover:bg-black"
      >
        <Image src={arrowLeft} width={42} height={42} alt="arrow" />
      </Button>

      <div className="hidden md:flex w-full border-b border-grayLight">
        {navList.map(({ name, path, isActive }) => (
          <div
            key={name}
            className={`flex-1 px-5 py-3 text-[32px] font-plex-grotesk font-medium border-r border-grayLight last:border-r-0 hover:cursor-pointer ${
              isActive ? "bg-[#ABFFDE]" : ""
            }`}
            onClick={() => router.push(path)}
          >
            {name}
          </div>
        ))}
      </div>

      <div
        className="flex md:hidden w-full px-5 py-3 text-[32px] font-plex-grotesk font-medium border-b border-grayLight"
        onClick={() => router.push(activeTab?.path || "/")}
      >
        {activeTab?.name || "Select Tab"}
      </div>
    </div>
  );
}

export default AppNavbar;
