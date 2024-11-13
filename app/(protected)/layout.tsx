"use client";
import AppNavbar from "@/components/ui/AppNavbar";

export default function SecondaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="secondary-layout overflow-x-hidden min-h-screen h-full px-6 pt-[100px]">
      <AppNavbar />
      <main>{children}</main>
    </div>
  );
}
