import AppNavbar from "@/customComponents/AppNavbar";
import DashboardNavbar from "@/customComponents/DashboardNavbar";

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
