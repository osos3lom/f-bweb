"use client";

import React, { useRef, useEffect } from "react";
import { CATEGORIES } from "@/data/categories";
import { useLang } from "@/providers/app-provider";
import { getCategoryName } from "@/lib/i18n-helpers";

export function InstagramStories({
  activeCat,
  onSelectCategory,
  isDark = true,
}: {
  activeCat: string;
  onSelectCategory: (id: string) => void;
  isDark?: boolean;
}) {
  const { lang } = useLang();
  const storiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = storiesRef.current?.querySelector(`[data-cat="${activeCat}"]`) as HTMLElement;
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeCat]);

  return (
    <div
      ref={storiesRef}
      className={`flex gap-3 px-3 py-2 overflow-x-auto scrollbar-none rounded-2xl transition-all ${
        isDark
          ? "bg-transparent border-0"
          : "bg-white/80 backdrop-blur-xs border border-[#E8DFC5]/60"
      }`}
      style={{ scrollbarWidth: "none" }}
    >
      {CATEGORIES.map((cat) => {
        const active = cat.id === activeCat;
        return (
          <button
            key={cat.id}
            data-cat={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="shrink-0 flex flex-col items-center gap-1 focus:outline-none group"
          >
            {/* Instagram Story Gradient Ring */}
            <div
              className={`p-[2px] rounded-full transition-all duration-300 ${
                active
                  ? "bg-gradient-to-tr from-[#D4A359] via-[#FAF6F0] to-[#3B2319] scale-105 shadow-md ring-2 ring-[#D4A359]/40"
                  : isDark
                  ? "bg-white/20 hover:bg-[#D4A359]/60"
                  : "bg-[#E8DFC5] hover:bg-[#D4A359]/60"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full p-1 flex items-center justify-center border border-white/20 shadow-inner relative overflow-hidden transition-all ${
                  isDark ? "bg-[#1C120D]" : "bg-[#FAF6F0]"
                }`}
              >
                <span className="text-xl transform transition-transform group-hover:scale-110">
                  {cat.emoji}
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] font-poppins tracking-wide whitespace-nowrap px-2.5 py-0.5 rounded-full transition-all max-w-[96px] truncate shadow-md ${
                active
                  ? "bg-[#D4A359] text-[#1C120D] font-black border border-[#D4A359]"
                  : isDark
                  ? "bg-black/65 backdrop-blur-md text-white/95 font-bold border border-white/20 hover:border-[#D4A359]/60 hover:text-[#D4A359]"
                  : "bg-white/90 backdrop-blur-md text-[#3B2319] font-bold border border-[#E8DFC5]"
              }`}
            >
              {getCategoryName(cat, lang)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
