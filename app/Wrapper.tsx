"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  return (
    <AnimatePresence>
      <div key={pathName}>{children}</div>
    </AnimatePresence>
  );
};

export default Wrapper;
