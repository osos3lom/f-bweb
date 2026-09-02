"use client";

import React from "react";
import { X, ShoppingBag, Trash2, Minus, Plus, Phone } from "lucide-react";
import { useCart, useLang } from "@/providers/app-provider";
import { getImageUrl } from "@/lib/utils";
import { getItemName, formatCurrency } from "@/lib/i18n-helpers";

export function CartDrawer({ onClose }: { onClose: () => void }) {
  const { cart, updateQty, removeItem, cartTotal } = useCart();
  const { lang, t } = useLang();

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C120D]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <aside
        className="h-full w-full max-w-md overflow-y-auto bg-[#FAF6F0] p-7 shadow-2xl flex flex-col justify-between"
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4A359]">
                {t("cart.title")}
              </span>
              <h2 className="font-playfair text-3xl font-bold text-[#3B2319]">
                {t("cart.total")}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-[#E8DFC5] text-[#3B2319]"
            >
              <X size={18} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="py-24 text-center">
              <ShoppingBag className="mx-auto text-[#D4A359]/60" size={42} />
              <p className="mt-4 text-sm text-[#9E8675]">
                {t("cart.empty")}
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              {cart.map((entry) => (
                <div
                  key={entry.item.id}
                  className="flex gap-3 rounded-2xl border border-[#E8DFC5] bg-white p-3 shadow-xs"
                >
                  <img
                    src={getImageUrl(entry.item.photo, 90, 90)}
                    alt={getItemName(entry.item, lang)}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <strong className="truncate text-sm text-[#3B2319]">
                        {getItemName(entry.item, lang)}
                      </strong>
                      <button
                        onClick={() => removeItem(entry.item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    {entry.notes && (
                      <p className="text-xs text-muted-foreground italic line-clamp-1 mt-0.5">
                        "{entry.notes}"
                      </p>
                    )}
                    <span className="mt-1 block text-xs font-bold text-[#D4A359]">
                      {formatCurrency(entry.item.price * entry.qty, lang)}
                    </span>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => updateQty(entry.item.id, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2ECE4] text-[#3B2319]"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-xs font-bold text-[#2B1D16]">{entry.qty}</span>
                      <button
                        onClick={() => updateQty(entry.item.id, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full gradient-espresso-lounge text-white"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 border-t border-[#E8DFC5] pt-6">
            <div className="flex justify-between font-bold">
              <span className="text-[#3B2319]">{t("cart.total")}</span>
              <span className="text-xl text-[#D4A359]">{formatCurrency(cartTotal, lang)}</span>
            </div>
            <p className="mt-5 rounded-xl bg-white p-3 text-center text-xs leading-5 text-[#9E8675] border border-[#E8DFC5]">
              {t("cart.thank_you")}
            </p>
            <a
              href="tel:+966126000000"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full gradient-espresso-lounge py-4 font-semibold text-white shadow-lg hover:opacity-95 transition-all"
            >
              <Phone size={17} />
              {t("info.call_us")}
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}
