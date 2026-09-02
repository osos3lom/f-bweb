"use client";

import React, { useRef, useEffect } from "react";
import { CATEGORIES } from "@/data/categories";
import { useLang } from "@/providers/app-provider";
import { getCategoryName } from "@/lib/i18n-helpers";

export function CategoryChips({
  activeCat,
  onSelectCategory,
}: {
  activeCat: string;
  onSelectCategory: (id: string) => void;
}) {
  const { lang } = useLang();
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = chipsRef.current?.querySelector(`[data-cat="${activeCat}"]`) as HTMLElement;
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeCat]);

  return (
    <div
      ref={chipsRef}
      className="flex gap-2 mt-3 overflow-x-auto"
      style={{ scrollbarWidth: "none" }}
    >
      {CATEGORIES.map((cat) => {
        const active = cat.id === activeCat;
        return (
          <button
            key={cat.id}
            data-cat={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-poppins text-xs font-semibold transition-all ${
              active
                ? "gradient-espresso-lounge text-white shadow-md shadow-[#3B2319]/20"
                : "bg-white text-[#2B1D16] border border-[#E8DFC5] hover:border-[#D4A359]"
            }`}
          >
            <span style={{ fontSize: 13 }}>{cat.emoji}</span>
            {getCategoryName(cat, lang)}
          </button>
        );
      })}
    </div>
  );
}
