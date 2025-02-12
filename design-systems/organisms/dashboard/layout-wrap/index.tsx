"use client";
import AppNavbar from "@/design-systems/organisms/AppNavbar";
import DashboardNavbar from "@/design-systems/organisms/dashboard/DashboardNavbar";
import useDeviceType from "@/hookes/useDeviceType";

const DashboardLayout = () => {
  const deviceType = useDeviceType();
  const showBack = deviceType === "mobile" || deviceType === "tablet";
  return (
    <>
      <AppNavbar activeBack={showBack} />
      <DashboardNavbar />
    </>
  );
};

export default DashboardLayout;
