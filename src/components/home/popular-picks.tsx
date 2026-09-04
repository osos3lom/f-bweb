"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { MENU } from "@/data/menu";
import { useLang } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { getItemName, formatCurrency } from "@/lib/i18n-helpers";
import { OptimizedImage } from "@/components/ui/optimized-image";

export function PopularPicks() {
  const { lang, t, ar } = useLang();
  const popularItems = MENU.filter((m) => m.badge === "Popular").slice(0, 6);

  const getLocalizedBadge = (badge?: string) => {
    if (!badge) return null;
    if (badge === "Popular") return ar ? "★ شائع" : "★ Popular";
    if (badge === "New") return ar ? "✦ جديد" : "✦ New";
    return badge;
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3.5 px-0.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-[#D4A359]" />
          <h2 className="font-playfair font-bold text-[#3B2319] text-base md:text-lg">
            {t("showcase.popular")}
          </h2>
        </div>
        <Link
          href="/menu"
          className="font-poppins text-xs font-bold flex items-center gap-1 text-[#D4A359] hover:underline bg-[#D4A359]/10 px-3 py-1.5 rounded-full border border-[#D4A359]/20 transition-all active:scale-95 shadow-2xs"
        >
          <span>{t("showcase.see_all")}</span>
          {ar ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
        </Link>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-4 pt-1 -mx-5 px-5 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {popularItems.map((item, index) => {
          const isDrink = isDrinkCategory(item.category);
          const badgeText = getLocalizedBadge(item.badge);

          return (
            <Link
              href="/menu"
              key={item.id}
              className="shrink-0 w-44 rounded-2xl overflow-hidden border border-[#E8DFC5] bg-white shadow-[0_10px_25px_rgba(59,35,25,0.06)] hover:shadow-[0_15px_35px_rgba(59,35,25,0.12)] hover:border-[#D4A359]/60 transition-all duration-300 active:scale-95 flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F0]">
                <OptimizedImage
                  src={getImageUrl(item.photo, 240, 180)}
                  alt={getItemName(item, lang)}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    isDrink ? "object-contain p-3" : "object-cover"
                  }`}
                  priority={index < 2}
                />
                {badgeText && (
                  <span className="absolute top-2.5 start-2.5 text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#1C120D]/90 backdrop-blur-md text-[#D4A359] border border-[#D4A359]/40 shadow-sm">
                    {badgeText}
                  </span>
                )}
              </div>

              <div className="p-3 flex flex-col justify-between flex-1 gap-2.5">
                <div className="font-playfair text-xs font-bold text-[#3B2319] leading-snug line-clamp-1 group-hover:text-[#C89B3C] transition-colors">
                  {getItemName(item, lang)}
                </div>
                <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-[#F2ECE4]">
                  <span className="font-poppins text-xs font-black text-[#C89B3C]">
                    {formatCurrency(item.price, lang)}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#1C120D] text-[#D4A359] border border-[#D4A359]/30 flex items-center justify-center text-xs font-black shadow-sm group-hover:bg-[#D4A359] group-hover:text-[#1C120D] transition-all duration-300">
                    +
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
