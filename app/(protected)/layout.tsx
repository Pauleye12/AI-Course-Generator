import AppNavbar from "@/components/ui/AppNavbar";
import { AnimatePresence } from "framer-motion";

export default async function SecondaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      <div className="secondary-layout overflow-x-hidden min-h-screen h-full px-6 pt-[100px]">
        <AppNavbar />
        <main>{children}</main>
      </div>
    </AnimatePresence>
  );
}
