"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MENU } from "@/data/menu";
import { useLang } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { getItemName, formatCurrency } from "@/lib/i18n-helpers";

export function PopularPicks() {
  const { lang, t } = useLang();
  const popularItems = MENU.filter((m) => m.badge === "Popular").slice(0, 6);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-[#D4A359]" />
          <h2 className="font-playfair font-bold text-[#3B2319] text-lg">
            {t("showcase.popular")}
          </h2>
        </div>
        <Link
          href="/menu"
          className="font-poppins text-xs font-bold flex items-center gap-1 text-[#D4A359] hover:underline bg-[#D4A359]/10 px-3 py-1.5 rounded-full border border-[#D4A359]/20 transition-all active:scale-95"
        >
          <span>{t("showcase.see_all")}</span>
          <ChevronRight size={13} className="rtl:rotate-180" />
        </Link>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-4 pt-1 -mx-5 px-5"
        style={{ scrollbarWidth: "none" }}
      >
        {popularItems.map((item) => {
          const isDrink = isDrinkCategory(item.category);
          return (
            <Link
              href="/menu"
              key={item.id}
              className="shrink-0 w-44 rounded-2xl overflow-hidden border border-[#E8DFC5] bg-white shadow-[0_10px_25px_rgba(59,35,25,0.06)] transition-all duration-300 active:scale-95 flex flex-col justify-between"
            >
              <div className="relative">
                <div className={`w-full h-28 overflow-hidden ${isDrink ? "bg-[#FAF6F0] p-3" : "bg-muted"}`}>
                  <img
                    src={getImageUrl(item.photo, 176, 112)}
                    alt={getItemName(item, lang)}
                    className={`w-full h-full ${isDrink ? "object-contain object-center" : "object-cover"}`}
                    loading="lazy"
                  />
                </div>
                {item.badge && (
                  <span className="absolute top-2 start-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3B2319]/85 backdrop-blur-xs text-[#D4A359] border border-[#D4A359]/40 shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                <div className="font-playfair text-xs font-bold text-[#3B2319] leading-snug line-clamp-1">
                  {getItemName(item, lang)}
                </div>
                <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#F2ECE4]">
                  <span className="font-poppins text-xs font-bold text-[#C89B3C]">
                    {formatCurrency(item.price, lang)}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#3B2319] text-[#D4A359] flex items-center justify-center text-xs font-bold shadow-xs">
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
