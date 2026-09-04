"use client";

import React from "react";
import { MenuCategory } from "@/types/menu";
import { useLang } from "@/providers/app-provider";
import { getImageUrl } from "@/lib/utils";
import { getCategoryName } from "@/lib/i18n-helpers";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

export function CategoryGridCard({
  category,
  itemCount,
  coverPhoto,
  onSelect,
}: {
  category: MenuCategory;
  itemCount: number;
  coverPhoto?: string;
  onSelect: (id: string) => void;
}) {
  const { lang } = useLang();
  const ar = lang === "ar";

  const defaultPhoto = "photo-1541167760496-1628856ab772";
  const photoUrl = getImageUrl(coverPhoto || defaultPhoto, 400, 400);

  return (
    <div
      onClick={() => onSelect(category.id)}
      className="relative aspect-square w-full rounded-none overflow-hidden bg-[#1C120D] border border-white/10 cursor-pointer group shadow-xs transition-transform active:scale-95"
    >
      {/* Background Image with Zoom on Hover */}
      <OptimizedImage
        src={photoUrl}
        alt={getCategoryName(category, lang)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
      />

      {/* Luxury Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/20 transition-all flex flex-col justify-between p-3">
        {/* Top Badge: Item Count */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4A359] text-[#1C120D] shadow-sm">
            {itemCount} {ar ? "أصناف" : "items"}
          </span>
          <span className="text-xl drop-shadow-md">{category.emoji}</span>
        </div>

        {/* Bottom Category Title */}
        <div className="flex items-center justify-between gap-1 pt-2">
          <div className="flex flex-col">
            <h3 className="font-playfair text-sm md:text-base font-black text-white leading-tight drop-shadow-md group-hover:text-[#D4A359] transition-colors">
              {getCategoryName(category, lang)}
            </h3>
          </div>
          {ar ? (
            <ChevronLeft size={18} className="text-[#D4A359] shrink-0 transform group-hover:-translate-x-1 transition-transform" />
          ) : (
            <ChevronRight size={18} className="text-[#D4A359] shrink-0 transform group-hover:translate-x-1 transition-transform" />
          )}
        </div>
      </div>
    </div>
  );
}
