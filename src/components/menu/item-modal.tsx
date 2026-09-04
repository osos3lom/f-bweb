"use client";

import React, { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, Sparkles, Clock } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useLang } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getItemName, getItemDesc, formatCurrency } from "@/lib/i18n-helpers";
import { OptimizedImage } from "@/components/ui/optimized-image";

export function ItemModal({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: (item: MenuItem, qty: number, notes: string) => void;
}) {
  const { lang, t, ar } = useLang();
  const [qty, setQty] = useState(1);

  const isDrink = isDrinkCategory(item.category);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300 select-none overflow-hidden"
      onClick={onClose}
    >
      {/* ── Modal Main Card Container (Full Height Mobile & Desktop) ── */}
      <div
        className="relative w-full h-screen h-[100vh] md:h-[88vh] md:max-h-[820px] md:max-w-5xl md:rounded-3xl overflow-hidden bg-[#1C120D] text-white border-0 md:border md:border-[#D4A359]/30 md:shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col md:grid md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─────────────────────────────────────────────────────────────
            COLUMN 1 / MOBILE HERO: Full Height Image Showcase (Crystal Clear, No Dark Overlays)
            ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full h-full flex-1 md:h-full md:col-span-7 overflow-hidden bg-[#150D09] group">
          {/* Crystal Clear Hero Image - Zero Dark Overlays */}
          <OptimizedImage
            src={getImageUrl(item.photo, 900, 1000)}
            alt={getItemName(item, lang)}
            priority
            className={`w-full h-full ${
              isDrink
                ? "object-contain object-center p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
                : "object-cover object-center transition-transform duration-700 group-hover:scale-105"
            }`}
          />

          {/* Floating Header Actions (Top Left / Right) */}
          <div className="absolute top-[calc(1rem+env(safe-area-inset-top,0px))] inset-x-4 flex items-center justify-between z-20">
            {/* Badge Tag */}
            <div>
              {item.badge && <Badge type={item.badge} />}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:bg-black/80 active:scale-90 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Floating Price Tag on Image */}
          <div className="absolute bottom-6 start-6 z-20 flex items-center gap-2">
            <div className="px-4 py-2 rounded-2xl bg-[#1C120D]/90 backdrop-blur-md border border-[#D4A359]/40 shadow-2xl flex items-center gap-2">
              <Sparkles size={14} className="text-[#D4A359] animate-pulse" />
              <span className="font-poppins font-extrabold text-lg text-[#D4A359]">
                {formatCurrency(item.price, lang)}
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            COLUMN 2 / MOBILE SHEET: Customization & Cart Action
           ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full md:h-full md:col-span-5 flex flex-col bg-[#1C120D] text-white border-t md:border-t-0 md:border-s border-[#D4A359]/25 shadow-2xl overflow-hidden max-h-[55vh] md:max-h-full">
          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-none">
            {/* Header: Title & Subtitle */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4A359] uppercase tracking-wider">
                <span>{item.category.toUpperCase()}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-white/70">
                  <Clock size={12} /> 5-10 {ar ? "دقائق" : "mins"}
                </span>
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {getItemName(item, lang)}
              </h2>
              <p className="font-poppins text-xs md:text-sm text-[#C4B1A0] leading-relaxed">
                {getItemDesc(item, lang)}
              </p>
            </div>
          </div>

          {/* Sticky Bottom Action Dock Bar */}
          <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] md:p-6 bg-[#150D09] border-t border-[#D4A359]/30 space-y-4 shadow-2xl">
            {/* Quantity Stepper Row */}
            <div className="flex items-center justify-between">
              <span className="font-poppins text-xs font-bold text-white/80 uppercase tracking-wider">
                {t("cart.qty")}
              </span>
              <div className="flex items-center gap-4 bg-[#261B15] border border-[#D4A359]/30 rounded-full px-3 py-1.5">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                  className="w-8 h-8 rounded-full border border-[#D4A359]/40 text-[#D4A359] flex items-center justify-center transition-all active:scale-90 disabled:opacity-40 disabled:pointer-events-none hover:bg-[#D4A359]/10 cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="font-poppins font-extrabold text-white text-base w-6 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded-full bg-[#D4A359] text-[#1C120D] flex items-center justify-center transition-all active:scale-90 hover:bg-[#e4b56c] font-bold shadow-md cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Primary Call to Action Button */}
            <button
              onClick={() => {
                onAdd(item, qty, "");
                onClose();
              }}
              className="w-full py-4 rounded-2xl font-poppins font-extrabold text-[#1C120D] text-base flex items-center justify-center gap-3 transition-all active:scale-98 shadow-xl bg-gradient-to-r from-[#F3E0B5] via-[#D4A359] to-[#B88339] hover:brightness-110 cursor-pointer"
            >
              <ShoppingBag size={19} className="text-[#1C120D]" />
              <span>{t("cart.add")} —</span>
              <span className="text-[#1C120D] font-extrabold">
                {formatCurrency(item.price * qty, lang)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
