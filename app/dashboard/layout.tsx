import AppNavbar from "@/custom-components/AppNavbar";
import DashboardNavbar from "@/custom-components/DashboardNavbar";
import DashboardLayout from "@/design-systems/organisms/dashboard/layout-wrap";
import useDeviceType from "@/hookes/useDeviceType";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardLayout />
      {children}
    </section>
  );
}
