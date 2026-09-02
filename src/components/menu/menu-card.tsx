"use client";

import React from "react";
import { Plus } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useLang, useCart } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getItemName, getItemDesc, formatCurrency } from "@/lib/i18n-helpers";

export function MenuCard({
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
      className="menu-card flex gap-3 rounded-2xl overflow-hidden border border-[#E8DFC5] bg-white cursor-pointer vitrine-card-hover"
      onClick={() => onSelect(item)}
    >
      <div className={`w-28 h-28 shrink-0 overflow-hidden ${isDrink ? "bg-[#FAF6F0] p-2" : "bg-muted"}`}>
        <img
          src={getImageUrl(item.photo, 112, 112)}
          alt={getItemName(item, lang)}
          className={`w-full h-full ${isDrink ? "object-contain object-center" : "object-cover"}`}
          loading={isEager ? "eager" : "lazy"}
        />
      </div>
      <div className="flex-1 py-3 px-3 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <div className="font-poppins font-semibold text-sm text-[#2B1D16] leading-snug">
                {getItemName(item, lang)}
              </div>
            </div>
            {item.badge && <Badge type={item.badge} />}
          </div>
          <p className="font-poppins text-xs text-[#9E8675] leading-relaxed line-clamp-2">
            {getItemDesc(item, lang)}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-poppins font-bold text-base text-[#D4A359]">
            {formatCurrency(item.price, lang)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              inCart ? "gradient-amber-gold text-[#3B2319]" : "gradient-espresso-lounge text-white"
            }`}
            aria-label={`Add ${getItemName(item, lang)} to cart`}
          >
            {inCart ? (
              <span className="font-poppins text-xs font-bold">{inCart.qty}</span>
            ) : (
              <Plus size={15} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
