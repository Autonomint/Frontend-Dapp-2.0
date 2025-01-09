import DashboardNavbar from "@/customComponents/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardNavbar />
      {children}
    </section>
  );
}
