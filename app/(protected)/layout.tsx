import AppNavbar from "@/components/ui/AppNavbar";

export default async function SecondaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="secondary-layout min-h-screen h-full px-6 pt-[100px]">
      <AppNavbar />
      <main>{children}</main>
    </div>
  );
}
