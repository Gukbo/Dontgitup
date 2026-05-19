import Navbar from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">{children}</main>
    </div>
  );
}
