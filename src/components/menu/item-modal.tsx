"use client";

import React, { useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useLang } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getItemName, getItemDesc, formatCurrency } from "@/lib/i18n-helpers";

export function ItemModal({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: (item: MenuItem, qty: number, notes: string) => void;
}) {
  const { lang, t } = useLang();
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  const isDrink = isDrinkCategory(item.category);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      style={{ background: "rgba(28,18,13,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl md:rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#E8DFC5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className={`relative h-52 overflow-hidden ${isDrink ? "bg-[#FAF6F0] p-4" : "bg-muted"}`}>
          <img
            src={getImageUrl(item.photo, 500, 300)}
            alt={getItemName(item, lang)}
            className={`w-full h-full ${isDrink ? "object-contain object-center" : "object-cover"}`}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(255,255,255,0.6) 0%, transparent 50%)" }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 end-4 rtl:left-4 rtl:right-auto w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 bg-white/90"
          >
            <X size={16} className="text-[#3B2319]" />
          </button>
          {item.badge && (
            <div className="absolute top-4 start-4 rtl:right-4 rtl:left-auto">
              <Badge type={item.badge} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h2 className="font-playfair font-bold text-[#3B2319] text-xl flex-1">
              {getItemName(item, lang)}
            </h2>
            <span className="font-poppins font-bold text-xl shrink-0 text-[#D4A359]">
              {formatCurrency(item.price, lang)}
            </span>
          </div>
          <p className="font-poppins text-sm text-[#9E8675] leading-relaxed mb-5">
            {getItemDesc(item, lang)}
          </p>

          {/* Qty stepper */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-poppins text-sm font-medium text-[#2B1D16]">
              {t("cart.qty")}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-9 h-9 rounded-full border-2 border-[#3B2319] text-[#3B2319] flex items-center justify-center transition-all active:scale-90"
              >
                <Minus size={14} />
              </button>
              <span className="font-poppins font-bold text-[#2B1D16] text-lg w-6 text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-9 h-9 rounded-full gradient-espresso-lounge text-white flex items-center justify-center transition-all active:scale-90"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Notes */}
          <textarea
            className="w-full rounded-xl px-3.5 py-3 font-poppins text-sm text-[#2B1D16] resize-none outline-none mb-5 border border-[#E8DFC5] bg-[#F2ECE4]/60"
            style={{ minHeight: 72 }}
            placeholder={t("cart.notes")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* Add button */}
          <button
            onClick={() => {
              onAdd(item, qty, notes);
              onClose();
            }}
            className="w-full py-4 rounded-2xl font-poppins font-semibold text-white text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg gradient-espresso-lounge"
          >
            <ShoppingBag size={17} />
            {t("cart.add")} —{" "}
            <span className="text-[#D4A359]">{formatCurrency(item.price * qty, lang)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
