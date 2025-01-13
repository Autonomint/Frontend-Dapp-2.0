"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import arrowLeft from "../app/assets/arrow-right-02 (1).png";
import { usePathname, useRouter } from "next/navigation";

function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const navList = [
    {
      nameA: "Portfolio",
      path: "/dashboard/portfolio",
      isActive: pathname === "/dashboard/portfolio",
    },
    {
      nameA: "Leaderboard",
      path: "/dashboard/leaderboard",
      isActive: pathname === "/dashboard/leaderboard",
    },
    {
      nameA: "Stats",
      path: "/dashboard/stats",
      isActive: pathname === "/dashboard/stats",
    },
  ];

  const activeTab = navList.find((nav) => nav.isActive);

  return (
    <div className="flex">
      <div className="hidden md:flex w-full border border-grayLight border-r-0 border-l-0 my-6">
        {navList.map(({ nameA, path, isActive }) => (
          <div
            key={nameA}
            className={`flex-1 px-5 py-3 text-[32px] font-medium border-r border-grayLight last:border-r-0 hover:cursor-pointer ${
              isActive ? "bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4]" : ""
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
}

export default DashboardNavbar;
