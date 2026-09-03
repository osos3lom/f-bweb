"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { useCart, useLang } from "@/providers/app-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function DesktopHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { toggleLang, t } = useLang();
  const [cartOpen, setCartOpen] = useState(false);

  if (pathname === "/menu" || pathname?.startsWith("/menu")) {
    return null;
  }

  const isHome = pathname === "/" || pathname === "";

  const handleNavClick = (sectionId: string) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      <header className="hidden md:block fixed top-4 inset-x-0 z-40 max-w-6xl mx-auto px-4 w-full transition-all">
        <div
          className="flex h-16 items-center justify-between gap-6 px-6 rounded-full border border-white/70 shadow-[0_12px_40px_rgba(59,35,25,0.1)] gradient-vitrine-glass transition-all duration-300"
        >
          <Link href="/" aria-label="Bitrina home" className="transition-transform hover:scale-105">
            <Logo compact />
          </Link>
          <nav className="flex items-center gap-1.5 text-sm font-medium bg-[#F2ECE4]/60 p-1.5 rounded-full border border-white/40">
            <button
              onClick={() => handleNavClick("home")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                isHome ? "gradient-espresso-lounge text-white shadow-xs font-semibold" : "text-[#2B1D16] hover:text-[#3B2319] hover:bg-white/60"
              }`}
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => handleNavClick("menu")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                pathname === "/menu" ? "gradient-espresso-lounge text-white shadow-xs font-semibold" : "text-[#2B1D16] hover:text-[#3B2319] hover:bg-white/60"
              }`}
            >
              {t("nav.menu")}
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="px-4 py-1.5 rounded-full text-[#2B1D16] hover:text-[#3B2319] hover:bg-white/60 transition-all"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="px-4 py-1.5 rounded-full text-[#2B1D16] hover:text-[#3B2319] hover:bg-white/60 transition-all"
            >
              {t("nav.contact")}
            </button>
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#3B2319] gradient-amber-gold px-4 py-1.5 rounded-full hover:opacity-95 transition-all shadow-xs"
            >
              {t("nav.dashboard")}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="rounded-full border border-[#D4A359]/30 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#3B2319] hover:bg-[#3B2319] hover:text-white transition-all shadow-xs"
            >
              {t("nav.lang_toggle")}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full gradient-espresso-lounge text-white shadow-md hover:scale-105 transition-all"
              aria-label="Open order summary"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -end-1 -top-1 rtl:-left-1 rtl:right-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D4A359] px-1 text-[9px] font-bold text-[#3B2319] shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Cart Drawer */}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}
