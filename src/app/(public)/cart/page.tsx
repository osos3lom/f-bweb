"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Trash2, Minus, Plus, Phone } from "lucide-react";
import { useCart, useLang } from "@/providers/app-provider";
import { getImageUrl } from "@/lib/utils";
import { formatCurrency } from "@/lib/i18n-helpers";

export default function CartPage() {
  const { cart, updateQty, removeItem, clearCart, cartTotal } = useCart();
  const { lang, ar } = useLang();
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 px-8 py-12" dir={ar ? "rtl" : "ltr"}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "rgba(46,94,78,0.12)" }}
        >
          <Check size={36} className="text-primary" />
        </div>
        <h1 className="font-playfair font-bold text-foreground text-2xl text-center">
          {ar ? "تم إرسال طلبك!" : "Order Sent!"}
        </h1>
        <p className="font-poppins text-sm text-muted-foreground text-center leading-relaxed max-w-sm">
          {ar
            ? "سيصلك طلبك قريباً. شكراً لزيارتك بترينا كافيه ولاونج."
            : "Your order is being prepared. Thank you for visiting Bitrina Café & Lounge!"}
        </p>
        <button
          onClick={() => {
            setOrdered(false);
            clearCart();
          }}
          className="px-8 py-3 rounded-2xl font-poppins font-semibold text-white transition-all shadow-md gradient-espresso-lounge"
        >
          {ar ? "طلب جديد" : "New Order"}
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 px-8 py-12" dir={ar ? "rtl" : "ltr"}>
        <div className="text-6xl">🛒</div>
        <h1 className="font-playfair font-bold text-foreground text-xl">
          {ar ? "السلة فارغة" : "Your cart is empty"}
        </h1>
        <p className="font-poppins text-sm text-muted-foreground text-center">
          {ar ? "أضف أطباقك المفضلة من القائمة" : "Add your favorite dishes from the menu"}
        </p>
        <Link
          href="/menu"
          className="mt-2 px-6 py-3 rounded-full font-poppins font-semibold text-white text-sm bg-primary shadow-md"
        >
          {ar ? "تصفح القائمة" : "Browse Menu"}
        </Link>
      </div>
    );
  }

  return (
    <div className="site-container py-6 flex flex-col min-h-[75vh]" dir={ar ? "rtl" : "ltr"}>
      <div className="pt-2 pb-4 flex items-center justify-between">
        <h1 className="font-playfair font-bold text-foreground text-2xl md:text-3xl">
          {ar ? "طلبك" : "Your Order"}
        </h1>
        <button
          onClick={clearCart}
          className="font-poppins text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          {ar ? "مسح الكل" : "Clear all"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-4 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        {cart.map((ci) => (
          <div
            key={ci.item.id}
            className="flex gap-3 rounded-2xl p-3 border"
            style={{ background: "#fff", borderColor: "#E6DED2" }}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
              <img
                src={getImageUrl(ci.item.photo, 64, 64)}
                alt={ar ? ci.item.nameAr : ci.item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-poppins font-semibold text-sm text-foreground leading-snug">
                {ar ? ci.item.nameAr : ci.item.name}
              </div>
              {ci.notes && (
                <div className="font-poppins text-xs text-muted-foreground mt-0.5 italic line-clamp-1">
                  "{ci.notes}"
                </div>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(ci.item.id, -1)}
                    className="w-7 h-7 rounded-full border flex items-center justify-center"
                    style={{ borderColor: "#E6DED2" }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={11} className="text-foreground" />
                  </button>
                  <span className="font-poppins font-semibold text-sm text-foreground w-4 text-center">
                    {ci.qty}
                  </span>
                  <button
                    onClick={() => updateQty(ci.item.id, 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "#2E5E4E" }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={11} className="text-white" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm" style={{ color: "#C89B3C" }}>
                    {formatCurrency(ci.item.price * ci.qty, lang)}
                  </span>
                  <button onClick={() => removeItem(ci.item.id)} aria-label="Remove item">
                    <Trash2 size={14} className="text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary & Actions */}
      <div
        className="pt-4 pb-6 border-t mt-4"
        style={{ borderColor: "#E6DED2" }}
      >
        <div className="flex justify-between mb-1">
          <span className="text-sm text-muted-foreground">{ar ? "المجموع" : "Subtotal"}</span>
          <span className="font-semibold text-sm text-foreground">{formatCurrency(cartTotal, lang)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-muted-foreground">{ar ? "رسوم الخدمة" : "Service"}</span>
          <span className="text-sm text-muted-foreground">{ar ? "تُضاف لاحقاً" : "Added at checkout"}</span>
        </div>
        <div className="flex justify-between mb-4 pt-2 border-t" style={{ borderColor: "#E6DED2" }}>
          <span className="font-playfair font-bold text-foreground">{ar ? "الإجمالي" : "Total"}</span>
          <span className="font-playfair font-bold text-foreground text-lg">{formatCurrency(cartTotal, lang)}</span>
        </div>

        <div
          className="mb-4 rounded-xl border p-3 text-center font-poppins text-xs leading-relaxed text-muted-foreground"
          style={{ borderColor: "#E6DED2", background: "#F8F4EC" }}
        >
          {ar
            ? "هذه السلة لحساب المجموع فقط. للطلب، اتصل على 1698 أو اطلب داخل المطعم."
            : "This cart is for total calculation only. To order, please call 1698 or order inside the restaurant."}
        </div>
        <a
          href="tel:1698"
          className="w-full py-4 rounded-2xl font-poppins font-semibold text-white text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg"
          style={{ background: "#2E5E4E" }}
        >
          <Phone size={17} />
          {ar ? "اطلب عبر الهاتف: 1698" : "Order by Phone: 1698"}
        </a>
      </div>
    </div>
  );
}
