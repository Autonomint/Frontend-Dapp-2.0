"use client";
import AppNavbar from "@/custom-components/AppNavbar";
import DashboardNavbar from "@/custom-components/DashboardNavbar";
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
