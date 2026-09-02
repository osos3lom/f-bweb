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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <DesktopHeader />
      <main className={`flex-1 pb-16 md:pb-0 ${isHome ? "" : "md:pt-24"}`}>
        {children}
      </main>
      <DesktopFooter />
      <BottomNav />
    </div>
  );
}

