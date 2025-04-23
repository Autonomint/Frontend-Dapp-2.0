"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const navList = [
    {
      nameA: "Portfolio",
      path: "/dashboard/portfolio",
      isActive: pathname === "/dashboard/portfolio",
      isComingSoon: false,
    },
    {
      nameA: "Leaderboard",
      path: "/dashboard/leaderboard",
      isActive: pathname === "/dashboard/leaderboard",
      isComingSoon: false,
    },
    {
      nameA: "Stats",
      path: "/dashboard/stats",
      isActive: pathname === "/dashboard/stats",
      isComingSoon: true,
    },
  ];

  const activeTab = navList.find((nav) => nav.isActive);

  return (
    <div className="flex dashboard-nav-scroll sm:px-4">
      <div className="flex w-full border border-grayLight  sm:my-5">
        {navList.map(({ nameA, path, isActive, isComingSoon }) => (
          <Link
            prefetch={true}
            href={isComingSoon ? "" : path}
            key={nameA}
            className={`flex-1 px-5 py-2 text-[18px] sm:text-[24px] 2xl:text-[32px] font-medium border-r border-grayLight last:border-r-0 hover:cursor-pointer ${
              isActive
                ? "bg-gradient-to-b from-[#E5F3FF] to-[#FFFDE4] dark:bg-custom-gradient-to-bottom"
                : ""
            }`}
          >
            {nameA}{" "}
            {isComingSoon && (
              <span className="text-grayLight text-base">(Coming Soon)</span>
            )}
          </Link>
        ))}
      </div>

      {/* <div
        className="flex md:hidden  w-full px-5 py-2 text-[32px]  font-medium border-b border-grayLight"
        onClick={() => router.push(activeTab?.path || "/")}
      >
        {activeTab?.nameA || "Select Tab"}
      </div> */}
    </div>
  );
}

export default DashboardNavbar;
