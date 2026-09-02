"use client";

import React from "react";
import { DashboardProvider } from "@/lib/menu-service";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F4EC]">
        <DashboardNav />
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </DashboardProvider>
  );
}
