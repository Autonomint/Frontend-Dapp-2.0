import AppNavbar from "@/custom-components/AppNavbar";
import DashboardNavbar from "@/custom-components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AppNavbar />
      <DashboardNavbar />
      {children}
    </section>
  );
}
