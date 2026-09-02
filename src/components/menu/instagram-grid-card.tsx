"use client";

import React from "react";
import { Plus, Heart } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useLang, useCart } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { getItemName, formatCurrency } from "@/lib/i18n-helpers";

export function InstagramGridCard({
  item,
  onSelect,
  isEager = false,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  isEager?: boolean;
}) {
  const { lang } = useLang();
  const { cart, addToCart } = useCart();
  const inCart = cart.find((c) => c.item.id === item.id);
  const isDrink = isDrinkCategory(item.category);

  return (
    <div
      onClick={() => onSelect(item)}
      className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#E8DFC5] cursor-pointer group shadow-xs transition-transform active:scale-95"
    >
      <img
        src={getImageUrl(item.photo, 200, 200)}
        alt={getItemName(item, lang)}
        className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
          isDrink ? "object-contain p-2" : "object-cover"
        }`}
        loading={isEager ? "eager" : "lazy"}
      />

      {/* Grid Item Overlay Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C120D]/90 via-[#1C120D]/40 to-transparent opacity-90 transition-opacity flex flex-col justify-between p-2">
        {/* Top Badge or Heart */}
        <div className="flex items-center justify-between">
          {item.badge ? (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#D4A359] text-[#1C120D]">
              {item.badge}
            </span>
          ) : (
            <span />
          )}
          <Heart size={14} className="text-white/80 fill-white/20" />
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col gap-1">
          <span className="font-playfair text-xs font-bold text-white leading-tight line-clamp-1">
            {getItemName(item, lang)}
          </span>
          <div className="flex items-center justify-between pt-0.5">
            <span className="font-poppins text-xs font-bold text-[#D4A359]">
              {formatCurrency(item.price, lang)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform active:scale-90 ${
                inCart ? "bg-[#D4A359] text-[#1C120D]" : "bg-white/20 text-white backdrop-blur-xs"
              }`}
            >
              {inCart ? inCart.qty : <Plus size={12} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
