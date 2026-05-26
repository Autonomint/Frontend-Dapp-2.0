"use client";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import DashboardNavbar from "@/design-systems/organisms/dashboard/DashboardNavbar";
import useDeviceType from "@/hookes/useDeviceType";
import { usePathname } from "next/navigation";

const DashboardLayout = () => {
  const deviceType = useDeviceType();
  const pathname = usePathname();
  const showBack = deviceType === "mobile" || deviceType === "tablet";

  const dashboardTabOptions = [
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
  ];

  return (
    <>
      <AppNavbar activeBack={showBack} tabOptions={dashboardTabOptions} />
      <DashboardNavbar />
    </>
  );
};

export default DashboardLayout;

