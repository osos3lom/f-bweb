"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search, X, Plus, MapPin, Clock, Coffee, Tag
} from "lucide-react";
import { MENU } from "@/data/menu";
import { CATEGORIES } from "@/data/categories";
import { MenuItem } from "@/types/menu";
import { useCart, useLang } from "@/providers/app-provider";
import { getImageUrl, isDrinkCategory } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ItemModal } from "@/components/menu/item-modal";
import { getItemName, getItemDesc, getCategoryName, formatCurrency } from "@/lib/i18n-helpers";

export function DesktopHome() {
  const { lang, t } = useLang();
  const { cart, addToCart } = useCart();
  const [activeCat, setActiveCat] = useState("coffee");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const query = search.trim().toLowerCase();
  const items = MENU.filter((item) =>
    query
      ? item.name.toLowerCase().includes(query) || (item.nameAr && item.nameAr.includes(search.trim()))
      : item.category === activeCat
  );

  return (
    <div className="hidden md:block desktop-site min-h-screen bg-[#FAF6F0] text-[#2B1D16]">
      {/* Clean Full-Screen Hero Video Background */}
      <section id="home" className="relative w-full h-screen min-h-screen overflow-hidden flex items-center justify-center bg-[#1C120D]">
        {/* Clean Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-100 opacity-100"
        >
          <source src="/brand/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Minimal gradient overlays for legibility */}
        <div
          className="absolute inset-x-0 top-0 h-40 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-80 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(28,18,13,0.85) 0%, rgba(28,18,13,0.2) 60%, transparent 100%)",
          }}
        />

        <div className="site-container relative z-10 text-center max-w-3xl mx-auto py-16 text-white flex flex-col items-center">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[.26em] text-[#D4A359] mb-4 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4A359]/30">
            <span className="h-2 w-2 rounded-full bg-[#D4A359] animate-pulse" />
            {t("hero.location")}
          </div>

          {/* Official Calligraphic Logo Emblem replacing text block */}
          <div className="my-6 mx-auto max-w-md transition-transform hover:scale-105">
            <img
              src="/brand/logo.png"
              alt="قهوة بترينا - Bitrina Logo"
              className="w-full h-auto object-contain mx-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]"
            />
          </div>

          {/* Two CTAs: المنيو (Route /menu) & العروض (Instagram) */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <Link
              href="/menu"
              className="flex items-center gap-3 rounded-full gradient-espresso-lounge px-9 py-4 font-bold text-white shadow-2xl hover:scale-105 transition-all text-base border border-[#D4A359]/40"
            >
              <Coffee size={19} />
              {t("hero.cta_menu")}
            </Link>

            <a
              href="https://instagram.com/bitrina.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full gradient-amber-gold px-9 py-4 font-bold text-[#3B2319] shadow-2xl hover:scale-105 transition-all text-base"
            >
              <Tag size={19} />
              {t("hero.cta_offers")}
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 site-container">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-[.22em] text-[#D4A359] mb-2">
            {t("showcase.title")}
          </div>
          <h2 className="font-playfair text-4xl font-bold text-[#3B2319]">
            {t("showcase.subtitle")}
          </h2>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-white border border-[#E8DFC5] shadow-xs">
            <Search size={16} className="text-[#9E8675]" />
            <input
              type="text"
              placeholder={t("showcase.search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none text-[#2B1D16] placeholder-[#9E8675]"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X size={14} className="text-[#9E8675]" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2.5 overflow-x-auto justify-center pb-6 category-row">
          {CATEGORIES.map((cat) => {
            const active = cat.id === activeCat && !search;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCat(cat.id);
                  setSearch("");
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? "gradient-espresso-lounge text-white shadow-md shadow-[#3B2319]/20"
                    : "bg-white text-[#2B1D16] border border-[#E8DFC5] hover:border-[#D4A359] hover:bg-[#FAF6F0]"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{getCategoryName(cat, lang)}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {items.map((item) => {
            const isDrink = isDrinkCategory(item.category);
            const inCart = cart.find((c) => c.item.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DFC5] vitrine-card-hover cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`h-44 overflow-hidden relative ${isDrink ? "bg-[#FAF6F0] p-4" : "bg-muted"}`}>
                    <img
                      src={getImageUrl(item.photo, 400, 300)}
                      alt={getItemName(item, lang)}
                      className={`w-full h-full ${isDrink ? "object-contain object-center" : "object-cover"}`}
                    />
                    {item.badge && (
                      <div className="absolute top-3 start-3 rtl:right-3 rtl:left-auto">
                        <Badge type={item.badge} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-playfair font-bold text-lg text-[#3B2319] leading-snug">
                        {getItemName(item, lang)}
                      </h3>
                      <span className="font-poppins font-bold text-base text-[#D4A359] shrink-0">
                        {formatCurrency(item.price, lang)}
                      </span>
                    </div>
                    <p className="font-poppins text-xs text-[#9E8675] leading-relaxed line-clamp-2">
                      {getItemDesc(item, lang)}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#F2ECE4]">
                  <span className="text-[11px] font-medium text-[#8C6D58]">
                    {t("showcase.tap_for_options")}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      inCart ? "gradient-amber-gold text-[#3B2319]" : "gradient-espresso-lounge text-white hover:opacity-90"
                    }`}
                  >
                    {inCart ? <span className="font-bold text-xs">{inCart.qty}</span> : <Plus size={16} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bitrina Story Section with Main Exterior Image */}
      <section id="about" className="py-20 gradient-espresso-lounge text-white relative overflow-hidden">
        <div className="site-container">
          <div className="grid grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-[#D4A359] mb-3">
                {t("about.title")}
              </div>
              <h2 className="font-playfair text-4xl font-bold leading-tight mb-6 gradient-text-gold">
                {t("about.heading")}
              </h2>
              <p className="text-white/85 leading-relaxed text-sm mb-4">
                {t("about.p1")}
              </p>
              <p className="text-white/75 leading-relaxed text-sm mb-8 whitespace-pre-line">
                {t("about.p2")}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                  <Clock size={20} className="text-[#D4A359] mb-2" />
                  <h4 className="font-semibold text-sm">{t("info.opening_hours")}</h4>
                  <p className="text-xs text-white/75 mt-1">{t("info.daily_hours")}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                  <MapPin size={20} className="text-[#D4A359] mb-2" />
                  <h4 className="font-semibold text-sm">{t("info.location_title")}</h4>
                  <p className="text-xs text-white/75 mt-1">{t("info.location_address")}</p>
                </div>
              </div>
            </div>

            {/* Main Store Exterior Image in Story */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="/brand/exterior.jpg"
                  alt="Bitrina Coffee Exterior Facade & Lounge"
                  className="w-full h-[480px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Venue Photography Showcase */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-3">
              <div className="h-56 rounded-xl overflow-hidden mb-3">
                <img
                  src="/brand/exterior.jpg"
                  alt="Bitrina Main Facade & Signboard"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h4 className="font-playfair font-bold text-base text-[#D4A359]">
                {lang === "ar" ? "الواجهة الرئيسية واللاونج" : "Exterior Facade & Lounge"}
              </h4>
              <p className="text-xs text-white/70 mt-1">
                {lang === "ar" ? "شعار بترينا المضيء مع أقواس الخيزران الخضراء" : "Bitrina's 3D illuminated logo and sage-green lattice arches"}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-3">
              <div className="h-56 rounded-xl overflow-hidden mb-3">
                <img
                  src="/brand/interior-fountain.jpg"
                  alt="Bitrina Indoor Lounge & Water Fountain"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h4 className="font-playfair font-bold text-base text-[#D4A359]">
                {lang === "ar" ? "نافورة اللاونج الداخلية" : "Fountain Indoor Lounge"}
              </h4>
              <p className="text-xs text-white/70 mt-1">
                {lang === "ar" ? "أجواء دافئة حول النافورة الحجرية مع الإضاءة الذهبية" : "Charming stone water fountain surrounded by floral chairs"}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-3">
              <div className="h-56 rounded-xl overflow-hidden mb-3">
                <img
                  src="/brand/outdoor-lounge.jpg"
                  alt="Bitrina Outdoor Terrace Lounge"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h4 className="font-playfair font-bold text-base text-[#D4A359]">
                {lang === "ar" ? "التراس والجلسات الخارجية" : "Outdoor Terrace Lounge"}
              </h4>
              <p className="text-xs text-white/70 mt-1">
                {lang === "ar" ? "جلسات في الهواء الطلق محاطة بالأشجار والنباتات الخضراء" : "Open-air dining under botanical hanging greenery"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Item Modal */}
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
    </div>
  );
}
