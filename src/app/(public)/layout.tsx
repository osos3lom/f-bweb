"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DesktopHeader } from "@/components/layout/desktop-header";
import { DesktopFooter } from "@/components/layout/desktop-footer";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const isMenu = pathname === "/menu" || pathname?.startsWith("/menu");

  React.useEffect(() => {
    if (isMenu) {
      document.body.style.backgroundColor = "#1C120D";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [isMenu]);

  return (
    <div className={`min-h-screen flex flex-col ${isMenu ? "bg-[#1C120D]" : "bg-[#FAF6F0]"}`}>
      {!isMenu && <DesktopHeader />}
      <main className={`flex-1 pb-16 md:pb-0 ${isHome || isMenu ? "" : "md:pt-24"}`}>
        {children}
      </main>
      <DesktopFooter />
      <BottomNav />
    </div>
  );
}

