"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Coffee, ShoppingBag, Info } from "lucide-react";
import { useCart, useLang } from "@/providers/app-provider";

export function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { t } = useLang();
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const checkHidden = () => {
      setHidden(document.body.classList.contains("hide-mobile-nav"));
    };
    checkHidden();
    const observer = new MutationObserver(checkHidden);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // If in dashboard or reels mode, do not render public bottom nav
  if (hidden || pathname?.startsWith("/dashboard")) return null;

  const tabs = [
    { href: "/", icon: <Home size={19} />, label: t("nav.home") },
    { href: "/menu", icon: <Coffee size={19} />, label: t("nav.menu") },
    { href: "/cart", icon: <ShoppingBag size={19} />, label: t("nav.order") },
    { href: "/info", icon: <Info size={19} />, label: t("nav.info") },
  ];

  return (
    <div className="mobile-bottom-nav md:hidden fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-4 right-4 z-40 max-w-md mx-auto pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center justify-around px-2 py-2 rounded-full border border-white/70 shadow-[0_12px_40px_rgba(59,35,25,0.18)] transition-all duration-300 gradient-vitrine-glass"
      >
        {tabs.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/" || pathname === ""
              : pathname?.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-full relative transition-all duration-300 ${
                active
                  ? "gradient-espresso-lounge text-white shadow-md shadow-[#3B2319]/30 scale-105"
                  : "text-[#9E8675] hover:text-[#3B2319] hover:bg-[#3B2319]/5"
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.href === "/cart" && cartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -end-2.5 rtl:-left-2.5 rtl:right-auto w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold bg-[#D4A359] text-[#3B2319] shadow-xs"
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span
                className="leading-none text-[10px]"
                style={{ fontWeight: active ? 600 : 400 }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
