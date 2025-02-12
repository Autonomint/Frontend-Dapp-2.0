import AppNavbar from "@/design-systems/organisms/AppNavbar";
import DashboardNavbar from "@/design-systems/organisms/dashboard/DashboardNavbar";
import DashboardLayout from "@/design-systems/organisms/dashboard/layout-wrap";
import useDeviceType from "@/hookes/useDeviceType";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardLayout />
      {children}
    </div>
  );
}
