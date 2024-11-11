"use client";
import AppNavbar from "@/components/ui/AppNavbar";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SecondaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <AnimatePresence>
      <div
        key={pathName}
        className="secondary-layout overflow-x-hidden min-h-screen h-full px-6 pt-[100px]"
      >
        <AppNavbar />
        <main>{children}</main>
      </div>
    </AnimatePresence>
  );
}
