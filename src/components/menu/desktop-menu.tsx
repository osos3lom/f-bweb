"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Trash2,
  Coffee,
  Clock,
} from "lucide-react";
import { MENU } from "@/data/menu";
import { CATEGORIES } from "@/data/categories";
import { MenuItem } from "@/types/menu";
import { useCart, useLang } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ItemModal } from "./item-modal";
import { CartDrawer } from "@/components/cart/cart-drawer";
import {
  getItemName,
  getItemDesc,
  getCategoryName,
  formatCurrency,
} from "@/lib/i18n-helpers";

export function DesktopMenu() {
  const { lang, toggleLang, ar, t } = useLang();
  const { cart, addToCart, updateQty, cartTotal, cartCount, clearCart } = useCart();
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Filter items based on active category and search text
  const query = search.trim().toLowerCase();
  const filteredItems = MENU.filter((item) => {
    const catMatch = activeCat === "all" || item.category === activeCat;
    const searchMatch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      (item.nameAr && item.nameAr.includes(search.trim()));
    return catMatch && searchMatch;
  });

  // Handle smooth scroll to category section
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (catId: string) => {
    setActiveCat(catId);
    if (catId === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = categoryRefs.current[catId];
    if (el) {
      const yOffset = -140;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1C120D] text-white font-poppins selection:bg-[#D4A359]/30 pb-24">
      {/* ── 1. Unified Sticky Top Header (Top-0, Zero White Band) ── */}
      <header className="sticky top-0 z-40 bg-[#1C120D]/95 backdrop-blur-xl border-b border-[#D4A359]/25 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-3.5 space-y-3">
          
          {/* Top Row: Navigation Links, Logo, Search, Lang & Cart */}
          <div className="flex items-center justify-between gap-6">
            {/* Left: Brand Logo & Links */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4A359] via-[#FAF6F0] to-[#3B2319] p-0.5 shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-[#1C120D] p-1 flex items-center justify-center border border-black">
                    <Coffee size={16} className="text-[#D4A359]" />
                  </div>
                </div>
                <div>
                  <h1 className="font-playfair font-extrabold text-lg text-white tracking-wide leading-tight">
                    Bitrina
                  </h1>
                  <span className="text-[10px] text-[#D4A359] font-medium block">
                    {ar ? "قائمة بترينا الرقمية" : "Bitrina Digital Menu"}
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1 bg-[#261B15] p-1 rounded-full border border-[#D4A359]/20 text-xs font-semibold">
                <Link
                  href="/"
                  className="px-3.5 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  {t("nav.home")}
                </Link>
                <span className="px-3.5 py-1 rounded-full gradient-amber-gold text-[#3B2319] font-bold shadow-xs">
                  {t("nav.menu")}
                </span>
                <Link
                  href="/#about"
                  className="px-3.5 py-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="/dashboard"
                  className="px-3 py-1 rounded-full bg-[#D4A359]/20 text-[#D4A359] hover:bg-[#D4A359]/30 transition-all"
                >
                  {t("nav.dashboard")}
                </Link>
              </nav>
            </div>

            {/* Center: Widescreen Search Input */}
            <div className="flex-1 max-w-md relative">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#261B15] border border-[#D4A359]/35 focus-within:border-[#D4A359] focus-within:ring-1 focus-within:ring-[#D4A359] transition-all shadow-inner">
                <Search size={15} className="text-[#D4A359] shrink-0" />
                <input
                  type="text"
                  placeholder={
                    ar ? "ابحث في القائمة (قهوة، شيشة، حلى)..." : "Search menu items..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-white/40 outline-none"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Language Switcher & Cart Drawer Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="px-3.5 py-1.5 rounded-full border border-[#D4A359]/40 bg-[#261B15] text-[#D4A359] text-xs font-bold hover:bg-[#34241C] transition-all active:scale-95 shadow-md cursor-pointer"
              >
                {t("nav.lang_toggle")}
              </button>
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative px-4 py-1.5 rounded-full gradient-amber-gold text-[#3B2319] font-extrabold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>{ar ? "السلة" : "Cart"}</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#1C120D] text-white text-[10px] font-bold flex items-center justify-center border border-[#D4A359]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Row: Category Horizontal Filter Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-none pt-1 pb-0.5 border-t border-[#D4A359]/15">
            <button
              onClick={() => scrollToCategory("all")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeCat === "all"
                  ? "gradient-amber-gold text-[#3B2319] shadow-md scale-105"
                  : "bg-[#261B15] text-white/80 border border-[#D4A359]/20 hover:border-[#D4A359]/50 hover:bg-[#34241C]"
              }`}
            >
              <span>✨</span>
              <span>{ar ? "الكل" : "All"}</span>
              <span className="text-[10px] opacity-75">({MENU.length})</span>
            </button>

            {CATEGORIES.map((cat) => {
              const catItemsCount = MENU.filter((i) => i.category === cat.id).length;
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "gradient-amber-gold text-[#3B2319] shadow-md scale-105"
                      : "bg-[#261B15] text-white/80 border border-[#D4A359]/20 hover:border-[#D4A359]/50 hover:bg-[#34241C]"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{getCategoryName(cat, lang)}</span>
                  <span className="text-[10px] opacity-75">({catItemsCount})</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ── 2. Widescreen 2-Column Dashboard Layout ── */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
              MAIN CONTENT: Widescreen Menu Items Grid (Col-Span-8)
             ───────────────────────────────────────────────────────────── */}
          <section className="col-span-8 space-y-12">
            {/* Active Search Query Header */}
            {query && (
              <div className="flex items-center justify-between pb-3 border-b border-[#D4A359]/30">
                <h2 className="font-playfair text-xl font-bold text-[#D4A359]">
                  {ar ? `نتائج البحث عن "${search}"` : `Search Results for "${search}"`}
                </h2>
                <span className="text-xs text-white/60">
                  {filteredItems.length} {ar ? "صنف" : "items"}
                </span>
              </div>
            )}

            {/* Categories Loop */}
            {CATEGORIES.map((cat) => {
              if (activeCat !== "all" && activeCat !== cat.id && !query) return null;

              const categoryItems = filteredItems.filter(
                (item) => item.category === cat.id
              );

              if (categoryItems.length === 0) return null;

              return (
                <div
                  key={cat.id}
                  ref={(el) => {
                    categoryRefs.current[cat.id] = el;
                  }}
                  className="space-y-5 scroll-mt-36"
                >
                  {/* Category Header Title */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#D4A359]/25">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji}</span>
                      <h2 className="font-playfair font-extrabold text-2xl text-white">
                        {getCategoryName(cat, lang)}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#261B15] text-[#D4A359] border border-[#D4A359]/30">
                        {categoryItems.length}
                      </span>
                    </div>
                  </div>

                  {/* 3-Column Luxury Menu Cards Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                    {categoryItems.map((item) => {
                      const isDrink = isDrinkCategory(item.category);
                      const inCart = cart.find((c) => c.item.id === item.id);

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedItem(item)}
                          className="group bg-[#231711] rounded-3xl overflow-hidden border border-[#D4A359]/25 hover:border-[#D4A359] hover:shadow-[0_15px_40px_rgba(212,163,89,0.18)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            {/* Card Image Container */}
                            <div className="h-48 overflow-hidden relative bg-[#180E0A]">
                              <img
                                src={getImageUrl(item.photo, 400, 300)}
                                alt={getItemName(item, lang)}
                                className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                                  isDrink ? "object-contain p-4" : "object-cover"
                                }`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#231711] via-transparent to-transparent opacity-90" />

                              {/* Badge Tag */}
                              {item.badge && (
                                <div className="absolute top-3 start-3">
                                  <Badge type={item.badge} />
                                </div>
                              )}
                            </div>

                            {/* Card Body */}
                            <div className="p-4 space-y-1.5">
                              <h3 className="font-playfair font-bold text-base text-white group-hover:text-[#D4A359] transition-colors leading-snug line-clamp-1">
                                {getItemName(item, lang)}
                              </h3>
                              <p className="font-poppins text-xs text-[#C4B1A0] line-clamp-2 leading-relaxed">
                                {getItemDesc(item, lang)}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer Price & Add Button */}
                          <div className="p-4 pt-2 flex items-center justify-between border-t border-[#D4A359]/15">
                            <span className="font-poppins font-extrabold text-base text-[#D4A359]">
                              {formatCurrency(item.price, lang)}
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                              }}
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 ${
                                inCart
                                  ? "gradient-amber-gold text-[#3B2319] shadow-md"
                                  : "bg-[#1C120D] text-[#D4A359] border border-[#D4A359]/40 hover:bg-[#D4A359] hover:text-[#1C120D]"
                              }`}
                              aria-label={`Add ${getItemName(item, lang)} to cart`}
                            >
                              {inCart ? (
                                <span className="font-bold text-xs">{inCart.qty}</span>
                              ) : (
                                <Plus size={16} />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Empty Search Results State */}
            {filteredItems.length === 0 && (
              <div className="py-16 text-center space-y-3 bg-[#231711] rounded-3xl border border-[#D4A359]/20 p-8">
                <div className="text-4xl">🔍</div>
                <h3 className="font-playfair text-xl font-bold text-[#D4A359]">
                  {ar ? "لم نجد نتائج مطابقة" : "No Matching Items Found"}
                </h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto">
                  {ar
                    ? "جرب البحث بكلمات أخرى أو اختر قسماً آخر من القائمة"
                    : "Try searching with different terms or select another category"}
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCat("all");
                  }}
                  className="px-5 py-2.5 rounded-full gradient-amber-gold text-[#3B2319] font-bold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer inline-block mt-2"
                >
                  {ar ? "عرض كافة الأصناف" : "Show All Items"}
                </button>
              </div>
            )}
          </section>

          {/* ─────────────────────────────────────────────────────────────
              SIDEBAR: Live Sticky Cart & Info (Col-Span-4)
             ───────────────────────────────────────────────────────────── */}
          <aside className="col-span-4 sticky top-28 space-y-6">
            {/* Live Cart Card Container */}
            <div className="bg-[#231711] rounded-3xl border border-[#D4A359]/30 p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#D4A359]/20">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#D4A359]" />
                  <h3 className="font-playfair font-extrabold text-lg text-white">
                    {ar ? "طلباتك الحالية" : "Your Order"}
                  </h3>
                </div>
                {cartCount > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>{ar ? "تفريغ" : "Clear"}</span>
                  </button>
                )}
              </div>

              {/* Cart Items List */}
              {cart.length > 0 ? (
                <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 scrollbar-none">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-[#1C120D] border border-[#D4A359]/15"
                    >
                      <img
                        src={getImageUrl(cartItem.item.photo, 80, 80)}
                        alt={getItemName(cartItem.item, lang)}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#D4A359]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-poppins font-bold text-xs text-white truncate">
                          {getItemName(cartItem.item, lang)}
                        </h4>
                        <span className="font-poppins font-semibold text-xs text-[#D4A359]">
                          {formatCurrency(cartItem.item.price * cartItem.qty, lang)}
                        </span>
                        {cartItem.notes && (
                          <p className="text-[10px] text-white/50 truncate italic mt-0.5">
                            "{cartItem.notes}"
                          </p>
                        )}
                      </div>

                      {/* Quantity Buttons */}
                      <div className="flex items-center gap-1.5 bg-[#261B15] border border-[#D4A359]/30 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQty(cartItem.item.id, -1)}
                          className="w-5 h-5 rounded-full text-[#D4A359] flex items-center justify-center hover:bg-white/10 active:scale-90"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-poppins font-bold text-xs text-white w-4 text-center">
                          {cartItem.qty}
                        </span>
                        <button
                          onClick={() => updateQty(cartItem.item.id, 1)}
                          className="w-5 h-5 rounded-full text-[#D4A359] flex items-center justify-center hover:bg-white/10 active:scale-90"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center space-y-2 text-white/50">
                  <div className="text-3xl mb-2">🛍️</div>
                  <p className="font-poppins text-xs font-semibold">
                    {ar ? "سلتك فارغة حالياً" : "Your cart is empty"}
                  </p>
                  <p className="text-[11px] text-white/40">
                    {ar ? "اختر من الأصناف لإضافتها إلى الطلب" : "Select items to start your order"}
                  </p>
                </div>
              )}

              {/* Subtotal & Checkout CTA */}
              <div className="pt-4 border-t border-[#D4A359]/20 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70 font-medium">{ar ? "المجموع الكلي" : "Total Amount"}</span>
                  <span className="font-poppins font-extrabold text-lg text-[#D4A359]">
                    {formatCurrency(cartTotal, lang)}
                  </span>
                </div>

                <button
                  onClick={() => setCartDrawerOpen(true)}
                  disabled={cart.length === 0}
                  className={`w-full py-3.5 rounded-2xl font-poppins font-extrabold text-[#1C120D] text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                    cart.length > 0
                      ? "gradient-amber-gold hover:brightness-110 active:scale-95 cursor-pointer"
                      : "bg-[#34241C] text-white/40 pointer-events-none"
                  }`}
                >
                  <ShoppingBag size={17} />
                  <span>{ar ? "إتمام الطلب" : "Proceed to Checkout"}</span>
                </button>
              </div>
            </div>

            {/* Quick Info & Operating Hours Card */}
            <div className="bg-[#231711] rounded-3xl border border-[#D4A359]/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4A359]">
                <Clock size={14} />
                <span>{ar ? "ساعات العمل والاستقبال" : "Opening Hours"}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {ar
                  ? "مفتوح يومياً من الساعة 8:00 صباحاً وحتى 1:00 بعد منتصف الليل."
                  : "Open daily from 8:00 AM until 1:00 AM."}
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* ── 3. Detail Item Modal & Cart Drawer Integration ── */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdd={(item, qty, notes) => {
            addToCart(item, qty, notes);
            setSelectedItem(null);
          }}
        />
      )}

      {cartDrawerOpen && (
        <CartDrawer onClose={() => setCartDrawerOpen(false)} />
      )}
    </div>
  );
}
