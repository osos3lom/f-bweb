"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Utensils, ShoppingBag, BarChart3, Settings, Menu, X, ArrowLeft
} from "lucide-react";
import { Logo } from "@/components/layout/logo";

export function DashboardNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Overview" },
    { href: "/dashboard/menu", icon: <Utensils size={18} />, label: "Menu Management" },
    { href: "/dashboard/orders", icon: <ShoppingBag size={18} />, label: "Live Orders" },
    { href: "/dashboard/analytics", icon: <BarChart3 size={18} />, label: "Analytics" },
    { href: "/dashboard/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#2E5E4E] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <Logo light compact />
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1 transition-all"
          >
            <ArrowLeft size={13} className="rtl:rotate-180" /> Public Site
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg bg-white/15 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 start-0 z-50 w-64 bg-[#263F36] text-white flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full lg:static"
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between">
            <Logo light />
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-widest text-[#C89B3C] mb-3">
            Admin Console
          </div>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[#2E5E4E] text-white font-semibold shadow-md"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-[#DDB65D] hover:text-white transition-colors"
          >
            <ArrowLeft size={14} className="rtl:rotate-180" /> Back to Public Website
          </Link>
        </div>
      </aside>
    </>
  );
}
